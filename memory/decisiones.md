# MAX — Decisiones
**Actualizado:** 2026-05-23

---

## Decisiones de arquitectura vigentes

| Decisión | Fecha | Razón |
|---------|-------|-------|
| GitHub como repo de skills y memoria | 2026-05-23 | Online-always, sin dependencia de PC local |
| Skills con hash commands (sin M-números) | 2026-05-23 | Elimina conflicto entre v1/v2 numbering |
| 3 módulos / 16 skills como arquitectura base | 2026-05-23 | Simplifica desde 20+ skills fragmentadas |
| ClickUp como fuente de verdad operativa | — | Única fuente para tareas, sprints y proyectos |
| CRONOS como único orquestador cross-agente | 2026-05 | Evita dependencias directas entre agentes |
| CalendarId siempre explícito (`eventos@stannum.com.ar`) | — | Evita eventos en cuenta equivocada |
| Claude Code (no GPT) como runtime principal | 2026-05 | Mayor capacidad de acción e integración MCP |
| Drive HTML (`2. AGENTE/`) como implementaciones de referencia | — | Acceso universal; migración a repo progresiva |
| Respaldo estratégico obligatorio en todo output | — | Sin fuente = opinión, no estrategia |

---

## 2026-05-23 — Migración a GitHub como memoria persistente

**Contexto:** Arquitectura anterior dependía de Drive local (sync) + Obsidian (local) — no accesible desde otras PCs
**Opciones evaluadas:**
- A) Drive local sync + Obsidian (estado anterior)
- B) GitHub repo privado + ClickUp + Claude (nueva)
- C) ClickUp Docs exclusivamente
**Decisión:** Opción B — GitHub para skills/memoria/código + ClickUp para trabajo activo
**Fuente de respaldo:** Microsoft Work Trend Index 2025 — FRONTIER FIRMS operan con infraestructura centralizada y accesible desde cualquier punto de la organización
**Resultado:** Repo `stannum-max-agent` creado 2026-05-23

---

## 2026-05-21 — No lanzar nueva iniciativa sin CRONOS operativo

**Contexto:** DEEP-SEARCH-MAX reveló CRONOS Fase 1 vencida sin ejecutar
**Opciones evaluadas:**
- A) Avanzar con agentes individuales sin orquestador
- B) Priorizar CRONOS antes de expandir
**Decisión:** B — sin orquestador, cualquier nuevo agente funciona en modo manual fragmentado
**Fuente de respaldo:** Microsoft Work Trend Index 2025 — FRONTIER FIRMS operan con orquestación central (Agent Boss + Manager Agents)
**Resultado:** Pendiente de ejecución por Brahin

---

## 2026-05-21 — Acuerdo Andes Salud (comercial)

**Contexto:** Email "ACUERDO FIRMADO" con cliente chileno
**Decisión:** Confirmar con ECLI el producto acordado (Starter/Enterprise) y verificar carga en Kommo antes del primer sprint de ejecución
**Resultado:** Pendiente — reunión DITEG confirmada 01/06/2026 9:30am (Sofía Fernández Bravo aceptó)

---

## 2026-05-23/24 — Orden de migración del ecosistema agéntico confirmado

**Contexto:** Diseño del proceso de escalado a los 5 agentes restantes
**Opciones evaluadas:**
- A) Migrar todos los agentes en paralelo
- B) Migrar por orden de impacto (CRONOS → TORO → LARA → KAIROS → CHEBA)
- C) Migrar primero los agentes con más skills ya documentadas (LARA)
**Decisión:** B — CRONOS es el orquestador. Sin él, los demás agentes operan fragmentados e independientes. Una vez CRONOS está operativo, cada nueva migración queda bajo su coordinación.
**Fuente de respaldo:** Microsoft Work Trend Index 2025 — FRONTIER FIRMS operan con "Agent Boss" como capa de orquestación antes de escalar agentes especializados.
**Resultado:** Orden fijo: CRONOS → TORO → LARA → KAIROS → CHEBA. Documentado en `CRONOS-BRIEF-AGENTES.md`.

---

## 2026-05-23/24 — MAX como caso piloto documentado

**Contexto:** Finalización de la migración de MAX a GitHub
**Decisión:** MAX no solo es un agente funcional — es el manual de instrucciones para todos los que vienen. Todo lo aprendido (errores, decisiones, proceso paso a paso) se documentó en `PROCESO-CREACION-AGENTES.md` para que CRONOS pueda replicarlo sin reinventar la rueda.
**Fuente de respaldo:** McKinsey, "The State of AI" 2024 — las organizaciones que estandarizan procesos de adopción de IA antes de escalar logran 3x más velocidad de implementación.
**Resultado:** 3 documentos clave en repo + ClickUp: PROCESO-CREACION-AGENTES.md · CRONOS-BRIEF-AGENTES.md · SKILL-ALIGNMENT-BRIEF.md

---

## 2026-05-23/24 — Hash commands reemplazan M-XX en toda la arquitectura

**Contexto:** Revisión de las 16 skills con numeración M06-M18
**Opciones evaluadas:**
- A) Mantener numeración M-XX (compatibilidad hacia atrás)
- B) Migrar a hash commands puros (romper numeración)
**Decisión:** B — la numeración genera deuda técnica garantizada. Las 16 tareas en ClickUp de MAX ya fueron renombradas a formato `SKILL — #[nombre] | descripción`.
**Resultado:** Todos los agentes futuros (CRONOS, TORO, LARA, KAIROS, CHEBA) usarán hash commands desde el primer commit.

---

## 2026-05-23/24 — GitHub es la única fuente de verdad del agente

**Contexto:** Definición de la arquitectura convergente para todos los agentes
**Decisión:** Skills, memoria, GAS scripts y configuración viven en el repo GitHub. Drive local y Obsidian son archivos históricos de referencia — no fuentes activas. Si un skill no está en el repo, no existe como parte del agente.
**Resultado:** Principio #1 del estándar STANNUM: "GitHub first — toda skill y memoria vive en el repo."

---

## Histórico
