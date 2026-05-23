# BRIEF — Alineación y síntesis de skills MAX
**Versión:** 1.0 · **Fecha:** 2026-05-23  
**Ejecutor:** MAX (sesión Claude Code con MCP stannum-max activo)  
**Aprobador:** Brahin Carrillo  
**Repo:** github.com/BRAHIN-Stannum/stannum-max-agent

---

## Contexto

Durante mayo 2026 se migró la arquitectura de MAX desde Drive local + Obsidian hacia GitHub como fuente única de verdad. Se consolidaron 20+ skills fragmentadas en **16 skills en 3 módulos**, eliminando numeración M06-M18 y renombrando todo a comandos hash.

Las 16 skills fueron escritas rápidamente durante la migración. Este brief ordena a MAX auditarlas, alinearlas y dejar cada archivo en estado producción.

**Documento de referencia maestro:** `arquitectura/MAX-arquitectura.md`  
Si hay conflicto entre este brief y la arquitectura, gana la arquitectura.

---

## Checklist de alineación — aplica a CADA skill

Antes de tocar un archivo, leerlo completo. Luego verificar cada punto:

### 1. Encabezado estandarizado
Cada skill debe abrir con este bloque exacto (adaptar valores):

```markdown
# Skill: #[comando]
**Módulo:** [OPERATIVO | PLANIFICACIÓN | GOBERNANZA]  
**Trigger:** `#[comando]` o `#[comando] [argumento]`  
**GAS auto:** [Sí — horario | No]  
**Archivo:** `skills/[nombre].md`  
**ClickUp task:** `[ID]`
```

IDs de tareas ClickUp por skill:

| Skill | ClickUp ID |
|-------|-----------|
| #buenosdias | 86b9gw31t |
| #semana | 86b9gk0jt |
| #cierre | 86ba3557w |
| #sprint | 86b9p6m07 |
| #pipeline | 86b9gwu85 |
| #proyecto | 86b9p6m4h |
| #bajada | 86b9p6m1q |
| #tarea | 86b9p6m39 |
| #diagnóstico | 86b9p6m87 |
| #equipo | 86b9p6ma2 |
| #govIA | 86b9p6m6u |
| #brainstorm | 86b9nj3xb |
| #brief | 86b9gwu5q |
| #sop | 86b9p6m5h |
| #informe | 86b9g0e25 |
| #memoria | 86ba35581 |

### 2. Lenguaje correcto
- ❌ Nunca: "fallas", "fallos", "errores del equipo"
- ✅ Siempre: "oportunidad de mejora", "punto de evolución", "espacio de optimización"
- Verificar que el output que la skill genera para el usuario respete esto

### 3. Operador correcto
- Verificar que no haya referencias a Martín Merlini como operador
- El operador de esta cuenta es siempre **Brahin Carrillo** (`eventos@stannum.com.ar` · ClickUp ID `174284252`)
- Martín es D.T. GECO — aparece como destinatario de algunos mensajes, nunca como quien opera MAX

### 4. Regla gchat-routing
- `enviar_mensaje` (MCP stannum-mcp) = **EXCLUSIVO para mensajes a GECO/Martín**
- Mensajes internos DITEG = **GAS URL** únicamente
- GAS URL: `https://script.google.com/macros/s/AKfycbx59gHM7BGdjQ6fx2WtkymYffMTeW223XxNdEJ_sKtvc34xGaHMSnO3o0v20XURFLbE/exec`
- Ver skill completa: `skills/gchat-routing.md`
- Aplica especialmente a: `#buenosdias`, `#cierre`, `#semana`, `#informe`, `#equipo`

### 5. ALERTA-001 (donde corresponde)
Las skills que usan GAS, webhooks o el ecosistema agéntico deben incluir esta nota:

```markdown
> ⚠️ **ALERTA-001 activa:** Token ClickUp expuesto — GCHAT_WEBHOOK_DITEG bloqueado.  
> Rotar con Mateo Lohezic · tarea `86ba2ehnn` · hasta resolución usar GAS URL directo.
```

Aplica a: `#govIA`, `#buenosdias`, `#cierre`, `#semana`, `#informe`

### 6. Respaldo estratégico
Skills de análisis y gobernanza deben indicar que sus outputs requieren fuente:
- Fuentes válidas: Microsoft · McKinsey · Harvard · BCG · WEF · PwC · Roland Berger · Gartner
- Aplica especialmente a: `#diagnóstico`, `#pipeline`, `#sprint`, `#informe`, `#bajada`
- Formato sugerido: `> Sin fuente = opinión. Citar autor + estadística en todo output estratégico.`

### 7. Límite de llamadas API
Cada skill debe especificar su presupuesto máximo de llamadas a APIs externas.
Formato sugerido en la skill:
```markdown
**Presupuesto API:** máx [N] llamadas ClickUp · [N] Calendar · [N] Drive
```

Referencia de límites ya definidos:
- `#buenosdias`: máx 4 CU + 1 Calendar + 1 Drive
- `#cierre`: máx 1 CU
- `#informe`: 3 CU en paralelo
- `#pipeline`: máx 2 CU
- `#proyecto`: máx 3 CU
- `#sprint`: máx 2 CU
- `#equipo`: máx 2 CU

Si una skill no tiene límite definido, establecer uno razonable.

### 8. IDs críticos presentes donde se usan
Verificar que la skill mencione los IDs que necesita, sin obligar a buscarlos:
- Lista MAX: `901415394335`
- Space DITEG: `90144409477`
- Pipeline Proyectos: `901415219852`
- CalendarId: `eventos@stannum.com.ar`
- ClickUp IDs de assignees: Brahin `174284252`, Martín `18905578`

### 9. CalendarId explícito
Toda skill que toque Google Calendar debe especificar:
`calendarId: eventos@stannum.com.ar`
Nunca dejar implícito.

### 10. Cross-references entre skills
Verificar que las referencias a otras skills usen el nombre correcto (hash, no M-número):
- ❌ `M11`, `#reunionditeg`, `#cierredia`, `#nueva-tarea`, `#reporte`
- ✅ `#pipeline`, `#semana`, `#cierre`, `#tarea`, `#informe`

### 11. Regla ClickUp
Toda skill que crea/modifica tareas debe incluir:
```markdown
> **Regla ClickUp:** diseñar en conversación primero — ejecutar solo con aprobación explícita de Brahin. Nunca crear mid-conversation.
```

---

## Skills y sus puntos de atención específicos

### MÓDULO OPERATIVO

**`skills/buenosdias.md`**
- Verificar que ambos user IDs estén: `[174284252, 18905578]`
- Drive folder Meet Recordings: `17Ud_r0JZtUog3xY4AE5idywQw3GuMdmA`
- Output: 4 bloques (agenda · tareas hoy · vencidas · meet recordings)
- ALERTA-001 presente
- gchat-routing mencionado

**`skills/semana.md`**
- 2 modos claramente separados: Concentración (Dom 20:00) y Reunión DITEG (sesión Lunes)
- Agenda estándar Reunión DITEG: 6 ítems · 60 min
- Sin referencias a `#reunionditeg` (nombre viejo)

**`skills/cierre.md`**
- 2 modos: Auto (GAS 17:55) y Manual (fin de sesión)
- Ritual de cierre de sesión: 3 preguntas (¿aprendí? ¿decidí? ¿vi patrón?)
- Referencia a `#memoria` para proponer actualizaciones L3
- ALERTA-001 presente

### MÓDULO PLANIFICACIÓN

**`skills/sprint.md`**
- Lógica de gate tasks incluida
- Patrón crítico documentado: "no abrir sprint nuevo sin cerrar el actual"
- Referencia a Pipeline Proyectos `901415219852`

**`skills/pipeline.md`**
- Semáforo 🟢🟡🔴 definido con criterios claros
- Patrón "trabajo invisible" documentado (proyectos sin movimiento 7+ días)
- Doc CU de referencia: `c9ra2-20874`

**`skills/proyecto.md`**
- 3 opciones al final: cerrar / pausar / reasignar
- `get_task` + `get_task_comments` como base de análisis

**`skills/bajada.md`**
- 4 tipos claramente diferenciados: Operativa / Estratégica / Comunicacional / Comercial
- Tabla de derivación por agente (MAX/LARA/TORO/CHEBA/KAIROS)
- Referencia a `#brief` para convertir bajadas difusas

**`skills/tarea.md`**
- PASO 1 siempre: verificar duplicado antes de crear
- Confirmar resumen antes de ejecutar
- Sin referencias a `#nueva-tarea` (nombre viejo)

### MÓDULO GOBERNANZA

**`skills/diagnostico.md`**
- Framework Bernabéu 5 pilares presente
- Bernabéu Cash Rule documentada: "no lanzar sin 3 meses reserva + ROI verificado"
- Fuente estratégica requerida en output

**`skills/equipo.md`**
- Tabla de equipo DITEG con IDs ClickUp
- Niveles de carga: 🟢 1-5 / 🟡 6-10 / 🔴 +10 tareas
- Fuente: McKinsey (citar en output)

**`skills/govia.md`**
- ALERTA-001 SIEMPRE como primer ítem
- Tabla del ecosistema agéntico (CRONOS/MAX/LARA/TORO/CHEBA/KAIROS)
- Estado CRONOS: Fase 1 pendiente — prerequisito para nuevos agentes

**`skills/brainstorm.md`**
- Tabla de catalogación: tipo / impacto / urgencia / área / recursos
- Patrón de 3 variaciones incluido

**`skills/brief.md`**
- Template de brief con Pilares STANNUM + Tensiones
- Lista destino: `901415219852`
- Sin referencias a `stannum-intake-brief` (nombre viejo)
- Doc CU de referencia: `c9ra2-20854`

**`skills/sop.md`**
- 2 modos: Consultar / Redactar
- Template SOP estándar incluido
- Tabla de SOPs prioritarios pendientes

**`skills/informe.md`**
- 3 llamadas CU en paralelo
- Distribución vía gchat-routing (no `enviar_mensaje` directo)
- "puntos de evolución" en lugar de "fallas"
- ALERTA-001 presente

**`skills/memoria.md`**
- 3 modos: LEER / ESCRIBIR / SINCRONIZAR
- L1 libre, L2+L3 requieren aprobación explícita
- 5 docs L2 ClickUp listados
- 5 archivos L3 GitHub listados

---

## Protocolo de ejecución

### Inicio de sesión con este brief
```
1. max_repo_status()          → verificar repo accesible
2. max_read_file("arquitectura/MAX-arquitectura.md")  → contexto maestro
3. max_read_file("SKILL-ALIGNMENT-BRIEF.md")          → este documento
4. max_list_files("skills")   → confirmar 18 archivos (16 skills + gchat-routing + INDEX)
```

### Por cada skill (en orden de módulo)
```
1. max_read_file("skills/[nombre].md")  → leer completo
2. Identificar gaps contra checklist     → listar en conversación
3. Mostrar a Brahin el plan de cambios   → esperar aprobación
4. Aplicar cambios                       → con aprobación
5. max_write_skill(...)                  → commit al repo
6. Confirmar: "✅ [skill] alineada"
```

### Orden recomendado
```
OPERATIVO:    buenosdias → semana → cierre
PLANIFICACIÓN: sprint → pipeline → proyecto → bajada → tarea
GOBERNANZA:   diagnóstico → equipo → govIA → brainstorm → brief → sop → informe → memoria
UTILIDAD:     gchat-routing (verificar, raramente requiere cambios)
INDEX:        actualizar último con tabla final
```

### Criterio de done
Una skill está **alineada** cuando:
- [ ] Encabezado estandarizado completo
- [ ] Lenguaje correcto (sin "fallas/errores")
- [ ] Operador correcto (Brahin, no Martín)
- [ ] gchat-routing respetado donde aplica
- [ ] ALERTA-001 donde aplica
- [ ] Fuente estratégica donde aplica
- [ ] Límite de llamadas API definido
- [ ] IDs críticos presentes
- [ ] CalendarId explícito donde aplica
- [ ] Cross-references correctas (sin M-números ni nombres viejos)
- [ ] Regla ClickUp donde aplica
- [ ] Puntos específicos de la skill (ver sección arriba)

---

## Entregables esperados

Al terminar la alineación:
1. **16 skills** commiteadas y pusheadas en `skills/`
2. **`skills/INDEX.md`** actualizado con tabla de estado (✅ alineada / 🔄 pendiente)
3. **`memory/aprendizajes.md`** con entrada sobre patrones encontrados
4. **`memory/decisiones.md`** con decisiones de formato tomadas durante el proceso
5. Propuesta de actualización a `arquitectura/MAX-arquitectura.md` si surgieron gaps no contemplados

---

## Notas de contexto (no ejecutar, solo leer)

- Este brief fue generado en la sesión de migración del 2026-05-23
- La migración anterior movió todo desde Drive + Obsidian a este repo
- Los GAS scripts están en `gas/` — escritos y listos, deploy pendiente con clasp
- ALERTA-001 bloquea rotación de webhook DITEG — coordinar con Mateo Lohezic (`86ba2ehnn`)
- CRONOS (orquestador) está en Fase 1 pendiente — no lanzar nuevos agentes hasta resolverlo
- El repo se llama `stannum-max-agent` y es privado bajo `BRAHIN-Stannum`

---

*Documento generado por MAX · Sesión 2026-05-23 · Aprobación requerida de Brahin antes de ejecutar*
