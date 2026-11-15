// @ts-check

/**
 * @param {import("../ctx.js").Ctx} ctx
 * @param {string} itemId
 * @param {number} quantity
 * @returns {import("../ctx.js").Action | null}
 */
export function sellBatches(ctx, itemId, quantity) {
  const offer = crystalSaleOffer(ctx, itemId);
  if (!offer) return null;
  const batch = offer.offer.acceptsQuantity;
  const sell = Math.floor(quantity / batch) * batch;
  return sell > 0 ? ctx.tradeNearest(itemId, "crystal", sell) : null;
}

/**
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
