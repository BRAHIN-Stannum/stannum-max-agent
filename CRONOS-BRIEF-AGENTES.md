# CRONOS — Brief de Reestructuración del Ecosistema Agéntico STANNUM
**Versión:** 1.0 · **Fecha:** 2026-05-23  
**Autor:** MAX (Agente DITEG)  
**Ejecutor:** CRONOS (orquestador) + sesiones individuales por agente  
**Aprobador:** Brahin Carrillo  
**Referencia:** Proceso ejecutado en MAX como caso piloto (repo `stannum-max-agent`)

---

## Por qué esto existe

MAX completó el 2026-05-23 una migración completa desde Drive local + Obsidian hacia GitHub como infraestructura online-always. El proceso resolvió:
- Skills fragmentadas y con numeración en conflicto
- Memoria local no accesible desde otras PCs
- Sin fuente única de verdad por agente
- Sin MCP que conecte el agente a su propio repositorio

**Resultado de MAX:** 1 repo privado · 16 skills en 3 módulos · 5 archivos de memoria · MCP custom · 2 commits · accesible desde cualquier sesión Claude Code.

Este brief le da a CRONOS las instrucciones para replicar exactamente ese proceso en los 5 agentes restantes: **LARA · TORO · CHEBA · KAIROS · y el propio CRONOS**.

**Fuente de respaldo:** Microsoft Work Trend Index 2025 — las FRONTIER FIRMS operan con infraestructura de agentes centralizada, orquestada y accesible desde cualquier punto. Sin CRONOS operativo, cada agente funciona en modo manual fragmentado.

---

## Arquitectura estándar — aplica a TODOS los agentes

### Stack por agente
```
┌──────────────────────────────────────────────────┐
│       GitHub stannum-[agente]-agent (privado)     │
│    Skills · Memoria · Código GAS · Docs           │
│                 ↕ siempre online                   │
├──────────────────┬───────────────────────────────┤
│  ClickUp (MCP)   │        Claude Code             │
│ Tareas · Dominio │  Lee GitHub vía MCP custom     │
│ del agente · L1  │  Ejecuta skills del agente     │
│ Inter-agentes    │  Interfaz con Brahin           │
└──────────────────┴───────────────────────────────┘
```

### Estructura de repo estándar
```
stannum-[agente]-agent/
├── CLAUDE.md                    ← auto-cargado en Claude Code
├── README.md                    ← guía del repo
├── .gitignore                   ← excluye node_modules, .env
├── .mcp.json                    ← template MCP (token en ~/.claude.json)
├── skills/
│   ├── INDEX.md                 ← tabla de 16 skills del agente
│   └── [skill].md               ← una por skill
├── memory/
│   ├── INDEX.md                 ← contexto permanente del agente
│   ├── aprendizajes.md
│   ├── decisiones.md
│   ├── patrones.md
│   └── okrs.md
├── arquitectura/
│   └── [AGENTE]-arquitectura.md ← documento maestro
├── gas/
│   └── [AGENTE]_*.gs            ← scripts GAS del agente
└── mcp/
    ├── server.js                ← MCP custom (clonar de MAX)
    ├── package.json
    └── README.md
```

### Arquitectura de memoria — igual en todos
| Nivel | Nombre | Dónde | Cuándo usar |
|-------|--------|-------|-------------|
| L1 | Memoria viva | Comentarios ClickUp | Registro inmediato, sin aprobación |
| L2 | Memoria estable | Docs ClickUp | Protocolos consolidados, con aprobación |
| L3 | Memoria permanente | GitHub `memory/` | Aprendizajes, patrones, decisiones, con aprobación |

### Módulos de skills — estructura base (adaptar por agente)
| Módulo | Tipo de skills |
|--------|---------------|
| OPERATIVO | Ritmo diario/semanal: buenos días, semana, cierre |
| PLANIFICACIÓN | Gestión de trabajo: sprint, pipeline, proyectos, tareas |
| GOBERNANZA | Análisis y conocimiento: diagnóstico, equipo, memoria, informes |

---

## Reglas cross-cutting — no negociables en NINGÚN agente

| Regla | Detalle |
|-------|---------|
| **CRM first** | Todo lead calificado → Kommo + notificar GECO Google Chat. Sin Kommo, no pasó. |
| **Pagos** | ADFIN maneja todo. ECLI PASES obligatorio antes de confirmar pago. |
| **ClickUp** | Diseñar en conversación primero. Ejecutar solo con aprobación explícita. |
| **CalendarId** | Siempre explícito: `eventos@stannum.com.ar` |
| **gchat-routing** | `enviar_mensaje` (MCP) = EXCLUSIVO GECO/Martín. DITEG = GAS URL. |
| **Fuente estratégica** | Sin fuente = opinión. Citar Microsoft · McKinsey · BCG · WEF · Gartner · Harvard · PwC. |
| **Lenguaje** | Nunca "fallas/errores del equipo" → "oportunidad de mejora / punto de evolución". |
| **Operador** | Esta cuenta es siempre Brahin Carrillo. Nunca asumir que es Martín. |
| **ALERTA-001** | Token ClickUp expuesto · tarea `86ba2ehnn` · owner Mateo Lohezic. Mencionarlo en govIA y cierre. |
| **Bernabéu Cash Rule** | No lanzar evento/campaña sin 3 meses de reserva + ROI verificado. |

---

## CRONOS — Fase 1 (hacer primero, antes que todos los demás)

CRONOS es el orquestador. Sin él, los agentes operan sin coordinación. **Debe ser el primer repo en crearse.**

### Dominio de CRONOS
- Heartbeats entre agentes (verificar que cada agente esté operativo)
- Escalación: tareas que un agente no puede resolver solo → derivar al agente correcto
- Coordinación cross-agente: cuando una bajada de Martín afecta a 2+ agentes
- Estado del ecosistema: snapshot semanal de todos los agentes
- Alertas globales: ALERTA-001 y cualquier alerta que afecte al ecosistema

### Skills sugeridas para CRONOS (adaptar con Brahin)
| Módulo | Skill | Comando | Descripción |
|--------|-------|---------|-------------|
| OPERATIVO | Heartbeat | `#heartbeat` | Verificar estado de todos los agentes |
| OPERATIVO | Escalación | `#escalar [agente] [tarea]` | Derivar tarea al agente correcto |
| OPERATIVO | Snapshot | `#snapshot` | Estado general del ecosistema agéntico |
| PLANIFICACIÓN | Orquestar | `#orquestar [bajada]` | Distribuir bajada de Martín entre agentes |
| PLANIFICACIÓN | Prioridad | `#prioridad` | Resolver conflicto de prioridades cross-agente |
| GOBERNANZA | GovIA global | `#govia-global` | Auditoría del ecosistema completo |
| GOBERNANZA | Alerta | `#alerta [código]` | Registrar y distribuir alerta sistémica |

### Repo CRONOS
- Nombre: `stannum-cronos-agent`
- MCP: clonar de `stannum-max-agent/mcp/` y cambiar defaults
- CLAUDE.md: listar los 5 agentes subordinados con sus repos y dominios

---

## LARA — Agente de Eventos

### Dominio
Producción de eventos: RFPs, proveedores, logística, presupuestos, propuestas.  
Canal principal: ClickUp EVENTOS.

### IDs y referencias conocidas
| Sistema | ID / Valor |
|---------|-----------|
| Space EVENTOS | (a confirmar con Brahin) |
| Lista LARA agente | (a confirmar) |
| CalendarId eventos | `eventos@stannum.com.ar` |

### Skills sugeridas (confirmar con Brahin antes de crear)
| Módulo | Skill | Comando | Descripción |
|--------|-------|---------|-------------|
| OPERATIVO | Buenos días | `#buenosdias` | Dashboard diario: eventos activos, RFPs pendientes |
| OPERATIVO | Semana | `#semana` | Vista semanal de producción |
| OPERATIVO | Cierre | `#cierre` | Cierre de sesión + actualización memoria |
| PLANIFICACIÓN | RFP | `#rfp [cliente]` | Procesar RFP entrante → estructura de propuesta |
| PLANIFICACIÓN | Presupuesto | `#presupuesto [evento]` | Armado y validación de presupuesto |
| PLANIFICACIÓN | Proveedor | `#proveedor [tipo]` | Gestión de proveedores: cotización, comparación |
| PLANIFICACIÓN | Tarea | `#tarea` | Creación guiada de tarea en ClickUp EVENTOS |
| GOBERNANZA | Pipeline eventos | `#pipeline` | Review de todos los eventos activos |
| GOBERNANZA | Informe | `#informe` | Informe semanal de producción |
| GOBERNANZA | SOP | `#sop [área]` | Procedimientos de producción |
| GOBERNANZA | Memoria | `#memoria` | Leer / escribir / sincronizar memoria |

### Repo LARA
- Nombre: `stannum-lara-agent`
- GAS triggers: adaptar `MAXI_Triggers.gs` para dominio EVENTOS
- Fuente de materiales existentes: carpeta Drive `2. LARA GPT EVENTOS\`

---

## TORO — Agente de Ventas / CRM

### Dominio
Calificación de leads, gestión de pipeline, propuestas B2B, seguimiento Kommo.  
Canal principal: Kommo CRM.

### IDs y referencias conocidas
| Sistema | ID / Valor |
|---------|-----------|
| Kommo workspace | (a confirmar con Brahin) |
| Pipeline Starter | `901416650154` |
| Pipeline Enterprise | `901416650160` |
| Pipeline Agentic | `901416650162` |
| TRENNO Pool B2C | USD 900 · 12 sesiones |
| TRENNO Starter B2B | USD 10K-12K · Ciclo 1 |
| TRENNO Enterprise B2B | USD 20K · Ciclo 2 |
| TRENNO Agentic B2B | USD 40K · Ciclo 3 |

### Skills sugeridas (confirmar con Brahin antes de crear)
| Módulo | Skill | Comando | Descripción |
|--------|-------|---------|-------------|
| OPERATIVO | Buenos días | `#buenosdias` | Dashboard diario: leads nuevos, seguimientos vencidos |
| OPERATIVO | Semana | `#semana` | Review semanal de pipeline CRM |
| OPERATIVO | Cierre | `#cierre` | Cierre de sesión + actualización memoria |
| PLANIFICACIÓN | Calificar | `#calificar [lead]` | Calificación BANT + derivación a pipeline correcto |
| PLANIFICACIÓN | Propuesta | `#propuesta [empresa]` | Armar propuesta B2B (Starter/Enterprise/Agentic) |
| PLANIFICACIÓN | Seguimiento | `#seguimiento` | Leads sin movimiento → próximos pasos |
| PLANIFICACIÓN | Tarea | `#tarea` | Crear tarea en ClickUp + entrada en Kommo |
| GOBERNANZA | Pipeline | `#pipeline` | Review semanal por producto y etapa |
| GOBERNANZA | Lead | `#lead [nombre]` | Deep dive de un lead específico |
| GOBERNANZA | Informe | `#informe` | Informe semanal comercial |
| GOBERNANZA | GECO | `#geco` | Notificar lead calificado a GECO Google Chat |
| GOBERNANZA | Memoria | `#memoria` | Leer / escribir / sincronizar memoria |

### Regla crítica TORO
- Todo lead calificado → cargar en Kommo ANTES de notificar GECO
- ECLI PASES obligatorio antes de confirmar cualquier pago
- Taxonomía GECO: Atracción / Conversión / Fidelización (siempre marcar estrategia + táctica)

### Repo TORO
- Nombre: `stannum-toro-agent`
- Fuente de materiales existentes: carpeta Drive `5. TORO\`

---

## CHEBA — Agente de Diseño y Marketing

### Dominio
Diseño, redes sociales, growth loop, comunidad, plan de ventas, contenido.  
Canal principal: Drive MARK.

### Skills sugeridas (confirmar con Brahin antes de crear)
| Módulo | Skill | Comando | Descripción |
|--------|-------|---------|-------------|
| OPERATIVO | Buenos días | `#buenosdias` | Dashboard diario: publicaciones, entregas de diseño |
| OPERATIVO | Semana | `#semana` | Vista semanal de contenido y diseño |
| OPERATIVO | Cierre | `#cierre` | Cierre de sesión + actualización memoria |
| PLANIFICACIÓN | Contenido | `#contenido [canal]` | Plan de contenido semanal por canal |
| PLANIFICACIÓN | Brief diseño | `#brief [pieza]` | Brief para una pieza de diseño |
| PLANIFICACIÓN | Growth | `#growth` | Estado del growth loop STANNUM |
| PLANIFICACIÓN | Tarea | `#tarea` | Crear tarea de diseño en ClickUp |
| GOBERNANZA | Comunidad | `#comunidad` | Estado y acciones de comunidad |
| GOBERNANZA | Pipeline mktg | `#pipeline` | Review de proyectos de marketing activos |
| GOBERNANZA | Informe | `#informe` | Informe semanal de marketing |
| GOBERNANZA | Memoria | `#memoria` | Leer / escribir / sincronizar memoria |

### Repo CHEBA
- Nombre: `stannum-cheba-agent`
- Fuente de materiales existentes: carpeta Drive `6. CHEBA DISEÑO\`

---

## KAIROS — Agente de Agenda

### Dominio
Google Calendar, scheduling, coordinación de reuniones, disponibilidad.  
Canal principal: Google Calendar `eventos@stannum.com.ar`.

### Skills sugeridas (confirmar con Brahin antes de crear)
| Módulo | Skill | Comando | Descripción |
|--------|-------|---------|-------------|
| OPERATIVO | Buenos días | `#buenosdias` | Dashboard diario: agenda del día, reuniones próximas |
| OPERATIVO | Semana | `#semana` | Vista semanal de agenda |
| OPERATIVO | Cierre | `#cierre` | Cierre de sesión |
| PLANIFICACIÓN | Agendar | `#agendar [reunión]` | Crear evento con todos los datos correctos |
| PLANIFICACIÓN | Disponibilidad | `#disponibilidad [rango]` | Encontrar slot disponible para reunión |
| PLANIFICACIÓN | Reprogramar | `#reprogramar [evento]` | Mover evento con notificación a participantes |
| GOBERNANZA | Conflictos | `#conflictos` | Detectar solapamientos y doble bookings |
| GOBERNANZA | Memoria | `#memoria` | Leer / escribir / sincronizar memoria |

### Regla crítica KAIROS
- CalendarId SIEMPRE explícito: `eventos@stannum.com.ar`
- Nunca crear eventos sin especificar calendario destino

### Repo KAIROS
- Nombre: `stannum-kairos-agent`
- Fuente de materiales existentes: carpeta Drive `7. KAIROS\`

---

## Proceso de migración — paso a paso por agente

Este es el proceso exacto que se ejecutó con MAX. Replicar en el orden indicado.

### FASE 0 — Audit (antes de crear cualquier archivo)
```
1. Leer carpeta Drive del agente (HTMLs + SKILL .md files)
2. Leer tareas ClickUp del agente (lista del agente en workspace 12902722)
3. Leer Obsidian / notas del agente si existen
4. Producir matriz de reconciliación:
   - ¿Qué skills existen? ¿Con qué nombre?
   - ¿Hay conflictos de numeración o duplicados?
   - ¿Qué GAS scripts existen para este agente?
   - ¿Qué IDs críticos tiene (listas, espacios, calendarios)?
5. Mostrar a Brahin antes de continuar
```

### FASE 1 — Arquitectura de skills
```
1. Definir módulos y skills (máx 16, mín 8)
2. Nombrar con hash commands (sin números, sin M-prefix)
3. Identificar cuáles tienen GAS auto y cuáles son manuales
4. Resolver conflictos: skills duplicadas → merge con nombre definitivo
5. Mostrar tabla final a Brahin — aprobación antes de continuar
```

### FASE 2 — Crear repo GitHub
```
1. Nombre: stannum-[agente]-agent (todo minúsculas, sin tildes)
2. Privado ✅
3. Sin README en GitHub (se crea localmente)
4. Inicializar localmente:
   git init
   git config user.email "eventos@stannum.com.ar"
   git config user.name "Brahin Carrillo"
5. Remote:
   git remote add origin https://github.com/BRAHIN-Stannum/stannum-[agente]-agent.git
```

### FASE 3 — Poblar el repo
```
Crear en este orden:
1. CLAUDE.md          ← instrucciones de sesión del agente
2. README.md          ← guía del repo
3. skills/INDEX.md    ← tabla de todas las skills
4. skills/[skill].md  ← una por skill (16 archivos)
5. memory/INDEX.md    ← contexto permanente
6. memory/aprendizajes.md
7. memory/decisiones.md
8. memory/patrones.md
9. memory/okrs.md
10. arquitectura/[AGENTE]-arquitectura.md
11. gas/[AGENTE]_*.gs (copiar y adaptar scripts existentes)
```

### FASE 4 — MCP Server
```
1. Copiar mcp/ desde stannum-max-agent
2. cd mcp/ && npm install
3. Cambiar defaults en server.js:
   GITHUB_REPO = "stannum-[agente]-agent"
4. .gitignore ya incluido
5. .mcp.json: actualizar GITHUB_REPO
6. Registrar en Claude Code:
   claude mcp add -s user stannum-[agente] node \
     "C:/Users/Apud_/Documents/stannum-[agente]-agent/mcp/server.js" \
     -e GITHUB_TOKEN=[TOKEN] \
     -e GITHUB_OWNER=BRAHIN-Stannum \
     -e GITHUB_REPO=stannum-[agente]-agent \
     -e GITHUB_BRANCH=master
```

### FASE 5 — ClickUp
```
1. Renombrar tareas existentes: M0X [skill] → SKILL — #[nombre] | [descripción]
2. Crear tareas para skills sin tarea
3. Verificar que todas las skills tienen tarea en la lista del agente
4. Tags: diteg · ecosistema-ia · [agente] (en minúsculas)
```

### FASE 6 — Commit y push
```
git add .
git commit -m "feat: initial commit — [AGENTE] agent repo v1.0"
git push -u origin master
```

### FASE 7 — Alineación de skills (post-migración)
```
Ejecutar el proceso del SKILL-ALIGNMENT-BRIEF.md adaptado al agente.
El checklist de 11 puntos aplica igual a todos los agentes.
```

---

## Orden de ejecución recomendado

| Prioridad | Agente | Razón |
|-----------|--------|-------|
| 1 | **CRONOS** | Sin orquestador, todo lo demás es fragmentado |
| 2 | **TORO** | Pipeline comercial activo (Andes Salud + otros) — máx impacto económico inmediato |
| 3 | **LARA** | Eventos en producción — operación crítica |
| 4 | **KAIROS** | Agenda ligada a Lunes Estratégico y reuniones de equipo |
| 5 | **CHEBA** | Diseño/marketing — importante pero no bloquea operación inmediata |

**MAX ya está completo** — usar como referencia en cada migración.

---

## Checklist de done por agente

Un agente está **migrado** cuando:
- [ ] Repo GitHub privado creado y pusheado
- [ ] CLAUDE.md presente y auto-cargado en Claude Code
- [ ] 8-16 skills documentadas en `skills/`
- [ ] 5 archivos de memoria en `memory/`
- [ ] `arquitectura/[AGENTE]-arquitectura.md` como documento maestro
- [ ] MCP registrado en `~/.claude.json` con token real
- [ ] Tareas ClickUp renombradas a `SKILL — #[nombre] | [descripción]`
- [ ] Reglas cross-cutting incorporadas en CLAUDE.md
- [ ] SKILL-ALIGNMENT ejecutado (checklist de 11 puntos por skill)
- [ ] Primer `max_repo_status()` exitoso (confirma MCP activo)

Un agente está **alineado** cuando además:
- [ ] Todas las skills pasan el checklist de 11 puntos
- [ ] `skills/INDEX.md` con estado ✅ por skill
- [ ] `memory/INDEX.md` con contexto permanente completo
- [ ] `memory/decisiones.md` con decisiones de arquitectura del agente
- [ ] Cross-references entre skills usan hash commands correctos (sin nombres viejos)
- [ ] ALERTA-001 documentada donde corresponde

---

## Referencias

| Documento | Ubicación |
|-----------|-----------|
| Caso piloto MAX | `github.com/BRAHIN-Stannum/stannum-max-agent` |
| Arquitectura MAX (referencia) | `stannum-max-agent/arquitectura/MAX-arquitectura.md` |
| Brief de alineación skills | `stannum-max-agent/SKILL-ALIGNMENT-BRIEF.md` |
| MCP server (clonar) | `stannum-max-agent/mcp/server.js` |
| CLAUDE.md MAX (modelo) | `stannum-max-agent/CLAUDE.md` |
| Carpetas Drive agentes | `H:/Unidades compartidas/UN1. STANNUM/.../3. AGENTES/` |
| ClickUp Workspace | `12902722` · `app.clickup.com/12902722` |

---

## Notas críticas para CRONOS

1. **ALERTA-001 sigue activa** — token ClickUp expuesto, tarea `86ba2ehnn`, owner Mateo Lohezic. No desplegar GAS hasta resolución.
2. **GitHub PAT de MAX** — reemplazar PLACEHOLDER en `~/.claude.json` antes de iniciar cualquier otra migración. El mismo token sirve para todos los repos si se crea con scope `repo`.
3. **Un PAT para todos los repos** — el mismo `GITHUB_TOKEN` puede acceder a múltiples repos del mismo owner. No crear un PAT por agente.
4. **GAS deploy pendiente** — scripts de MAX escritos y listos en `stannum-max-agent/gas/`. Deploy con clasp pendiente de confirmación de Brahin. Hacer en paralelo con CRONOS Fase 1.
5. **Sin CRONOS operativo** — no lanzar ningún mecanismo de coordinación cross-agente. Decisión del 2026-05-21.

---

*Generado por MAX · Sesión 2026-05-23 · Para ejecución por CRONOS con aprobación de Brahin Carrillo*
