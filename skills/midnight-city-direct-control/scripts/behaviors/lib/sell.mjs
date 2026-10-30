// @ts-check
/**
 * Shared sell rule: sell whole batches of one item for crystal.
 * Depends only on the Ctx contract.
 */

/**
 * Build a trade that sells whole batches of `quantity` units of `itemId` at the
 * best `itemId -> crystal` offer (most crystal per unit; ties go to the merchant
 * name). Null when no merchant buys the item or less than one batch is on hand.
 *
 * @param {import("../ctx.js").Ctx} ctx
 * @param {string} itemId
 * @param {number} quantity  Units the agent may sell.
 * @returns {import("../ctx.js").Action | null}
 */
export function sellBatches(ctx, itemId, quantity) {
  const offer = crystalSaleOffer(ctx, itemId);
  if (!offer) return null;
  const batch = offer.offer.acceptsQuantity;
  const sell = Math.floor(quantity / batch) * batch;
  return sell > 0 ? ctx.trade(offer.name, itemId, sell) : null;
}

/**
 * The best merchant that buys `itemId` for crystal, or null.
 *
 * @param {import("../ctx.js").Ctx} ctx
 * @param {string} itemId
 * @returns {import("../ctx.js").CtxMerchant | null}
 */
export function crystalSaleOffer(ctx, itemId) {
  return (
    ctx.merchants
      .filter(
        (merchant) =>
          merchant.offer.acceptsItemId === itemId &&
          merchant.offer.paysItemId === "crystal" &&
          merchant.offer.acceptsQuantity > 0 &&
          merchant.offer.paysQuantity > 0,
      )
      .sort(
        (left, right) =>
          right.offer.paysQuantity / right.offer.acceptsQuantity -
            left.offer.paysQuantity / left.offer.acceptsQuantity ||
          left.name.localeCompare(right.name),
      )[0] ?? null
  );
}
