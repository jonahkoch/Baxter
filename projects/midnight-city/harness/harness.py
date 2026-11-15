#!/usr/bin/env python3
"""
Midnight City v1 Harness — Main Loop

Replaces cron-run.sh with agent-based reasoning while keeping
existing behaviors as fallback.
"""
import time
import sys
import signal
import json
from datetime import datetime
from typing import Optional

from agents.scout import scout_game_state, format_scout_report
from agents.strategist import decide_next_action, get_strategy_context, format_decision
from agents.operator import execute_action, format_outcome, start_work, stop_work, start_maintenance_behaviors
from checkpoints.state import save_checkpoint, load_latest_checkpoint, get_checkpoints_summary
from memory.tracker import record_session, get_efficiency_report
from config import GRIND_DURATION_MINUTES, MAINTENANCE_DURATION_MINUTES, STATUS_FILE


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
    
    def _write_status(self, status: str, details: dict = None):
        """Write status file for heartbeat monitoring."""
        try:
            data = {
                "status": status,
                "phase": self.current_phase,
                "timestamp": datetime.now().isoformat(),
                "timestamp_ms": int(time.time() * 1000),
                "details": details or {},
            }
            STATUS_FILE.parent.mkdir(parents=True, exist_ok=True)
            STATUS_FILE.write_text(json.dumps(data, indent=2))
        except Exception as e:
            self._log(f"Failed to write status file: {e}")
    
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
        Run one work/grind cycle using gather commands in a loop.
        The 'work' command doesn't stay active, so we use gather crypto_terminal
        repeatedly with health checks between gathers.
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
        
        if action_type not in ("grind", "continue_work"):
            self._log(f"Work cycle deferred: {action_type}")
            return False
        
        # Work loop: gather repeatedly with health checks
        end_time = time.time() + (duration_minutes * 60)
        last_maintenance = 0
        gathers_done = 0
        last_gather_time = 0
        
        while time.time() < end_time and self.running:
            # Scout state
            check_state = scout_game_state()
            agent = check_state.get("agent", {})
            hunger = agent.get("hungerPercent", 0)
            load_state = agent.get("loadState", "normal")
            
            # Write status for heartbeat monitoring
            self._write_status("working", {
                "hunger": hunger,
                "load_state": load_state,
                "gathers_done": gathers_done,
                "elapsed_minutes": (time.time() - self.session_start_time) / 60,
            })
            
            # Check if maintenance needed
            needs_maintenance = False
            if hunger >= 80:
                self._log(f"Hunger at {hunger:.0f}%, running maintenance...")
                needs_maintenance = True
            elif load_state == "overburdened":
                self._log(f"Load overburdened, running maintenance...")
                needs_maintenance = True
            elif load_state == "heavy":
                meme_coins = agent.get("memeCoin", 0)
                if meme_coins > 100:
                    self._log(f"Load heavy with {meme_coins} meme coins, selling early...")
                    needs_maintenance = True
            
            if needs_maintenance and (time.time() - last_maintenance) > 60:
                self._log("Pausing work for maintenance...")
                self.run_maintenance_cycle()
                last_maintenance = time.time()
                continue
            
            # Do a gather
            outcome = execute_action("grind", params, check_state)
            if "error" not in outcome:
                gathers_done += 1
                last_gather_time = time.time()
            else:
                self._log(f"Gather failed: {outcome.get('reason', 'unknown')}")
            
            # Wait between gathers (crypto terminals have a cooldown)
            time.sleep(15)
        
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
        
        self._log(f"Session complete: +{session['xp_gained']} XP in {duration:.1f}m ({session['xp_per_hour']:.0f} XP/hr) — {gathers_done} gathers")
        
        # Checkpoint
        save_checkpoint(
            phase="work",
            context=end_state,
            decision=f"{action_type}: {params.get('reason', '')}",
            outcome={"xp_gained": session["xp_gained"], "duration": duration, "gathers": gathers_done},
        )
        
        return True
    
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
        
        self._write_status("health_check", {
            "hunger": hunger,
            "load_state": load_state,
            "health": health,
            "max_health": max_health,
            "healthy": all_pass,
        })
        
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
            healthy = self.run_health_check()
            if not healthy:
                self._log("Health issues detected, running maintenance...")
            
            # 2. Maintenance (always run — handles hunger, load, food, etc.)
            self.run_maintenance_cycle()
            
            # Wait for async actions (trades, eating) to complete, then re-check
            self._log("Waiting for maintenance actions to complete...")
            time.sleep(10)
            post_state = scout_game_state()
            post_load = post_state.get("agent", {}).get("loadState", "normal")
            post_hunger = post_state.get("agent", {}).get("hungerPercent", 0)
            
            if post_load == "overburdened":
                self._log(f"Still overburdened after maintenance (meme coins: {post_state.get('agent', {}).get('memeCoin', 0)}). Retrying...")
                time.sleep(30)
                continue
            
            if post_hunger >= 90:
                self._log(f"Still hungry ({post_hunger:.0f}%) after maintenance. Retrying...")
                time.sleep(30)
                continue
            
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
        
        # Wait for async actions (trades, eating) to complete, then re-check
        self._log("Waiting for maintenance actions to complete...")
        time.sleep(10)
        self._write_status("maintenance_wait", {"reason": "waiting for trade/eat to complete"})
        post_state = scout_game_state()
        self._log(format_scout_report(post_state))
        
        load_state = post_state.get("agent", {}).get("loadState", "normal")
        hunger = post_state.get("agent", {}).get("hungerPercent", 0)
        
        if load_state == "overburdened":
            self._log(f"Still overburdened after maintenance (meme coins: {post_state.get('agent', {}).get('memeCoin', 0)}). Skipping work.")
            return False
        
        if hunger >= 90:
            self._log(f"Still hungry ({hunger:.0f}%) after maintenance. Skipping work.")
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
