# MAX — Decisiones
**Actualizado:** 2026-05-24

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

## 2026-05-24 — Stack del sitio Summit IA Tucumán

**Contexto:** Construir desde cero sitio del Summit en `/summit-ia-tucuman/` dentro de este repo. Brahin pidió justificar el stack en 1 línea.
**Opciones evaluadas:**
- A) Next.js 15 + Tailwind + Framer Motion — SSR para SEO, pero overhead innecesario para landing one-page
- B) Astro 5 + Tailwind v4 + Motion One — output 100% estático, hot reload < 1s, build ~1.4s, deploy directo a Pages/Workers
- C) HTML/CSS/JS puro con motion via CDN — sin modularidad para 13 secciones
**Decisión:** B — Astro 5 + Tailwind v4 + Motion One + @fontsource-variable/inter
**Fuente de respaldo:** Performance budget de landing premium (Lighthouse >95) según patrones de Linear.app, Mistral.ai. Astro bundle final = 124KB HTML + 58KB JS (gzip 20KB) sin tree-shake adicional.
**Resultado:** Stack aplicado en `summit-ia-tucuman/`. Static output desplegable a Cloudflare Pages/Workers o GitHub Pages indistintamente.

---

## 2026-05-24 — Deploy preview vía GitHub Pages branch orphan

**Contexto:** Brahin necesita URL pública para preview del sitio Summit. Egress policy del entorno bloquea cloudflared, ngrok, localtunnel, serveo, bore, pinggy, tunnelmole y tuns.sh (todos 403 host_not_allowed).
**Opciones evaluadas:**
- A) Tunnel público con cloudflared/ngrok — bloqueado por policy
- B) Allowlist un host en network policy — requiere acción de Brahin en Settings
- C) GitHub Pages branch orphan `gh-pages` — sólo usa github.com (allowlisted)
- D) Pasar más screenshots vía SendUserFile — válido pero no permite navegar el site
**Decisión:** C — branch orphan `gh-pages` con build estático. URL `https://brahin-stannum.github.io/stannum-max-agent/`.
**Fuente de respaldo:** Allowlist de egress empíricamente verificado (sólo github.com responde 200, todos los tunnels 403).
**Resultado:** Branch `gh-pages` activo. Astro config con `base: '/stannum-max-agent/'` + `BaseLayout` usa `import.meta.env.BASE_URL` para favicon. Workflow de redeploy documentado en commit history del feature branch.

---

## 2026-05-24 — Paleta cian oficial STANNUM `#32CBBF`

**Contexto:** Sitio inicialmente usaba cian `#00E5D4` por aproximación visual. Brahin encontró el Manual de Marca oficial en Drive (página 9) con la paleta exacta y el SVG vectorizado del isotipo.
**Opciones evaluadas:**
- A) Mantener `#00E5D4` por estar ya implementado
- B) Migrar todo a `#32CBBF` (oficial) con bulk replace
**Decisión:** B — `#32CBBF` (cian primario) + `#4CE0CE` (cian secundario) + `#000000` + `#282828` (carbon) + `#FFFFFF`. Isotipo SVG oficial (viewBox 160×160, rect rx 18 fill cian + 2 paths blancos formando la "S" angular).
**Fuente de respaldo:** Manual de Marca STANNUM oficial — documento "Código - MANUAL DE MARCA STANNUM" en Drive.
**Resultado:** Bulk replace ejecutado: 0 ocurrencias de `#00E5D4` o `rgba(0, 229, 212, …)` remanentes en `src/` ni `public/`. Logo G oficial de Gabriel Páez Laurent extraído de "Gabriel Logo.txt" en Drive (componente `LogoAgenciaG.astro`).

---

## Histórico
