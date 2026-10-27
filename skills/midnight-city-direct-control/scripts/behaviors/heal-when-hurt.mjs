// @ts-check
/**
 * Use a health item when hurt, with no LLM call. Param `belowFraction`
 * (default 0.5): heal when health is below `maxHealth × belowFraction`.
 * Idle otherwise, when no health item is usable, and while an exclusive
 * module locks common actions. It never reports done, so a list can reuse it
 * (combat uses 0.5; the heal mission uses 1). Buying salves is the job of
 * `buy-salves`.
 *
 * The host fills `healthItemIds` only while hurt, so an empty list at full
 * health is normal.
 *
 * Depends only on the Ctx contract.
 */

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["use_item"], reads: ["context", "progression"],
  effects: ["Consumes a usable carried healing item when health is below maxHealth times belowFraction (default 0.5)."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  if (ctx.self.lockedByModule) return { kind: "idle" };
  const fraction = typeof ctx.params.belowFraction === "number" ? ctx.params.belowFraction : 0.5;
  const { health, maxHealth, healthItemIds } = ctx.self;
  if (!(maxHealth > 0) || health >= maxHealth * fraction || healthItemIds.length === 0) return { kind: "idle" };
  return { kind: "act", action: ctx.useItem(healthItemIds[0]) };
}
