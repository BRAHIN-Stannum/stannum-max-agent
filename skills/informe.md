# SKILL: informe
**Trigger:** `#informe` · "informe semanal" · "generá el informe" · "reporte de la semana"
**Módulo:** GOBERNANZA
**Output:** Informe Semanal DITEG — doc estructurado listo para distribuir
**GAS:** Sí — `triggerInformeSemanal` Vie 17:00
**Merge de:** `#informe` (v1) + `#reporte` (v2)

---

## Propósito

Generar el Informe Semanal DITEG que consolida lo logrado, el estado del pipeline, las decisiones clave y las prioridades de la semana siguiente. Es el artefacto de comunicación más importante del área — va a Martín + equipo DITEG.

---

## Fuentes de datos (pull simultáneo)

| Fuente | Qué trae | Herramienta |
|--------|---------|-------------|
| ClickUp — tareas completadas esta semana | Logros reales | `filter_tasks` (statuses: closed, fecha) |
| ClickUp — Pipeline proyectos | Estado general | `filter_tasks` lista `901415219852` |
| ClickUp — Tareas vencidas | Gaps operativos | `filter_tasks` (overdue) |
| Memory — Decisiones de la semana | Contexto estratégico | `memory/decisiones.md` |

---

## Protocolo

### PASO 1 — PULL DE DATOS (3 llamadas paralelas)

```
filter_tasks(space_id: "90144409477", statuses: ["complete"], date_updated_gt: [lunes])
filter_tasks(list_id: "901415219852", statuses: ["in progress"])
filter_tasks(space_id: "90144409477", statuses: ["overdue"])
```

### PASO 2 — REDACTAR

```markdown
# INFORME SEMANAL DITEG — Semana [N] · [fecha lunes] al [fecha viernes]

## Resumen ejecutivo
[3-4 líneas: qué fue la semana, tono general, hito más importante]

## Logros de la semana
- [logro 1] — [área/responsable]
- [logro 2]
- [logro 3]

## Estado del pipeline
| Proyecto | Estado | Semáforo | Próximo hito |
|---------|--------|---------|--------------|

## Decisiones tomadas
- [decisión 1] — [fecha] — [quién]

## Puntos de evolución detectados
- [oportunidad de mejora 1] — [acción correctiva]

## Prioridades semana siguiente
1. [primera prioridad]
2. [segunda]
3. [tercera]

## Indicadores clave
| Métrica | Esta semana | Meta semanal | Tendencia |
|---------|------------|-------------|-----------|

_Generado por MAX · [fecha y hora]_
```

### PASO 3 — DISTRIBUIR (con aprobación)
- Enviar a canal DITEG en Google Chat (ver `gchat-routing.md` — usar `crear_informe(area="DITEG")`)
- Comentar en tarea `M18 #informe` (ID: `86b9g0e25`) con link al doc

---

## Reglas

- No distribuir sin que Brahin revise primero
- "Puntos de evolución" en lugar de "fallas" o "errores"
- Máximo 3 llamadas ClickUp
- Si la semana fue compleja → dar más contexto en el resumen ejecutivo, no suavizarlo
- Informe sin datos reales = no enviarlo · pedir a Brahin que complete
