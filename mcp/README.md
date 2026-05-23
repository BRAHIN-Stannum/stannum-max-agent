# stannum-max-mcp

MCP Server para MAX — lee y escribe en `stannum-max-agent` vía GitHub REST API.

## Tools disponibles

| Tool | Qué hace |
|------|---------|
| `max_repo_status` | Estado del repo: último commit, archivos disponibles |
| `max_read_file` | Lee cualquier archivo del repo (`skills/`, `memory/`, etc.) |
| `max_list_files` | Lista archivos en un directorio del repo |
| `max_write_memory` | Actualiza un archivo de memoria + crea commit |
| `max_write_skill` | Actualiza una skill + crea commit |
| `max_search` | Busca texto en el contenido de los archivos |

## Setup (una sola vez)

### 1. Crear GitHub Personal Access Token

1. Ir a: https://github.com/settings/tokens/new
2. Nombre: `stannum-max-mcp`
3. Scopes: ✅ `repo` (si el repo es privado) · o `public_repo` (si es público)
4. Copiar el token generado

### 2. Instalar dependencias

```bash
cd stannum-max-agent/mcp
npm install
```

### 3. Configurar en Claude Code

Agregar a `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "stannum-max": {
      "command": "node",
      "args": ["C:/Users/Apud_/Documents/stannum-max-agent/mcp/server.js"],
      "env": {
        "GITHUB_TOKEN": "ghp_TU_TOKEN_AQUI",
        "GITHUB_OWNER": "TU_USUARIO_GITHUB",
        "GITHUB_REPO":  "stannum-max-agent",
        "GITHUB_BRANCH": "master"
      }
    }
  }
}
```

### 4. Reiniciar Claude Code

El MCP aparecerá disponible en la próxima sesión.

## Uso en sesión MAX

Al inicio de sesión MAX puede verificar el repo:
```
max_repo_status()  →  confirma acceso y muestra último commit
```

Para leer una skill:
```
max_read_file({ path: "skills/sprint.md" })
```

Para actualizar memoria (con aprobación de Brahin):
```
max_write_memory({ file: "aprendizajes.md", content: "...", reason: "sesión 23/05" })
```

## Variables de entorno

| Variable | Requerida | Default | Descripción |
|----------|-----------|---------|-------------|
| `GITHUB_TOKEN` | ✅ | — | PAT con scope `repo` |
| `GITHUB_OWNER` | ✅ | — | Usuario u organización de GitHub |
| `GITHUB_REPO` | No | `stannum-max-agent` | Nombre del repositorio |
| `GITHUB_BRANCH` | No | `master` | Rama principal |
