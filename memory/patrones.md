# MAX — Patrones
**Actualizado:** 2026-05-25

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
**Observado:** 3 veces confirmadas · primera vez: 2026-05-21 (ALERTA-001 ClickUp) · última: 2026-05-25 (2 tokens Vercel `vcp_2obDpy...` y `vcp_7Guiz6...` pegados en chat por Brahin para deploy fallido)
**Descripción:** Tokens de API quedan expuestos en repositorios, chats o logs. La rotación se posterga o no se hace. El patrón se extiende más allá de ClickUp — aparece en cualquier integración nueva donde Brahin necesita autorizar rápido (Vercel, GitHub, AI tools).
**Señal:** (a) Tarea ALERTA- en CRONOS sin fecha. (b) Token pegado en chat de Claude para que MAX ejecute un comando. (c) Múltiples tokens del mismo servicio generados en rápida sucesión durante debug.
**Respuesta validada:** (1) Advertir explícitamente antes de ejecutar que el token quedó en logs y debe rotarse al terminar. (2) Al cerrar sesión, listar tokens expuestos en el resumen y confirmar revocación. (3) Para integraciones nuevas, sugerir flujos sin token (UI manual, login interactivo local) como default y solo escalar a token si Brahin pide explícitamente.
**Skill relacionada:** `#govIA`, `#cierre`

---

## Brahin manda comandos cortados por formato markdown
**Observado:** 4+ veces confirmadas · primera vez: 2026-05-25 (sesión deploy Vercel)
**Descripción:** Brahin pega instrucciones tipo "Ejecutá este bash exacto:" seguidas de un bloque que llega vacío o cortado por el cliente de chat. El backtick triple, los caracteres especiales o el copy/paste desde otro chat (v0, Claude web) rompen el formato y MAX recibe el texto sin el comando real.
**Señal:** Mensaje termina abrupto con ":" o "Ejecut" sin contenido posterior, o aparece un fragmento de código suelto sin contexto (`home/user/...`, `bash`, etc.) en medio del texto.
**Respuesta validada:** No intentar reconstruir el comando ni adivinar. Pedir reenvío en texto plano sin markdown o como bloque triple-backtick explícito. Confirmar antes de ejecutar.
**Skill relacionada:** Operativa general

---

## Sandbox cloud + auth IP-bound = falla recurrente y diagnóstico engañoso
**Observado:** 1 vez confirmada · primera vez: 2026-05-25 (Vercel allowlist)
**Descripción:** Servicios externos con restricción de IP (allowlist, OIDC bound to host, AWS SCP por IP) rechazan TODAS las requests desde el sandbox de Claude Code en la nube. Los errores que devuelven son engañosos — "token not valid", "scope not accessible", "unauthorized" — porque traducen el 403 según el endpoint en lugar de decir "tu IP no está autorizada". Esto lleva a debugging circular: probar tokens nuevos, variar flags, regenerar credenciales — todo inútil hasta diagnosticar la causa real.
**Señal:** (a) Mismo comando, múltiples tokens, mismos errores inconsistentes. (b) CLI funciona local pero falla en sandbox. (c) Curl directo a la API revela el mensaje real (`Host not in allowlist`, `IP not authorized`, etc.).
**Respuesta validada:** Si el primer intento falla con un error de auth y el segundo intento (con token rotado o flag cambiado) falla con otro error de auth distinto pero relacionado, NO probar un tercero. Ir directo al endpoint REST con `curl` para ver el mensaje real. Si es IP-bound: redirigir a flujo local (`vercel login` interactivo en máquina de Brahin) o UI manual. Documentar que el sandbox es cloud-only.
**Skill relacionada:** `#govIA`, Operativa de integraciones

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
