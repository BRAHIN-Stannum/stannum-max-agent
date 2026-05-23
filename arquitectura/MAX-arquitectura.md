# MAX — Arquitectura del Agente
**Versión:** 2.0 · **Actualizado:** 2026-05-23
**Documento único de referencia** — si hay conflicto con otro archivo, este gana.

---

## Stack tecnológico

```
┌─────────────────────────────────────────────────┐
│         GitHub stannum-max-agent (repo)          │
│     Skills · Memoria · Código GAS · Docs         │
│               ↕ siempre online                    │
├─────────────────┬───────────────────────────────┤
│  ClickUp (MCP)  │         Claude Code            │
│ Tareas · Sprint │  Lee GitHub vía MCP/clone      │
│ Pipeline · L1   │  Ejecuta skills                │
│ Inter-agentes   │  Interfaz con Brahin           │
└─────────────────┴───────────────────────────────┘
```

---

## IDs críticos

| Sistema | ID / Valor |
|---------|-----------|
| ClickUp Workspace | `12902722` |
| Space DITEG | `90144409477` |
| Lista MAX \| AGENTE DITEG | `901415394335` |
| Pipeline de Proyectos | `901415219852` |
| DITEG Gestión Operativa | `901413931989` |
| CalendarId | `eventos@stannum.com.ar` |
| GAS URL (DITEG) | `https://script.google.com/macros/s/AKfycbx59gHM7BGdjQ6fx2WtkymYffMTeW223XxNdEJ_sKtvc34xGaHMSnO3o0v20XURFLbE/exec` |

---

## Arquitectura de skills — 3 módulos / 16 skills

### MÓDULO OPERATIVO
Skills que estructuran el ritmo de trabajo diario y semanal.

| Skill | Comando | GAS auto | Descripción |
|-------|---------|----------|-------------|
| Buenos días | `#buenosdias` | Lun-Vie 07:25 | Dashboard diario: agenda, tareas, reprogramar |
| Semana | `#semana` | Dom 20:00 + Lun 09:00 | Vista semanal + reunión DITEG |
| Cierre | `#cierre` | Lun-Vie 17:55 | Cierre de día/sesión + actualización memoria |

### MÓDULO PLANIFICACIÓN
Skills para gestionar proyectos, tareas y estrategia.

| Skill | Comando | GAS auto | Descripción |
|-------|---------|----------|-------------|
| Sprint | `#sprint` | Lun 09:00 | Estado sprint activo, gate tasks, cierre formal |
| Pipeline | `#pipeline` | Lun 09:00 | Review semanal de todos los proyectos |
| Proyecto | `#proyecto [nombre]` | No | Deep dive de un proyecto específico |
| Bajada | `#bajada [texto]` | No | Instrucción estratégica → derivación al área |
| Tarea | `#tarea` | No | Creación guiada de tarea en ClickUp |

### MÓDULO GOBERNANZA
Skills de análisis, auditoría y gestión del conocimiento.

| Skill | Comando | GAS auto | Descripción |
|-------|---------|----------|-------------|
| Diagnóstico | `#diagnóstico` | No | Análisis situacional DITEG (framework Bernabéu) |
| Equipo | `#equipo` | Lun 09:00 | Carga del equipo, distribución, alertas delegación |
| GovIA | `#govIA` | No | Auditoría ecosistema agéntico STANNUM |
| Brainstorm | `#brainstorm` | No | Captura y catalogación de ideas |
| Brief | `#brief` | No | Convertir pedido difuso en proyecto estructurado |
| SOP | `#sop [área]` | No | Consultar o redactar procedimientos estándar |
| Informe | `#informe` | Vie 17:00 | Informe Semanal DITEG para distribución |
| Memoria | `#memoria` | No | Leer / escribir / sincronizar memoria del agente |

---

## Arquitectura de memoria

| Nivel | Nombre | Dónde | Cuándo usar |
|-------|--------|-------|-------------|
| L1 | Memoria viva | Comentarios ClickUp | Registro inmediato de sesión |
| L2 | Memoria estable | Docs ClickUp (`c9ra2-*`) | Protocolos y decisiones consolidadas |
| L3 | Memoria permanente | GitHub `memory/` | Aprendizajes, patrones, OKRs, decisiones |

---

## GAS — Triggers automáticos

| Función | Horario | Skills activadas |
|---------|---------|-----------------|
| `triggerBuenDias` | Lun-Vie 07:25 | `#buenosdias` |
| `triggerCheckpoint` | Lun-Vie 12:55 | Modo lite de `#buenosdias` |
| `triggerCierreDia` | Lun-Vie 17:55 | `#cierre` (modo auto) |
| `triggerLunesEstrategico` | Lun 09:00 | `#sprint` + `#pipeline` + `#equipo` |
| `triggerPrepConcentracion` | Dom 20:00 | `#semana` |
| `triggerInformeSemanal` | Vie 17:00 | `#informe` |

**Estado GAS:** scripts escritos y listos — deploy con clasp pendiente de confirmación.

---

## Jerarquía de agentes STANNUM

```
CRONOS (orquestador)  ←  🔴 Fase 1 pendiente
├── MAX     → estrategia y operaciones DITEG
├── LARA    → eventos
├── TORO    → ventas / CRM
├── CHEBA   → diseño / marketing
└── KAIROS  → agenda
```

**Regla de derivación:** cuando una tarea cae fuera del dominio del agente activo → nombrar el agente correcto y derivar en lugar de intentar resolverlo.

---

## Reglas operativas no negociables

| Regla | Sistema | Detalle |
|-------|---------|---------|
| CRM first | Kommo | Si no está en Kommo, el acuerdo no pasó |
| Pagos | ADFIN | Ningún agente cobra directo |
| ECLI PASES | ECLI | Obligatorio antes de confirmar pago |
| ClickUp | ClickUp | Diseñar en conversación primero — ejecutar con aprobación |
| CalendarId | Calendar | Siempre `eventos@stannum.com.ar` |
| Fuente estratégica | Todo output | Sin fuente = opinión (Microsoft, McKinsey, BCG, WEF, Gartner) |
| Bernabéu Cash Rule | Finanzas | No lanzar evento/campaña sin 3 meses reserva + ROI verificado |
| ALERTA-001 | GovIA | Token expuesto — rotar con Mateo Lohezic · tarea `86ba2ehnn` |

---

## Historial de decisiones de arquitectura

| Decisión | Fecha | Resultado |
|---------|-------|-----------|
| Nomenclatura skills con hash (sin M-números) | 2026-05-23 | Elimina conflicto v1/v2 |
| GitHub como memoria persistente | 2026-05-23 | Repo `stannum-max-agent` activo |
| 3 módulos / 16 skills (desde 20+ fragmentadas) | 2026-05-23 | Simplificación arquitectural |
| Drive HTML → referencia, no fuente activa | 2026-05-23 | 34 HTMLs en `/2. AGENTE/` como legacy |
| CRONOS como orquestador antes de nuevos agentes | 2026-05-21 | Pendiente Brahin |
| Claude Code como runtime principal | 2026-05 | > GPT por capacidad de acción |

---

## Conflictos resueltos

| Conflicto | Fuente A | Fuente B | Resolución |
|---------|---------|---------|-----------|
| Numeración M | M06-M18 (CLAUDE.md v1) | M05-M17 (Indice_v2) | Eliminados — skills por nombre |
| `#reunionditeg` vs `#concentracion` | HTML separados | GAS trigger separado | Unificados en `#semana` |
| `#cierredia` vs `cierre-sesion` | GAS auto | Claude manual | Unificados en `#cierre` (2 modos) |
| `#reporte` vs `#informe` | v2 HTML | v1 CU | Unificados en `#informe` |
| `#nueva-tarea` vs `#tarea` | CU v1 | Propuesta nueva arch | Renombrado a `#tarea` |
