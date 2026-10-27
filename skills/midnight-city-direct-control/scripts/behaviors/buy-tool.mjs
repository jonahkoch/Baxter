// @ts-check
/**
 * Buy one productivity tool, with no LLM call. `params.itemId` names the tool.
 * Done when the agent owns one. Blocked when no merchant sells it for crystal,
 * or the agent cannot pay. Otherwise it buys at the cheapest offer; the trade
 * routes the agent to the merchant on its own.
 *
 * Depends only on the Ctx contract.
 */

import { toolPurchase } from "./lib/tools.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["trade"], reads: ["inventory", "merchants"],
  effects: ["May spend crystals to buy one missing tool named by itemId. The trade can cause travel to the merchant."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const itemId = ctx.params.itemId;
  if (typeof itemId !== "string" || itemId.length === 0) {
    return { kind: "blocked", reason: "tool_item_missing" };
  }
  const purchase = toolPurchase(ctx, itemId);
  if (purchase.kind === "owned") return { kind: "done" };
  if (purchase.kind === "buy") return { kind: "act", action: purchase.action };
  return purchase;
}
