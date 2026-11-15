// @ts-check

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
