// @ts-check
/**
 * Shared food rule: which items are edible and how much of one item an agent
 * may sell while it keeps a food reserve. Depends on nothing.
 */

export const EDIBLE_ITEM_IDS = /** @type {const} */ (["meat", "fish", "to_go_food", "matcha_smoothie"]);

/**
 * Total edible units carried.
 *
 * @param {Readonly<Record<string, number>>} inventory
 * @returns {number}
 */
export function foodQuantity(inventory) {
  return EDIBLE_ITEM_IDS.reduce((total, itemId) => total + (inventory[itemId] ?? 0), 0);
}

/**
 * Units of `itemId` the agent may sell. For an edible item, keep at least
 * `minimumFood` edible units in total.
 *
 * @param {Readonly<Record<string, number>>} inventory
 * @param {string} itemId
 * @param {number} minimumFood
 * @returns {number}
 */
export function sellableQuantity(inventory, itemId, minimumFood) {
  const owned = inventory[itemId] ?? 0;
  return /** @type {readonly string[]} */ (EDIBLE_ITEM_IDS).includes(itemId)
    ? Math.max(0, Math.min(owned, foodQuantity(inventory) - minimumFood))
    : owned;
}
