/**
 * MAXI — Módulos M09, M11, M17 (Automatizados vía AppScript)
 * M09: #sprint  | M11: #pipeline | M17: #equipo
 * Versión: 1.0 | Fecha: 01/05/2026
 *
 * DEPENDENCIAS: MAXI_Config.gs, MAXI_ClickUp.gs, MAXI_Chat.gs
 *
 * NOTA DE ARQUITECTURA:
 * Los módulos M08, M10, M12, M13, M14, M15, M16 son exclusivamente
 * CONVERSACIONALES — se activan en Claude por comando de texto.
 * Este archivo cubre los 3 módulos que tienen cadencia automática:
 *   M09 → Lunes 09:00 (reporte sprint)
 *   M11 → Lunes 09:00 (pipeline review)
 *   M17 → Lunes 09:00 (estado equipo)
 */

// ══════════════════════════════════════════════════════════════════════════════
// M09 — #sprint | Estado del sprint activo DITEG
// Trigger automático: lunes 09:00 | Manual: enviar "#sprint" a MAXI
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Obtiene y formatea el estado del sprint activo de MAXI DITEG.
 * Fuente 1: Lista MAX | AGENTE DITEG (901415394335) — sprint de MAXI
 * Fuente 2: Space DITEG (90144409477) — tareas operativas activas próx. 7 días
 *
 * LIVE TEST 01/05/2026:
 * Sprint S1 — Estado: 🟡 AMARILLO
 * - Total tareas sprint: 21 | En progreso: 1 (M18) | Urgentes sin fecha: 1 (ÍNDICE)
 * - VENCIDA: #6 Aprobación cierre Fase 1 (due 28/04) ← GATE bloqueante
 * - Próxima: #8 Test M06 (due 10/05)
 * - Pendientes M09-M17: 10 módulos en to do
 * Top 3 acciones: (1) Cerrar o reprogramar #6 gate, (2) Ejecutar test M06,
 *                 (3) Desplegar M09-M17 en sistem prompt
 */
function ejecutarSprintReport() {
  try {
    // LLAMADA 1: Sprint MAXI
    const sprintResult = clickupRequest(
      `list/${MAXI_CONFIG.listas.maxi_sprint}/task?subtasks=false&include_closed=false&order_by=due_date`
    );
    if (!sprintResult) {
      enviarAMaxi("⚠️ *M09 #sprint*: No se pudo obtener datos del sprint.");
      return;
    }

    const tareas = sprintResult.tasks || [];
    const ahora = Date.now();
    const en7dias = ahora + (7 * 86400000);

    const enProgreso = tareas.filter(t => t.status?.status === "in progress");
    const vencidas   = tareas.filter(t => t.due_date && parseInt(t.due_date) < ahora &&
                         !["complete","closed","cancelled"].includes(t.status?.status));
    const proximas   = tareas.filter(t => t.due_date &&
                         parseInt(t.due_date) >= ahora &&
                         parseInt(t.due_date) <= en7dias);
    const sinFecha   = tareas.filter(t => !t.due_date &&
                         !["complete","closed","cancelled"].includes(t.status?.status) &&
                         t.priority?.priority === "urgent");
    const completadas = tareas.filter(t => ["complete","closed"].includes(t.status?.status));

    // Determinar semáforo
    let semaforo = "🟢 VERDE";
    if (vencidas.length > 0) semaforo = "🟡 AMARILLO";
    if (vencidas.length >= 3) semaforo = "🔴 ROJO";

    // Determinar número de semana del sprint
    const semana = obtenerNumeroSemana(new Date());

    let msg = `📊 *M09 #sprint — S${semana} | ${semaforo}*\n`;
    msg += `_${new Date().toLocaleDateString("es-AR", {weekday:"long", day:"numeric", month:"long"})}_\n\n`;

    // Resumen
    msg += `📌 ${tareas.length} tareas · ✅ ${completadas.length} done · 🔄 ${enProgreso.length} en progreso · 🔴 ${vencidas.length} vencidas\n\n`;

    // Vencidas (bloqueantes)
    if (vencidas.length > 0) {
      msg += `🔴 *VENCIDAS — DESBLOQUEAR HOY*\n`;
      vencidas.slice(0, 5).forEach(t => {
        const fecha = new Date(parseInt(t.due_date));
        const fechaStr = fecha.toLocaleDateString("es-AR", {day:"numeric", month:"short"});
        msg += `• <${t.url}|${t.name}> (${fechaStr})\n`;
      });
      msg += `\n`;
    }

    // En progreso
    if (enProgreso.length > 0) {
      msg += `🔄 *EN PROGRESO*\n`;
      enProgreso.forEach(t => msg += `• ${t.name}\n`);
      msg += `\n`;
    }

    // Urgentes sin fecha
    if (sinFecha.length > 0) {
      msg += `⚡ *URGENTES SIN FECHA*\n`;
      sinFecha.forEach(t => msg += `• <${t.url}|${t.name}> → asignar fecha\n`);
      msg += `\n`;
    }

    // Próximas 7 días
    if (proximas.length > 0) {
      msg += `📅 *PRÓXIMAS (7 días)*\n`;
      proximas.slice(0, 5).forEach(t => {
        const fecha = new Date(parseInt(t.due_date));
        const fechaStr = fecha.toLocaleDateString("es-AR", {day:"numeric", month:"short"});
        msg += `• ${t.name} → ${fechaStr}\n`;
      });
      msg += `\n`;
    }

    // Top 3 acciones recomendadas
    msg += `─────────────────────────────\n`;
    msg += `🎯 *TOP 3 ACCIONES*\n`;
    if (vencidas.length > 0) {
      msg += `1. Resolver o reprogramar: _${vencidas[0].name}_\n`;
    }
    if (enProgreso.length > 0) {
      msg += `2. Avanzar en progreso: _${enProgreso[0].name}_\n`;
    } else if (proximas.length > 0) {
      msg += `2. Preparar próxima: _${proximas[0].name}_\n`;
    }
    msg += `3. Revisar módulos sin fecha de deploy\n`;
    msg += `\n_M09 #sprint | MAXI v1.0_`;

    enviarAMaxi(msg);
    Logger.log("✅ M09 #sprint enviado.");

  } catch (e) {
    Logger.log(`❌ Error M09 #sprint: ${e.message}`);
    enviarAMaxi(`⚠️ M09 #sprint error: ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// M11 — #pipeline | Revisión Semanal del Pipeline de Proyectos
// Trigger automático: lunes 09:00 | Manual: "#pipeline" o "revisemos el pipeline"
// Cadencia: 🔁 Lunes 09:00 — recurrente
//
// LIVE TEST 01/05/2026:
// 28 proyectos: 4 done | 10 en progreso | 14 pendientes
// 🔴 URGENTES VENCIDOS: Naturgin (27/04, Nico N), KRs 2026 (30/04, Brahin)
// ⚠️ HIGH VENCIDOS (7): Táctica Bernabéu, Ciberseg, STANNUM Academy,
//    Economía Conocimiento, Estructuración ADFIN, Perf Paid Media, STANNUM GAME Q2
// ✅ En progreso sano: CESSI MdP, LANDING TRENNO, BRAWN, Acuerdos Comerciales
// Dist. responsable: Brahin(8) | Sofi(6) | Seba(4) | Nico N(2) | Nico D(2) | Ale(1)
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Genera revisión semanal del Pipeline de Proyectos STANNUM.
 * Agrupa por estado, detecta vencidos, calcula carga por responsable.
 */
function ejecutarPipelineReview() {
  try {
    // LLAMADA 1: Pipeline completo
    const pipelineResult = clickupRequest(
      `list/${MAXI_CONFIG.listas.pipeline_proyectos}/task?include_closed=false&order_by=due_date`
    );
    if (!pipelineResult) {
      enviarAMaxi("⚠️ *M11 #pipeline*: No se pudo obtener el pipeline.");
      return;
    }

    const tareas = pipelineResult.tasks || [];
    const ahora = Date.now();

    // Clasificar por estado
    const enProgreso = tareas.filter(t => t.status?.status === "in progress");
    const pendientes = tareas.filter(t =>
      !["in progress","complete","closed","cancelled"].includes(t.status?.status)
    );
    const vencidas = tareas.filter(t =>
      t.due_date && parseInt(t.due_date) < ahora &&
      !["complete","closed","cancelled"].includes(t.status?.status)
    );
    const urgentes  = vencidas.filter(t => t.priority?.priority === "urgent");
    const vencidasHigh = vencidas.filter(t => t.priority?.priority === "high");

    // Distribución por responsable
    const cargaPorPersona = {};
    tareas.forEach(t => {
      if (["complete","closed","cancelled"].includes(t.status?.status)) return;
      t.assignees?.forEach(a => {
        const nombre = a.username || `ID:${a.id}`;
        if (!cargaPorPersona[nombre]) cargaPorPersona[nombre] = { activas: 0, vencidas: 0 };
        cargaPorPersona[nombre].activas++;
        if (t.due_date && parseInt(t.due_date) < ahora) {
          cargaPorPersona[nombre].vencidas++;
        }
      });
    });

    // Semáforo general
    let semaforo = "🟢 VERDE";
    if (urgentes.length > 0 || vencidasHigh.length >= 3) semaforo = "🟡 AMARILLO";
    if (urgentes.length >= 2 || vencidas.length >= 5) semaforo = "🔴 ROJO";

    const semana = obtenerNumeroSemana(new Date());
    let msg = `📋 *M11 #pipeline — S${semana} | ${semaforo}*\n`;
    msg += `_${new Date().toLocaleDateString("es-AR", {weekday:"long", day:"numeric", month:"long"})}_\n\n`;

    // Resumen
    msg += `📊 *RESUMEN*\n`;
    msg += `• Total: ${tareas.length} proyectos\n`;
    msg += `• 🔄 En progreso: ${enProgreso.length}\n`;
    msg += `• ⏳ Pendientes: ${pendientes.length}\n`;
    msg += `• 🔴 Vencidos: ${vencidas.length} (${urgentes.length} urgentes)\n\n`;

    // Urgentes vencidos — prioridad máxima
    if (urgentes.length > 0) {
      msg += `🚨 *URGENTES VENCIDOS — ACCIÓN INMEDIATA*\n`;
      urgentes.forEach(t => {
        const resp = t.assignees?.[0]?.username || "Sin asignar";
        const fechaStr = new Date(parseInt(t.due_date)).toLocaleDateString("es-AR", {day:"numeric", month:"short"});
        msg += `🔴 <${t.url}|${t.name}> · ${resp} · vencía ${fechaStr}\n`;
      });
      msg += `\n`;
    }

    // High vencidos
    if (vencidasHigh.length > 0) {
      msg += `⚠️ *HIGH VENCIDOS (${vencidasHigh.length})*\n`;
      vencidasHigh.slice(0, 5).forEach(t => {
        const resp = t.assignees?.[0]?.username || "Sin asignar";
        msg += `• <${t.url}|${t.name}> · ${resp}\n`;
      });
      if (vencidasHigh.length > 5) msg += `_+${vencidasHigh.length - 5} más_\n`;
      msg += `\n`;
    }

    // En progreso sano
    const enProgresoSano = enProgreso.filter(t =>
      !t.due_date || parseInt(t.due_date) >= ahora
    );
    if (enProgresoSano.length > 0) {
      msg += `✅ *EN PROGRESO — AVANZANDO*\n`;
      enProgresoSano.slice(0, 5).forEach(t => {
        const resp = t.assignees?.[0]?.username || "Sin asignar";
        msg += `• ${t.name} · ${resp}\n`;
      });
      msg += `\n`;
    }

    // Carga por responsable (top 5 con más activas)
    const ranking = Object.entries(cargaPorPersona)
      .sort((a, b) => b[1].activas - a[1].activas)
      .slice(0, 5);

    if (ranking.length > 0) {
      msg += `👥 *CARGA POR RESPONSABLE*\n`;
      ranking.forEach(([nombre, data]) => {
        const alerta = data.activas >= 6 ? " ⚠️" : "";
        const venc = data.vencidas > 0 ? ` (${data.vencidas} venc)` : "";
        msg += `• ${nombre}: ${data.activas} activas${venc}${alerta}\n`;
      });
      msg += `\n`;
    }

    msg += `─────────────────────────────\n`;
    msg += `_M11 #pipeline | MAXI v1.0 · Lunes ${new Date().toLocaleDateString("es-AR")}_`;

    enviarAMaxi(msg);
    Logger.log("✅ M11 #pipeline enviado.");

  } catch (e) {
    Logger.log(`❌ Error M11 #pipeline: ${e.message}`);
    enviarAMaxi(`⚠️ M11 #pipeline error: ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// M17 — #equipo | Estado de responsables DITEG
// Trigger automático: lunes 09:00 | Manual: "#equipo" o "quién tiene qué"
//
// GAPS CONOCIDOS (GAP-M17-A y GAP-M17-B):
// GAP-M17-A: La API de ClickUp no soporta filtrar por MÚLTIPLES assignees en
//            un solo call de forma granular. Se usa una llamada por área.
// GAP-M17-B: IDs de equipo extraídos de Pipeline 01/05/2026. Actualizar si
//            se incorporan nuevos miembros.
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Fotografía del estado de todos los responsables de DITEG.
 * Lee tareas activas del space DITEG y agrupa por assignee.
 */
function ejecutarEquipoStatus() {
  try {
    // Los IDs del equipo están en MAXI_CONFIG.equipo (ver MAXI_Config.gs)
    const equipo = MAXI_CONFIG.equipo;
    if (!equipo) {
      enviarAMaxi("⚠️ M17: MAXI_CONFIG.equipo no configurado.");
      return;
    }

    // LLAMADA 1: Tareas activas del space DITEG + Pipeline
    const spaceResult = clickupRequest(
      `team/${MAXI_CONFIG.usuarios.stannum.id}/task?` +
      `statuses[]=to do&statuses[]=in progress&statuses[]=open&` +
      `include_closed=false&subtasks=false&page=0`
    );

    // LLAMADA 2: Pipeline proyectos
    const pipelineResult = clickupRequest(
      `list/${MAXI_CONFIG.listas.pipeline_proyectos}/task?include_closed=false`
    );

    const todasLasTareas = [
      ...(spaceResult?.tasks || []),
      ...(pipelineResult?.tasks || [])
    ];

    const ahora = Date.now();
    const hace7dias = ahora - (7 * 86400000);

    // Agrupar por persona
    const porPersona = {};
    Object.entries(equipo).forEach(([key, persona]) => {
      porPersona[key] = {
        nombre: persona.nombre,
        area: persona.area,
        activas: 0,
        urgentes: 0,
        vencidas: 0,
        tareasMasAntiguas: []
      };
    });

    todasLasTareas.forEach(t => {
      if (["complete","closed","cancelled","done"].includes(t.status?.status?.toLowerCase())) return;

      t.assignees?.forEach(a => {
        const miembro = Object.values(equipo).find(p => p.id === String(a.id));
        if (!miembro) return;
        const key = Object.keys(equipo).find(k => equipo[k].id === String(a.id));
        if (!key || !porPersona[key]) return;

        porPersona[key].activas++;
        if (t.priority?.priority === "urgent") porPersona[key].urgentes++;
        if (t.due_date && parseInt(t.due_date) < ahora) {
          porPersona[key].vencidas++;
          if (parseInt(t.due_date) < hace7dias) {
            porPersona[key].tareasMasAntiguas.push(t.name);
          }
        }
      });
    });

    // Detectar sin asignar en pipeline
    const sinAsignar = todasLasTareas.filter(t =>
      (!t.assignees || t.assignees.length === 0) &&
      !["complete","closed","cancelled"].includes(t.status?.status?.toLowerCase())
    );

    // Identificar candidatos a delegar desde Brahin
    const cargaBrahin = porPersona["brahin"];
    const delegables = todasLasTareas.filter(t =>
      t.assignees?.some(a => a.id === parseInt(MAXI_CONFIG.usuarios.brahin.id)) &&
      !["urgent","high"].includes(t.priority?.priority) &&
      !["complete","closed","cancelled"].includes(t.status?.status?.toLowerCase())
    ).slice(0, 3);

    const semana = obtenerNumeroSemana(new Date());
    let msg = `👥 *M17 #equipo — S${semana} | Estado DITEG*\n`;
    msg += `_${new Date().toLocaleDateString("es-AR", {weekday:"long", day:"numeric", month:"long"})}_\n\n`;

    // Tabla por persona
    msg += `*PERSONA · ACTIVAS · URG · VENC · ALERTA*\n`;
    Object.entries(porPersona).forEach(([key, data]) => {
      let alerta = "✅";
      // GAP-M17-C FIX: umbral ajustado a 3 (equipo pequeño de STANNUM)
      if (data.urgentes >= 3) alerta = "🔴 SOBRECARGA";
      else if (data.vencidas >= 3) alerta = "⚠️ VENCIDAS";
      else if (data.urgentes >= 2) alerta = "🟡 PRESIÓN";

      msg += `• *${data.nombre}* (${data.area}): ${data.activas} activas · `;
      msg += `${data.urgentes} urg · ${data.vencidas} venc · ${alerta}\n`;
    });
    msg += `\n`;

    // Alertas críticas
    const sobrecargas = Object.values(porPersona).filter(p => p.urgentes >= 5);
    if (sobrecargas.length > 0) {
      msg += `🚨 *SOBRECARGAS DETECTADAS*\n`;
      sobrecargas.forEach(p => msg += `• ${p.nombre}: ${p.urgentes} urgentes → revisar delegación\n`);
      msg += `\n`;
    }

    // Sin asignar
    if (sinAsignar.length > 0) {
      msg += `⚪ *SIN ASIGNAR (${sinAsignar.length})*\n`;
      sinAsignar.slice(0, 3).forEach(t => msg += `• ${t.name}\n`);
      if (sinAsignar.length > 3) msg += `_+${sinAsignar.length - 3} más_\n`;
      msg += `\n`;
    }

    // Candidatos a delegar desde Brahin
    if (delegables.length > 0) {
      msg += `🔄 *BRA PUEDE DELEGAR*\n`;
      delegables.forEach(t => msg += `• ${t.name}\n`);
      msg += `\n`;
    }

    msg += `─────────────────────────────\n`;
    msg += `_M17 #equipo | MAXI v1.0_`;

    enviarAMaxi(msg);
    Logger.log("✅ M17 #equipo enviado.");

  } catch (e) {
    Logger.log(`❌ Error M17 #equipo: ${e.message}`);
    enviarAMaxi(`⚠️ M17 #equipo error: ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// M08 BRAINSTORM — Registrar idea en ClickUp (llamado desde conversación Claude)
// Los módulos M10, M12, M13, M14, M15, M16 son 100% conversacionales en Claude.
// Este helper solo hace la parte de escritura en ClickUp cuando Claude lo activa.
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Registra una idea estructurada en el Backlog / Ideas de DITEG.
 * Llamado desde Claude (Cowork) cuando se aprueba la ficha de brainstorm.
 *
 * @param {string} nucleo - La esencia de la idea (1 línea)
 * @param {string} forma  - Cómo se ejecutaría
 * @param {string} traccion - Por qué ahora / qué problema resuelve
 * @param {string} pilar  - Uno de: ESTRUCTURA Y GOBERNANZA | OPERATIVO | COMERCIAL | EXPANSIÓN | IA
 * @param {string} area   - Una de las áreas STANNUM
 */
function registrarIdeaBrainstorm(nucleo, forma, traccion, pilar, area) {
  const listId = MAXI_CONFIG.listas.brainstorm_ideas;
  if (!listId) {
    Logger.log("❌ M08: MAXI_CONFIG.listas.brainstorm_ideas no configurado.");
    return null;
  }

  const nombre = `💡 ${nucleo}`;
  const descripcion = `## FICHA BRAINSTORM\n\n` +
    `**🎯 NÚCLEO:** ${nucleo}\n\n` +
    `**⚙️ FORMA:** ${forma}\n\n` +
    `**🚀 TRACCIÓN:** ${traccion}\n\n` +
    `---\n` +
    `**Pilar:** ${pilar}\n` +
    `**Área:** ${area}\n` +
    `**Capturado:** ${new Date().toLocaleDateString("es-AR")}\n` +
    `**Origen:** Brainstorm con MAXI`;

  const result = crearTareaClickUp(listId, nombre, descripcion, 3, null,
    [parseInt(MAXI_CONFIG.usuarios.brahin.id)]);

  if (result && !result.duplicado) {
    comentarTarea(result.tarea.id,
      `Idea capturada con M08 #brainstorm. Pilar: ${pilar} | Área: ${area}`
    );
    return result.tarea;
  }
  return result;
}

// ══════════════════════════════════════════════════════════════════════════════
// UTILIDAD COMPARTIDA — obtenerNumeroSemana
// (Definida también en MAXI_Triggers.gs — no duplicar al fusionar archivos)
// ══════════════════════════════════════════════════════════════════════════════

// No redefinir si ya existe en Triggers. AppScript carga todos los .gs juntos.
// La función obtenerNumeroSemana() ya está en MAXI_Triggers.gs.
