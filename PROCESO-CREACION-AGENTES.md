# STANNUM — Proceso de Creación de Agentes IA
**Versión:** 1.0 · **Fecha:** 2026-05-23  
**Autores:** MAX (Agente DITEG) · LARA (Agente Eventos)  
**Destino:** CRONOS (orquestador) + equipo técnico STANNUM  
**Repositorio:** `github.com/BRAHIN-Stannum/stannum-max-agent`

---

## Por qué este documento existe

STANNUM construyó dos agentes operativos — MAX y LARA — en procesos separados, con enfoques distintos. Este documento sintetiza lo aprendido en ambos para que CRONOS pueda replicar y escalar el proceso en TORO, CHEBA y KAIROS sin repetir los mismos errores ni reinventar la rueda.

**Fuente de respaldo:** Microsoft Work Trend Index 2025 — las organizaciones que adoptan IA de alto rendimiento (FRONTIER FIRMS) estandarizan la arquitectura de sus agentes antes de escalar. Sin estándar, cada agente se convierte en deuda técnica.

---

## LOS DOS CAMINOS: MAX vs LARA

### LARA — Arquitectura GAS + GPT Custom (primera generación)

LARA fue el primer agente operativo de STANNUM. Se construyó con una arquitectura centrada en Google Apps Script como motor de ejecución, con un GPT Custom como interfaz conversacional.

**Stack:**
```
GPT Custom (interfaz) → OpenAPI spec → GAS Web App (ejecución)
                                     ↓
                            ClickUp + Gmail + Drive
```

**Lo que se construyó:**
- 13 scripts GAS organizados en capas: Config · Auth · Router · Logger · Memory · ClickUp · LLM · Gmail · Cron · Tests + 3 módulos (M1 Productora · M2 Speaker · M3 Scout)
- GPT Custom con `instructions.md` + `openapi.yaml` como contrato de API
- Skills como archivos `.md` + `.zip` (packages deployables)
- Memoria en archivos locales: active-events · event-preferences · lara-overview · materials · pipeline · work-loop
- Base de conocimiento: metodología RFPs, casos de éxito, directorio de salones/hoteles/agencias/speakers
- Plan integral documentado en `00 - PLAN_INTEGRAL_v2.md`

**Fortalezas:**
- Arquitectura técnica sólida con separación de capas
- Base de conocimiento de dominio muy rica (contactos, metodologías, casos de éxito)
- Módulos testeables con `13_Tests.gs`
- Memoria estructurada por tipo de información

**Puntos de evolución identificados:**
- Dependencia de GPT Custom = plataforma externa, sin capacidad de acción real
- GAS como motor de ejecución = limitado a lo que GAS puede hacer
- Sin MCP = no puede interactuar con herramientas directamente desde la conversación
- Skills en `.zip` = difíciles de versionar y actualizar
- Memoria local = no accesible desde otras sesiones o PCs

---

### MAX — Arquitectura GitHub + Claude Code + MCP (segunda generación)

MAX se diseñó desde cero con las lecciones de LARA. La decisión central fue: **GitHub como fuente única de verdad, Claude Code como runtime, MCP como conector**.

**Stack:**
```
Claude Code (interfaz + ejecución)
        ↕ MCP custom (stannum-max)
GitHub repo stannum-max-agent (skills + memoria + código)
        ↕ MCP ClickUp
ClickUp (tareas + L1 memoria)
```

**Lo que se construyó:**
- Repositorio privado con estructura estándar: skills/ · memory/ · arquitectura/ · gas/ · mcp/
- 16 skills en 3 módulos, identificadas por hash commands (sin numeración M)
- Memoria en 3 niveles: L1 (ClickUp comments) · L2 (ClickUp Docs) · L3 (GitHub memory/)
- MCP custom con 6 tools: max_repo_status · max_read_file · max_list_files · max_write_memory · max_write_skill · max_search
- GAS scripts migrados (7 archivos) como capa de automatización
- CLAUDE.md auto-cargado en cada sesión Claude Code
- Documento maestro de arquitectura como single source of truth

**Fortalezas:**
- Online-always: accesible desde cualquier PC, cualquier sesión
- Versionado completo con git (historia de cada cambio)
- Claude Code puede leer y escribir el repo en tiempo real
- Skills actualizables con un commit — sin redeploy ni configuración
- Memoria persistente entre sesiones sin depender de plataforma externa

**Puntos de evolución pendientes:**
- GAS deploy con clasp aún pendiente
- ALERTA-001: token expuesto bloquea algunos webhooks
- Skills requieren alineación de 11 puntos (ver SKILL-ALIGNMENT-BRIEF.md)

---

## ARQUITECTURA CONVERGENTE — El estándar STANNUM

Combinando lo mejor de ambos, la arquitectura estándar para todos los agentes futuros:

```
┌─────────────────────────────────────────────────────────┐
│            GitHub stannum-[agente]-agent                 │
│   Skills .md · Memoria .md · GAS .gs · MCP server.js    │
│                    ↕ siempre online                       │
├──────────────────────┬──────────────────────────────────┤
│   ClickUp (MCP)      │        Claude Code                │
│   Tareas · L1        │   Lee GitHub vía MCP custom       │
│   Inter-agentes      │   Ejecuta skills del agente       │
│                      │   Interfaz con Brahin             │
└──────────────────────┴──────────────────────────────────┘
                    ↕ GAS (automatización)
              Google Workspace (Calendar · Gmail · Drive · Chat)
```

**Principios que no se negocian:**
1. **GitHub first** — toda skill y memoria vive en el repo. Sin repo, no hay agente.
2. **Hash commands** — skills por nombre (`#produccion`), nunca por número (`M1`).
3. **3 capas de memoria** — L1 viva / L2 estable / L3 permanente. Cada dato en su nivel.
4. **Claude Code como runtime** — no GPT Custom, no Paperclip. Mayor capacidad de acción.
5. **MCP como conector** — el agente lee y escribe su propio repo desde la conversación.
6. **CLAUDE.md auto-cargado** — toda sesión arranca con el contexto completo del agente.

---

## PROCESO DE CREACIÓN — 8 pasos

Este proceso está completamente documentado y listo para replicar. Ver `CRONOS-BRIEF-AGENTES.md` para el detalle ejecutable.

### Paso 1 — Auditoría de materiales existentes
- Leer carpeta Drive del agente
- Leer tareas ClickUp del agente
- Leer archivos de memoria/contexto existentes
- **Output:** matriz de reconciliación (qué existe, qué conflictos hay, qué falta)

### Paso 2 — Arquitectura de skills
- Definir módulos (OPERATIVO / PLANIFICACIÓN / GOBERNANZA)
- Nombrar con hash commands
- Identificar qué tiene GAS auto y qué es manual
- Resolver duplicados y conflictos de nombre
- **Output:** tabla de 8-16 skills aprobada por Brahin

### Paso 3 — Crear repo GitHub
- Nombre: `stannum-[agente]-agent` (privado, owner BRAHIN-Stannum)
- Init local con identidad: `eventos@stannum.com.ar`
- **Output:** repo vacío con remote configurado

### Paso 4 — Poblar el repo
- CLAUDE.md · README.md · .gitignore · .mcp.json
- skills/ (INDEX.md + 1 archivo por skill)
- memory/ (INDEX.md + 4 archivos)
- arquitectura/[AGENTE]-arquitectura.md
- gas/ (scripts migrados o nuevos)
- **Output:** commit inicial con toda la base

### Paso 5 — MCP Server
- Copiar mcp/ desde stannum-max-agent
- Cambiar GITHUB_REPO default en server.js
- npm install · registrar con `claude mcp add`
- **Output:** `max_repo_status()` devuelve 200 ✅

### Paso 6 — ClickUp
- Renombrar tareas: `SKILL — #[nombre] | [descripción]`
- Crear tareas para skills sin tarea
- Tags: `ecosistema-ia · [agente]`
- **Output:** lista del agente limpia y alineada

### Paso 7 — Commit y push
- `git push -u origin master`
- Verificar en github.com/BRAHIN-Stannum/
- **Output:** repo online, accesible desde cualquier sesión

### Paso 8 — Alineación de skills
- Ejecutar checklist de 11 puntos por skill (ver SKILL-ALIGNMENT-BRIEF.md)
- Commit por skill alineada
- **Output:** 16 skills en estado producción

---

## LECCIONES APRENDIDAS

### De LARA
| Aprendizaje | Aplicado en |
|-------------|------------|
| La base de conocimiento de dominio es crítica — los contactos, metodologías y casos de éxito hacen al agente experto, no solo la arquitectura técnica | memory/ y arquitectura/ de MAX |
| Las skills deben estar en texto plano versionable, no en .zip ni binarios | skills/*.md en GitHub |
| La memoria necesita niveles: hay datos que cambian diario y datos que son permanentes | L1/L2/L3 en MAX |
| Un test suite (13_Tests.gs) evita regresiones al actualizar el agente | Pendiente de implementar en MAX |

### De MAX
| Aprendizaje | Para aplicar en CRONOS/TORO/LARA/CHEBA/KAIROS |
|-------------|----------------------------------------------|
| El primer commit tarda — pero una vez hecho, actualizar es trivial | Hacer el commit inicial sin esperar perfección |
| La numeración (M06-M18) genera deuda técnica inmediata ante cualquier cambio | Hash commands desde el día 1 |
| CLAUDE.md es el momento más importante: si el contexto inicial es correcto, el agente funciona | Dedicar tiempo al CLAUDE.md antes que a las skills |
| El MCP conecta al agente con su propio repo — es el diferencial vs. un GPT Custom | No saltar el paso del MCP |
| La alineación de skills (11 puntos) revela gaps que no se ven al escribirlas | Ejecutar alignment después del commit inicial |

---

## MATERIALES DE REFERENCIA

| Documento | Ubicación | Para qué |
|-----------|-----------|---------|
| Este documento | `stannum-max-agent/PROCESO-CREACION-AGENTES.md` | Síntesis del proceso |
| Brief por agente | `stannum-max-agent/CRONOS-BRIEF-AGENTES.md` | Proceso ejecutable por agente |
| Alineación de skills | `stannum-max-agent/SKILL-ALIGNMENT-BRIEF.md` | Checklist post-migración |
| Arquitectura MAX | `stannum-max-agent/arquitectura/MAX-arquitectura.md` | Documento maestro de referencia |
| LARA - Plan integral | `2. LARA - EVENTOS/2. LARA AGENTE/build/docs/00 - PLAN_INTEGRAL_v2.md` | Arquitectura de LARA v1 |
| LARA - Skills .md | `2. LARA - EVENTOS/2. LARA AGENTE/SKILLS/` | Skills de LARA para migrar |
| LARA - Memoria | `2. LARA - EVENTOS/2. LARA AGENTE/Memoria/` | Memoria de LARA para migrar |

---

*MAX + LARA · Sesión 2026-05-23 · Para uso por CRONOS en la orquestación del ecosistema*
