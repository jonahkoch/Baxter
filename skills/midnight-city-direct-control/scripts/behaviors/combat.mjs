// @ts-check
/**
 * Fight enemies with no LLM call. Returns idle when it cannot act toward a fight
 * right now, so a runner choosing among several behaviors can fall through to the
 * next one.
 *
 * Priority each tick:
 *   1. travel to the enemies' district when the agent is somewhere else,
 *   2. attack an enemy the chosen style can hit right now,
 *   3. otherwise close on an enemy blocked only by distance (its approach position),
 *   4. otherwise stop with `blocked` when the coordinator's crystal minimum blocks
 *      every enemy, since moving or waiting cannot fix it,
 *   5. otherwise return idle (blocked by level or cooldown, or none present).
 *
 * Healing is the job of `heal-when-hurt`; list it before this behavior.
 *
 * Depends only on the Ctx contract. Melee-only for now; ranged is a later switch.
 *
 * Enemy rows are area-scoped: from any other district the enemy list is empty, so
 * the behavior must travel to where the enemies live before it can fight. It is
 * re-run every tick, so it re-issues the travel whenever it finds itself out of
 * position (for example after a respawn), which keeps it stable if the agent moves.
 */

/**
 * The district that holds the enemies this behavior fights (the Amoeba Wilds).
 * A constant because no public skill read names enemy districts: `areas` and
 * `navigation-options` carry no enemy data, and enemy rows list only the current area.
 */
const ENEMY_DISTRICT_ID = "forest-rivers";

/** Start of the coordinator's failure reason for the combat crystal minimum. */
const CRYSTAL_MINIMUM_REASON = "combat requires at least";

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: ["travel_to_district", "attack", "move_to"], reads: ["context", "progression"],
  effects: ["Travels to the Amoeba Wilds, moves within reach of enemies, and attacks available enemies in melee combat."],
};

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Decision}
 */
export function decide(ctx) {
  const action = nextAction(ctx);
  if (action) return { kind: "act", action };
  // 4. The coordinator reports the crystal minimum before any other block, and
  //    with the same text for every enemy, since it depends only on the agent.
  const reason = ctx.enemies[0]?.meleeFailureReason;
  const crystalBlocked = typeof reason === "string" && reason.startsWith(CRYSTAL_MINIMUM_REASON)
    && ctx.enemies.every((enemy) => enemy.meleeFailureReason === reason);
  return crystalBlocked ? { kind: "blocked", reason } : { kind: "idle" };
}

/**
 * @param {import("./ctx.js").Ctx} ctx
 * @returns {import("./ctx.js").Action | null}
 */
function nextAction(ctx) {
  const style = "melee";
  const { spaceId } = ctx.self;

  // 1. Travel to the enemies' district when not already there. Their capability
  //    rows are area-scoped, so there is nothing to fight until we arrive.
  if (spaceId !== ENEMY_DISTRICT_ID) {
    return ctx.travelToDistrict(ENEMY_DISTRICT_ID);
  }

  // 2. Attack an enemy the chosen style can hit now.
  const target = ctx.enemies.find(
    (enemy) =>
      (style === "ranged" ? enemy.rangedFailureReason : enemy.meleeFailureReason) == null,
  );
  if (target) return ctx.attack(target.enemyId, style);

  // 3. Close on an enemy blocked only by distance. Other blocks (level, crystal,
  //    cooldown) are not solved by moving, so we do not approach for them.
  const reachable = ctx.enemies.find(
    (enemy) =>
      enemy.approachPosition != null &&
      typeof enemy.meleeFailureReason === "string" &&
      enemy.meleeFailureReason.startsWith("move within"),
  );
  if (reachable && reachable.approachPosition) {
    return ctx.moveTo(reachable.approachPosition);
  }

  // In the district but nothing available (crystal, cooldown, etc.); decide()
  // separates the crystal minimum from blocks that can pass.
  return null;
}
