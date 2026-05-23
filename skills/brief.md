# SKILL: brief
**Trigger:** `#brief` · "armá el brief" · "tengo un proyecto" · "llegó un pedido" · "cargalo en el pipeline" · "convertí esto en proyecto"
**Módulo:** GOBERNANZA
**Output:** Brief estructurado aprobado + tarea creada en Pipeline de ClickUp
**Doc ClickUp:** `c9ra2-20854`
**Merge de:** `stannum-intake-brief` + `MAXI_Brief.html`

---

## Propósito

Convertir pedidos difusos en proyectos bien definidos antes de que entren al pipeline. El brief es el filtro: si no puede briefearse, no es un proyecto todavía.

**Diferencia con `#bajada`:**
- `#brief` = pedido externo o nuevo que necesita estructura → entra al pipeline
- `#bajada` = instrucción estratégica de Martín → puede ir a cualquier área

---

## Protocolo

### PASO 1 — ESCUCHAR COMPLETO
Dejar que Brahin termine de describir el pedido sin interrumpir.

### PASO 2 — PREGUNTAR EN BLOQUE ÚNICO

```
Para armar el brief necesito:
1. ¿Nombre del proyecto / pedido?
2. ¿Qué problema resuelve o qué oportunidad captura?
3. ¿Área STANNUM? (DITEG / ECLI / GECO / MARK / ADFIN / EVENTOS / GEQ / GAME)
4. ¿Responsable principal?
5. ¿Deadline o fecha de inicio?
6. ¿Cuál es el criterio de éxito?
7. ¿Qué se necesita para arrancar (inputs, aprobaciones, recursos)?
```

### PASO 3 — REDACTAR BRIEF

```markdown
# BRIEF — [NOMBRE DEL PROYECTO]
**Fecha:** [fecha]  **Área:** [área]  **Responsable:** [nombre]

## Contexto
[qué situación generó este proyecto]

## Objetivo
[qué se quiere lograr — medible]

## Entregable principal
[qué debe existir cuando esté hecho]

## Criterio de éxito
[cómo se valida que está bien]

## Pilares activados
- [ ] MEMORIA · [ ] HERRAMIENTAS · [ ] MÉTODO

## Tensiones STANNUM activas
[T1/T2/T3/T4/T5 — cuál aplica y por qué]

## Dependencias
[qué necesita para avanzar]

## Tareas iniciales sugeridas
1. [tarea 1]
2. [tarea 2]
3. [tarea 3]
```

### PASO 4 — MOSTRAR Y PEDIR APROBACIÓN
> "¿Creo el proyecto en Pipeline con este brief?"

### PASO 5 — CREAR EN CLICKUP (solo con OK)
- Lista destino: `901415219852` (PIPELINE DE PROYECTOS)
- Nombre: `[ÁREA] — [NOMBRE PROYECTO]`
- Descripción: el brief completo
- Responsable: Brahin (`174284252`) + responsable del área
- Comentar: `Brief intake registrado por MAX el [fecha]. Proyecto listo para sprint.`

---

## Reglas

- Nunca crear sin aprobación explícita
- Máximo 2 llamadas ClickUp (crear tarea + comentar)
- Si el pedido ya existe como tarea → alertar antes de crear duplicado
- Brief incompleto (sin criterio de éxito) → no crear tarea hasta completarlo
