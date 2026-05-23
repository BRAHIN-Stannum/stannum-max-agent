# SKILL: buenosdias
**Trigger:** `#buenosdias` · "buen día" · "buenos días" · "cómo arrancamos" · "qué tenemos hoy"
**Módulo:** OPERATIVO
**Output:** Dashboard diario en 4 bloques: AGENDA / BRAHIN / CLAUDE / REPROGRAMAR
**GAS:** Sí — `triggerBuenDias` Lun-Vie 07:25 · `triggerCheckpoint` 12:55 (modo lite)
**Doc ClickUp:** `c9ra2-20834`

---

## Propósito

Arrancar cada día con visibilidad completa: qué hay en el calendario, qué está vencido, qué hace Brahin y qué hace Claude. Elimina la pregunta "¿por dónde arranco?"

---

## Fuentes de datos

| Fuente | Qué consulta | Herramienta MCP |
|--------|-------------|-----------------|
| Google Calendar `eventos@stannum.com.ar` | Agenda HOY + reuniones AYER | `list_events` |
| Drive carpeta Meet Recordings `17Ud_r0JZtUog3xY4AE5idywQw3GuMdmA` | Archivos de AYER (Gemini Notes) | `list_recent_files` |
| ClickUp | Tareas due_date = HOY (assignees: `174284252` + `18905578`) | `filter_tasks` |
| ClickUp | Tareas vencidas due_date < HOY (mismo filtro, max 100) | `filter_tasks` |

> **REGLA CRÍTICA:** Siempre usar AMBOS user IDs: `[174284252, 18905578]`
> Split queries HOY / VENCIDAS — API max 100/página
> **Máximo 4 llamadas total**

---

## Protocolo

### PASO 1 — LEER (paralelo, 4 llamadas simultáneas)
Calendar hoy · Drive notas ayer · ClickUp tareas hoy · ClickUp tareas vencidas

### PASO 2 — CATEGORIZAR cada ítem

| Cubo | Criterio |
|------|---------|
| BRAHIN | Requiere presencia, aprobación o decisión |
| CLAUDE | Puede ejecutarse en la sesión (redacción, análisis, carga CU) |
| REPROGRAMAR | Tarea vencida que necesita nueva fecha |

### PASO 3 — OUTPUT en 4 bloques

```
📆 AGENDA DE HOY — [DÍA] [FECHA]
[Reuniones con hora + quién + link]

✅ LO QUE HACE BRAHIN
- [acción] — [deadline o contexto]

🤖 LO QUE HACE CLAUDE
- [tarea] — [ETA en la sesión]

🔄 REPROGRAMAR
- [tarea vencida] | due original [fecha] | nueva fecha propuesta: [fecha]
```

### PASO 4 — ALERTA-001 (si activa)
```
⚠️ ALERTA-001 ACTIVA — Rotar token con Mateo Lohezic · Tarea `86ba2ehnn`
```

---

## Reglas

- Ejecutar ANTES de hablar de cualquier otra cosa en la sesión
- No inventar tareas: solo reportar lo que está en ClickUp y Calendar
- Si hay reunión con cliente → mencionar empresa + qué se espera lograr
- Tarea vencida +7 días → marcar 🚨 URGENTE
- Si hay 0 tareas hoy → igual reportar el bloque de vencidas
