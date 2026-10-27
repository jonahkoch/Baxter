// @ts-check
/**
 * Keep a food reserve, with no LLM call. When the agent carries fewer edible
 * units than `params.minimumFood`, buy food for crystal at the merchant with
 * the lowest crystal cost per unit that the agent can pay. Idle when the
 * reserve is full, when no param is set, when no merchant is affordable, and
 * while an exclusive module locks common actions. The trade routes the agent
 * to the merchant on its own.
 *
 * Depends only on the Ctx contract.
 */

import { EDIBLE_ITEM_IDS, foodQuantity } from "./lib/food.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["trade"], reads: ["context", "inventory", "merchants"],
  effects: ["May spend crystals to buy food in whole batches when carried food is below minimumFood, limited by available crystals. The trade can cause travel to the merchant."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const action = nextAction(ctx);
  return action ? { kind: "act", action } : { kind: "idle" };
}

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Action | null}
 */
function nextAction(ctx) {
  if (ctx.self.lockedByModule) return null;
  const minimumFood = ctx.params.minimumFood;
  if (typeof minimumFood !== "number" || !(minimumFood > 0)) return null;
  const inventory = ctx.self.inventory;
  const missing = minimumFood - foodQuantity(inventory);
  if (missing <= 0) return null;
  const crystal = inventory.crystal ?? 0;
  const edible = /** @type {readonly string[]} */ (EDIBLE_ITEM_IDS);
  // Stable sort: equal unit prices keep the Ctx merchant order.
  const merchant = ctx.merchants
    .filter(({ offer }) =>
      offer.acceptsItemId === "crystal" && offer.acceptsQuantity > 0 && offer.paysQuantity > 0
      && edible.includes(offer.paysItemId) && crystal >= offer.acceptsQuantity)
    .sort((a, b) => a.offer.acceptsQuantity / a.offer.paysQuantity - b.offer.acceptsQuantity / b.offer.paysQuantity)[0];
  if (!merchant) return null;
  const { acceptsQuantity, paysQuantity } = merchant.offer;
  const batches = Math.min(Math.ceil(missing / paysQuantity), Math.floor(crystal / acceptsQuantity));
  return ctx.trade(merchant.name, "crystal", batches * acceptsQuantity);
}
