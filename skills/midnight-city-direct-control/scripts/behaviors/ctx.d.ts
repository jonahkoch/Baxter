/**
 * The behavior contract. A behavior depends only on this file.
 *
 * Each host provides a `Ctx` and executes the `Action` a behavior returns:
 *   - the orchestrator (in-process world snapshot, submits via the orchestrator),
 *   - the direct-control skill (observer reads + lease), used by self-hosted
 *     agents and by the belfry devtool.
 *
 * Behaviors never import a host, a client, or the harness. They see only `Ctx`.
 */

/** One enemy the agent can see, mirrored from the coordinator capabilities. */
export interface CtxEnemy {
  enemyId: string;
  areaId: string;
  requiredLevel: number;
  health: number;
  /**
   * The tile to move to in order to reach this enemy. Set only when the agent's
   * level clears the enemy and it is available, so a non-null value means the
   * enemy is worth closing on. Null when the enemy is not currently beatable.
   */
  approachPosition?: { spaceId: string; x: number; y: number } | null;
  /** null when a melee attack is legal right now; otherwise why it is not. */
  meleeFailureReason?: string | null;
  /** null when a ranged attack is legal right now; otherwise why it is not. */
  rangedFailureReason?: string | null;
}

/** One place the agent can recover items it dropped on death. */
export interface CtxRecovery {
  /** "grave" is the death site; "office" is the paid alternative. */
  source: "grave" | "office";
  /** The tile to stand on to recover from this source. */
  position: { spaceId: string; x: number; y: number };
  /** Crystal fee charged on recovery. */
  fee: number;
  /** Time left before this recovery option lapses, or null when it does not lapse. */
  remainingMs: number | null;
  /**
   * Everything resting at this source, reported regardless of distance. This is
   * the signal that a grave is worth going to; an empty list means it is spent.
   */
  items: { itemId: string; quantity: number; unitValue: number }[];
  /**
   * The subset the agent can claim right now. The host fills this only when the
   * agent is already in range, so it is empty while travelling and is not a
   * reliable "is there a grave" signal. Use `items` for that.
   */
  recoverableItemIds: string[];
  /** null when recovery is legal right now; otherwise why it is not. */
  failureReason?: string | null;
}

/**
 * One merchant with a standing offer, as the skill `merchants` read publishes
 * it: npcs of kind `merchant` with an offer, plus merchant outlets. The offer
 * takes `acceptsQuantity` of `acceptsItemId` and pays `paysQuantity` of
 * `paysItemId`.
 */
export interface CtxMerchant {
  name: string;
  source: "npc" | "outlet";
  offer: {
    acceptsItemId: string;
    acceptsQuantity: number;
    paysItemId: string;
    paysQuantity: number;
  };
}

/**
 * One other agent, as the skill `agents` read publishes it (self excluded).
 * A host can filter or order this list before a call; see each behavior header.
 */
export interface CtxAgent {
  id: string;
  name: string;
  status: string;
  isOpenToTalk: boolean;
}

/** One social group, as the skill `social` read publishes it. Sorted by `groupId`. */
export interface CtxGroup {
  groupId: string;
  name: string;
  maxMembers: number | null;
  full: boolean;
  /** Sorted by `agentId`. */
  members: { agentId: string; name: string; isFounder: boolean }[];
}

/**
 * A request to open one conversation. The host writes and sends the text: the
 * orchestrator runs its hosted opener turn; the skill stops and prints it.
 */
export interface CtxConversationRequest {
  intentKey: string;
  startReason:
    | "trusted_topic_new_partner"
    | "trusted_topic_existing_partner"
    | "group_vacancy"
    | "group_membership";
  candidateAgentIds: string[];
  topicSelection: "none" | "trusted_feed";
  excludedTopicIds: string[];
  goalGroupId: string | null;
  removableGroupMembers: { agentId: string; name: string }[];
  plannerObjective: "discuss_trusted_topic" | "create_group_vacancy" | "request_group_membership";
}

/**
 * An action descriptor. The host adds the agent id and submits it.
 * `open_conversation` is not a coordinator action; no host submits it as one.
 */
export type Action =
  | { kind: "attack"; enemyId: string; style: "melee" | "ranged" }
  | { kind: "use_item"; itemId: string }
  | {
      kind: "move_to";
      destination: { areaId: string } | { spaceId: string; x: number; y: number };
    }
  | { kind: "travel_to_district"; districtId: string }
  | { kind: "recover_items"; source: "grave" | "office" }
  | { kind: "trade"; merchantName: string; itemId: string; quantity: number }
  | { kind: "perform_job" }
  | { kind: "gather"; sourceId: string; nodeId?: string }
  | { kind: "craft"; recipeId: string; batches: number }
  | { kind: "eat_well" }
  | {
      kind: "event_action";
      eventId: string;
      actionType: "join";
      payload: { requestedRole: "competitor" | "audience" };
    }
  | { kind: "open_conversation"; request: CtxConversationRequest };

/** Per-call behavior parameters, set by the host from the plan step or the runner spec. */
export type Params = Readonly<Record<string, string | number | boolean>>;

/** What a behavior decides for this tick. */
export type Decision =
  | { kind: "act"; action: Action }
  /** Nothing now; the next behavior in the list may try. `reason` names the wait. */
  | { kind: "idle"; reason?: string }
  /** The step is finished; the host advances the plan phase. */
  | { kind: "done" }
  /** The behavior cannot continue; the host replans with the reason. */
  | { kind: "blocked"; reason: string };

/** A skill read a behavior needs. `context` is always read by the skill runner. */
export type Read =
  | "context"
  | "progression"
  | "inventory"
  | "needs"
  | "merchants"
  | "resources"
  | "live-events"
  | "agents"
  | "social";

/**
 * One live event, as the skill `live-events` read publishes it. Sorted by
 * `eventId`. The list has every live event, joinable or not.
 */
export interface CtxEvent {
  eventId: string;
  kind: string;
  status: string;
  phase: string;
  participants: { agentId: string }[];
  rapBattle: { finalCountdownStartsAtMs: number | null; battlerAgentIds: string[] } | null;
}

/**
 * One resource node, as the skill `resources` read publishes it. The agent can
 * work it with `perform_job` when `performJobEligible` and `availableToAgent`
 * are true and `jobProfession` is the agent's profession.
 */
export interface CtxResourceNode {
  id: string;
  areaId: string;
  yieldItemId: string | null;
  jobProfession: string | null;
  performJobEligible: boolean;
  /** True when no other agent reserves the node. */
  availableToAgent: boolean;
}

/**
 * One gather source, from the skill `progression` read (`capabilities.sources`,
 * with blocked rows). `failureReason` is set when the agent's skill level is
 * too low or no node offers the source. Busy nodes are not a failure: a gather
 * then queues at the site.
 */
export interface CtxSource {
  sourceId: string;
  skill: string;
  level: number;
  requiredLevel: number;
  /** Nodes that offer the source and are free now. */
  availableNodeIds: string[];
  failureReason: string | null;
}

/**
 * One recipe the agent's level allows, from the skill `progression` read
 * (`capabilities.recipes`). A recipe above the level is not listed.
 * `craftableBatches` is the number of batches the carried inputs allow;
 * `failureReason` is set when inputs are missing.
 */
export interface CtxRecipe {
  recipeId: string;
  skill: string;
  requiredLevel: number;
  craftableBatches: number;
  failureReason: string | null;
}

/** Static declaration exported by each behavior file as `meta`. */
export interface BehaviorMeta {
  /** Action kinds this behavior may return. */
  actionKinds: readonly Action["kind"][];
  /** Skill reads this behavior needs. */
  reads: readonly Read[];
  /** Possible effects the owner must see when selecting a plan with this behavior. */
  effects: readonly string[];
}

/**
 * The read and action surface a behavior sees. Reads are plain data. Verbs are
 * pure: they build an `Action` and never execute it. This grows per behavior.
 */
export interface Ctx {
  self: {
    /** The agent's id. */
    agentId: string;
    /**
     * The id of the space the agent is currently in. For top-level districts this
     * is the district id, so a behavior can tell whether it must travel before it
     * can act. Enemy rows are area-scoped, so from another space `enemies` is empty.
     */
    spaceId: string;
    health: number;
    maxHealth: number;
    /**
     * Consumable items that restore health and are usable right now. The host
     * fills this only while hurt (health below max), so it is empty at full
     * health even when salves are carried. To count owned salves, read `inventory`.
     */
    healthItemIds: string[];
    /** Everything the agent carries, item id to quantity. */
    inventory: Record<string, number>;
    /**
     * Carry load from the skill `inventory` read. `state` is "normal" until the
     * agent carries too much; `heaviestItem` is the item that weighs most.
     */
    load: { state: "normal" | "loaded" | "overburdened"; heaviestItem: string | null };
    /**
     * Hunger from the skill `needs` read. `value` rises over time; `state` is
     * "hungry" or "starving" above the coordinator thresholds. Hunger slows work.
     */
    hunger: { state: "normal" | "hungry" | "starving"; value: number };
    /** The agent's current profession, or null when it has none. */
    profession: string | null;
    /** True while a `perform_job` work cycle runs. */
    isPerformingJob: boolean;
    /** True while an exclusive module (for example an event) locks common actions. */
    lockedByModule: boolean;
  };
  /** Parameters for this behavior call. Empty when the step gives none. */
  params: Params;
  enemies: CtxEnemy[];
  /** Merchants with a standing offer, sorted by space id, then name. */
  merchants: CtxMerchant[];
  /** Places the agent can recover dropped items. Empty unless a death is pending. */
  recovery: CtxRecovery[];
  /** Resource nodes from the skill `resources` read. */
  resourceNodes: CtxResourceNode[];
  /** Gather sources from the skill `progression` read. */
  sources: CtxSource[];
  /** Recipes the level allows, from the skill `progression` read. */
  recipes: CtxRecipe[];
  /** Live events from the skill `live-events` read. */
  events: CtxEvent[];
  /** Other agents from the skill `agents` read. */
  agents: CtxAgent[];
  /** Social groups from the skill `social` read. */
  groups: CtxGroup[];

  /** Build an attack action against one enemy with the given style. */
  attack(enemyId: string, style: "melee" | "ranged"): Action;
  /** Build a use-item action for a consumable in inventory. */
  useItem(itemId: string): Action;
  /** Build a move action to an area. */
  moveToArea(areaId: string): Action;
  /** Build a move action to a specific tile (for example an enemy's approach position). */
  moveTo(destination: { spaceId: string; x: number; y: number }): Action;
  /** Build a travel action to another district's gateway (crosses districts). */
  travelToDistrict(districtId: string): Action;
  /** Build an action to recover dropped items from a grave or office. */
  recoverItems(source: "grave" | "office"): Action;
  /**
   * Build a trade with a merchant: give `quantity` of `itemId` (a multiple of the
   * offer's accept size) and receive the merchant's output. The action routes the
   * agent to the merchant on its own.
   */
  trade(merchantName: string, itemId: string, quantity: number): Action;
  /** Build an action that starts one profession work cycle at a nearby node. */
  performJob(): Action;
  /**
   * Build a gather action for one source. Without `nodeId` the coordinator
   * chooses the node and travels to a worksite on its own.
   */
  gather(sourceId: string, nodeId?: string): Action;
  /**
   * Build a craft action for `batches` batches of one recipe. The coordinator
   * moves the agent to the nearest usable station on its own.
   */
  craft(recipeId: string, batches: number): Action;
  /** Build an action that eats the best carried food. */
  eatWell(): Action;
  /** Build an action that joins a live event with the requested role. */
  joinEvent(eventId: string, role: "competitor" | "audience"): Action;
  /** Build a request to open one conversation. The host writes the text. */
  openConversation(request: CtxConversationRequest): Action;
}

/** A behavior: one pure per-tick decision plus its static declaration. */
export interface Behavior {
  meta: BehaviorMeta;
  decide(ctx: Ctx): Decision;
}
