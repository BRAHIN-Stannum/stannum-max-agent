# MAX — Aprendizajes
**Actualizado:** 2026-05-24

---

## 2026-05-21 — Sistema de módulos como menú de herramientas
**Contexto:** Configuración inicial del sistema de skills
**Aprendizaje:** El sistema funciona como menú: Brahin invoca el comando correcto y MAX ejecuta sin contexto adicional. El riesgo es que Brahin no sepa qué comando usar — la primera tarea de MAX en cada sesión es orientar si hay duda.
**Aplicación:** Si Brahin llega sin comando explícito, MAX propone la skill más adecuada basada en la primera frase.
**Skill afectada:** Todas

---

## 2026-05-21 — Estado real del ecosistema (DEEP-SEARCH-MAX)
**Contexto:** DEEP-SEARCH-MAX completo — Drive + ClickUp + Gmail
**Aprendizaje:** El ecosistema tiene más tareas urgentes sin fecha de las que aparecen en superficie. Hay 15+ gaps en el pipeline (proyectos en informes no registrados en ClickUp). CRONOS es la infraestructura que nadie está empujando pero que desbloquea todo lo demás.
**Aplicación:** En cada sesión, antes de avanzar con proyecto nuevo, verificar si CRONOS Fase 1 está completo. Si no está, es la primera acción a proponer.
**Skill afectada:** `#pipeline`, `#govIA`, `#sprint`

---

## 2026-05-21 — Acuerdo Andes Salud confirmado por email
**Contexto:** Email "ACUERDO FIRMADO" de comercial@stannum.com.ar
**Aprendizaje:** Nuevo cliente B2B firmado (Andes Salud, Chile) que no estaba registrado en pipeline de ClickUp en el momento de la búsqueda. Evidencia del patrón "acuerdo firmado sin cargar en Kommo/ClickUp".
**Aplicación:** MAX debe verificar en Kommo si el lead de Andes Salud está registrado antes de cerrar cualquier sesión relacionada con GECO.
**Skill afectada:** `#pipeline`, Regla operativa CRM

---

## 2026-05-21 — Pipeline activo de speakers (Brahin)
**Contexto:** Gmail — múltiples emails salientes de eventos@stannum.com.ar el 21/05
**Aprendizaje:** Brahin tiene campaña activa de prospección de agencias de speakers para Martín Merlini (Indole, SIC Congresos, Mentores LA, Grupo Set, Marketers LATAM, Reuniones CL, Eventpro). No está registrada como proyecto en ClickUp — trabajo invisible.
**Aplicación:** Sugerir a Brahin crear tarea de tracking de agencias de speakers en pipeline.
**Skill afectada:** `#pipeline`, TORO

---

## 2026-05-21 — GAS deployado vs pendiente
**Contexto:** Revisión de 7 archivos GAS
**Aprendizaje:** Los scripts GAS están escritos y listos pero el deployment con clasp no está confirmado. Los triggers están documentados en el código pero puede no haber confirmación de que estén activos en producción.
**Aplicación:** En sesión de `#govIA`, preguntar explícitamente a Brahin si los triggers GAS están activos o solo documentados.
**Skill afectada:** `#govIA`, `#buenosdias`

---

## 2026-05-23 — Migración arquitectura a GitHub
**Contexto:** Sesión de reorganización arquitectural
**Aprendizaje:** La arquitectura GitHub + ClickUp + Claude resuelve el problema de dependencia de archivos locales. Drive local y Obsidian son volátiles (dependen de sync en una sola PC). GitHub es la fuente de verdad online-always.
**Aplicación:** Skills y memoria viven en `stannum-max-agent` repo. CLAUDE.md apunta al repo. Drive/Obsidian son archivos históricos de referencia, no fuente activa.
**Skill afectada:** `#memoria`, `#govIA`

---

## 2026-05-24 — Egress policy del entorno bloquea todos los tunnels
**Contexto:** Intento de exponer dev server local con cloudflared, localtunnel, ngrok, serveo, bore, pinggy, tunnelmole, tuns.sh — todos devuelven HTTP 403 `host_not_allowed` del proxy del container.
**Aprendizaje:** El entorno de Claude Code on the web tiene allowlist restrictivo: pasan `github.com` y npm registry, no pasan tunnel providers ni dominios públicos arbitrarios. La única ruta para preview público desde el container es **GitHub Pages** (push a branch `gh-pages` + habilitar Pages en Settings).
**Aplicación:** En sesiones técnicas que requieran preview público para Brahin, ir directo a GH Pages (no perder tiempo intentando tunnels). Si se necesita otro host, pedirle a Brahin que agregue allowlist en Settings → Environment → Network policy antes de empezar.
**Skill afectada:** Cualquier sesión técnica con preview visual (sites, dashboards, demos)

---

## 2026-05-24 — Puppeteer fullPage no dispara IntersectionObserver
**Contexto:** Screenshot fullpage con scroll-reveal basado en IO mostraba sólo el hero — todas las secciones bajo el fold quedaban opacity 0.
**Aprendizaje:** `page.screenshot({fullPage:true})` no scrollea la página; el IO nunca se activa para elementos fuera del viewport inicial. Solución: `page.emulateMediaFeatures([{name:'prefers-reduced-motion', value:'reduce'}])` antes de `goto`. Si el CSS tiene un `@media (prefers-reduced-motion: reduce)` que pone `.anim-in` opacity 1, el screenshot muestra todo.
**Aplicación:** Para audits visuales de sites con reveal animations: emular reduced-motion en el headless browser. Doble beneficio: testás el path de accesibilidad al mismo tiempo.
**Skill afectada:** QA visual, accesibilidad, sesiones de iteración con screenshots

---

## 2026-05-24 — `git worktree --orphan` + `rm -rf .[!.]*` rompe el worktree
**Contexto:** Deploy fallido a gh-pages — el `rm` borró el `.git` pointer file dentro del worktree, los commits siguientes terminaron en la feature branch en vez de gh-pages.
**Aprendizaje:** El glob `.[!.]*` matchea `.git` (single dot). El `.git` en un worktree es un archivo de pointer (no un directorio) y al borrarlo el directorio queda huérfano pero git de afuera lo ve como subdirectorio normal. Resultado: `git add` desde adentro stagea con prefix `.gh-pages-wt/`.
**Aplicación:** Patrón seguro para deploy de dist a branch orphan:
1. Crear worktree en `/tmp` (fuera del repo) — `git worktree add /tmp/gh-pages-wt gh-pages`
2. `find $WT -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +`
3. `cp -r dist/. $WT/` (notar el `/.` para incluir hidden)
4. `touch $WT/.nojekyll`
5. commit + push desde `git -C $WT`
6. `git worktree remove --force $WT`

Si el primer commit termina en la branch equivocada, el rescue es `git reset --hard HEAD~1` (sólo si no se pusheó).
**Skill afectada:** Cualquier deploy via gh-pages, git operations, infra dev

---

## 2026-05-24 — Brief estético oficial > extrapolación
**Contexto:** En una misma sesión hubo 4 pivots de estética del sitio Summit IA Tucumán: High Ticket editorial (80/15/5) → techno cyan neon (cian dominante) → High Ticket restaurado → Manual de Marca oficial. La inversión del primer brief fue detectada por Brahin mismo: "estética cyberpunk barata, no premium".
**Aprendizaje:** Cuando un nuevo brief contradice una regla establecida del deck oficial (High Ticket STETIC, Manual de Marca STANNUM), no ejecutar pasivamente — flaggear la contradicción **antes** de tocar código y pedir confirmación explícita contra el material oficial. El footnote después del fact es insuficiente: ya gastó tokens y ciclos en código que después hay que revertir.
**Aplicación:** Si una instrucción rompe una regla estética/comercial documentada (deck, Manual de Marca, CLAUDE.md), responder con: "Esta instrucción invierte X regla del deck Y. ¿Confirmás que querés desviar?" antes de ejecutar.
**Skill afectada:** Skills de diseño/branding, todas las que tocan output de marca

---

## 2026-05-24 — Brahin envía briefs largos fragmentados por saltos de línea
**Contexto:** Múltiples sesiones donde un brief de 5+ secciones llegó en 5-8 mensajes consecutivos cortados por `\n\n`.
**Aprendizaje:** El flujo natural de Brahin para briefs estructurados es paste por fragments. Si se ejecuta después del primer fragment, se hace doble trabajo. Si se espera demasiado sin acuse, Brahin queda inseguro de si llega completo.
**Aplicación:** Después de cualquier fragment de brief estructurado, responder con resumen capturado entre code-fence + "esperando ERROR/CAMBIO/SECCIÓN N+1". No tocar código hasta señal explícita de "fin de brief", la última instrucción ejecutiva, o un bloque "EJECUCIÓN" / "ACCIONES".
**Skill afectada:** Todas las skills que reciben briefs largos (`#brief`, `#brainstorm`, sesiones técnicas)

---

## Histórico

_(Aprendizajes de proyectos cerrados o superseded por decisiones posteriores)_
