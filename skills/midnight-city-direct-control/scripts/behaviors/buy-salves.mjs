// @ts-check
/**
 * Keep the agent stocked with healing salves, with no LLM call. Returns idle
 * unless the agent has run out, so in a behavior list ahead of combat it stocks
 * up before fighting and after a full depletion, then yields.
 *
 * It buys only when the carried count hits zero, then buys up to the target in
 * one trade. Between one and the target it stays quiet, so an agent does not
 * shuttle back to the vendor after every salve it uses mid-fight.
 *
 * The vendor and price come from the `merchants` read: among the `crystal ->
 * salve` offers whose batch the agent can pay for, the one with the lowest
 * crystal per salve (ties go to the merchant name). No salve offer means idle.
 * Salve offers that the agent cannot pay for mean idle with the reason
 * `salve_not_affordable`, so a later behavior in the list can still act.
 * `quantity` is crystal spent and must be a multiple of the offer's accept
 * size, so it buys enough whole batches to reach the target, or as many as the
 * agent can pay for. The trade routes the agent to the vendor on its own.
 *
 * Gate on `inventory`, not `healthItemIds`: the host reports healthItemIds only
 * while hurt, so it is empty at full health even when salves are carried.
 *
 * Param `count` (default 5): salves to buy when the agent has none.
 *
 * Depends only on the Ctx contract.
 */

const SALVE_ITEM_ID = "aegis_reagent_salve";
const DEFAULT_COUNT = 5; // salves to hold before fighting

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
      || a.name.localeCompare(b.name))[0];
  if (!merchant) return offers.length > 0 ? { kind: "idle", reason: "salve_not_affordable" } : { kind: "idle" };
  const { acceptsQuantity, paysQuantity } = merchant.offer;
  const count = typeof ctx.params.count === "number" && ctx.params.count > 0 ? ctx.params.count : DEFAULT_COUNT;
  const batches = Math.min(Math.ceil(count / paysQuantity), Math.floor(crystal / acceptsQuantity));
  return { kind: "act", action: ctx.trade(merchant.name, "crystal", batches * acceptsQuantity) };
}
