// @ts-check
/**
 * Ask a founder of a full group to make room for one new member, with no LLM
 * call in the behavior. The host writes and sends the text. Step params:
 *   - `memberSelector`: "founder_choice" (the founder picks the member) or
 *     "lowest_founder_sentiment" (the host names the weakest member).
 * Host params (orchestrator: added at run time; skill: from the run spec):
 *   - `groupId`: the goal group.
 *   - `weakestMemberAgentId`: the member to name for "lowest_founder_sentiment".
 *     It needs founder sentiments, which are host-only data, so it is a param.
 *   - `attempt`, `unavailableAgentIds`: see `lib/social.mjs`.
 * Founders are tried in `ctx.agents` order. The orchestrator orders that list
 * by its relationship sentiment (host-only data), best first.
 *
 * Done when the group is not full. Blocked with `goal_group_missing`,
 * `group_membership_limit` (member of another group),
 * `goal_group_founder_missing`, `weakest_group_member_resolution_missing`, or
 * `no_legal_social_target`.
 */

import { goalGroup, inAgentOrder, pickConversationTarget } from "./lib/social.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["open_conversation"], reads: ["context", "agents", "social"],
  effects: ["Starts a conversation asking a founder to remove an eligible non-founder member from a full goal group to make room. Removal depends on the conversation outcome."],
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
  if (!group.full) return { kind: "done" };
  const founderIds = group.members.filter((member) => member.isFounder).map((member) => member.agentId);
  if (founderIds.length === 0) return { kind: "blocked", reason: "goal_group_founder_missing" };
  let removable = group.members
    .filter((member) => !member.isFounder)
    .map((member) => ({ agentId: member.agentId, name: member.name }));
  if (ctx.params.memberSelector === "lowest_founder_sentiment") {
    removable = removable.filter((member) => member.agentId === ctx.params.weakestMemberAgentId);
    if (removable.length === 0) {
      return { kind: "blocked", reason: "weakest_group_member_resolution_missing" };
    }
  }
  const target = pickConversationTarget(ctx, inAgentOrder(ctx, founderIds), { keepOrder: true });
  if (!target) return { kind: "blocked", reason: "no_legal_social_target" };
  return {
    kind: "act",
    action: ctx.openConversation({
      intentKey: "create_group_vacancy",
      startReason: "group_vacancy",
      candidateAgentIds: [target],
      topicSelection: "none",
      excludedTopicIds: [],
      goalGroupId: group.groupId,
      removableGroupMembers: removable,
      plannerObjective: "create_group_vacancy",
    }),
  };
}
