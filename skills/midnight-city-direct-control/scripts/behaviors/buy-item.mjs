// @ts-check
/**
 * Buy one item for crystal, with no LLM call. Params:
 *   - `itemId`: the item to buy (required).
 *   - `quantity`: units to buy (optional, default 1).
 *
 * It uses the `crystal -> item` offer with the lowest crystal per unit (ties go
 * to the merchant name) and buys the whole batches the carried crystal pays
 * for, up to `quantity`. Idle when no merchant sells the item, when the agent
 * cannot pay for one batch, and while an exclusive module locks common
 * actions. The trade routes the agent to the merchant on its own. It never
 * reports done; the host decides when enough is carried.
 *
 * Depends only on the Ctx contract.
 */

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["trade"], reads: ["context", "inventory", "merchants"],
  effects: ["May spend crystals to buy itemId in whole merchant batches for quantity (default 1). The trade can cause travel to the merchant."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const { itemId, quantity } = ctx.params;
  if (typeof itemId !== "string" || itemId.length === 0) {
    return { kind: "blocked", reason: "item_id_missing" };
  }
  if (ctx.self.lockedByModule) return { kind: "idle" };
  const merchant = ctx.merchants
    .filter(({ offer }) =>
      offer.acceptsItemId === "crystal" && offer.paysItemId === itemId
      && offer.acceptsQuantity > 0 && offer.paysQuantity > 0)
    .sort((a, b) =>
      a.offer.acceptsQuantity * b.offer.paysQuantity - b.offer.acceptsQuantity * a.offer.paysQuantity
      || a.name.localeCompare(b.name))[0];
  if (!merchant) return { kind: "idle", reason: "item_not_sold" };
  const { acceptsQuantity, paysQuantity } = merchant.offer;
  const wanted = typeof quantity === "number" && quantity >= 1 ? quantity : 1;
  const crystal = ctx.self.inventory.crystal ?? 0;
  const batches = Math.min(Math.ceil(wanted / paysQuantity), Math.floor(crystal / acceptsQuantity));
  if (batches <= 0) return { kind: "idle", reason: "item_not_affordable" };
  return { kind: "act", action: ctx.trade(merchant.name, "crystal", batches * acceptsQuantity) };
}
