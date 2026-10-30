// @ts-check
/**
 * Eat carried food when hungry, with no LLM call. The coordinator does not
 * eat for the agent, and hunger slows work. Idle while hunger is normal, when
 * no edible food is carried, and while an exclusive module locks common
 * actions. Buying food is the job of `keep-food`; list it after this behavior.
 *
 * Depends only on the Ctx contract.
 */

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
