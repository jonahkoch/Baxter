// @ts-check
/**
 * Ask a founder to let the agent join a group, with no LLM call in the
 * behavior. The host writes and sends the text. No step params.
 * Host params (orchestrator: added at run time; skill: from the run spec):
 *   - `groupId`: the goal group.
 *   - `attempt`, `unavailableAgentIds`: see `lib/social.mjs`.
 * Founders are tried in `ctx.agents` order. The orchestrator orders that list
 * by its relationship sentiment (host-only data), best first.
 *
 * Done when the agent is a member. Idle (`group_still_full`) while the group
 * is full. Blocked with `goal_group_missing`, `group_membership_limit`
 * (member of another group), `goal_group_founder_missing`, or
 * `no_legal_social_target`.
 */

import { goalGroup, inAgentOrder, pickConversationTarget } from "./lib/social.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["open_conversation"], reads: ["context", "agents", "social"],
  effects: ["Starts a conversation asking a founder to admit the agent to the goal group. Membership depends on the conversation outcome."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const group = goalGroup(ctx);
  if (!group) return { kind: "blocked", reason: "goal_group_missing" };
  const inOtherGroup = ctx.groups.some(
    (other) => other.groupId !== group.groupId && other.members.some((member) => member.agentId === ctx.self.agentId),
  );
  if (inOtherGroup) return { kind: "blocked", reason: "group_membership_limit" };
  if (group.members.some((member) => member.agentId === ctx.self.agentId)) return { kind: "done" };
  if (group.full) return { kind: "idle", reason: "group_still_full" };
  const founderIds = group.members.filter((member) => member.isFounder).map((member) => member.agentId);
  if (founderIds.length === 0) return { kind: "blocked", reason: "goal_group_founder_missing" };
  const target = pickConversationTarget(ctx, inAgentOrder(ctx, founderIds), { keepOrder: true });
  if (!target) return { kind: "blocked", reason: "no_legal_social_target" };
  return {
    kind: "act",
    action: ctx.openConversation({
      intentKey: "request_group_membership",
      startReason: "group_membership",
      candidateAgentIds: [target],
      topicSelection: "none",
      excludedTopicIds: [],
      goalGroupId: group.groupId,
      removableGroupMembers: [],
      plannerObjective: "request_group_membership",
    }),
  };
}
