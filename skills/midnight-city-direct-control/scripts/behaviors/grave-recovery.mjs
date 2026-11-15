// @ts-check

const RECOVERY_SOURCES = ["grave", "office"];

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["travel_to_district", "recover_items", "move_to"], reads: ["context", "progression"],
  effects: ["Travels to recover dropped items, preferring the grave before Death's Office. Recovery can charge the crystal fee set by the coordinator."],
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
  let target = null;
  for (const source of RECOVERY_SOURCES) {
    target =
      ctx.recovery.find(
        (option) =>
          option.source === source &&
          option.items.length > 0 &&
          !(option.remainingMs != null && option.remainingMs <= 0),
      ) ?? null;
    if (target) break;
  }
  if (!target) return null;

  if (ctx.self.spaceId !== target.position.spaceId) {
    return ctx.travelToDistrict(target.position.spaceId);
  }

  if (target.failureReason == null) {
    return ctx.recoverItems(target.source);
  }

  if (
    typeof target.failureReason === "string" &&
    target.failureReason.startsWith("move within")
  ) {
    return ctx.moveTo(target.position);
  }

  return null;
}
