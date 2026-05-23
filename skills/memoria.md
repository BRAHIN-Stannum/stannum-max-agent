# SKILL: memoria
**Trigger:** `#memoria` · "guardá esto" · "anotá" · "qué recordás de" · "actualizá la memoria" · "¿qué sabés sobre X?"
**Módulo:** GOBERNANZA
**Output:** Operación de memoria confirmada (lectura, escritura o sincronización)

---

## Propósito

Gestión explícita de los 3 niveles de memoria del sistema. Permite leer, escribir y sincronizar conocimiento entre sesiones.

---

## Arquitectura de memoria

| Nivel | Nombre | Dónde | Uso |
|-------|--------|-------|-----|
| L1 | Memoria viva | Comentarios en tareas ClickUp | Registro inmediato de sesión, contexto operativo |
| L2 | Memoria estable | Docs ClickUp (`c9ra2-*`) | Protocolos, decisiones consolidadas, aprendizajes |
| L3 | Memoria permanente | GitHub repo `stannum-max-agent/memory/` | Outputs, patrones, aprendizajes estructurados |

---

## Modos de operación

### MODO LEER
Trigger: "¿qué sabés de X?" · "traé contexto de Y" · "cómo quedó Z"

1. Identificar el nivel donde vive esa información
2. Si L1 → buscar comentarios en tarea específica (1 llamada ClickUp)
3. Si L2 → leer doc relevante (identificar por keyword)
4. Si L3 → leer archivo en `memory/[nombre].md`
5. Devolver el contexto en forma compacta

### MODO ESCRIBIR
Trigger: "guardá esto" · "anotá" · "registrá"

1. Preguntar: ¿Qué nivel corresponde?
   - L1 = operativo hoy → comentar en tarea activa (sin aprobación)
   - L2 = protocolo estable → proponer actualización (mostrar antes de escribir)
   - L3 = aprendizaje / decisión / patrón → proponer entrada en `memory/`
2. Para L2 y L3 → mostrar el texto propuesto y esperar OK de Brahin
3. Ejecutar con aprobación

### MODO SINCRONIZAR
Trigger: "actualizá la memoria" · "cerrá el contexto" · `#cierre`

1. Revisar las tareas tocadas en la sesión
2. Identificar qué información nueva surgió
3. Proponer qué actualizar en cada nivel (no ejecutar sin aprobación):

```
📥 PROPUESTA DE ACTUALIZACIÓN DE MEMORIA

L1 — Comentar en tarea [X]:
"[texto del comentario]"

L3 — Agregar en memory/aprendizajes.md:
"## [FECHA] — [título]
**Contexto:** [módulo]
**Aprendizaje:** [qué se descubrió]
**Aplicación:** [cómo cambia el comportamiento]"

¿Ejecuto?
```

---

## Archivos L3 disponibles (GitHub repo)

| Archivo | Contenido |
|---------|-----------|
| `memory/aprendizajes.md` | Lo que MAX aprende en sesiones — cambia cómo opera |
| `memory/decisiones.md` | Decisiones estratégicas y de arquitectura vigentes |
| `memory/patrones.md` | Comportamientos recurrentes detectados en DITEG |
| `memory/okrs.md` | OKRs, metas financieras e iniciativas activas |

## Documentos L2 clave (ClickUp Docs)

| Doc | ID ClickUp | Contenido |
|-----|-----------|-----------|
| System Prompt canónico v2.4 | `c9ra2-8614` | Fuente de verdad de MAX |
| Skills Library | `c9ra2-20514` | Índice de skills |
| Marco SER CON IA | `c9ra2-20994` | Metodología del ecosistema |

---

## Reglas

- Nunca sobrescribir memoria L2 sin leer primero el estado actual
- L1 es libre: comentar sin aprobación
- L2 y L3 requieren aprobación antes de escribir
- Ante duda sobre el nivel → preguntar
- Información stale (fechas pasadas, proyectos cerrados) → mover a `## Histórico` en el archivo, no eliminar
