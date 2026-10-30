// @ts-check
/**
 * Recover items dropped on death, with no LLM call. Returns idle unless a
 * recovery source with items is pending, so in a behavior list it preempts
 * lower priority behaviors (for example combat) only while items are waiting,
 * and yields the rest of the time.
 *
 * It claims from the grave first, then from Death's Office. A grave lapses after
 * a while and its contents move to the office, so the two are usually not both
 * present; when they are, the grave is cheaper and nearer, so it goes first.
 *
 * Priority each tick, for the chosen source:
 *   1. travel to the source's district when the agent is somewhere else,
 *   2. recover when standing in range,
 *   3. otherwise close on the source when blocked only by distance,
 *   4. otherwise return idle (nothing waiting, it lapsed, or a non-distance
 *      block such as a fee the agent cannot pay, which moving cannot fix).
 *
 * Depends only on the Ctx contract.
 */

/** Recovery sources in priority order. Grave first: cheaper and usually nearer. */
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
  // Pick the highest-priority source that still has items. Use `items` (reported
  // regardless of distance), not `recoverableItemIds`, which the host fills only
  // in range and so is empty while travelling.
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

  // 1. Travel to the source's district first when somewhere else.
  if (ctx.self.spaceId !== target.position.spaceId) {
    return ctx.travelToDistrict(target.position.spaceId);
  }

  // 2. Recover when the coordinator reports no blocker.
  if (target.failureReason == null) {
    return ctx.recoverItems(target.source);
  }

  // 3. Close on the source when blocked only by distance. Other blocks (for
  //    example a fee) are not solved by moving, so we yield.
  if (
    typeof target.failureReason === "string" &&
    target.failureReason.startsWith("move within")
  ) {
    return ctx.moveTo(target.position);
  }

  // 4. Nothing we can do toward recovery this tick; yield to the next behavior.
  return null;
}
