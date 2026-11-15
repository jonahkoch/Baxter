// Reads coordinator-owned leaderboards through the public observer API. No control
// session or API token is needed. The coordinator owns board IDs, ranks, and refresh
// timing; this file only selects a route and checks the response shape.
export async function readLeaderboard(command, args, { observerUrl, agentId }) {
  const rankOnly = command === "rank";
  if (args.length > (rankOnly ? 2 : 1) || args.some((value) => !value.trim() || value.startsWith("--"))) {
    throw new Error(`usage: ${command} [board]${rankOnly ? " [agentId]" : ""}`);
  }
  if (!observerUrl) throw new Error("missing required config: MCITY_OBSERVER_URL");
  const api = `${observerUrl.replace(/\/$/, "")}/api/leaderboards`;

  if (!rankOnly && !args.length) {
    const overview = await getJson(command, api, api);
    if (!Array.isArray(overview?.boards) || !Number.isInteger(overview.population)) {
      throw new Error("observer did not return the leaderboard overview");
    }
    return overview;
  }

  const board = args[0]?.trim() ?? "experience";
  if (!rankOnly) {
    const page = await getJson(command, api, `${api}/${encodeURIComponent(board)}`, board);
    if (page?.board !== board || !Array.isArray(page.rows)) {
      throw new Error("observer did not return the selected leaderboard");
    }
    return page;
  }

  const requestedAgentId = (args[1] ?? agentId)?.trim();
  if (!requestedAgentId) throw new Error("rank requires an agentId; pass one or set MCITY_AGENT_ID");
  if (requestedAgentId.includes(",")) throw new Error("provide one agentId");
  const params = new URLSearchParams({ agentIds: requestedAgentId, boards: board, window: "1" });
  const result = await getJson(command, api, `${api}/standings?${params}`, board);
  const agent = result?.agents?.length === 1 && result.agents[0].agentId === requestedAgentId ? result.agents[0] : null;
  if (agent?.status === "unknown") {
    throw new Error(`rank failed: agent "${requestedAgentId}" is unknown. Use an exact coordinator agent ID.`);
  }
  const standing = agent?.status === "known" ? agent.boards?.[board] : null;
  const ranked = Number.isInteger(standing?.rank);
  if (!standing || !Array.isArray(standing.window) || (!ranked && (standing.rank !== null || !standing.unranked))) {
    throw new Error("observer did not return the selected leaderboard");
  }
  const { above, window, ...own } = standing;
  return {
    board,
    agentId: requestedAgentId,
    name: agent.name,
    status: ranked ? "ranked" : "unranked",
    ...own,
    previous: ranked ? window.find((row) => row.rank === own.rank - 1) ?? null : null,
    next: ranked ? window.find((row) => row.rank === own.rank + 1) ?? null : null,
    generatedAtMs: result.generatedAtMs,
    refreshAfterMs: result.refreshAfterMs,
  };
}

// A 4xx answer for a board route is checked against the overview, so an unknown
// board fails with the valid board IDs instead of a bare status code.
async function getJson(command, api, url, board = null) {
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (response.ok) return response.json();
  if (board !== null && response.status >= 400 && response.status < 500) {
    const boards = (await getJson(command, api, api))?.boards;
    if (Array.isArray(boards) && !boards.some((entry) => entry.id === board)) {
      const ids = boards.map((entry) => entry.id).join(", ");
      throw new Error(`${command} failed: unknown board "${board}". Use one of: ${ids}.`);
    }
  }
  throw new Error(`${command} failed: HTTP ${response.status}.`);
}
