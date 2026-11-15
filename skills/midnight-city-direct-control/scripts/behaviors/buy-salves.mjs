// @ts-check

const SALVE_ITEM_ID = "aegis_reagent_salve";
const DEFAULT_COUNT = 5;

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["trade"], reads: ["inventory", "merchants"],
  effects: ["May spend crystals to buy healing salves when none are carried, in whole batches toward count (default 5), limited by available crystals. The trade can cause travel to the merchant."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const owned = ctx.self.inventory[SALVE_ITEM_ID] ?? 0;
  if (owned > 0) return { kind: "idle" };
  const crystal = ctx.self.inventory.crystal ?? 0;
  const offers = ctx.merchants.filter(({ offer }) =>
    offer.acceptsItemId === "crystal" && offer.paysItemId === SALVE_ITEM_ID
    && offer.acceptsQuantity > 0 && offer.paysQuantity > 0);
  const merchant = offers
    .filter(({ offer }) => crystal >= offer.acceptsQuantity)
    .sort((a, b) =>
      a.offer.acceptsQuantity * b.offer.paysQuantity - b.offer.acceptsQuantity * a.offer.paysQuantity
      || merchantTieRank(ctx, a) - merchantTieRank(ctx, b)
      || a.name.localeCompare(b.name))[0];
  if (!merchant) return offers.length > 0 ? { kind: "idle", reason: "salve_not_affordable" } : { kind: "idle" };
  const { acceptsQuantity, paysQuantity } = merchant.offer;
  const count = typeof ctx.params.count === "number" && ctx.params.count > 0 ? ctx.params.count : DEFAULT_COUNT;
  const batches = Math.min(Math.ceil(count / paysQuantity), Math.floor(crystal / acceptsQuantity));
  return { kind: "act", action: ctx.trade(merchant.name, "crystal", batches * acceptsQuantity) };
}

/** Same price: the agent's space, then a Central shop, then the name. */
function merchantTieRank(ctx, merchant) {
  if (merchant.spaceId === ctx.self.spaceId) return 0;
  return merchant.name.startsWith("Central ") ? 1 : 2;
}
