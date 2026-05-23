# stannum-max-agent

Repositorio de MAX — Agente de Dirección Estratégica DITEG · STANNUM
**Operador:** Brahin Carrillo · eventos@stannum.com.ar
**Runtime:** Claude Code · **Tareas:** ClickUp · **Automatización:** Google Apps Script

---

## Stack

| Capa | Sistema | Qué hace |
|------|---------|---------|
| Memoria + Skills | Este repo (GitHub) | Skills, memoria persistente, código GAS |
| Trabajo activo | ClickUp (`12902722`) | Tareas, sprints, pipeline, L1 memory |
| Interfaz | Claude Code | Conversación, ejecución de skills, tools |
| Automatización | GAS (Google Apps Script) | Triggers diarios/semanales automáticos |

## Estructura

```
stannum-max-agent/
├── CLAUDE.md              ← cargado automático en cada sesión Claude Code
├── README.md
├── skills/
│   ├── INDEX.md           ← mapa de las 16 skills con trigger y módulo
│   └── [skill].md         ← protocolo completo por skill
├── memory/
│   ├── INDEX.md           ← índice de memoria
│   ├── aprendizajes.md
│   ├── decisiones.md
│   ├── patrones.md
│   └── okrs.md
├── gas/
│   └── MAXI_*.gs          ← scripts GAS (fuente de verdad)
└── arquitectura/
    └── MAX-arquitectura.md ← documento único de referencia
```

## Cómo usar

1. Clonar repo o conectar GitHub MCP en Claude Code
2. Abrir Claude Code en la carpeta raíz — `CLAUDE.md` se carga automático
3. Invocar skills con hash commands: `#buenosdias`, `#sprint`, `#pipeline`, etc.
4. Al cerrar sesión: `#cierre` actualiza memoria L1 en ClickUp

## IDs críticos

| Sistema | ID |
|---------|-----|
| ClickUp Workspace | `12902722` |
| Space DITEG | `90144409477` |
| Lista MAX \| AGENTE DITEG | `901415394335` |
| Pipeline de Proyectos | `901415219852` |
| CalendarId | `eventos@stannum.com.ar` |

## Estado del repo

- **Creado:** 2026-05-23
- **Migrado desde:** Drive local (`1. MAX DITEG/SKILLS/`) + Obsidian MEMORIA/
- **Versión arquitectura:** 3 módulos / 16 skills (nomenclatura hash, sin M-números)
