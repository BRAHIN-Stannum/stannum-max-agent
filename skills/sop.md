# SKILL: sop
**Trigger:** `#sop [área]` · "cómo se hace X" · "cuál es el proceso de Y" · "redactá el SOP de" · "documentá este proceso"
**Módulo:** GOBERNANZA
**Output:** SOP consultado (si existe) o redactado (si no existe)

---

## Propósito

Consultar o crear Procedimientos Operativos Estándar para STANNUM. Dos modos: buscar uno que ya existe o redactar uno nuevo desde cero cuando se detecta un proceso recurrente sin documentar.

---

## Modo CONSULTAR (trigger: "cómo se hace X")

### PASO 1 — BUSCAR EN CLICKUP DOCS

```
clickup_search(query: "SOP [área/proceso]", space_id: "90144409477")
```

### PASO 2 — SI EXISTE → resumir los pasos clave

Presentar en formato:
```
📋 SOP — [NOMBRE]
Área: [área] · Última actualización: [fecha] · Owner: [persona]

PASOS:
1. [paso 1]
2. [paso 2]
[...]

LINK: [URL ClickUp Doc]
```

### PASO 3 — SI NO EXISTE → proponer crear

"No encontré SOP para [X]. ¿Lo redactamos ahora?"

---

## Modo REDACTAR (trigger: "redactá el SOP de X")

### Estructura estándar de SOP

```markdown
# SOP — [NOMBRE DEL PROCESO]
**Área:** [área]  **Owner:** [responsable]  **Versión:** 1.0  **Fecha:** [fecha]
**Aplica a:** [quién ejecuta este proceso]

## Objetivo
[qué problema resuelve este SOP]

## Cuándo ejecutar
[disparador / frecuencia]

## Pre-requisitos
- [qué necesitás tener antes de arrancar]

## Pasos

### Paso 1 — [nombre]
[descripción detallada]
**Herramienta:** [herramienta o sistema]
**Output:** [qué produce este paso]

### Paso 2 — [nombre]
[...]

## Criterio de éxito
[cómo saber que el proceso se ejecutó bien]

## Errores frecuentes y cómo evitarlos
| Error | Causa | Prevención |
|-------|-------|-----------|

## Notas
[aclaraciones adicionales]
```

### PASO FINAL — GUARDAR EN CLICKUP DOCS (con aprobación)
- Espacio: Space DITEG
- Nombre: `SOP — [ÁREA] — [NOMBRE]`

---

## SOPs prioritarios a crear (pendientes)

| SOP | Área | Urgencia |
|-----|------|---------|
| Onboarding cliente TRENNO Starter | ECLI | Alta |
| Proceso de calificación de leads | GECO / TORO | Alta |
| Carga de lead en Kommo | GECO | Alta |
| Protocolo de bajada estratégica | DITEG | Media |
| Cierre y archivo de proyecto | DITEG | Media |

---

## Reglas

- No guardar SOP sin revisión y aprobación de Brahin
- Si el proceso cambia frecuentemente → indicar fecha de revisión en el header
- SOPs de ECLI (pagos, pases) → siempre incluir referencia a ADFIN y ECLI PASES
