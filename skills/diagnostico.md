# SKILL: diagnostico
**Trigger:** `#diagnóstico` · "cómo estamos parados" · "análisis situacional" · "Bernabéu" · "diagnóstico DITEG"
**Módulo:** GOBERNANZA
**Output:** Análisis situacional DITEG usando el framework Táctica Bernabéu

---

## Propósito

Análisis de la posición real de STANNUM/DITEG: qué tenemos, qué nos falta, dónde estamos ganando y dónde estamos perdiendo. Usa la metodología Bernabéu como framework de diagnóstico.

> Fuente: Microsoft Work Trend Index 2025 — los FRONTIER FIRMS lideran con datos, no con intuición. Un diagnóstico sin datos = opinión. Esta skill fuerza el anclaje en números reales.

---

## Framework Táctica Bernabéu

| Pilar | Pregunta | Fuente de datos |
|-------|---------|-----------------|
| **Cash / Estabilidad** | ¿Tenemos 3 meses de runway? ¿Margen positivo? | ADFIN |
| **Pipeline** | ¿El pipeline alcanza para cerrar el mes? | Kommo + ClickUp |
| **Equipo** | ¿Tenemos el equipo para ejecutar? ¿Hay gaps? | `#equipo` |
| **Infraestructura** | ¿Los sistemas están operativos? ¿CRONOS activo? | `#govIA` |
| **OKRs** | ¿Vamos on track a USD 1M? ¿Qué Key Result está rojo? | ClickUp OKRs |

**Bernabéu Cash Rule:** No lanzar evento o campaña propia sin 3 meses de reserva + ROI verificado.

---

## Protocolo

### PASO 1 — PULL DE DATOS (paralelo, máximo 3 llamadas)

```
filter_tasks(list_id: "901416331052")  ← OKRs
filter_tasks(list_id: "901415219852", statuses: ["in progress"])  ← Pipeline activo
filter_tasks(space_id: "90144409477", statuses: ["overdue"])  ← Vencidas
```

### PASO 2 — SEMÁFORO POR PILAR

Para cada pilar → 🟢 / 🟡 / 🔴 con evidencia de datos reales.

### PASO 3 — OUTPUT

```
🎯 DIAGNÓSTICO DITEG — [FECHA]

POSICIÓN GENERAL: 🟢 / 🟡 / 🔴

| Pilar | Estado | Evidencia | Acción |
|-------|--------|----------|--------|
| Cash / Estabilidad | 🟡 | [dato] | [acción] |
| Pipeline | 🔴 | [dato] | [acción] |
| Equipo | 🟢 | [dato] | — |
| Infraestructura | 🔴 | CRONOS Fase 1 vencida | Ejecutar esta semana |
| OKRs | 🟡 | [dato] | [acción] |

TOP 3 PRIORIDADES ESTRATÉGICAS:
1. [primera — mayor impacto / más urgente]
2. [segunda]
3. [tercera]

FUENTE: [Microsoft WTI 2025 / McKinsey / etc. si aplica]
```

### PASO 4 — PROPUESTA DE FOCO
Si hay más de 1 pilar rojo → recomendar foco: "no se puede atacar todo — ¿cuál primero?"

---

## Sub-frameworks disponibles

- `MAXI_BernabeuV2.html` — Táctica Bernabéu detallada
- `MAXI_Pilar1_Linea1_Adquisicion.html` — Línea 1: Adquisición
- `MAXI_Pilar1_Linea2_Continuity.html` — Línea 2: Continuidad / Growth Loop
- `MAXI_EisenhowerPipeline.html` — Priorización Eisenhower del pipeline

---

## Reglas

- Sin datos reales de CU → no dar diagnóstico · decir "necesito los datos primero"
- Bernabéu Cash Rule es no negociable: si Cash está rojo → alertar antes de cualquier propuesta de gasto
- Todo diagnóstico cita fuente estratégica
- No confundir diagnóstico con plan de acción — son skills separadas
