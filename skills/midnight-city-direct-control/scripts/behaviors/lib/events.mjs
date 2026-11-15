// @ts-check

/**
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
 * @param {{ kind: string }} event
 * @returns {string[]}
 */
export function eventReputationDomains(event) {
  return event.kind === "rap_battle" ? ["rap_battle"] : [];
}
