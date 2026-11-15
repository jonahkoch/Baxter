// @ts-check

import { foodQuantity } from "./lib/food.mjs";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["eat_well"], reads: ["context", "needs", "inventory"],
  effects: ["Consumes carried food when hungry or starving."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  if (ctx.self.lockedByModule) return { kind: "idle" };
  if (ctx.self.hunger.state === "normal") return { kind: "idle" };
  if (foodQuantity(ctx.self.inventory) <= 0) return { kind: "idle" };
  return { kind: "act", action: ctx.eatWell() };
}
