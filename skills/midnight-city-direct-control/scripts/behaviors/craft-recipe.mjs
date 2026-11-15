// @ts-check

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["craft"], reads: ["context", "progression"],
  effects: ["Consumes carried recipe inputs to craft recipeId for batches (default 1). The coordinator can move the agent to a usable crafting station."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const { recipeId, batches } = ctx.params;
  if (typeof recipeId !== "string" || recipeId.length === 0) {
    return { kind: "blocked", reason: "recipe_id_missing" };
  }
  const recipe = ctx.recipes.find((candidate) => candidate.recipeId === recipeId);
  if (!recipe) return { kind: "blocked", reason: "recipe_unavailable" };
  if (ctx.self.lockedByModule) return { kind: "idle" };
  if (recipe.failureReason?.includes("output quantity limit")) {
    return { kind: "blocked", reason: "recipe_output_limit_reached" };
  }
  const wanted = typeof batches === "number" && batches >= 1 ? Math.floor(batches) : 1;
  if (recipe.failureReason || recipe.craftableBatches < wanted) {
    return { kind: "idle", reason: "recipe_inputs_missing" };
  }
  return { kind: "act", action: ctx.craft(recipeId, wanted) };
}
