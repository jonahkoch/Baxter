// @ts-check
/**
 * Gather one source, with no LLM call. Gather is gated by skill level, not by
 * profession. Params:
 *   - `sourceId`: the source to gather (required).
 *   - `areaId`: optional; gather at a free node for the source in this area.
 *     Without it, the coordinator chooses the node and travels on its own.
 *   - `toolItemIds`: optional comma list of tools to keep. A missing tool is
 *     bought when the agent can pay; else the agent gathers without it.
 *
 * Order: check the source, wait while a job runs, buy a missing tool, choose a
 * node in the area, else gather. It never reports done; the host stops on its
 * progress target.
 *
 * Depends only on the Ctx contract.
 */

import { toolPurchase } from "./lib/tools.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["gather", "trade"],
  reads: ["context", "progression", "inventory", "merchants", "resources"],
  effects: [
    "Gathers sourceId at a free node, restricted to areaId when supplied. The coordinator can move the agent to the source.",
    "May spend crystals to buy or replace a missing tool listed in toolItemIds before gathering. The trade can cause travel to the merchant; gathers without that tool when it cannot be bought.",
  ],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const { sourceId, areaId, toolItemIds } = ctx.params;
  if (typeof sourceId !== "string" || sourceId.length === 0) {
    return { kind: "blocked", reason: "source_id_missing" };
  }
  const source = ctx.sources.find((candidate) => candidate.sourceId === sourceId);
  if (!source || source.failureReason) {
    return { kind: "blocked", reason: "gather_source_unavailable" };
  }
  if (ctx.self.isPerformingJob) return { kind: "idle" };
  const tools = typeof toolItemIds === "string" ? toolItemIds.split(",").filter(Boolean) : [];
  for (const toolItemId of tools) {
    const purchase = toolPurchase(ctx, toolItemId);
    // A tool only speeds up work. When it cannot be bought, gather without it.
    if (purchase.kind === "buy") return { kind: "act", action: purchase.action };
  }
  if (typeof areaId !== "string" || areaId.length === 0) {
    return { kind: "act", action: ctx.gather(sourceId) };
  }
  // Capability order decides, so both hosts choose the same node.
  const nodeId = source.availableNodeIds.find((id) =>
    ctx.resourceNodes.some(
      (node) => node.id === id && node.areaId === areaId && node.availableToAgent,
    ),
  );
  return nodeId ? { kind: "act", action: ctx.gather(sourceId, nodeId) } : { kind: "idle" };
}
