# MAX — Patrones
**Actualizado:** 2026-05-23

Comportamientos recurrentes en la dirección estratégica de STANNUM. Lo que se repite en sprints, diagnósticos y revisiones.

---

## Sprints sin cierre formal
**Observado:** Patrón base · primera vez: 2026-05-21
**Descripción:** Se inicia un sprint con objetivos claros pero no hay ritual de cierre — las tareas quedan "In progress" indefinidamente.
**Señal:** Sprint con +2 semanas de antigüedad y tareas en estado "In progress".
**Respuesta validada:** Activar `#sprint` para revisar estado y forzar cierre o re-priorización. No arrancar sprint nuevo sin cerrar el anterior.
**Skill relacionada:** `#sprint`

---

## Pedido estratégico sin fuente
**Observado:** Patrón base · primera vez: 2026-05-21
**Descripción:** Se solicita análisis o recomendación estratégica sin datos de respaldo.
**Señal:** El pedido usa "creo que", "deberíamos" sin citar números o benchmarks.
**Respuesta validada:** MAX provee la fuente correspondiente (Microsoft WTI, McKinsey, BCG, etc.) antes de avanzar. Sin fuente = opinión, no estrategia.
**Skill relacionada:** `#diagnóstico`, `#informe`

---

## Proyectos vivos invisibles en ClickUp
**Observado:** 2 veces confirmadas · primera vez: 2026-05-21 (M11 detecta 15 gaps)
**Descripción:** Existen proyectos activos que aparecen en reuniones e informes pero no tienen tarea en ClickUp. Trabajo invisible que no se mide ni prioriza.
**Señal:** `#pipeline` detecta gaps al cruzar informe/reunión vs lista PIPELINE. Gap count > 5 = equipo operando fuera del sistema.
**Respuesta validada:** Congelar avance y hacer triage con Brahin: ¿cuáles entran al pipeline y cuáles son tácticas operativas? No crear tareas masivas sin aprobación.
**Skill relacionada:** `#pipeline`, `#sprint`

---

## Token/credencial expuesto sin rotación inmediata
**Observado:** 1 vez · 2026-05-21 (ALERTA-001 en CRONOS)
**Descripción:** Token de API (ClickUp) quedó expuesto en repositorio y la tarea de rotación no tiene fecha asignada ni urgencia activa.
**Señal:** Tarea tipo ALERTA- en lista CRONOS sin fecha límite.
**Respuesta validada:** Escalar a Brahin como primer ítem de sesión. Token expuesto invalida la seguridad de todo el ecosistema agéntico.
**Skill relacionada:** `#govIA`

---

## Acuerdos firmados sin entrada en Kommo
**Observado:** 1 vez confirmada · 2026-05-21 (Andes Salud)
**Descripción:** Acuerdo comercial confirmado por email pero no registrado en Kommo CRM. Pipeline CRM queda desactualizado.
**Señal:** Email con "ACUERDO FIRMADO" o similar sin correspondiente lead en Kommo con status actualizado.
**Respuesta validada:** Verificar Kommo antes de cerrar sesión. Si no está registrado → crear lead con datos del email + notificar GECO en Google Chat.
**Skill relacionada:** TORO, Regla operativa CRM

---

## Infraestructura crítica pospuesta por trabajo visible
**Observado:** 1 vez confirmada · 2026-05-21 (CRONOS Fase 1 vencida)
**Descripción:** Tareas de infraestructura (CRONOS setup, token rotation) se posponen porque hay trabajo de "impacto visible" (eventos, pipeline, clientes). La deuda técnica acumula.
**Señal:** Tareas de Fase 1/2 de infraestructura con fecha vencida mientras tareas de cliente siguen activas.
**Respuesta validada:** Infraestructura → agentes → procesos. No lanzar nueva iniciativa agéntica sin CRONOS Fase 1 operativa.
**Skill relacionada:** `#govIA`, `#sprint`

---

## Infraestructura escribe donde no esperás — verificar destino antes de ejecutar
**Observado:** 1 vez confirmada · 2026-05-23 (MCP en settings.json vs ~/.claude.json)
**Descripción:** Al configurar infraestructura nueva (MCP, permisos, variables), el comando escribe en un lugar diferente al que se asume. `settings.json` no acepta `mcpServers` pero no lo dice explícitamente. El error se descubre solo cuando el MCP no aparece en `claude mcp list`.
**Señal:** Infraestructura configurada que no responde. Ausencia de error explícito = síntoma de escritura en lugar equivocado.
**Respuesta validada:** Antes de cualquier configuración de infraestructura nueva → leer la documentación del comando exacto. Para MCP: `claude mcp add -s user`. Para settings: `/config` o editar `~/.claude/settings.json` directamente.
**Skill relacionada:** `#govIA`

---

## Documentación inter-agente no viaja sola — hay que llevarla
**Observado:** 1 vez confirmada · 2026-05-23 (CRONOS no veía el brief de MAX)
**Descripción:** Un documento creado en el repo/carpeta de MAX no es automáticamente visible para CRONOS. Cada agente tiene su propio contexto de lectura. Si CRONOS necesita algo, debe estar en `0. CRONOS/` o en `stannum-cronos-agent/`.
**Señal:** Pedido de coordinación cross-agente donde el agente receptor dice "no tengo esa información".
**Respuesta validada:** Al producir documentos de proceso o arquitectura que impactan a múltiples agentes: (1) guardar en el repo del agente autor, (2) copiar a la carpeta del agente receptor, (3) actualizar el CLAUDE.md del receptor con la referencia.
**Skill relacionada:** `#govIA`, coordinación cross-agente

---

## Pedidos de arquitectura de agentes → mismo stack siempre
**Observado:** Patrón emergente · 2026-05-23 (MAX como piloto)
**Descripción:** Cada vez que se define o migra un agente, el stack converge al mismo patrón: GitHub + Claude Code + MCP custom + ClickUp. No hay variantes.
**Señal:** Cualquier pedido del tipo "crear agente X", "migrar agente Y", "¿cómo estructuro Z?".
**Respuesta validada:** Respuesta inmediata: "Stack estándar STANNUM — ver `CRONOS-BRIEF-AGENTES.md` para el proceso en 7 fases." No diseñar desde cero.
**Skill relacionada:** `#govIA`, arquitectura cross-agente

---

## Campañas de prospección activas sin registro en pipeline
**Observado:** 1 vez confirmada · 2026-05-21 (emails speakers Brahin)
**Descripción:** Brahin ejecuta campañas de prospección (agencias speakers, leads B2B post-eventos) pero el trabajo no tiene tarea de tracking en ClickUp — trabajo invisible.
**Señal:** Múltiples emails salientes del mismo tipo en Gmail sin tarea correspondiente en PIPELINE o TORO.
**Respuesta validada:** Proponer a Brahin crear tarea "Tracking [campaña]" en pipeline con fecha de revisión.
**Skill relacionada:** `#pipeline`, TORO
