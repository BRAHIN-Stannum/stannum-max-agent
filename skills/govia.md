# SKILL: govIA
**Trigger:** `#govIA` · "auditoría de agentes" · "cómo está el ecosistema IA" · "estado de los agentes" · "govIA"
**Módulo:** GOBERNANZA
**Output:** Auditoría del ecosistema agéntico STANNUM: estado, gaps, alertas de seguridad

---

## Propósito

Verificar que el ecosistema de agentes está operativo, seguro y sin deuda técnica acumulada. La infraestructura IA es prerequisito de todo lo demás — si CRONOS no está activo, todos los agentes operan en modo fragmentado.

> Fuente: Microsoft Work Trend Index 2025 — FRONTIER FIRMS operan con orquestación central de agentes (Agent Boss + Manager Agents). Sin orquestador = sin coordinación = sin escala.

**Regla de infraestructura:** No lanzar nueva iniciativa agéntica sin CRONOS Fase 1 operativa. Orden: infraestructura → agentes → procesos.

---

## Ecosistema de agentes STANNUM

| Agente | Dominio | Estado esperado | Carpeta |
|--------|---------|----------------|---------|
| CRONOS | Orquestación cross-agente | 🔴 Fase 1 pendiente | `0. CRONOS\` |
| MAX | Dirección estratégica DITEG | 🟢 Activo en Claude | `1. MAX DITEG\` |
| LARA | Eventos y producción | 🟡 En desarrollo | `2. LARA GPT EVENTOS\` |
| TORO | Ventas / CRM | 🟡 En desarrollo | `5. TORO\` |
| CHEBA | Diseño / Marketing | 🟡 En desarrollo | `6. CHEBA DISEÑO\` |
| KAIROS | Agenda / Calendario | 🟡 En desarrollo | `7. KAIROS\` |

---

## Protocolo

### PASO 1 — PULL ALERTAS CRONOS (1 llamada)

```
filter_tasks(list_id: "[CRONOS list ID]", tags: ["ALERTA"])
```

### PASO 2 — VERIFICAR GAS TRIGGERS

Estado actual de los 6 triggers documentados en `MAXI_Triggers.gs`:
- ¿Están instalados en Apps Script?
- ¿Corrieron en las últimas 24h? (ver logs GAS)
- ¿ALERTA-001 (token ClickUp expuesto) resuelta?

### PASO 3 — AUDITORÍA POR AGENTE

Para cada agente en el ecosistema:
- ¿Tiene CLAUDE.md activo?
- ¿Tiene lista en ClickUp?
- ¿Tiene al menos 1 skill operativa?
- ¿Tiene canal de output configurado?

### PASO 4 — OUTPUT

```
🤖 GOVÍA — ECOSISTEMA AGÉNTICO STANNUM — [FECHA]

Estado general: 🟢 / 🟡 / 🔴

| Agente | Estado | Gaps | Alerta |
|--------|--------|------|--------|
| CRONOS | 🔴 | Fase 1 vencida | URGENTE |
| MAX | 🟢 | — | — |
| LARA | 🟡 | Sin deploy | — |

🚨 ALERTAS ACTIVAS:
- ALERTA-001: Token ClickUp expuesto · Tarea `86ba2ehnn` · Owner: Mateo Lohezic

DEUDA TÉCNICA:
- [ítem 1] — vencido [fecha] — bloqueado por [razón]

PREREQUISITO NEXT SPRINT:
→ CRONOS Fase 1 antes de cualquier nueva iniciativa agéntica
```

---

## Reglas

- ALERTA-001 activa → reportar primero, siempre, en cada ejecución de `#govIA`
- No proponer nuevas skills o agentes si hay alertas de seguridad sin resolver
- Si GAS triggers no están confirmados en producción → preguntar explícitamente a Brahin
- Token expuesto = invalida la seguridad de todo el ecosistema → prioridad absoluta
