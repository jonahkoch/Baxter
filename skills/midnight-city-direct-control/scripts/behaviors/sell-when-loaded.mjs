// @ts-check
/**
 * Sell carried items for crystal, with no LLM call. The trade routes the
 * agent to the merchant on its own.
 *
 * - When the load is `loaded` or `overburdened`, sell whole batches of the
 *   heaviest carried item.
 * - With the optional param `crystalTarget`, also sell before the agent is
 *   loaded: the first carried item (by item id) whose whole batches pay the
 *   rest of the target is sold. Food is never sold for the target, so that
 *   `keep-food` does not buy it back.
 *
 * Idle when no rule applies, when no merchant buys the item for crystal, or
 * when less than one whole batch is on hand.
 *
 * Depends only on the Ctx contract.
 */

import { EDIBLE_ITEM_IDS } from "./lib/food.mjs";
import { crystalSaleOffer, sellBatches } from "./lib/sell.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["trade"], reads: ["inventory", "merchants"],
  effects: [
    "May sell all whole batches of the heaviest carried item for crystal when loaded or overburdened, including food and inventory unrelated to the gathered resource.",
    "With crystalTarget, may sell all whole batches of a carried non-food item before loaded when its sale can cover the remaining target. The trade can cause travel to the merchant.",
  ],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const { load, inventory } = ctx.self;
  if (load.state !== "normal" && load.heaviestItem) {
    const itemId = load.heaviestItem;
    const action = sellBatches(ctx, itemId, inventory[itemId] ?? 0);
    if (action) return { kind: "act", action };
  }
  const target = ctx.params.crystalTarget;
  if (typeof target !== "number" || !Number.isFinite(target)) return { kind: "idle" };
  const gap = target - (inventory.crystal ?? 0);
  if (gap <= 0) return { kind: "idle" };
  const edible = /** @type {readonly string[]} */ (EDIBLE_ITEM_IDS);
  const itemIds = Object.keys(inventory)
    .filter((itemId) => itemId !== "crystal" && !edible.includes(itemId))
    .sort();
  for (const itemId of itemIds) {
    const sale = crystalSaleOffer(ctx, itemId);
    if (!sale) continue;
    const quantity = inventory[itemId] ?? 0;
    const batches = Math.ceil(gap / sale.offer.paysQuantity);
    if (quantity < batches * sale.offer.acceptsQuantity) continue;
    const action = sellBatches(ctx, itemId, quantity);
    if (action) return { kind: "act", action };
  }
  return { kind: "idle" };
}
