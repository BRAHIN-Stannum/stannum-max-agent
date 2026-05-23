/**
 * MAXI — Módulo de Triggers (Disparadores Automáticos)
 * Orquesta todos los flujos automáticos de MAXI con Google Workspace
 * Versión: 1.0 | Fecha: 01/05/2026
 *
 * DEPENDENCIAS: MAXI_Config.gs, MAXI_ClickUp.gs, MAXI_Calendar.gs,
 *               MAXI_Drive.gs, MAXI_Chat.gs
 *
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. En Apps Script: Editar > Triggers del proyecto actual
 * 2. Crear los triggers indicados abajo para cada función
 * 3. Verificar que MAXI_Config.verificarConfiguracion() pase sin errores
 */

// ══════════════════════════════════════════════════════════════════════════════
// TRIGGER 1: #BUENOSDIAS — Ejecutar lunes a viernes 07:25
// Tipo: Basado en tiempo → Temporizador del día → 7:00 a 8:00
// ══════════════════════════════════════════════════════════════════════════════

function triggerBuenDias() {
  try {
    Logger.log("🟡 MAXI TRIGGER: Iniciando #buenosdias...");

    // 1. Obtener datos
    const tareasHoy       = getTareasHoy();
    const tareasVencidas  = getTareasVencidas();
    const eventosHoy      = getEventosHoy().filter(e => !e.getTitle().startsWith("MAX |"));

    // 2. Obtener transcripciones del día anterior (nuevo — FIX GAP-M06-TRANSCRIPCIONES)
    const transcripciones = getTranscripcionesAyer();

    // 3. Enviar buendia a Brahin por Chat (ahora incluye transcripciones + total real)
    const msgBuendia = generarBuendia(
      tareasHoy,
      tareasVencidas,
      eventosHoy.map(e => ({
        summary: e.getTitle(),
        start: { dateTime: e.getStartTime().toISOString() }
      })),
      transcripciones  // ← nuevo parámetro
    );
    enviarAMaxi(msgBuendia);

    // 3. Verificar gate tasks vencidas en sprint MAXI
    const sprint = getEstadoSprintMaxi();
    if (sprint && sprint.vencidas.length > 0) {
      sprint.vencidas.forEach(t => {
        // Solo alertar gate tasks
        if (t.name.toLowerCase().includes("gate") || t.tags?.some(tag => tag.name === "gate")) {
          notificarGateTasKVencida(t);
        }
      });
    }

    // 4. Detectar conflictos de agenda semanal (solo los lunes)
    const hoy = new Date();
    if (hoy.getDay() === 1) { // Lunes
      const vistaSemanal = generarVistaSemanal();
      if (vistaSemanal.conflictos.length > 0) {
        notificarConflictosAgenda(vistaSemanal.conflictos);
      }
    }

    Logger.log("✅ MAXI TRIGGER: #buenosdias completado.");

  } catch (e) {
    Logger.log(`❌ Error en triggerBuenDias: ${e.message}`);
    enviarAMaxi(`⚠️ *MAXI ERROR*: triggerBuenDias falló — ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// TRIGGER 2: #CHECKPOINT — Ejecutar lunes a viernes 12:55
// Tipo: Basado en tiempo → Temporizador del día → 12:00 a 13:00
// ══════════════════════════════════════════════════════════════════════════════

function triggerCheckpoint() {
  try {
    Logger.log("🟡 MAXI TRIGGER: Iniciando #checkpoint...");
    notificarCheckpoint();
    Logger.log("✅ MAXI TRIGGER: #checkpoint completado.");
  } catch (e) {
    Logger.log(`❌ Error en triggerCheckpoint: ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// TRIGGER 3: #CIERREDIA — Ejecutar lunes a viernes 17:55
// Tipo: Basado en tiempo → Temporizador del día → 17:00 a 18:00
// ══════════════════════════════════════════════════════════════════════════════

function triggerCierreDia() {
  try {
    Logger.log("🟡 MAXI TRIGGER: Iniciando #cierredia...");
    notificarCierreDia();
    Logger.log("✅ MAXI TRIGGER: #cierredia completado.");
  } catch (e) {
    Logger.log(`❌ Error en triggerCierreDia: ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// TRIGGER 3B: LUNES ESTRATÉGICO — M09 + M11 + M17 · Lunes 09:00
// Tipo: Basado en tiempo → Temporizador de la semana → Lunes
// Activa: Sprint Review + Pipeline Review + Estado Equipo
// ══════════════════════════════════════════════════════════════════════════════

function triggerLunesEstrategico() {
  try {
    Logger.log("🟡 MAXI TRIGGER: Iniciando Lunes Estratégico (M09+M11+M17)...");

    // M09 — Estado del sprint MAXI
    ejecutarSprintReport();
    Utilities.sleep(2000);

    // M11 — Pipeline review
    ejecutarPipelineReview();
    Utilities.sleep(2000);

    // M17 — Estado equipo DITEG
    ejecutarEquipoStatus();

    Logger.log("✅ MAXI TRIGGER: Lunes Estratégico completado.");

  } catch (e) {
    Logger.log(`❌ Error en triggerLunesEstrategico: ${e.message}`);
    enviarAMaxi(`⚠️ *MAXI ERROR*: triggerLunesEstrategico falló — ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// TRIGGER 4: PREP CONCENTRACIÓN — Ejecutar domingos 20:00
// Tipo: Basado en tiempo → Temporizador de la semana → Domingo
// ══════════════════════════════════════════════════════════════════════════════

function triggerPrepConcentracion() {
  try {
    Logger.log("🟡 MAXI TRIGGER: Iniciando prep concentración semanal...");

    // 1. Generar vista semanal
    const vistaSemanal = generarVistaSemanal();

    // 2. Alertar conflictos si los hay
    if (vistaSemanal.conflictos.length > 0) {
      notificarConflictosAgenda(vistaSemanal.conflictos);
    }

    // 3. Generar agenda DITEG
    const agendaTexto = generarAgendaDITEGTexto(vistaSemanal);

    // 4. Actualizar descripción del evento Calendar
    actualizarAgendaDITEG(agendaTexto);

    // 5. Crear doc de actas en Drive (vacío, listo para completar)
    const proximoLunes = getProximoLunes();
    const urlActas = crearActasReunionDITEG(agendaTexto, proximoLunes);

    // 6. Notificar al equipo DITEG
    const msgCompleto = formatearVistaSemanal(vistaSemanal);
    if (urlActas) {
      notificarAgendaDITEG(msgCompleto + `\n📝 *Actas:* ${urlActas}`);
    } else {
      notificarAgendaDITEG(msgCompleto);
    }

    Logger.log("✅ MAXI TRIGGER: Concentración semanal preparada.");

  } catch (e) {
    Logger.log(`❌ Error en triggerPrepConcentracion: ${e.message}`);
    enviarAMaxi(`⚠️ *MAXI ERROR*: triggerPrepConcentracion falló — ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// TRIGGER 5: INFORME SEMANAL — Ejecutar viernes 17:00 (M18 #informe)
// Tipo: Basado en tiempo → Temporizador de la semana → Viernes
// ══════════════════════════════════════════════════════════════════════════════

function triggerInformeSemanal() {
  try {
    Logger.log("🟡 MAXI TRIGGER: Iniciando informe semanal...");

    // Crear estructura del doc
    const urlInforme = crearInformeSemanalDITEG({});

    // Notificar a Brahin con link
    const hoy = new Date();
    const semana = obtenerNumeroSemana(hoy);
    const msg = `📊 *INFORME SEMANAL DITEG — S${semana}*\n\n` +
      `El doc está listo para completar:\n${urlInforme}\n\n` +
      `_Disparador: #informe | MAXI v2.4_`;

    enviarAMaxi(msg);

    Logger.log("✅ MAXI TRIGGER: Informe semanal creado.");
  } catch (e) {
    Logger.log(`❌ Error en triggerInformeSemanal: ${e.message}`);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// INSTALADOR DE TRIGGERS — Ejecutar UNA VEZ para configurar
// ══════════════════════════════════════════════════════════════════════════════

/**
 * Instala todos los triggers de MAXI en este proyecto de Apps Script.
 * Ejecutar manualmente SOLO una vez después de configurar Script Properties.
 * ⚠️ Elimina triggers existentes antes de crear los nuevos.
 */
function instalarTriggers() {
  // Eliminar todos los triggers existentes
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  Logger.log("🗑️ Triggers anteriores eliminados.");

  // #buenosdias — Lunes a Viernes 7-8 AM
  ScriptApp.newTrigger("triggerBuenDias")
    .timeBased()
    .everyDays(1)
    .atHour(7)
    .nearMinute(25)
    .create();
  Logger.log("✅ Trigger #buenosdias instalado.");

  // #checkpoint — Lunes a Viernes 12-13
  ScriptApp.newTrigger("triggerCheckpoint")
    .timeBased()
    .everyDays(1)
    .atHour(12)
    .nearMinute(55)
    .create();
  Logger.log("✅ Trigger #checkpoint instalado.");

  // #cierredia — Lunes a Viernes 17-18
  ScriptApp.newTrigger("triggerCierreDia")
    .timeBased()
    .everyDays(1)
    .atHour(17)
    .nearMinute(55)
    .create();
  Logger.log("✅ Trigger #cierredia instalado.");

  // M09 + M11 + M17 — Lunes Estratégico 09:00
  ScriptApp.newTrigger("triggerLunesEstrategico")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();
  Logger.log("✅ Trigger Lunes Estratégico (M09+M11+M17) instalado.");

  // Prep concentración — Domingos 20:00
  ScriptApp.newTrigger("triggerPrepConcentracion")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.SUNDAY)
    .atHour(20)
    .create();
  Logger.log("✅ Trigger PrepConcentración instalado.");

  // Informe semanal — Viernes 17:00
  ScriptApp.newTrigger("triggerInformeSemanal")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(17)
    .create();
  Logger.log("✅ Trigger InformeSemanal instalado.");

  Logger.log("\n🚀 MAXI: Todos los triggers instalados correctamente.");
  Logger.log("Verificar en: Editar > Triggers del proyecto actual");
}

// ── UTILITIES ────────────────────────────────────────────────────────────────

function getProximoLunes() {
  const hoy = new Date();
  const diaSemana = hoy.getDay();
  const diasHastaLunes = diaSemana === 0 ? 1 : 8 - diaSemana;
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() + diasHastaLunes);
  lunes.setHours(10, 0, 0, 0);
  return lunes;
}

function obtenerNumeroSemana(fecha) {
  const d = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

/**
 * Genera el texto de agenda DITEG en base a la vista semanal y las tareas vencidas.
 * Versión simplificada — el texto completo lo genera MAXI en Claude.
 */
function generarAgendaDITEGTexto(vistaSemanal) {
  const lunes = getProximoLunes();
  const fechaStr = Utilities.formatDate(lunes, MAXI_CONFIG.zona_horaria, "dd/MM/yyyy");

  let agenda = `AGENDA DITEG — ${fechaStr}\n\n`;
  agenda += `1. Estado general y #buendia semanal (10 min)\n`;
  agenda += `2. EVENTOS — bloque crítico (20 min)\n`;
  agenda += `3. GECO — pipeline y OKRs (10 min)\n`;
  agenda += `4. MARK + ADFIN — estado (10 min)\n`;
  agenda += `5. SER CON IA / MAXI — actualizaciones (10 min)\n`;
  agenda += `6. Temario libre (20 min)\n\n`;

  if (vistaSemanal.conflictos.length > 0) {
    agenda += `⚠️ CONFLICTOS DETECTADOS: ${vistaSemanal.conflictos.length} — ver alertas\n`;
  }

  return agenda;
}
