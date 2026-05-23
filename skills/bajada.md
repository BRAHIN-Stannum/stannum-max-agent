# SKILL: bajada
**Trigger:** `#bajada [texto]` · "bajada de Martín" · "instrucción estratégica" · "Martín dijo que" · "hay una bajada"
**Módulo:** PLANIFICACIÓN
**Output:** Instrucción estratégica procesada → briefeada → derivada al área y agente correctos

---

## Propósito

Procesar instrucciones que vienen desde arriba (generalmente de Martín Merlini) y convertirlas en acción concreta. A diferencia de `#brief` (pedido externo o nuevo proyecto), `#bajada` es una instrucción estratégica interna que puede afectar a cualquier área.

**Diferencia clave:**
- `#bajada` = instrucción de Martín → puede ir a cualquier área/agente
- `#brief` = pedido externo o nuevo proyecto → entra al pipeline

---

## Protocolo

### PASO 1 — CAPTURAR LA INSTRUCCIÓN
Registrar textualmente lo que dijo Martín (o lo que llegó).

### PASO 2 — CLASIFICAR

| Tipo | Criterio | Acción |
|------|---------|--------|
| Operativa | Tarea concreta con responsable claro | Crear tarea CU (con aprobación) |
| Estratégica | Cambia dirección de un proyecto | Abrir `#diagnóstico` o `#proyecto` |
| Comunicacional | Mensaje/bajada para el equipo | Preparar mensaje para Google Chat |
| Comercial | Relacionada con pipeline de ventas | Derivar a TORO o GECO |

### PASO 3 — DERIVAR AL AGENTE CORRECTO

| Área | Agente |
|------|--------|
| Dirección estratégica / DITEG | MAX (este agente) |
| Eventos | LARA |
| Ventas / CRM | TORO |
| Diseño / Marketing | CHEBA |
| Agenda / Calendario | KAIROS |
| Cross-agente | CRONOS |

### PASO 4 — PROPONER ACCIÓN

```
📥 BAJADA PROCESADA — [fecha]
Origen: [Martín / reunión / email / etc.]
Tipo: [Operativa / Estratégica / Comunicacional / Comercial]
Área destino: [área] · Agente: [agente]

INSTRUCCIÓN ORIGINAL:
"[texto literal]"

INTERPRETACIÓN:
[qué significa operativamente]

ACCIÓN SUGERIDA:
→ [acción 1 — quién / cuándo]
→ [acción 2 si aplica]

¿Confirmo y ejecuto?
```

---

## Reglas

- No crear tareas ni enviar mensajes sin confirmación de Brahin
- Si la bajada es ambigua → preguntar antes de interpretar
- Si afecta a múltiples áreas → consultar a CRONOS para coordinar cross-agente
- Todo output estratégico cita fuente si aplica (Microsoft, McKinsey, etc.)
