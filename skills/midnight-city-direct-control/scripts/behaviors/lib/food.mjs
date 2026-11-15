// @ts-check

export const EDIBLE_ITEM_IDS = /** @type {const} */ (["meat", "fish", "to_go_food", "matcha_smoothie"]);

/**
 * @param {Readonly<Record<string, number>>} inventory
 * @returns {number}
 */
export function foodQuantity(inventory) {
  return EDIBLE_ITEM_IDS.reduce((total, itemId) => total + (inventory[itemId] ?? 0), 0);
}

/**
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
