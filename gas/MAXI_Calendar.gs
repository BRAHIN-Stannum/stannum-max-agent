/**
 * MAXI — Módulo Google Calendar
 * Lectura, detección de conflictos y actualización de eventos
 * Versión: 1.0 | Fecha: 01/05/2026
 *
 * DEPENDENCIAS: MAXI_Config.gs
 */

// ── LECTURA DE EVENTOS ───────────────────────────────────────────────────────

/**
 * Obtiene eventos del calendario entre dos fechas.
 * @param {Date} inicio - Fecha de inicio
 * @param {Date} fin    - Fecha de fin
 * @param {string} calendarId - ID del calendario (default: primario)
 */
function getEventos(inicio, fin, calendarId) {
  calendarId = calendarId || MAXI_CONFIG.calendarios.brahin;
  const calendar = CalendarApp.getCalendarById(calendarId);
  if (!calendar) {
    Logger.log(`❌ Calendario no encontrado: ${calendarId}`);
    return [];
  }
  return calendar.getEvents(inicio, fin);
}

/**
 * Obtiene los eventos de HOY.
 */
function getEventosHoy() {
  const hoy = new Date();
  const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0);
  const finHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59);
  return getEventos(inicioHoy, finHoy);
}

/**
 * Obtiene los eventos de la semana actual (lunes a domingo).
 */
function getEventosSemana() {
  const hoy = new Date();
  const diaSemana = hoy.getDay(); // 0=dom, 1=lun...
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - (diaSemana === 0 ? 6 : diaSemana - 1));
  lunes.setHours(0, 0, 0, 0);
  const domingo = new Date(lunes);
  domingo.setDate(lunes.getDate() + 6);
  domingo.setHours(23, 59, 59, 0);
  return getEventos(lunes, domingo);
}

// ── DETECCIÓN DE CONFLICTOS ──────────────────────────────────────────────────

/**
 * Detecta eventos con overlapping de horario.
 * Retorna array de pares conflictivos con descripción.
 * FIX para GAP-M02-B: detección automática de conflictos.
 */
function detectarConflictos(eventos) {
  const conflictos = [];
  const eventosConHora = eventos.filter(e => !e.isAllDayEvent());

  for (let i = 0; i < eventosConHora.length; i++) {
    for (let j = i + 1; j < eventosConHora.length; j++) {
      const e1 = eventosConHora[i];
      const e2 = eventosConHora[j];

      // Excluir rutinas MAXI del análisis de conflictos
      const esRutinaMaxi = (e) => e.getTitle().startsWith("MAX |");
      if (esRutinaMaxi(e1) || esRutinaMaxi(e2)) continue;

      const inicio1 = e1.getStartTime().getTime();
      const fin1 = e1.getEndTime().getTime();
      const inicio2 = e2.getStartTime().getTime();
      const fin2 = e2.getEndTime().getTime();

      // Verificar overlap
      if (inicio1 < fin2 && fin1 > inicio2) {
        conflictos.push({
          evento1: {
            titulo: e1.getTitle(),
            inicio: e1.getStartTime(),
            fin: e1.getEndTime()
          },
          evento2: {
            titulo: e2.getTitle(),
            inicio: e2.getStartTime(),
            fin: e2.getEndTime()
          },
          fecha: Utilities.formatDate(e1.getStartTime(), MAXI_CONFIG.zona_horaria, "EEEE d/MM")
        });
      }
    }
  }

  return conflictos;
}

/**
 * Formatea los conflictos para notificación en Google Chat.
 */
function formatearConflictos(conflictos) {
  if (conflictos.length === 0) return "✅ Sin conflictos de agenda detectados esta semana.";

  let msg = `⚠️ *CONFLICTOS DE AGENDA DETECTADOS (${conflictos.length}):*\n\n`;
  conflictos.forEach((c, i) => {
    const h1inicio = Utilities.formatDate(c.evento1.inicio, MAXI_CONFIG.zona_horaria, "HH:mm");
    const h1fin = Utilities.formatDate(c.evento1.fin, MAXI_CONFIG.zona_horaria, "HH:mm");
    const h2inicio = Utilities.formatDate(c.evento2.inicio, MAXI_CONFIG.zona_horaria, "HH:mm");
    const h2fin = Utilities.formatDate(c.evento2.fin, MAXI_CONFIG.zona_horaria, "HH:mm");

    msg += `🔴 *Conflicto ${i + 1} — ${c.fecha}:*\n`;
    msg += `• ${h1inicio}-${h1fin} → ${c.evento1.titulo}\n`;
    msg += `• ${h2inicio}-${h2fin} → ${c.evento2.titulo}\n\n`;
  });

  msg += `_Resolución necesaria antes del próximo día de trabajo._`;
  return msg;
}

// ── ACTUALIZACIÓN DE EVENTOS ─────────────────────────────────────────────────

/**
 * Actualiza la descripción del evento "Reunión - DITEG" con la agenda generada.
 * FIX para GAP-M02-A y GAP-M03-A.
 */
function actualizarAgendaDITEG(agenda) {
  const eventos = getEventosSemana();
  const reunionDITEG = eventos.find(e =>
    e.getTitle().toLowerCase().includes("reunión - diteg") ||
    e.getTitle().toLowerCase().includes("reunion - diteg")
  );

  if (!reunionDITEG) {
    Logger.log("⚠️ No se encontró 'Reunión - DITEG' esta semana.");
    return false;
  }

  const descripcionActual = reunionDITEG.getDescription() || "";
  const separador = "\n\n────────────────────\n";
  const timestamp = Utilities.formatDate(new Date(), MAXI_CONFIG.zona_horaria, "dd/MM/yyyy HH:mm");
  const nuevaDescripcion = `${agenda}${separador}📋 Agenda actualizada por MAXI el ${timestamp}\n\nDescripción original:\n${descripcionActual}`;

  reunionDITEG.setDescription(nuevaDescripcion);
  Logger.log(`✅ Agenda DITEG actualizada para ${Utilities.formatDate(reunionDITEG.getStartTime(), MAXI_CONFIG.zona_horaria, "dd/MM")}`);
  return true;
}

/**
 * Obtiene el evento CESSI MAR DEL PLATA y retorna sus detalles.
 * Ejemplo de uso: M12 #proyecto para cruzar Calendar + ClickUp.
 */
function getEventoProyecto(nombreParcial) {
  const proximo = new Date();
  const en30dias = new Date();
  en30dias.setDate(proximo.getDate() + 30);

  const eventos = getEventos(proximo, en30dias);
  return eventos.filter(e =>
    e.getTitle().toLowerCase().includes(nombreParcial.toLowerCase())
  );
}

// ── VISTA SEMANAL ESTRUCTURADA ────────────────────────────────────────────────

/**
 * Genera la vista semanal para M03 #concentracion.
 * Excluye rutinas MAXI, agrupa por día, detecta viajes.
 */
function generarVistaSemanal() {
  const eventos = getEventosSemana();
  const conflictos = detectarConflictos(eventos);

  // Agrupar por día (excluyendo rutinas MAXI)
  const porDia = {};
  eventos.forEach(e => {
    if (e.getTitle().startsWith("MAX |")) return; // excluir rutinas

    const dia = Utilities.formatDate(e.getStartTime(), MAXI_CONFIG.zona_horaria, "EEEE d/MM");
    if (!porDia[dia]) porDia[dia] = [];

    const esAllDay = e.isAllDayEvent();
    const hora = esAllDay ? "Todo el día" :
      Utilities.formatDate(e.getStartTime(), MAXI_CONFIG.zona_horaria, "HH:mm");

    porDia[dia].push({
      hora,
      titulo: e.getTitle(),
      esViaje: e.getTitle().toLowerCase().includes("viaje"),
      esTrenno: e.getTitle().toLowerCase().includes("trenno"),
      esCessi: e.getTitle().toLowerCase().includes("cessi"),
    });
  });

  return { porDia, conflictos, totalEventos: eventos.length };
}

/**
 * Formatea la vista semanal para Google Chat.
 */
function formatearVistaSemanal(vistaSemanal) {
  let msg = `📅 *VISTA SEMANAL MAXI — DITEG*\n\n`;

  // Alertas de conflictos primero
  if (vistaSemanal.conflictos.length > 0) {
    msg += formatearConflictos(vistaSemanal.conflictos) + "\n\n";
  }

  // Días
  Object.entries(vistaSemanal.porDia).forEach(([dia, eventos]) => {
    msg += `*${dia.toUpperCase()}*\n`;
    eventos.forEach(e => {
      let emoji = "📌";
      if (e.esViaje) emoji = "✈️";
      else if (e.esTrenno) emoji = "🎯";
      else if (e.esCessi) emoji = "🏛️";
      msg += `${emoji} ${e.hora} — ${e.titulo}\n`;
    });
    msg += `\n`;
  });

  return msg;
}
