// @ts-check
/**
 * Skill-backed Ctx builder.
 *
 * Turns the skill reads a behavior declares in `meta.reads` into a `Ctx`. The
 * skill's behavior runner (`mcity-behavior.mjs`) calls this per behavior each
 * tick, then submits the `Action` of an `act` decision through the skill
 * client. Behaviors never import this file.
 */

/**
 * @param {{ context?: any, progression?: any, inventory?: any, needs?: any, merchants?: any, resources?: any, "live-events"?: any, agents?: any, social?: any }} data  The skill
 *   reads for this tick, keyed by `meta.reads` name. `context` gives the space
 *   id, profession, and job state; `resources` gives the resource nodes; `progression.capabilities` gives health, enemies, gather sources, recipes, and death recovery;
 *   `inventory` gives carried items (the item map directly or wrapped) and
 *   the carry `load`; `needs` gives the hunger;
 *   `merchants` is the global `/api/skill/merchants` read; `live-events` gives
 *   the live events; `agents` gives the other agents; `social` gives the groups.
 * @param {Record<string, string | number | boolean>} params  Params for this call.
 * @returns {import("./ctx.js").Ctx}
 */
export function buildSkillCtx(data, params = {}) {
  const caps = data.progression?.capabilities ?? {};
  const rawInventory = data.inventory;
  const inventory = rawInventory?.items ?? rawInventory?.inventory ?? rawInventory ?? {};
  return {
    self: {
      agentId: String(data.context?.agent?.id ?? ""),
      spaceId: String(data.context?.agent?.position?.spaceId ?? ""),
      health: Number(caps.health ?? 0),
      maxHealth: Number(caps.maxHealth ?? 0),
      healthItemIds: Array.isArray(caps.healthItemIds) ? caps.healthItemIds : [],
      inventory: inventory && typeof inventory === "object" ? { ...inventory } : {},
      load: {
        state: ["loaded", "overburdened"].includes(rawInventory?.load?.state)
          ? rawInventory.load.state
          : "normal",
        heaviestItem:
          typeof rawInventory?.load?.heaviestItem === "string"
            ? rawInventory.load.heaviestItem
            : null,
      },
      hunger: {
        state: ["hungry", "starving"].includes(data.needs?.hunger?.state)
          ? data.needs.hunger.state
          : "normal",
        value: Number(data.needs?.hunger?.value ?? 0),
      },
      profession:
        typeof data.context?.agent?.profession === "string" ? data.context.agent.profession : null,
      isPerformingJob: data.context?.agent?.isPerformingJob === true,
      lockedByModule: data.context?.agent?.activeModule?.locksCommonActions === true,
    },
    params: { ...params },
    merchants: Array.isArray(data.merchants?.merchants)
      ? data.merchants.merchants.flatMap((merchant) =>
          merchant?.offer
            ? [
                {
                  name: String(merchant.name),
                  source: merchant.source === "outlet" ? "outlet" : "npc",
                  offer: {
                    acceptsItemId: String(merchant.offer.acceptsItemId),
                    acceptsQuantity: Number(merchant.offer.acceptsQuantity),
                    paysItemId: String(merchant.offer.paysItemId),
                    paysQuantity: Number(merchant.offer.paysQuantity),
                  },
                },
              ]
            : [],
        )
      : [],
    enemies: Array.isArray(caps.enemies) ? caps.enemies : [],
    recovery: Array.isArray(caps.death?.recovery) ? caps.death.recovery : [],
    resourceNodes: Array.isArray(data.resources?.resources)
      ? data.resources.resources.map((node) => ({
          id: String(node?.id ?? ""),
          areaId: String(node?.areaId ?? ""),
          yieldItemId: typeof node?.yieldItemId === "string" ? node.yieldItemId : null,
          jobProfession: typeof node?.jobProfession === "string" ? node.jobProfession : null,
          performJobEligible: node?.performJobEligible === true,
          availableToAgent: node?.availableToAgent === true,
        }))
      : [],
    sources: Array.isArray(caps.sources)
      ? caps.sources.map((source) => ({
          sourceId: String(source?.sourceId ?? ""),
          skill: String(source?.skill ?? ""),
          level: Number(source?.level ?? 0),
          requiredLevel: Number(source?.requiredLevel ?? 0),
          availableNodeIds: Array.isArray(source?.availableNodeIds)
            ? source.availableNodeIds.map(String)
            : [],
          failureReason: typeof source?.failureReason === "string" ? source.failureReason : null,
        }))
      : [],
    recipes: Array.isArray(caps.recipes)
      ? caps.recipes.map((recipe) => ({
          recipeId: String(recipe?.recipeId ?? ""),
          skill: String(recipe?.skill ?? ""),
          requiredLevel: Number(recipe?.requiredLevel ?? 0),
          craftableBatches: Number(recipe?.craftableBatches ?? 0),
          failureReason: typeof recipe?.failureReason === "string" ? recipe.failureReason : null,
        }))
      : [],
    events: Array.isArray(data["live-events"]?.liveEvents)
      ? data["live-events"].liveEvents.map((event) => ({
          eventId: String(event?.eventId ?? ""),
          kind: String(event?.kind ?? ""),
          status: String(event?.status ?? ""),
          phase: String(event?.phase ?? ""),
          participants: Array.isArray(event?.participants)
            ? event.participants.map((participant) => ({ agentId: String(participant?.agentId ?? "") }))
            : [],
          rapBattle:
            event?.rapBattle && typeof event.rapBattle === "object"
              ? {
                  finalCountdownStartsAtMs:
                    typeof event.rapBattle.finalCountdownStartsAtMs === "number"
                      ? event.rapBattle.finalCountdownStartsAtMs
                      : null,
                  battlerAgentIds: Array.isArray(event.rapBattle.battlerAgentIds)
                    ? event.rapBattle.battlerAgentIds.map(String)
                    : [],
                }
              : null,
        }))
      : [],
    agents: Array.isArray(data.agents?.agents)
      ? data.agents.agents.map((agent) => ({
          id: String(agent?.id ?? ""),
          name: String(agent?.name ?? agent?.id ?? ""),
          status: String(agent?.status ?? ""),
          isOpenToTalk: agent?.isOpenToTalk !== false,
        }))
      : [],
    // `agentGroup` is the agent's own group; `groups` holds the requested ones.
    groups: [data.social?.agentGroup, ...(Array.isArray(data.social?.groups) ? data.social.groups : [])]
      .filter((group, index, all) => group && all.findIndex((other) => other?.groupId === group.groupId) === index)
      .map((group) => ({
          groupId: String(group?.groupId ?? ""),
          name: String(group?.name ?? ""),
          maxMembers: typeof group?.maxMembers === "number" ? group.maxMembers : null,
          full: group?.full === true,
          members: Array.isArray(group?.members)
            ? group.members.map((member) => ({
                agentId: String(member?.agentId ?? ""),
                name: String(member?.name ?? member?.agentId ?? ""),
                isFounder: member?.isFounder === true,
              }))
            : [],
        })),
    attack: (enemyId, style) => ({ kind: "attack", enemyId, style }),
    useItem: (itemId) => ({ kind: "use_item", itemId }),
    moveToArea: (areaId) => ({ kind: "move_to", destination: { areaId } }),
    moveTo: (destination) => ({ kind: "move_to", destination }),
    travelToDistrict: (districtId) => ({ kind: "travel_to_district", districtId }),
    recoverItems: (source) => ({ kind: "recover_items", source }),
    trade: (merchantName, itemId, quantity) => ({
      kind: "trade",
      merchantName,
      itemId,
      quantity,
    }),
    performJob: () => ({ kind: "perform_job" }),
    gather: (sourceId, nodeId) => ({ kind: "gather", sourceId, ...(nodeId ? { nodeId } : {}) }),
    craft: (recipeId, batches) => ({ kind: "craft", recipeId, batches }),
    eatWell: () => ({ kind: "eat_well" }),
    joinEvent: (eventId, role) => ({
      kind: "event_action",
      eventId,
      actionType: "join",
      payload: { requestedRole: role },
    }),
    openConversation: (request) => ({ kind: "open_conversation", request }),
  };
}
