// Reads one coordinator-owned leaderboard. No control session or API token is needed.
export async function readLeaderboard(command, args, { observerUrl, agentId }) {
  const rankOnly = command === "rank";
  if (args.length > (rankOnly ? 2 : 1) || args.some((value) => !value.trim() || value.startsWith("--"))) {
    throw new Error(`usage: ${command} [board]${rankOnly ? " [agentId]" : ""}`);
  }
  if (!observerUrl) throw new Error("missing required config: MCITY_OBSERVER_URL");
  const board = args[0]?.trim() ?? "experience";
  const requestedAgentId = rankOnly ? (args[1] ?? agentId)?.trim() : null;
  if (rankOnly && !requestedAgentId) throw new Error("rank requires an agentId; pass one or set MCITY_AGENT_ID");
  if (requestedAgentId?.includes(",")) throw new Error("provide one agentId");
  const params = new URLSearchParams({ board });
  if (requestedAgentId) params.set("agentId", requestedAgentId);
  const response = await fetch(`${observerUrl.replace(/\/$/, "")}/api/leaderboards?${params}`, {
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    const hint = response.status === 400 ? " Use a board ID from availableBoards." : "";
    throw new Error(`${command} failed: HTTP ${response.status}.${hint}`);
  }
  const result = await response.json();
  const validView = rankOnly
    ? result?.agentId === requestedAgentId && ["ranked", "unranked"].includes(result.status)
      && ["entry", "previous", "next"].every((key) => Object.hasOwn(result, key))
    : Array.isArray(result?.entries);
  if (result?.board !== board || !validView) {
    throw new Error("observer did not return the selected leaderboard");
  }
  return result;
}
