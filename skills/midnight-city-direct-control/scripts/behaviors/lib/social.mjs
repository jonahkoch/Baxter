// @ts-check

/**
 * @param {import("../ctx.js").Params} params
 * @param {string} key
 * @returns {string[]}
 */
export function csvParam(params, key) {
  const value = params[key];
  return typeof value === "string" && value !== "" ? value.split(",") : [];
}

/**
 * @param {import("../ctx.js").CtxAgent} agent
 * @returns {boolean}
 */
export function legalSocialCandidate(agent) {
  return agent.isOpenToTalk !== false && agent.status !== "sleeping";
}

/**
 * @param {import("../ctx.js").Ctx} ctx
 * @returns {import("../ctx.js").CtxGroup | null}
 */
export function goalGroup(ctx) {
  const groupId = ctx.params.groupId;
  return ctx.groups.find((group) => group.groupId === groupId) ?? null;
}

/**
 * @param {import("../ctx.js").Ctx} ctx
 * @param {readonly string[]} candidateAgentIds
 * @param {{ deprioritizedAgentIds?: readonly string[], keepOrder?: boolean }} [options]
 * @returns {string | null}
 */
export function pickConversationTarget(ctx, candidateAgentIds, options = {}) {
  const order = new Map(candidateAgentIds.map((agentId, index) => [agentId, index]));
  const deprioritized = new Set(options.deprioritizedAgentIds ?? []);
  const unavailable = new Set(csvParam(ctx.params, "unavailableAgentIds"));
  const eligible = ctx.agents
    .filter((agent) => order.has(agent.id) && agent.id !== ctx.self.agentId)
    .filter((agent) => legalSocialCandidate(agent) && !unavailable.has(agent.id))
    .sort(
      (left, right) =>
        Number(deprioritized.has(left.id)) - Number(deprioritized.has(right.id)) ||
        (options.keepOrder
          ? (order.get(left.id) ?? Number.MAX_SAFE_INTEGER) -
            (order.get(right.id) ?? Number.MAX_SAFE_INTEGER)
          : 0) ||
        left.id.localeCompare(right.id),
    );
  if (eligible.length === 0) return null;
  const attempt = Number(ctx.params.attempt ?? 0);
  return eligible[(Number.isInteger(attempt) && attempt > 0 ? attempt : 0) % eligible.length]?.id ?? null;
}

/**
 * @param {import("../ctx.js").Ctx} ctx
 * @param {readonly string[]} agentIds
 * @returns {string[]}
 */
export function inAgentOrder(ctx, agentIds) {
  const rank = new Map(ctx.agents.map((agent, index) => [agent.id, index]));
  return [...agentIds].sort(
    (left, right) =>
      (rank.get(left) ?? Number.MAX_SAFE_INTEGER) - (rank.get(right) ?? Number.MAX_SAFE_INTEGER) ||
      left.localeCompare(right),
  );
}
