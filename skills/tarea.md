# SKILL: tarea
**Trigger:** `#tarea` · "crear tarea" · "nueva tarea" · "agregá esto a ClickUp" · "cargalo"
**Módulo:** PLANIFICACIÓN
**Output:** Tarea creada en ClickUp con todos los campos completos
**Renombrado de:** `#nueva-tarea` (v1) — simplificado

---

## Propósito

Crear tareas en ClickUp de forma correcta y sin duplicados. El riesgo principal no es crear la tarea — es crearla en el lugar equivocado, sin responsable, sin fecha, o duplicada. Esta skill guía ese proceso.

---

## Listas disponibles en DITEG

| Lista | ID | Usar para |
|-------|-----|-----------|
| MAX \| AGENTE DITEG | `901415394335` | Skills, desarrollo del agente |
| DITEG Gestión Operativa | `901413931989` | Tareas operativas día a día |
| Pipeline de Proyectos | `901415219852` | Proyectos con entregable visible |
| Estandarización 2026 | `901414260373` | Mejora de procesos y docs |
| OKRs STANNUM | `901416331052` | KRs y métricas |
| STANNUM FRONTIER | `901416077985` | Proyecto FRONTIER general |

---

## Protocolo

### PASO 1 — VERIFICAR DUPLICADO (1 llamada)
Antes de crear → buscar si ya existe:
```
clickup_search(query: "[nombre de la tarea]", space_id: "90144409477")
```
Si existe → alertar y preguntar si actualizar o crear nueva.

### PASO 2 — PREGUNTAR EN BLOQUE ÚNICO (si faltan datos)

```
Para crear bien la tarea necesito:
1. ¿En qué lista va? (ver tabla arriba)
2. ¿Quién es el responsable?
3. ¿Cuál es la fecha límite?
4. ¿Qué prioridad? (urgente / alta / normal / baja)
5. ¿Hay alguna descripción o contexto?
```

### PASO 3 — MOSTRAR Y CONFIRMAR

```
Voy a crear:
- Nombre: [nombre]
- Lista: [lista] (ID: [id])
- Responsable: [nombre] (ID: [id])
- Due date: [fecha]
- Prioridad: [prioridad]
- Descripción: [preview]

¿Confirmo?
```

### PASO 4 — CREAR (solo con OK)

Usar `clickup_create_task` con todos los campos.
Post-creación → comentar: `Tarea creada por MAX el [fecha]. Contexto: [1 línea].`

---

## Reglas

- NUNCA crear tarea sin mostrar el resumen primero y recibir confirmación
- Si no hay fecha → proponer una basada en la urgencia declarada
- Si no hay responsable → asignar a Brahin (`174284252`) por defecto, con aviso
- Tarea con descripción vacía = tarea que no se va a ejecutar → insistir en al menos 1 línea de contexto
