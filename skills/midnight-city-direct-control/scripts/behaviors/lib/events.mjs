// @ts-check
/**
 * Shared live-event rules. The orchestrator planner facts and the `join-event`
 * behavior both use them, so admission and execution agree on joinability.
 * Depends only on the observer `live-events` item shape.
 */

/**
 * True when `agentId` can join `event` as a new competitor: the event is open
 * and in signup, and the agent is not a participant. A rap battle also needs
 * no final countdown, fewer than 2 battlers, and the agent not a battler.
 *
 * @param {import("./events.d.mts").JoinableEvent} event
 * @param {string} agentId
 * @returns {boolean}
 */
export function eventAcceptsCompetitor(event, agentId) {
  if (event.status !== "open" || event.phase !== "signup") return false;
  if (event.participants.some((participant) => participant.agentId === agentId)) {
    return false;
  }
  if (event.kind !== "rap_battle") return true;
  const state = event.rapBattle;
  return Boolean(
    state &&
      state.finalCountdownStartsAtMs == null &&
      state.battlerAgentIds.length < 2 &&
      !state.battlerAgentIds.includes(agentId),
  );
}

/**
 * The reputation domains an event can raise. Only rap battles have one.
 *
 * @param {{ kind: string }} event
 * @returns {string[]}
 */
export function eventReputationDomains(event) {
  return event.kind === "rap_battle" ? ["rap_battle"] : [];
}
