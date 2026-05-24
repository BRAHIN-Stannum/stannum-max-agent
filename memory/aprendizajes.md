# MAX — Aprendizajes
**Actualizado:** 2026-05-23

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

## 2026-05-23/24 — MCP se registra en `~/.claude.json`, no en `settings.json`
**Contexto:** Intento fallido de registrar MCP via `settings.json`
**Aprendizaje:** `mcpServers` no es un key válido en `settings.json`. El mecanismo correcto es `claude mcp add -s user` que escribe en `~/.claude.json`. El validador de schema de `settings.json` lo rechaza silenciosamente — no hay error visible.
**Aplicación:** Al configurar cualquier MCP en el ecosistema: usar `claude mcp add -s user stannum-[agente] node "ruta/server.js" --env KEY=value`. Verificar con `claude mcp list`.
**Skill afectada:** `#govIA`

---

## 2026-05-23/24 — Hash commands desde el día 1 — la numeración es deuda técnica garantizada
**Contexto:** Revisión de las 16 skills de MAX con numeración M06-M18
**Aprendizaje:** La numeración M-XX genera deuda técnica inmediata: cualquier skill nueva o eliminada rompe la secuencia y obliga a renombrar todo. Hash commands (`#buenosdias`, `#sprint`, etc.) son inmutables e independientes del orden.
**Aplicación:** En CRONOS, TORO, LARA, CHEBA, KAIROS — usar hash commands desde el primer commit. Nunca asignar número de módulo.
**Skill afectada:** Todas · arquitectura cross-agente

---

## 2026-05-23/24 — Cada agente necesita su propio repo — no hay acceso cross-carpeta nativo
**Contexto:** CRONOS no podía ver el brief de migración que estaba en el repo de MAX
**Aprendizaje:** Claude Code lee el CLAUDE.md del directorio donde se abre la sesión. Un agente no puede acceder a archivos de otro agente a menos que: (a) estén en su carpeta local Drive, (b) tenga un MCP apuntando a ese repo. La solución no es un repo compartido — es copiar los documentos críticos a la carpeta del agente receptor.
**Aplicación:** Todo documento que CRONOS necesita operar debe estar en `0. CRONOS/` o en `stannum-cronos-agent/`. No asumir que "está en el repo de MAX entonces CRONOS lo ve".
**Skill afectada:** `#govIA`, arquitectura cross-agente

---

## 2026-05-23/24 — El primer commit tarda — una vez hecho, actualizar es trivial
**Contexto:** Migración de MAX a GitHub
**Aprendizaje:** La resistencia al primer commit es psicológica. El proceso de setup (repo, estructura, MCP) toma ~3hs pero solo se hace una vez. Después de eso: `git add . && git commit && git push` = 30 segundos. No esperar que las skills estén perfectas para hacer el primer push.
**Aplicación:** Para CRONOS, TORO y los demás — arrancar con un CLAUDE.md y un README vacío. El primer commit desbloquea todo lo que viene.
**Skill afectada:** Arquitectura · proceso de creación de agentes

---

## 2026-05-23/24 — CLAUDE.md es el artefacto más importante del agente
**Contexto:** Diseño del proceso estándar de creación de agentes
**Aprendizaje:** Si el CLAUDE.md está bien escrito (identidad, reglas, IDs críticos, módulos, protocolo de inicio), el agente funciona incluso con skills incompletas. Si el CLAUDE.md es pobre, el agente necesita contexto manual en cada sesión. La inversión en CLAUDE.md tiene el mayor ROI de toda la arquitectura.
**Aplicación:** Dedicar la mayor parte del tiempo de setup de un agente nuevo al CLAUDE.md. Las skills se pueden mejorar con un commit; el CLAUDE.md malo se sufre en cada sesión.
**Skill afectada:** Proceso de creación de agentes · `#govIA`

---

## Histórico

_(Aprendizajes de proyectos cerrados o superseded por decisiones posteriores)_
