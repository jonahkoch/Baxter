// @ts-check

/**
 * @param {import("../ctx.js").Ctx} ctx
 * @param {string} itemId
 * @returns {{ kind: "owned" } | { kind: "buy", action: import("../ctx.js").Action } | { kind: "blocked", reason: string }}
 */
export function toolPurchase(ctx, itemId) {
  if ((ctx.self.inventory[itemId] ?? 0) > 0) return { kind: "owned" };
  const offer = ctx.merchants
    .filter(
      (merchant) =>
        merchant.offer.acceptsItemId === "crystal" &&
        merchant.offer.paysItemId === itemId &&
        merchant.offer.paysQuantity === 1 &&
        merchant.offer.acceptsQuantity > 0,
    )
    .sort(
      (left, right) =>
        left.offer.acceptsQuantity - right.offer.acceptsQuantity ||
        merchantTieRank(ctx, left) - merchantTieRank(ctx, right) ||
        left.name.localeCompare(right.name),
    )[0];
  if (!offer) return { kind: "blocked", reason: "tool_offer_missing" };
  const price = offer.offer.acceptsQuantity;
  if ((ctx.self.inventory.crystal ?? 0) < price) {
    return { kind: "blocked", reason: "tool_not_affordable" };
  }
  return { kind: "buy", action: ctx.trade(offer.name, "crystal", price) };
}

/** Same price: the agent's space, then a Central shop, then the name. */
function merchantTieRank(ctx, merchant) {
  if (merchant.spaceId === ctx.self.spaceId) return 0;
  return merchant.name.startsWith("Central ") ? 1 : 2;
}
