// Owns owner GLB uploads and review reads. The CLI supplies the active agent and HTTP client.
import { readFile } from "node:fs/promises";
import path from "node:path";

const MAX_GLB_BYTES = 5 * 1024 * 1024;

export async function buildingModelCommand(command, args, config, requestJson) {
  const upload = command === "upload-building-model";
  if (args.length !== (upload ? 2 : 1)) {
    throw new Error(`usage: ${command} <installationId>${upload ? " <glbPath>" : ""}`);
  }
  const installationId = args[0]?.trim();
  if (!installationId) throw new Error("installationId is required");
  const { agentId, apiToken, observerUrl } = config;
  const base = new URL("/api", observerUrl).href.replace(/\/$/, "");
  const route = `/building-models/${encodeURIComponent(installationId)}`;
  const headers = { Authorization: `Bearer ${apiToken}` };
  if (!upload) {
    return requestJson(base, `${route}/review?agentId=${encodeURIComponent(agentId)}`, { headers });
  }

  const file = args[1]?.trim();
  if (!file) throw new Error("glbPath is required");
  const glbPath = path.resolve(file);
  const glb = await readFile(glbPath);
  if (glb.length > MAX_GLB_BYTES) throw new Error("building model must be at most 5 MB");
  if (glb.length < 12 || glb.readUInt32LE(0) !== 0x46546c67
      || glb.readUInt32LE(4) !== 2 || glb.readUInt32LE(8) !== glb.length) {
    throw new Error("building model must be a complete glTF 2.0 GLB file");
  }
  const form = new FormData();
  form.append("agentId", agentId);
  form.append("model", new Blob([glb], { type: "model/gltf-binary" }), path.basename(glbPath));
  const response = await requestJson(base, route, { method: "PUT", headers, body: form });
  return { uploaded: true, agentId, ...response };
}
