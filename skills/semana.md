# SKILL: semana
**Trigger:** `#semana` · "cómo viene la semana" · "preparemos la semana" · "reunión DITEG" · "agenda de la semana"
**Módulo:** OPERATIVO
**Output:** Vista semanal completa + agenda DITEG + detección de conflictos de calendario
**GAS:** Sí — `triggerPrepConcentracion` Dom 20:00 + `triggerLunesEstrategico` Lun 09:00
**Merge de:** `#concentracion` (GAS) + `#reunionditeg` (Claude)

---

## Propósito

Preparar y facilitar la semana de trabajo en DITEG. Tiene dos modos según cuándo se activa:
- **Modo Concentración** (domingos / inicio semana): carga agenda, detecta conflictos, prepara actas
- **Modo Reunión DITEG** (lunes en sesión): facilita la reunión general del equipo

---

## Modo Concentración (Dom 20:00 / inicio de semana)

### Fuentes de datos

| Fuente | Qué consulta | Herramienta |
|--------|-------------|-------------|
| Google Calendar `eventos@stannum.com.ar` | Eventos lunes→viernes próximos | `list_events` |
| ClickUp Pipeline `901415219852` | Proyectos activos con due date esta semana | `filter_tasks` |
| ClickUp DITEG `901413931989` | Tareas operativas con due date esta semana | `filter_tasks` |

### Protocolo

1. **Traer agenda** — eventos del lunes al viernes
2. **Detectar conflictos** — solapamientos, doble bookings, días sin espacio de trabajo
3. **Cruzar con tareas CU** — qué proyectos tienen hitos esta semana
4. **Generar vista semanal:**

```
🗓️ SEMANA [N] — [fecha lunes] al [fecha viernes]

AGENDA
[Lunes]  [hora] [evento]
[Martes] ...

PRIORIDADES DE SEMANA
1. [proyecto/tarea más urgente]
2. [segundo]
3. [tercero]

⚠️ CONFLICTOS DETECTADOS: [N]
- [conflicto] → [opción de resolución]

📋 HITOS DE SEMANA
- [proyecto] → [entregable] · vence [fecha]
```

5. Si hay conflictos → notificar en Google Chat DITEG (ver `gchat-routing.md`)

---

## Modo Reunión DITEG (en sesión, Lunes)

### Agenda estándar reunión DITEG (60 min)

```
1. Estado general y #buenosdias semanal (10 min)
2. EVENTOS — bloque crítico (20 min)
3. GECO — pipeline y OKRs (10 min)
4. MARK + ADFIN — estado (10 min)
5. SER CON IA / MAX — actualizaciones (10 min)
6. Temario libre (20 min)
```

### Protocolo reunión

1. **Antes:** leer memoria reciente (`#memoria`) + estado sprint (`#sprint`)
2. **Durante:** registrar decisiones y acuerdos en tiempo real
3. **Output al cierre:**

```
✅ ACTAS DITEG — [fecha]

DECISIONES
- [decisión 1] → owner: [nombre] · fecha: [fecha]

ACUERDOS
- [acuerdo 1]

PRÓXIMA REUNIÓN: [fecha propuesta]
```

4. Cargar acuerdos como comentarios en tareas ClickUp correspondientes (L1 memory)

---

## Reglas

- Máximo 3 llamadas ClickUp en modo Concentración
- En modo Reunión: NO abrir herramientas mientras alguien habla — registrar primero
- Conflictos detectados → siempre proponer resolución, no solo reportar
- Si el equipo no puede asistir a la reunión → generar resumen escrito con los mismos puntos
