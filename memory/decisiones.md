# MAX — Decisiones
**Actualizado:** 2026-05-25

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

## 2026-05-25 — Test-website como subdirectorio del repo MAX (forzado por restricción de git proxy)

**Contexto:** Brahin pidió crear proyecto Next.js de prueba (Nexus Agency). Decisión inicial: ubicarlo en `/home/user/test-website` (hermano del repo MAX) para no contaminar. Después necesitó deployarse a Vercel, lo que requería pushearlo a GitHub. El git proxy del sandbox solo permite push a `BRAHIN-Stannum/stannum-max-agent`.
**Opciones evaluadas:**
- A) Mantener como hermano + entregar como ZIP para que Brahin lo pushee desde local
- B) Copiar a `stannum-max-agent/test-website/` y pushear en branch feature `claude/festive-brown-FBhFx`
**Decisión:** B — el repo MAX queda con un subdirectorio satélite, aislado en branch feature (no toca master). Acepta contaminación a cambio de deploy automático.
**Fuente de respaldo:** N/A (decisión operativa, no estratégica)
**Resultado:** PR #1 abierta en `BRAHIN-Stannum/stannum-max-agent`. Test-website vive bajo `test-website/` en branch `claude/festive-brown-FBhFx`. Vercel deploy bloqueado en otro frente (token), no por esta decisión.

---

## 2026-05-25 — Skip del `--design-system` de skill UI/UX Pro Max cuando specs son completas

**Contexto:** SKILL.md de UI/UX Pro Max v2.5.0 marca como Step 2 OBLIGATORIO correr `python3 search.py "<query>" --design-system` antes de implementar. En esta sesión Brahin ya proveyó style (oscuro premium), palette (#00FF88 + negro + gris), tipografía (Inter) y estructura (hero/services/testimonials/footer) explícitos.
**Opciones evaluadas:**
- A) Cumplir la skill al pie de la letra y correr el generador (gasto de Python + posible conflicto con specs del usuario)
- B) Saltar el generador y usar las specs explícitas + checklist de calidad de la skill (no-emojis, cursor-pointer, contraste WCAG, transitions 150-300ms, prefers-reduced-motion)
**Decisión:** B — cuando el usuario define todas las variables que el generador resolvería (style, color, typography, structure), el generador es ruido. Aplicar solo el checklist de calidad.
**Fuente de respaldo:** N/A
**Resultado:** Build limpio, 0 errores TS, checklist de skill respetado en Hero/Services/Testimonials/Footer. Decisión replicable cuando specs son completas.

---

## Histórico
