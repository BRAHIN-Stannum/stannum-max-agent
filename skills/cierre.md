# SKILL: cierre
**Trigger:** `#cierre` · "cerremos" · "terminamos" · "hasta mañana" · "fin de sesión"
**Módulo:** OPERATIVO
**Output:** Resumen de sesión + pendientes actualizados en ClickUp L1
**GAS:** Sí — `triggerCierreDia` Lun-Vie 17:55 (modo auto) · Manual en sesión Claude
**Merge de:** `#cierredia` (GAS) + `cierre-sesion` (Claude)

---

## Propósito

Garantizar que ninguna sesión termine sin registro. Convierte lo trabajado en contexto reutilizable para la próxima sesión. El cierre automático del GAS registra el fin del día; el cierre manual en Claude documenta la sesión específica.

---

## Modo Auto (GAS 17:55)

El trigger GAS ejecuta `notificarCierreDia()` que:
1. Trae tareas completadas hoy
2. Trae tareas vencidas sin cerrar
3. Envía resumen al canal MAXI/Brahin en Google Chat

---

## Modo Manual (Claude — en sesión)

### PASO 1 — SINTETIZAR (sin herramientas)

Resumir la sesión en 3-5 bullets:
- ¿Qué se decidió?
- ¿Qué se creó o modificó?
- ¿Qué quedó pendiente?

### PASO 2 — ACTUALIZAR L1 EN CLICKUP (1 llamada máximo)

Para cada tarea tocada en la sesión:
- Si se avanzó → comentar: `📍 UPDATE — [qué avanzó] — [fecha]`
- Si se completó → comentar: `✅ COMPLETADO — [resultado] — [link si aplica]` + cambiar status
- Si quedó bloqueada → comentar: `🔴 BLOQUEADO — [razón] — escalando a Brahin`

### PASO 3 — PENDIENTES PRÓXIMA SESIÓN

| Pendiente | Prioridad | Requiere |
|-----------|-----------|---------|
| [acción] | Alta/Media | [qué necesita para avanzar] |

### PASO 4 — PREGUNTAS DE MEMORIA

1. ¿Aprendí algo sobre cómo operar mejor DITEG? → `memory/aprendizajes.md`
2. ¿Tomé alguna decisión de priorización o derivación? → `memory/decisiones.md`
3. ¿Vi un tipo de pedido que ya apareció antes? → `memory/patrones.md`

### PASO 5 — MENSAJE DE CIERRE

```
✅ SESIÓN CERRADA — [FECHA]
Hecho: [bullet 1] · [bullet 2] · [bullet 3]
Pendiente: [N items]
Próxima sesión: [qué arrancar primero]
```

---

## Reglas

- Siempre ejecutar al final de sesión, aunque sea breve
- Máximo 1 llamada a ClickUp en el cierre
- No crear tareas nuevas en el cierre sin aprobación explícita
- Si hay ALERTA-001 activa → recordarla en el mensaje de cierre
