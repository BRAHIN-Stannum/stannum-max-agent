# MAX — Patrones
**Actualizado:** 2026-05-24

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

## Campañas de prospección activas sin registro en pipeline
**Observado:** 1 vez confirmada · 2026-05-21 (emails speakers Brahin)
**Descripción:** Brahin ejecuta campañas de prospección (agencias speakers, leads B2B post-eventos) pero el trabajo no tiene tarea de tracking en ClickUp — trabajo invisible.
**Señal:** Múltiples emails salientes del mismo tipo en Gmail sin tarea correspondiente en PIPELINE o TORO.
**Respuesta validada:** Proponer a Brahin crear tarea "Tracking [campaña]" en pipeline con fecha de revisión.
**Skill relacionada:** `#pipeline`, TORO

---

## Brief largo fragmentado por saltos de línea
**Observado:** 3+ veces · primera vez: 2026-05-24 (refactor Summit IA Tucumán — brief estético en 5 fragments, después brief de cambios críticos en 3 fragments, después brief de alto impacto fragmentado)
**Descripción:** Brahin paste briefs estructurados directamente del Drive/Notes y los saltos de línea cortan el mensaje en 5-8 envíos consecutivos. Si se ejecuta después del primer fragment, se hace doble trabajo. Si se espera sin acuse, Brahin queda inseguro.
**Señal:** Mensaje que empieza con header tipo "BRIEF" / "ERROR 1" / "CAMBIO 1" + termina sin frase ejecutiva clara, o el contenido se corta a media oración.
**Respuesta validada:** Después de cada fragment: acuse breve con resumen capturado entre code-fence + "esperando ERROR/CAMBIO N+1". NO tocar código hasta el último fragment (terminado en bloque "EJECUCIÓN" / "ACCIONES" / "FLUJO").
**Skill relacionada:** Todas las que reciben briefs largos (`#brief`, sesiones técnicas)

---

## Pivots estéticos mid-flow con auto-corrección
**Observado:** 1 vez confirmada · 2026-05-24 (sitio Summit: 4 pivots — High Ticket → cyberpunk cyan → High Ticket restored → Manual de Marca oficial)
**Descripción:** Brahin pide cambios estéticos, ve el resultado y detecta él mismo que se desvió del deck oficial / Manual de Marca. Pide vuelta atrás. El ciclo se repite hasta anclar contra material de referencia oficial.
**Señal:** Una instrucción contradice una regla establecida en deck/Manual citado en sesión anterior. O Brahin escribe "el sitio actual tiene errores críticos" / "lo que hicimos está mal".
**Respuesta validada:** Cuando un nuevo brief invierte una regla estética/comercial documentada, FLAGGEAR la contradicción **antes** de ejecutar — no después. Pedir "¿confirmás que querés desviar contra X regla del deck Y?" antes de tocar código. Mantener feature branch + deploy branch separadas para que el rollback sea barato.
**Skill relacionada:** Skills de diseño/branding, sesiones de producto

---

## Validación visual por screenshot después de cada milestone
**Observado:** Patrón base en sesiones técnicas · 2026-05-24
**Descripción:** Brahin pide screenshots (desktop + mobile + fullpage + secciones específicas) después de cada cambio mayor para validar antes de continuar. No confía en "build pass" como signal de éxito — quiere ver el resultado renderizado.
**Señal:** Tarea de coding con output visual (UI, sites, dashboards, decks).
**Respuesta validada:** Después de build/cambio mayor, generar screenshots con puppeteer (emulating reduced-motion para capturar elementos con scroll-reveal), enviarlos con SendUserFile, y resumir lo aplicado/pendiente. No deployar hasta que Brahin valide visualmente.
**Skill relacionada:** Cualquier skill con output visual, QA
