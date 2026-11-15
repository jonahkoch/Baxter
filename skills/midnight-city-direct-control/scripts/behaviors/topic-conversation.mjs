// @ts-check

import { csvParam, pickConversationTarget } from "./lib/social.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["open_conversation"], reads: ["context", "agents"],
  effects: ["Starts a conversation about a trusted-feed topic with a new or existing partner selected by audience."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const isNew = ctx.params.audience === "new";
  const counted = new Set(csvParam(ctx.params, "countedPartnerAgentIds"));
  const candidateAgentIds = ctx.agents
    .filter((agent) => agent.id !== ctx.self.agentId && counted.has(agent.id) !== isNew)
    .map((agent) => agent.id);
  if (candidateAgentIds.length === 0) {
    return { kind: "blocked", reason: "no_remaining_conversation_target" };
  }
  const target = pickConversationTarget(ctx, candidateAgentIds, {
    deprioritizedAgentIds: csvParam(ctx.params, "deprioritizedAgentIds"),
  });
  if (!target) return { kind: "blocked", reason: "no_legal_social_target" };
  return {
    kind: "act",
    action: ctx.openConversation({
      intentKey: "discuss_trusted_topic",
      startReason: isNew ? "trusted_topic_new_partner" : "trusted_topic_existing_partner",
      candidateAgentIds: [target],
      topicSelection: "trusted_feed",
      excludedTopicIds: csvParam(ctx.params, "excludedTopicIds"),
      goalGroupId: null,
      removableGroupMembers: [],
      plannerObjective: "discuss_trusted_topic",
    }),
  };
}
