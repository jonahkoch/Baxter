#!/usr/bin/env python3
"""
Midnight City v1 Harness — Main Loop

Replaces cron-run.sh with agent-based reasoning while keeping
existing behaviors as fallback.
"""
import time
import sys
import signal
from datetime import datetime
from typing import Optional

from agents.scout import scout_game_state, format_scout_report
from agents.strategist import decide_next_action, get_strategy_context, format_decision
from agents.operator import execute_action, format_outcome, start_work, stop_work, start_maintenance_behaviors
from checkpoints.state import save_checkpoint, load_latest_checkpoint, get_checkpoints_summary
from memory.tracker import record_session, get_efficiency_report
from config import GRIND_DURATION_MINUTES, MAINTENANCE_DURATION_MINUTES


class MidnightCityHarness:
    def __init__(self):
        self.running = False
        self.current_phase = "idle"
        self.session_start_xp = 0
        self.session_start_time = None
        
        # Handle interrupts gracefully
        signal.signal(signal.SIGINT, self._handle_interrupt)
        signal.signal(signal.SIGTERM, self._handle_interrupt)
    
    def _handle_interrupt(self, signum, frame):
        print(f"\n[{datetime.now().isoformat()}] Received signal {signum}, shutting down gracefully...")
        self.running = False
        # Stop any active work
        try:
            stop_work()
        except:
            pass
    
    def _log(self, message: str):
        timestamp = datetime.now().isoformat()
        print(f"[{timestamp}] {message}")
    
    def run_maintenance_cycle(self) -> bool:
        """
        Run one maintenance cycle: eat, buy food, sell when loaded.
        Returns True if successful.
        """
        self.current_phase = "maintenance"
        self._log("=== MAINTENANCE CYCLE ===")
        
        # Scout current state
        state = scout_game_state()
        self._log(format_scout_report(state))
        
        if state.get("errors"):
            self._log(f"Scout errors: {state['errors']}")
            # Still try to make decisions even with partial data
        
        # Strategist decides
        decision = decide_next_action(state)
        self._log(format_decision(decision))
        
        # Execute the decision regardless of type (maintenance or work)
        action_type, params = decision
        outcome = execute_action(action_type, params, state)
        self._log(format_outcome(outcome))
        
        # Checkpoint
        save_checkpoint(
            phase="maintenance",
            context=state,
            decision=f"{action_type}: {params.get('reason', '')}",
            outcome=outcome,
        )
        return "error" not in outcome
    
    def run_work_cycle(self, duration_minutes: int = 120) -> bool:
        """
        Run one work/grind cycle.
        Returns True if successful.
        """
        self.current_phase = "work"
        self._log(f"=== WORK CYCLE ({duration_minutes}m) ===")
        
        # Pre-work scout
        state = scout_game_state()
        self.session_start_xp = state.get("agent", {}).get("hackingXP", 0)
        self.session_start_time = time.time()
        
        self._log(format_scout_report(state))
        self._log(get_strategy_context(state))
        
        # Decide grind
        decision = decide_next_action(state)
        action_type, params = decision
        
        if action_type in ("grind", "continue_work"):
            # Start work via API
            self._log(f"Starting work: {params.get('grind_type', 'profession')}")
            outcome = execute_action("grind", params, state)
            self._log(format_outcome(outcome))
            
            if "error" in outcome:
                self._log("Failed to start work")
                return False
            
            # Work loop: check health every 30s, restart work if stopped, run maintenance if needed
            end_time = time.time() + (duration_minutes * 60)
            last_maintenance = 0
            work_restarts = 0
            
            # Give work a moment to start before first check
            time.sleep(5)
            
            while time.time() < end_time and self.running:
                time.sleep(25)  # 25s + 5s initial = 30s between checks
                
                # Scout state
                check_state = scout_game_state()
                agent = check_state.get("agent", {})
                hunger = agent.get("hungerPercent", 0)
                load_state = agent.get("loadState", "normal")
                is_working = agent.get("isPerformingJob", False)
                
                # Check if maintenance needed
                needs_maintenance = False
                if hunger >= 80:
                    self._log(f"Hunger at {hunger:.0f}%, running maintenance...")
                    needs_maintenance = True
                elif load_state == "overburdened":
                    self._log(f"Load overburdened, running maintenance...")
                    needs_maintenance = True
                
                if needs_maintenance and (time.time() - last_maintenance) > 60:
                    # Stop work, do maintenance, restart
                    self._log("Pausing work for maintenance...")
                    stop_work()
                    
                    # Run maintenance
                    self.run_maintenance_cycle()
                    last_maintenance = time.time()
                    
                    # Restart work
                    self._log("Restarting work after maintenance...")
                    restart = execute_action("grind", params, scout_game_state())
                    self._log(format_outcome(restart))
                    time.sleep(5)  # Give restart time to take effect
                    work_restarts = 0  # Reset restart counter
                    continue
                
                # If work stopped, restart it (up to 3 times to avoid infinite loops)
                if not is_working:
                    if work_restarts < 3:
                        work_restarts += 1
                        self._log(f"Work stopped, restarting ({work_restarts}/3)...")
                        restart = execute_action("grind", params, check_state)
                        self._log(format_outcome(restart))
                        time.sleep(5)
                    else:
                        self._log("Work stopped 3 times, giving up")
                        break
            
            # Stop work
            stop_work()
            
            # Post-work scout
            end_state = scout_game_state()
            end_xp = end_state.get("agent", {}).get("hackingXP", 0)
            duration = (time.time() - self.session_start_time) / 60
            
            # Record session
            session = record_session(
                grind_type=params.get("grind_type", "crypto_terminal"),
                start_xp=self.session_start_xp,
                end_xp=end_xp,
                duration_minutes=duration,
                skill="hacking",
                notes=params.get("reason", ""),
            )
            
            self._log(f"Session complete: +{session['xp_gained']} XP in {duration:.1f}m ({session['xp_per_hour']:.0f} XP/hr)")
            
            # Checkpoint
            save_checkpoint(
                phase="work",
                context=end_state,
                decision=f"{action_type}: {params.get('reason', '')}",
                outcome={"xp_gained": session["xp_gained"], "duration": duration},
            )
            
            return True
        else:
            self._log(f"Work cycle deferred: {action_type}")
            return False
    
    def run_health_check(self) -> bool:
        """
        Verify game state matches expectations.
        Returns True if healthy.
        """
        self.current_phase = "health_check"
        self._log("=== HEALTH CHECK ===")
        
        state = scout_game_state()
        
        checks = []
        agent = state.get("agent", {})
        
        # Check hunger
        hunger = agent.get("hungerPercent", 0)
        checks.append(("Hunger < 90%", hunger < 90))
        
        # Check load
        load_state = agent.get("loadState", "normal")
        checks.append(("Load not overburdened", load_state != "overburdened"))
        
        # Check health
        health = agent.get("health", 1)
        max_health = agent.get("maxHealth", 1)
        checks.append(("Health > 50%", health / max_health > 0.5 if max_health else True))
        
        # Check XP is progressing
        checks.append(("XP readable", agent.get("hackingXP") is not None))
        
        all_pass = all(result for _, result in checks)
        
        for check, result in checks:
            status = "✅" if result else "❌"
            self._log(f"  {status} {check}")
        
        return all_pass
    
    def run_full_loop(self, iterations: Optional[int] = None):
        """
        Run the full harness loop.
        
        Each iteration:
        1. Health check
        2. Maintenance cycle
        3. Work cycle
        """
        self._log("=" * 50)
        self._log("Midnight City v1 Harness Starting")
        self._log("=" * 50)
        
        self.running = True
        iteration = 0
        
        while self.running:
            iteration += 1
            if iterations and iteration > iterations:
                self._log(f"Reached max iterations ({iterations}), stopping")
                break
            
            self._log(f"\n--- Iteration {iteration} ---")
            
            # 1. Health check
            if not self.run_health_check():
                self._log("Health check failed, attempting recovery...")
                time.sleep(60)
                continue
            
            # 2. Maintenance
            self.run_maintenance_cycle()
            
            # 3. Work
            self.run_work_cycle(GRIND_DURATION_MINUTES)
            
            self._log(f"Iteration {iteration} complete. Efficiency report:")
            self._log(get_efficiency_report("hacking"))
        
        self._log("Harness stopped")
    
    def run_single(self):
        """Run one iteration (for testing)."""
        self._log("Running single iteration...")
        
        # Health check is advisory — maintenance will fix issues
        healthy = self.run_health_check()
        if not healthy:
            self._log("Health issues detected, running maintenance first...")
        
        # Always run maintenance (handles hunger, load, food, etc.)
        self.run_maintenance_cycle()
        
        # Wait briefly for async actions to complete, then re-check
        self._log("Re-checking state after maintenance...")
        import time
        time.sleep(5)
        post_state = scout_game_state()
        self._log(format_scout_report(post_state))
        
        load_state = post_state.get("agent", {}).get("loadState", "normal")
        hunger = post_state.get("agent", {}).get("hungerPercent", 0)
        
        if load_state == "overburdened" or hunger >= 90:
            self._log("Still critical after maintenance, skipping work cycle")
            return False
        
        self.run_work_cycle(5)  # 5-minute test grind
        
        return True


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Midnight City v1 Harness")
    parser.add_argument("--loop", action="store_true", help="Run continuous loop")
    parser.add_argument("--iterations", type=int, help="Max iterations")
    parser.add_argument("--single", action="store_true", help="Run one test iteration")
    args = parser.parse_args()
    
    harness = MidnightCityHarness()
    
    if args.single:
        harness.run_single()
    elif args.loop:
        harness.run_full_loop(args.iterations)
    else:
        print("Usage: python harness.py --loop [--iterations N] | --single")
        print("")
        print("  --loop        Run continuous harness loop")
        print("  --iterations  Max iterations before stopping")
        print("  --single      Run one 5-minute test iteration")
        print("")
        print("Current efficiency data:")
        print(get_efficiency_report("hacking"))


if __name__ == "__main__":
    main()
