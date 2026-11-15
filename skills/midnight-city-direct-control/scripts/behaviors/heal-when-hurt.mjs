// @ts-check

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
