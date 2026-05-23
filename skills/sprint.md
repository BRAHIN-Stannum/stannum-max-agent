# SKILL: sprint
**Trigger:** `#sprint` · "cómo va el sprint" · "estado del sprint" · "qué hay en el sprint activo"
**Módulo:** PLANIFICACIÓN
**Output:** Estado del sprint activo con semáforo por tarea y gate tasks vencidas
**GAS:** Sí — incluido en `triggerLunesEstrategico` Lun 09:00
**Doc ClickUp:** Lista `MAX | AGENTE DITEG` (`901415394335`) + sprints DITEG

---

## Propósito

Fotografía del sprint activo: qué avanzó, qué está atascado, qué gate tasks vencieron. El sprint no se cierra solo — esta skill fuerza el ritual de cierre o re-priorización.

**Patrón detectado:** Sprints sin cierre formal son el gap más frecuente en DITEG. Si el sprint lleva +2 semanas y hay tareas "In progress", activar esta skill.

---

## Fuentes de datos

| Fuente | Qué consulta | Herramienta |
|--------|-------------|-------------|
| ClickUp Space DITEG | Tareas del sprint activo con status | `filter_tasks` |
| ClickUp DITEG Operativa `901413931989` | Tareas operativas en sprint | `filter_tasks` |

---

## Protocolo

### PASO 1 — TRAER SPRINT ACTIVO (1 llamada)

```
filter_tasks(
  space_id: "90144409477",
  statuses: ["in progress", "to do"],
  assignees: [174284252, 18905578],
  due_date_lt: [fin del sprint]
)
```

### PASO 2 — CLASIFICAR por semáforo

| Color | Criterio |
|-------|---------|
| 🟢 ON TRACK | Avanzando, responsable activo, no vencida |
| 🟡 EN RIESGO | Sin actividad +5 días o sub-tareas vencidas |
| 🔴 BLOQUEADA | Vencida +7 días · sin responsable · bloqueada sin decisión |
| ⭕ GATE TASK | Tarea crítica de desbloqueo — si vence, alertar primero |

### PASO 3 — DETECTAR GATE TASKS

Si alguna tarea tiene tag `gate` o incluye "gate" en el nombre y está vencida → escalar a Brahin antes del resto del reporte.

### PASO 4 — OUTPUT

```
🏃 SPRINT ACTIVO — [nombre sprint] · S[N]
Estado general: 🟢 / 🟡 / 🔴

| Tarea | Status | Responsable | Due | Estado |
|-------|--------|-------------|-----|--------|

⭕ GATE TASKS VENCIDAS (requieren acción inmediata):
- [tarea] — vencida [N] días — [qué desbloquea]

📊 DISTRIBUCIÓN:
- On track: [N] · En riesgo: [N] · Bloqueadas: [N]

PROPUESTA:
→ Cerrar sprint / Continuar / Replanning
```

---

## Reglas

- No arrancar sprint nuevo sin cerrar el anterior formalmente
- Si +3 tareas rojas → proponer replanning del sprint, no continuar
- Gate tasks vencidas = escalación inmediata, antes que cualquier otra cosa
- Si Brahin pide arrancar sprint nuevo → ejecutar `#sprint` primero para cerrar el actual
