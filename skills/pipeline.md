# SKILL: pipeline
**Trigger:** `#pipeline` · "pipeline review" · "cómo está el pipeline" · "qué proyectos activos" · "en qué estamos metiendo foco"
**Módulo:** PLANIFICACIÓN
**Output:** Diagnóstico ejecutivo del pipeline agrupado por pilar DITEG
**GAS:** Sí — `triggerLunesEstrategico` Lun 09:00
**Doc ClickUp:** `c9ra2-20874`

---

## Propósito

Fotografía semanal del Pipeline de Proyectos STANNUM. Detecta bloqueados, calcula distribución de esfuerzo y entrega diagnóstico ejecutivo en menos de 2 minutos de lectura.

**Alerta:** Si M11 detecta proyectos en informes o reuniones sin entrada en ClickUp (gaps > 5) → congelar avance y hacer triage con Brahin antes de crear nada.

---

## Fuentes de datos

| Lista | ID | Contenido |
|-------|-----|-----------|
| PIPELINE DE PROYECTOS | `901415219852` | Proyectos DITEG activos con status y responsable |
| Space DITEG | `90144409477` | Tareas activas por área |

---

## Protocolo

### PASO 1 — TRAER PIPELINE (1 llamada)

```
filter_tasks(
  list_ids: ["901415219852"],
  assignees: [174284252, 18905578],
  order_by: "due_date"
)
```

### PASO 2 — CLASIFICAR por pilar DITEG

| Pilar | Áreas |
|-------|-------|
| ESTRUCTURA Y GOBERNANZA | DITEG · ADFIN · GEQ |
| OPERATIVO | ECLI · MARK |
| COMERCIAL | GECO · EVENTOS |
| EXPANSIÓN | Nuevos mercados · Speaker |
| IA | SER CON IA · Agentes |

### PASO 3 — SEMÁFORO por proyecto

- 🟢 VERDE: on track, responsable activo, no vencido
- 🟡 AMARILLO: sin actividad +7 días o sub-tareas vencidas
- 🔴 ROJO: vencido +14 días · sin responsable · bloqueado sin decisión

### PASO 4 — OUTPUT ejecutivo

```
PIPELINE REVIEW — [FECHA] — Semana [N]
Estado general: 🟢 / 🟡 / 🔴

| Proyecto | Pilar | Estado | Responsable | Due | Próximo hito |
|---------|-------|--------|------------|-----|-------------|

BLOQUEADOS (requieren decisión):
- [proyecto] → [bloqueante] → opción A / opción B

DISTRIBUCIÓN DE ESFUERZO:
- Brahin: [N proyectos] · [N urgentes]
- Martín: [N proyectos]

TOP 3 ACCIONES PARA ESTA SEMANA:
1. [acción más urgente]
2. [segunda]
3. [tercera]
```

---

## Reglas

- Máximo 2 llamadas ClickUp
- Si +3 proyectos en rojo → pipeline en riesgo → escalar a Brahin
- Proyectos completados → mencionar aparte, no en la tabla principal
- Proyecto +30 días sin movimiento → proponer cerrar o archivar
- Trabajo invisible detectado (proyecto mencionado pero sin tarea CU) → proponer crear tarea de tracking, nunca crearla sin aprobación
