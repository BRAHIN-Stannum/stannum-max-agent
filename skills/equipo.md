# SKILL: equipo
**Trigger:** `#equipo` · "estado del equipo" · "cómo está el equipo" · "quién está haciendo qué" · "carga del equipo"
**Módulo:** GOBERNANZA
**Output:** Dashboard de estado del equipo DITEG: carga, responsabilidades, alertas de delegación
**GAS:** Sí — incluido en `triggerLunesEstrategico` Lun 09:00

---

## Propósito

Ver quién del equipo está sobrecargado, quién tiene capacidad, y si las responsabilidades están bien distribuidas. Detecta trabajo invisible y delegaciones que no están funcionando.

> Fuente: McKinsey "The State of Organizations 2023" — equipos con distribución de carga desbalanceada +30% son 2x más propensos a fallar en plazos. La visibilidad de carga es prerequisito de la coordinación efectiva.

---

## Equipo DITEG activo

| Persona | Rol | ClickUp ID |
|---------|-----|------------|
| Brahin Carrillo | Ventas / Eventos — GECO + EVENTOS | `174284252` |
| Martín Merlini | Fundador / D.T. GECO | `18905578` |
| Sofía Fernández Bravo | ECLI / Operaciones | (ID a confirmar) |
| Nico Darelli | SER CON IA / Agentes | (ID a confirmar) |
| Mateo Lohezic | Infraestructura / IT | (ID a confirmar) |

---

## Protocolo

### PASO 1 — TRAER TAREAS POR PERSONA (2 llamadas)

```
filter_tasks(space_id: "90144409477", assignees: [174284252], statuses: ["in progress", "to do"])
filter_tasks(space_id: "90144409477", assignees: [18905578], statuses: ["in progress", "to do"])
```

### PASO 2 — CALCULAR CARGA

| Nivel | Tareas activas | Interpretación |
|-------|---------------|----------------|
| 🟢 Balanceado | 1–5 | Capacidad disponible |
| 🟡 Cargado | 6–10 | Monitorear, no agregar más |
| 🔴 Sobrecargado | +10 | Redistribuir o repriorizar |

### PASO 3 — DETECTAR ALERTAS

- **Trabajo sin dueño:** tareas vencidas sin assignee
- **Concentración de carga:** un solo responsable con +70% de las tareas urgentes
- **Delegaciones caídas:** tarea asignada pero sin actividad +7 días

### PASO 4 — OUTPUT

```
👥 ESTADO EQUIPO DITEG — [FECHA]

| Persona | Tareas activas | Urgentes | Estado | Alerta |
|---------|---------------|---------|--------|--------|
| Brahin  | [N] | [N] | 🟡 | [si hay] |
| Martín  | [N] | [N] | 🟢 | — |

⚠️ ALERTAS:
- [alerta 1] → [acción sugerida]

DISTRIBUCIÓN DE CARGA:
- [visualización simple de quién lleva qué]

PROPUESTA:
→ [si hay desequilibrio] reasignar [X] a [persona]
```

---

## Reglas

- Máximo 3 llamadas ClickUp
- No reasignar tareas sin aprobación de Brahin
- Si Brahin está sobrecargado → proponer 3 tareas para delegar, no solo reportar
- Trabajo sin dueño → proponer dueño antes de cerrar el output
