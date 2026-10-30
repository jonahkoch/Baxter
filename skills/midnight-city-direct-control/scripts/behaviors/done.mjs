// @ts-check
/**
 * Always report done. Put it last in a mission list: the mission ends when no
 * earlier behaviour acts. Work behaviours stay reusable and never report done.
 *
 * Depends only on the Ctx contract.
 */

/** @type {import("./ctx.js").BehaviorMeta} */
export const meta = {
  actionKinds: [], reads: [],
  effects: ["Reports completion without a coordinator action."],
};

/**
 * @returns {import("./ctx.js").Decision}
 */
export function decide() {
  return { kind: "done" };
}
