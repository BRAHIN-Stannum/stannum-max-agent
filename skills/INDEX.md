# MAX — Skills INDEX
**Versión:** 3 módulos / 16 skills · Sin numeración M · Actualizado 2026-05-23

---

## MÓDULO OPERATIVO

| Skill | Trigger | GAS auto | Archivo |
|-------|---------|----------|---------|
| Buenos días | `#buenosdias` · "qué tenemos hoy" | Lun-Vie 07:25 | `buenosdias.md` |
| Semana | `#semana` · "cómo viene la semana" | Dom 20:00 + Lun 09:00 | `semana.md` |
| Cierre | `#cierre` · "cerremos" · "hasta mañana" | Lun-Vie 17:55 | `cierre.md` |

## MÓDULO PLANIFICACIÓN

| Skill | Trigger | GAS auto | Archivo |
|-------|---------|----------|---------|
| Sprint | `#sprint` · "cómo va el sprint" | Lun 09:00 (dentro de #semana) | `sprint.md` |
| Pipeline | `#pipeline` · "cómo está el pipeline" | Lun 09:00 | `pipeline.md` |
| Proyecto | `#proyecto [nombre]` · "análisis de X" | No | `proyecto.md` |
| Bajada | `#bajada [texto]` · "bajada de Martín" | No | `bajada.md` |
| Tarea | `#tarea` · "crear tarea" · "nueva tarea" | No | `tarea.md` |

## MÓDULO GOBERNANZA

| Skill | Trigger | GAS auto | Archivo |
|-------|---------|----------|---------|
| Diagnóstico | `#diagnóstico` · "cómo estamos parados" | No | `diagnostico.md` |
| Equipo | `#equipo` · "estado del equipo" | Lun 09:00 (dentro de #semana) | `equipo.md` |
| GovIA | `#govIA` · "auditoría agentes" | No | `govia.md` |
| Brainstorm | `#brainstorm` · "tengo una idea" | No | `brainstorm.md` |
| Brief | `#brief` · "tengo un proyecto" · "llegó un pedido" | No | `brief.md` |
| SOP | `#sop [área]` · "cómo se hace X" | No | `sop.md` |
| Informe | `#informe` · "informe semanal" | Vie 17:00 | `informe.md` |
| Memoria | `#memoria` · "guardá esto" · "qué recordás de" | No | `memoria.md` |

---

## Utility skills (no de usuario)

| Skill | Uso |
|-------|-----|
| `gchat-routing.md` | Reglas de routing Google Chat STANNUM — NO usar `enviar_mensaje` para DITEG |

---

## GAS — Triggers automáticos

| Función GAS | Horario | Skills activadas |
|-------------|---------|-----------------|
| `triggerBuenDias` | Lun-Vie 07:25 | `#buenosdias` |
| `triggerCheckpoint` | Lun-Vie 12:55 | Modo lite de `#buenosdias` |
| `triggerCierreDia` | Lun-Vie 17:55 | `#cierre` (modo auto) |
| `triggerLunesEstrategico` | Lun 09:00 | `#sprint` + `#pipeline` + `#equipo` |
| `triggerPrepConcentracion` | Dom 20:00 | `#semana` |
| `triggerInformeSemanal` | Vie 17:00 | `#informe` |
