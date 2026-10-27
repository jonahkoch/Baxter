// Group commands use coordinator results and the connected agent's control token.
export const groupCommandHelp = [
  "my-group",
  "create-group <name> [description]",
  "join-group <groupId>",
  "leave-group <groupId>",
  "kick-member <groupId> <agentId>",
  "ban-member <groupId> <agentId>",
  "unban-member <groupId> <agentId>",
];

export function buildGroupRequest(command, args) {
  const help = groupCommandHelp.find((line) => line.split(" ")[0] === command);
  const count = command === "my-group" ? 0 : command.endsWith("-member") ? 2 : 1;
  if (!help || args.length < count || args.length > count + (command === "create-group" ? 1 : 0)) {
    throw new Error(`usage: ${help ?? "group command"}`);
  }
  const values = args.map((value) => value.trim());
  if (values.slice(0, count).some((value) => !value)) throw new Error("groupId, agentId or name is required");
  if (command === "my-group") return { suffix: "", method: "GET" };
  if (command === "create-group") {
    const [name, description = ""] = values;
    // Creation waits for the server text check. The observer waits up to 20 s.
    return { suffix: "", method: "POST", body: { name, description }, timeoutMs: 25_000 };
  }
  const group = `/${encodeURIComponent(values[0])}`;
  if (command === "join-group" || command === "leave-group") {
    return { suffix: group, method: command === "join-group" ? "PUT" : "DELETE" };
  }
  return { suffix: `${group}/${command === "kick-member" ? "members" : "blacklist"}/${encodeURIComponent(values[1])}`,
    method: command === "ban-member" ? "PUT" : "DELETE" };
}
