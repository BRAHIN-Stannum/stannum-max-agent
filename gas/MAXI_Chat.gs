/**
 * MAXI — Módulo Google Chat
 * Envío de mensajes y notificaciones a espacios STANNUM
 * Versión: 1.0 | Fecha: 01/05/2026
 *
 * DEPENDENCIAS: MAXI_Config.gs
 *
 * SEGURIDAD:
 * Los webhook URLs se almacenan en Script Properties, NUNCA en el código.
 * Keys: GCHAT_WEBHOOK_DITEG, GCHAT_WEBHOOK_MAXI
 * FIX para GAP-M02-D, GAP-M01-E
 */

// ── ENVÍO DE MENSAJES ────────────────────────────────────────────────────────

/**
 * Envía un mensaje a Google Chat via webhook.
 * @param {string} webhookKey - Key de Script Properties del webhook
 * @param {string} mensaje    - Texto del mensaje (soporta formato Chat)
 * @param {Object} card       - Card opcional para mensajes estructurados
 */
function enviarMensajeChat(webhookKey, mensaje, card) {
  const webhookUrl = getSecureProperty(webhookKey);
  if (!webhookUrl) {
    Logger.log(`❌ Webhook no configurado: ${webhookKey}`);
    return false;
  }

  const payload = card ? { cardsV2: [card] } : { text: mensaje };

  const options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(webhookUrl, options);
  const code = response.getResponseCode();

  if (code === 200) {
    Logger.log(`✅ Mensaje enviado a ${webhookKey}`);
    return true;
  } else {
    Logger.log(`❌ Error enviando mensaje a ${webhookKey}: ${code} — ${response.getContentText()}`);
    return false;
  }
}

/**
 * Envía al espacio DITEG (todo el equipo).
 */
function enviarAlDITEG(mensaje) {
  return enviarMensajeChat("GCHAT_WEBHOOK_DITEG", mensaje);
}

/**
 * Envía al espacio privado MAXI (solo Brahin).
 */
function enviarAMaxi(mensaje) {
  return enviarMensajeChat("GCHAT_WEBHOOK_MAXI", mensaje);
}

// ── UTILITIES DE EVENTOS ─────────────────────────────────────────────────────

/**
 * Limpia el nombre de eventos sincronizados desde ClickUp.
 * GAP-M08-A: ClickUp sync genera títulos como:
 * "🔄 Nombre tarea :: 10. EVENTOS > hidden > Lista"
 * @param {string} titulo - Título raw del evento
 * @returns {string} Título limpio
 */
function limpiarNombreEvento(titulo) {
  return titulo
    .replace(/^🔄\s*/u, '')         // quitar prefijo sync emoji
    .replace(/\s*::\s*.+$/, '')     // quitar sufijo de path ClickUp
    .trim();
}

// ── NOTIFICACIONES ESTÁNDAR ───────────────────────────────────────────────────

/**
 * Envía el #buendia completo a Brahin.
 * Se llama desde MAXI_Triggers.gs a las 7:25.
 */
function notificarBuendia() {
  const tareasHoy = getTareasHoy();
  const tareasVencidas = getTareasVencidas();
  const eventosHoy = getEventosHoy().filter(e => !e.getTitle().startsWith("MAX |"));

  const mensaje = generarBuendia(tareasHoy, tareasVencidas, eventosHoy.map(e => ({
    summary: e.getTitle(),
    start: { dateTime: e.getStartTime().toISOString() }
  })));

  return enviarAMaxi(mensaje);
}

/**
 * Envía el #checkpoint del mediodía.
 * Incluye: reuniones del día + grabaciones + completadas + estado + tarde.
 * FIX: GAP-M07-A (sin contexto mañana), GAP-M07-B (sin conteo completadas).
 */
function notificarCheckpoint() {
  const hoy = new Date();
  const fecha = Utilities.formatDate(hoy, MAXI_CONFIG.zona_horaria, "EEEE d/MM");

  // Reuniones del día (todas, sin MAX|)
  const reunionesHoy = getEventosHoy().filter(e => !e.getTitle().startsWith("MAX |"));

  // Tareas completadas hoy
  const completadas = getTareasCompletadasHoy();

  // Eventos de la tarde (13:00+)
  const eventosTarde = reunionesHoy.filter(e => {
    if (e.isAllDayEvent()) return false;
    return e.getStartTime().getHours() >= 13;
  });

  let msg = `🔄 *#checkpoint — ${fecha}*\n\n`;

  // Reuniones del día
  if (reunionesHoy.length > 0) {
    msg += `*REUNIONES DE HOY:*\n`;
    reunionesHoy.forEach(e => {
      const hora = e.isAllDayEvent() ? "Todo el día" :
        Utilities.formatDate(e.getStartTime(), MAXI_CONFIG.zona_horaria, "HH:mm");
      const titulo = limpiarNombreEvento(e.getTitle());
      msg += `• ${hora} — ${titulo}\n`;
      // TODO M07-C: link a grabación Drive cuando integración esté lista
    });
    msg += '\n';
  }

  // Progreso del día
  msg += `*PROGRESO HOY:*\n`;
  msg += `✅ ${completadas.length} tarea${completadas.length !== 1 ? 's' : ''} completada${completadas.length !== 1 ? 's' : ''}\n\n`;

  // Estado del día
  msg += `*¿CÓMO VA EL DÍA?*\n`;
  msg += `Responde: ✅ bien / ⚠️ desvíos / 🔴 bloqueado\n\n`;

  // Tarde
  if (eventosTarde.length > 0) {
    msg += `*TARDE:*\n`;
    eventosTarde.forEach(e => {
      const hora = Utilities.formatDate(e.getStartTime(), MAXI_CONFIG.zona_horaria, "HH:mm");
      msg += `• ${hora} — ${limpiarNombreEvento(e.getTitle())}\n`;
    });
  }

  msg += `\n_MAXI v2.4_`;
  return enviarAMaxi(msg);
}

/**
 * Envía el #cierredia con resumen de lo ejecutado.
 * FIX: GAP-M08-A (nombres sucios ClickUp sync), GAP-M08-B (sin conteo completadas).
 */
function notificarCierreDia() {
  const hoy = new Date();
  const fecha = Utilities.formatDate(hoy, MAXI_CONFIG.zona_horaria, "EEEE d/MM");
  const manana = new Date(hoy);
  manana.setDate(hoy.getDate() + 1);
  const fechaManana = Utilities.formatDate(manana, MAXI_CONFIG.zona_horaria, "EEEE d/MM");

  // Reuniones de hoy (sin MAX|) + completadas
  const reunionesHoy = getEventosHoy().filter(e => !e.getTitle().startsWith("MAX |"));
  const completadas = getTareasCompletadasHoy();

  let msg = `🌙 *#cierredia — ${fecha}*\n\n`;

  // Reuniones del día
  if (reunionesHoy.length > 0) {
    msg += `*REUNIONES DE HOY:*\n`;
    reunionesHoy.forEach(e => {
      const hora = e.isAllDayEvent() ? "Todo el día" :
        Utilities.formatDate(e.getStartTime(), MAXI_CONFIG.zona_horaria, "HH:mm");
      const titulo = limpiarNombreEvento(e.getTitle());
      msg += `• ${hora} — ${titulo}\n`;
      // TODO M08-C: link a grabación Drive cuando integración esté lista
    });
    msg += '\n';
  }

  // Completadas
  msg += `*HOY CERRASTE:* ✅ ${completadas.length} tarea${completadas.length !== 1 ? 's' : ''}\n\n`;

  // Preguntas de cierre
  msg += `*Para cerrar el día, respondé:*\n`;
  msg += `1️⃣ ¿Qué hiciste hoy?\n`;
  msg += `2️⃣ ¿Qué quedó pendiente?\n`;
  msg += `3️⃣ ¿Cuál es la próxima acción?\n\n`;

  // Mañana con limpiarNombreEvento aplicado (FIX GAP-M08-A)
  msg += `*Mañana ${fechaManana}:*\n`;
  const inicioManana = new Date(manana.getFullYear(), manana.getMonth(), manana.getDate(), 0, 0, 0);
  const finManana    = new Date(manana.getFullYear(), manana.getMonth(), manana.getDate(), 23, 59, 59);
  const eventosManana = getEventos(inicioManana, finManana).filter(e => !e.getTitle().startsWith("MAX |"));

  if (eventosManana.length > 0) {
    eventosManana.forEach(e => {
      const hora = e.isAllDayEvent() ? "Todo el día" :
        Utilities.formatDate(e.getStartTime(), MAXI_CONFIG.zona_horaria, "HH:mm");
      msg += `• ${hora} — ${limpiarNombreEvento(e.getTitle())}\n`;
    });
  } else {
    msg += `_(Sin eventos agendados)_\n`;
  }

  msg += `\n_MAXI v2.4_`;
  return enviarAMaxi(msg);
}

/**
 * Envía la agenda de la concentración semanal al equipo DITEG.
 * FIX para GAP-M02-D.
 * Se llama el domingo a las 20:00 o el lunes temprano.
 */
function notificarAgendaDITEG(agenda) {
  const hoy = new Date();
  const lunes = new Date(hoy);
  const diaSemana = hoy.getDay();
  lunes.setDate(hoy.getDate() + (diaSemana === 0 ? 1 : 8 - diaSemana));
  const fechaLunes = Utilities.formatDate(lunes, MAXI_CONFIG.zona_horaria, "dd/MM");

  let msg = `📋 *AGENDA DITEG — Lunes ${fechaLunes}*\n\n`;
  msg += agenda;
  msg += `\n\n_Reunión: [Meet](https://meet.google.com/kfq-jboy-rcq) · MAXI v2.4_`;

  return enviarAlDITEG(msg);
}

/**
 * Alerta de conflicto de agenda — se envía al detectar overlaps.
 * FIX para GAP-M02-B.
 */
function notificarConflictosAgenda(conflictos) {
  if (conflictos.length === 0) return;

  const msg = formatearConflictos(conflictos);
  enviarAMaxi(`⚠️ *ALERTA MAXI — CONFLICTO DE AGENDA*\n\n${msg}`);
}

/**
 * Alerta de gate task vencida en el sprint MAXI.
 * FIX para GAP-M05-A.
 */
function notificarGateTasKVencida(tarea) {
  const msg = `🔴 *ALERTA SPRINT MAXI — GATE TASK VENCIDA*\n\n` +
    `La gate task *${tarea.name}* venció hace ${calcularDiasVencida(tarea.due_date)} días y sigue sin completarse.\n\n` +
    `Ver tarea: ${tarea.url}\n\n` +
    `_MAXI v2.4_`;

  return enviarAMaxi(msg);
}

// ── UTILITIES ────────────────────────────────────────────────────────────────

function calcularDiasVencida(dueDateMs) {
  const vencimiento = new Date(parseInt(dueDateMs));
  const hoy = new Date();
  const diff = hoy - vencimiento;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
