# SKILL: proyecto
**Trigger:** `#proyecto [nombre]` · "análisis de X" · "cómo está el proyecto Y" · "dame un deep dive de Z"
**Módulo:** PLANIFICACIÓN
**Output:** Análisis profundo de un proyecto: estado, hitos, bloqueantes, próximos pasos

---

## Propósito

Zoom sobre un proyecto específico del pipeline. Mientras `#pipeline` da la vista macro (todos los proyectos), `#proyecto` hace el deep dive sobre uno solo: qué tiene pendiente, quién lo bloquea y qué necesita para avanzar esta semana.

---

## Fuentes de datos

| Fuente | Qué consulta | Herramienta |
|--------|-------------|-------------|
| ClickUp tarea del proyecto | Sub-tareas, comentarios, historial | `get_task` + `get_task_comments` |
| ClickUp Pipeline `901415219852` | Contexto del proyecto en pipeline | `get_task` |

---

## Protocolo

### PASO 1 — IDENTIFICAR LA TAREA
Si Brahin da nombre → buscar en Pipeline con `clickup_search` o `filter_tasks`
Si da ID directo → usar `get_task`

### PASO 2 — LEER COMPLETO (2 llamadas)
- `get_task` → descripción, status, assignee, due date, prioridad
- `get_task_comments` → historial de actividad reciente

### PASO 3 — ANÁLISIS

```
📁 PROYECTO — [NOMBRE]
Status: [status] · Owner: [nombre] · Due: [fecha] · Prioridad: [prioridad]

ESTADO ACTUAL
[resumen de qué tan avanzado está — basado en comentarios y sub-tareas]

HITOS COMPLETADOS
- [hito 1] ✅ [fecha]

HITOS PENDIENTES
- [hito 2] 📅 [fecha] · [responsable]

BLOQUEANTES
- [bloqueante 1] → [quién debe resolverlo] → [opción sugerida]

PRÓXIMOS PASOS (esta semana)
1. [acción concreta]
2. [segunda acción]

RIESGO: 🟢 / 🟡 / 🔴 — [razón]
```

### PASO 4 — PROPUESTA DE ACCIÓN
Si el proyecto está 🔴 → proponer a Brahin: continuar / pausar / cerrar / reasignar

---

## Reglas

- Máximo 3 llamadas ClickUp
- No crear sub-tareas ni modificar el proyecto sin aprobación
- Si el proyecto no existe en CU → no inventar datos · alertar y ofrecer usar `#brief` para crearlo
- Fuente de análisis = datos reales de CU, no suposiciones
