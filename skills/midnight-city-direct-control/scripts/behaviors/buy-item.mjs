// @ts-check

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
      || merchantTieRank(ctx, a) - merchantTieRank(ctx, b)
      || a.name.localeCompare(b.name))[0];
  if (!merchant) return { kind: "idle", reason: "item_not_sold" };
  const { acceptsQuantity, paysQuantity } = merchant.offer;
  const wanted = typeof quantity === "number" && quantity >= 1 ? quantity : 1;
  const crystal = ctx.self.inventory.crystal ?? 0;
  const batches = Math.min(Math.ceil(wanted / paysQuantity), Math.floor(crystal / acceptsQuantity));
  if (batches <= 0) return { kind: "idle", reason: "item_not_affordable" };
  return { kind: "act", action: ctx.trade(merchant.name, "crystal", batches * acceptsQuantity) };
}

/** Same price: the agent's space, then a Central shop, then the name. */
function merchantTieRank(ctx, merchant) {
  if (merchant.spaceId === ctx.self.spaceId) return 0;
  return merchant.name.startsWith("Central ") ? 1 : 2;
}
