// @ts-check

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
