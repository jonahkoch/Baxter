/** The event fields the shared event rules read (the observer `live-events` item). */
export interface JoinableEvent {
  kind: string;
  status: string;
  phase: string;
  participants: ReadonlyArray<{ agentId: string }>;
  rapBattle?: {
    finalCountdownStartsAtMs?: number | null;
    battlerAgentIds: readonly string[];
  } | null;
}

export function eventAcceptsCompetitor(event: JoinableEvent, agentId: string): boolean;

export function eventReputationDomains(event: { kind: string }): string[];
