// @ts-check
/**
 * Join one live event as a competitor, with no LLM call. Params (give one):
 *   - `eventId`: join this event (an event-result goal).
 *   - `reputationDomain`: join the first joinable event that raises this
 *     reputation domain (a reputation goal).
 *
 * Blocked when the named event is missing, finished, or no longer joinable.
 * Idle while the agent takes part, and while no event for the domain is
 * joinable. It never reports done; the goal check ends the step.
 *
 * Depends only on the Ctx contract.
 */

import { eventAcceptsCompetitor, eventReputationDomains } from "./lib/events.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["event_action"], reads: ["context", "live-events"],
  effects: ["Joins the selected live event as a competitor, using eventId or a joinable event for reputationDomain."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const agentId = ctx.self.agentId;
  const { eventId, reputationDomain } = ctx.params;
  if (typeof eventId !== "string") {
    if (typeof reputationDomain !== "string") {
      return { kind: "blocked", reason: "goal_event_missing" };
    }
    const event = ctx.events.find(
      (candidate) =>
        eventReputationDomains(candidate).includes(reputationDomain) &&
        eventAcceptsCompetitor(candidate, agentId),
    );
    return event
      ? { kind: "act", action: ctx.joinEvent(event.eventId, "competitor") }
      : { kind: "idle" };
  }
  const event = ctx.events.find((candidate) => candidate.eventId === eventId);
  if (!event) return { kind: "blocked", reason: "goal_event_missing" };
  if (event.status === "finished" || event.status === "closed") {
    return { kind: "blocked", reason: "goal_event_finished_without_target" };
  }
  if (event.participants.some((participant) => participant.agentId === agentId)) {
    return { kind: "idle" };
  }
  if (!eventAcceptsCompetitor(event, agentId)) {
    return { kind: "blocked", reason: "goal_event_no_longer_joinable" };
  }
  return { kind: "act", action: ctx.joinEvent(event.eventId, "competitor") };
}
