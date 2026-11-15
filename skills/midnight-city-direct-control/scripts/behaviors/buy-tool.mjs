// @ts-check

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
