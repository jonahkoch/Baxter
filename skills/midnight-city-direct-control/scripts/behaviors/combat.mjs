// @ts-check

const ENEMY_DISTRICT_ID = "forest-rivers";

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
  const style = "melee";

  if (ctx.self.spaceId !== ENEMY_DISTRICT_ID) {
    return { kind: "act", action: ctx.travelToDistrict(ENEMY_DISTRICT_ID) };
  }

  // The host picks one target per agent so that agents spread across enemies.
  const assigned = ctx.enemies.find((enemy) => enemy.enemyId === ctx.params.targetEnemyId);
  if (assigned) {
    if (assigned.meleeFailureReason == null) {
      return { kind: "act", action: ctx.attack(assigned.enemyId, style) };
    }
    if (assigned.approachPosition && assigned.meleeFailureReason.startsWith("move within")) {
      return { kind: "act", action: ctx.moveTo(assigned.approachPosition) };
    }
  }

  const target = ctx.enemies.find(
    (enemy) =>
      (style === "ranged" ? enemy.rangedFailureReason : enemy.meleeFailureReason) == null,
  );
  if (target) return { kind: "act", action: ctx.attack(target.enemyId, style) };

  const reachable = ctx.enemies.find(
    (enemy) =>
      enemy.approachPosition != null &&
      typeof enemy.meleeFailureReason === "string" &&
      enemy.meleeFailureReason.startsWith("move within"),
  );
  if (reachable && reachable.approachPosition) {
    return { kind: "act", action: ctx.moveTo(reachable.approachPosition) };
  }

  // 4. The coordinator puts the crystal minimum before any other block, on every
  //    enemy row, since it depends only on the agent. So the first row shows it.
  const reason = ctx.enemies[0]?.meleeFailureReason;
  if (typeof reason === "string" && reason.startsWith(CRYSTAL_MINIMUM_REASON)) {
    return { kind: "blocked", reason };
  }

  // 5. Nothing available now (level, cooldown, or no enemy); yield to the next
  //    behavior rather than travelling back and forth.
  return { kind: "idle" };
}
