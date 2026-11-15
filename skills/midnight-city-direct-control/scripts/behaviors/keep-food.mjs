// @ts-check

import { EDIBLE_ITEM_IDS, foodQuantity } from "./lib/food.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["eat_well"], reads: ["context", "needs", "inventory", "merchants"],
  effects: ["May spend crystals on a meal when hungry or starving and carried food is below minimumFood, if the agent can pay for some food. eat_well eats carried food, or buys the meal at the nearest food seller and eats it there; buying can cause travel to that seller."],
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
  if (ctx.self.hunger.state === "normal") return null;
  const inventory = ctx.self.inventory;
  const carried = foodQuantity(inventory);
  if (carried >= minimumFood) return null;
  const crystal = inventory.crystal ?? 0;
  const edible = /** @type {readonly string[]} */ (EDIBLE_ITEM_IDS);
  const canBuy = ctx.merchants.some(({ offer }) =>
    offer.acceptsItemId === "crystal" && offer.acceptsQuantity > 0 && offer.paysQuantity > 0
    && edible.includes(offer.paysItemId) && crystal >= offer.acceptsQuantity);
  return carried > 0 || canBuy ? ctx.eatWell() : null;
}
