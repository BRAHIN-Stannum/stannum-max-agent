/**
 * stannum-max-mcp — MCP Server para MAX (Agente DITEG STANNUM)
 * Lee y escribe en el repo stannum-max-agent vía GitHub REST API.
 *
 * Variables de entorno requeridas:
 *   GITHUB_TOKEN  — Personal Access Token con scope: repo (o contents:read+write)
 *   GITHUB_OWNER  — Usuario/organización de GitHub (ej: "brahin-carrillo")
 *   GITHUB_REPO   — Nombre del repo (default: "stannum-max-agent")
 *   GITHUB_BRANCH — Rama principal (default: "master")
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ── CONFIG ────────────────────────────────────────────────────────────────────

const GITHUB_TOKEN  = process.env.GITHUB_TOKEN;
const GITHUB_OWNER  = process.env.GITHUB_OWNER;
const GITHUB_REPO   = process.env.GITHUB_REPO  || "stannum-max-agent";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "master";
const API_BASE      = "https://api.github.com";

if (!GITHUB_TOKEN || !GITHUB_OWNER) {
  process.stderr.write("ERROR: GITHUB_TOKEN y GITHUB_OWNER son obligatorios.\n");
  process.exit(1);
}

// ── GITHUB API HELPERS ────────────────────────────────────────────────────────

const headers = {
  "Authorization": `Bearer ${GITHUB_TOKEN}`,
  "Accept":        "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent":    "stannum-max-mcp/1.0"
};

async function githubGet(path) {
  const res = await fetch(`${API_BASE}${path}`, { headers });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API ${res.status}: ${err}`);
  }
  return res.json();
}

async function githubPut(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub API PUT ${res.status}: ${err}`);
  }
  return res.json();
}

/** Lee un archivo del repo. Devuelve el contenido decodificado. */
async function readFile(filePath) {
  const data = await githubGet(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`
  );
  if (data.type !== "file") throw new Error(`${filePath} no es un archivo`);
  return {
    content: Buffer.from(data.content, "base64").toString("utf-8"),
    sha:     data.sha,
    size:    data.size,
    path:    data.path
  };
}

/** Lista archivos y carpetas en un directorio del repo. */
async function listDir(dirPath = "") {
  const data = await githubGet(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${dirPath}?ref=${GITHUB_BRANCH}`
  );
  if (!Array.isArray(data)) throw new Error(`${dirPath} no es un directorio`);
  return data.map(item => ({
    name: item.name,
    path: item.path,
    type: item.type,
    size: item.size ?? 0
  }));
}

/** Escribe o actualiza un archivo en el repo (crea commit automático). */
async function writeFile(filePath, content, message, existingSha = null) {
  const body = {
    message,
    content: Buffer.from(content, "utf-8").toString("base64"),
    branch:  GITHUB_BRANCH
  };
  if (existingSha) body.sha = existingSha;
  return githubPut(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${filePath}`,
    body
  );
}

/** Busca texto en el repo usando la GitHub Search API. */
async function searchCode(query) {
  const q = encodeURIComponent(`${query} repo:${GITHUB_OWNER}/${GITHUB_REPO}`);
  const data = await githubGet(`/search/code?q=${q}&per_page=10`);
  return data.items?.map(item => ({
    path:    item.path,
    name:    item.name,
    url:     item.html_url,
    snippet: item.text_matches?.[0]?.fragment ?? ""
  })) ?? [];
}

// ── MCP SERVER ────────────────────────────────────────────────────────────────

const server = new McpServer({
  name:    "stannum-max-mcp",
  version: "1.0.0"
});

// ── TOOL: max_read_file ───────────────────────────────────────────────────────
server.tool(
  "max_read_file",
  "Lee el contenido de cualquier archivo del repo stannum-max-agent. " +
  "Usar para leer skills (skills/[nombre].md), memoria (memory/[nombre].md), " +
  "arquitectura (arquitectura/MAX-arquitectura.md) o cualquier otro archivo.",
  { path: z.string().describe("Ruta relativa del archivo, ej: 'skills/sprint.md' o 'memory/patrones.md'") },
  async ({ path: filePath }) => {
    const file = await readFile(filePath);
    return {
      content: [{
        type: "text",
        text: `# ${file.path} (${file.size} bytes)\n\n${file.content}`
      }]
    };
  }
);

// ── TOOL: max_list_files ──────────────────────────────────────────────────────
server.tool(
  "max_list_files",
  "Lista archivos y carpetas en un directorio del repo stannum-max-agent. " +
  "Usar para explorar: skills/, memory/, gas/, arquitectura/ o la raíz ''.",
  { dir: z.string().default("").describe("Directorio a listar, ej: 'skills' o 'memory'. Vacío para raíz.") },
  async ({ dir }) => {
    const items = await listDir(dir);
    const lines = items.map(i => {
      const icon = i.type === "dir" ? "📁" : "📄";
      const size = i.type === "file" ? ` (${i.size}b)` : "";
      return `${icon} ${i.path}${size}`;
    });
    return {
      content: [{
        type: "text",
        text: `## Contenido de '${dir || "/"}'\n\n${lines.join("\n")}`
      }]
    };
  }
);

// ── TOOL: max_write_memory ────────────────────────────────────────────────────
server.tool(
  "max_write_memory",
  "Escribe o actualiza un archivo de memoria en el repo (memory/). " +
  "Crea un commit automático. SOLO usar con aprobación explícita de Brahin. " +
  "Archivos válidos: aprendizajes.md, decisiones.md, patrones.md, okrs.md, INDEX.md.",
  {
    file:    z.enum(["aprendizajes.md","decisiones.md","patrones.md","okrs.md","INDEX.md"])
              .describe("Archivo de memoria a actualizar"),
    content: z.string().describe("Contenido completo del archivo (Markdown)"),
    reason:  z.string().describe("Motivo del update — aparece en el commit message")
  },
  async ({ file, content, reason }) => {
    const filePath = `memory/${file}`;
    // Intentar obtener SHA existente
    let sha = null;
    try {
      const existing = await readFile(filePath);
      sha = existing.sha;
    } catch {
      // Archivo nuevo — sin SHA
    }
    const commitMsg = `memory: update ${file} — ${reason}\n\nActualizado por MAX vía MCP · ${new Date().toISOString()}`;
    const result = await writeFile(filePath, content, commitMsg, sha);
    return {
      content: [{
        type: "text",
        text: `✅ memory/${file} actualizado.\nCommit: ${result.commit?.sha?.slice(0,7) ?? "ok"}\nRazón: ${reason}`
      }]
    };
  }
);

// ── TOOL: max_write_skill ─────────────────────────────────────────────────────
server.tool(
  "max_write_skill",
  "Crea o actualiza el archivo de una skill en el repo (skills/). " +
  "Crea commit automático. SOLO usar con aprobación explícita de Brahin.",
  {
    skill:   z.string().describe("Nombre del archivo skill, ej: 'sprint.md' o 'nueva-skill.md'"),
    content: z.string().describe("Contenido completo de la skill (Markdown)"),
    reason:  z.string().describe("Motivo del update — aparece en el commit message")
  },
  async ({ skill, content, reason }) => {
    const filePath = `skills/${skill}`;
    let sha = null;
    try {
      const existing = await readFile(filePath);
      sha = existing.sha;
    } catch { /* archivo nuevo */ }
    const commitMsg = `skills: update ${skill} — ${reason}\n\nActualizado por MAX vía MCP · ${new Date().toISOString()}`;
    const result = await writeFile(filePath, content, commitMsg, sha);
    return {
      content: [{
        type: "text",
        text: `✅ skills/${skill} actualizado.\nCommit: ${result.commit?.sha?.slice(0,7) ?? "ok"}\nRazón: ${reason}`
      }]
    };
  }
);

// ── TOOL: max_search ──────────────────────────────────────────────────────────
server.tool(
  "max_search",
  "Busca texto en el contenido de los archivos del repo stannum-max-agent. " +
  "Útil para encontrar en qué skill está documentado un proceso o encontrar un patrón en memoria.",
  { query: z.string().describe("Texto a buscar, ej: 'ALERTA-001' o 'Kommo' o 'pipeline'") },
  async ({ query }) => {
    const results = await searchCode(query);
    if (results.length === 0) {
      return { content: [{ type: "text", text: `Sin resultados para: "${query}"` }] };
    }
    const lines = results.map(r =>
      `📄 **${r.path}**\n${r.snippet ? `> ${r.snippet.trim().slice(0,120)}` : ""}`
    );
    return {
      content: [{
        type: "text",
        text: `## Resultados para "${query}"\n\n${lines.join("\n\n")}`
      }]
    };
  }
);

// ── TOOL: max_repo_status ─────────────────────────────────────────────────────
server.tool(
  "max_repo_status",
  "Devuelve el estado general del repo: rama, último commit, archivos principales. " +
  "Usar al inicio de sesión para confirmar que el repo está accesible y actualizado.",
  {},
  async () => {
    const [branch, skills, memory] = await Promise.all([
      githubGet(`/repos/${GITHUB_OWNER}/${GITHUB_REPO}/branches/${GITHUB_BRANCH}`),
      listDir("skills"),
      listDir("memory")
    ]);
    const lastCommit = branch.commit?.commit;
    return {
      content: [{
        type: "text",
        text: [
          `## stannum-max-agent — Estado del repo`,
          `**Repo:** ${GITHUB_OWNER}/${GITHUB_REPO} · Rama: ${GITHUB_BRANCH}`,
          `**Último commit:** ${branch.commit?.sha?.slice(0,7)} — ${lastCommit?.message?.split("\n")[0]}`,
          `**Autor:** ${lastCommit?.author?.name} · ${lastCommit?.author?.date}`,
          ``,
          `**Skills:** ${skills.filter(f => f.name.endsWith(".md")).length} archivos`,
          `**Memoria:** ${memory.filter(f => f.name.endsWith(".md")).length} archivos`,
        ].join("\n")
      }]
    };
  }
);

// ── START ─────────────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);
process.stderr.write(`stannum-max-mcp v1.0 — ${GITHUB_OWNER}/${GITHUB_REPO}:${GITHUB_BRANCH}\n`);
