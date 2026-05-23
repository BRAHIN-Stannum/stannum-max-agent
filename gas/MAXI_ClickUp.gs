/**
 * MAXI — Módulo ClickUp API
 * Funciones de consulta y escritura en ClickUp
 * Versión: 1.0 | Fecha: 01/05/2026
 *
 * DEPENDENCIAS: MAXI_Config.gs
 */

// ── FETCH BASE ──────────────────────────────────────────────────────────────

/**
 * Hace una request autenticada a la API de ClickUp.
 */
function clickupRequest(endpoint, method, payload) {
  const token = getSecureProperty("CLICKUP_TOKEN");
  if (!token) return null;

  const options = {
    method: method || "GET",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
    muteHttpExceptions: true
  };

  if (payload) {
    options.payload = JSON.stringify(payload);
  }

  const url = `https://api.clickup.com/api/v2/${endpoint}`;
  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();

  if (code !== 200) {
    Logger.log(`❌ ClickUp API error ${code}: ${response.getContentText()}`);
    return null;
  }

  return JSON.parse(response.getContentText());
}

// ── M01: #BUENDIA — QUERIES ─────────────────────────────────────────────────

/**
 * Query A — Tareas de HOY.
 * Ambos user IDs, sin filtro de status, con paginación.
 */
function getTareasHoy() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const hoyMs = hoy.getTime();
  const finHoyMs = hoy.getTime() + 86399000;

  const params = [
    `due_date_gt=${hoyMs - 1}`,
    `due_date_lt=${finHoyMs + 1}`,
    `assignees[]=${MAXI_CONFIG.usuarios.brahin.id}`,
    `assignees[]=${MAXI_CONFIG.usuarios.stannum.id}`,
    "subtasks=true",
    "page=0",
    "order_by=due_date"
  ].join("&");

  const result = clickupRequest(`team/18905578/task?${params}`);
  let tareas = result ? result.tasks : [];

  // Si hay exactamente 100, paginamos
  if (tareas.length === 100) {
    const page1 = clickupRequest(`team/18905578/task?${params.replace("page=0", "page=1")}`);
    if (page1) tareas = tareas.concat(page1.tasks);
  }

  return filtrarActivas(tareas);
}

/**
 * Query B — Tareas VENCIDAS (últimos 90 días, paginación completa).
 * FIX GAP-M06-TRIAGE: era 30 días, ahora 90 para capturar backlog real.
 * Paginación hasta 300 tareas (3 páginas × 100).
 */
function getTareasVencidas() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const ayerMs = hoy.getTime() - 1;
  const hace90dias = new Date(hoy);
  hace90dias.setDate(hace90dias.getDate() - 90);
  const hace90diasMs = hace90dias.getTime();

  const baseParams = [
    `due_date_gt=${hace90diasMs - 1}`,
    `due_date_lt=${ayerMs + 1}`,
    `assignees[]=${MAXI_CONFIG.usuarios.brahin.id}`,
    `assignees[]=${MAXI_CONFIG.usuarios.stannum.id}`,
    "subtasks=true",
    "order_by=due_date",
    "reverse=true"
  ].join("&");

  let tareas = [];
  for (let page = 0; page < 3; page++) {
    const result = clickupRequest(`team/18905578/task?${baseParams}&page=${page}`);
    const pageTareas = result ? result.tasks : [];
    tareas = tareas.concat(pageTareas);
    if (pageTareas.length < 100) break;
  }

  return filtrarActivas(tareas);
}

/**
 * Query C — TODAS las tareas vencidas (sin límite de fecha).
 * Usado por #triage para mostrar el backlog completo.
 * Paginación hasta 500 tareas (5 páginas). Excluye subtareas para no inflar.
 * FIX GAP-M06-TRIAGE: función nueva para resolver el problema de los 120.
 */
function getTareasVencidasTodas() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const ayerMs = hoy.getTime() - 1;

  const baseParams = [
    `due_date_lt=${ayerMs + 1}`,
    `assignees[]=${MAXI_CONFIG.usuarios.brahin.id}`,
    `assignees[]=${MAXI_CONFIG.usuarios.stannum.id}`,
    "subtasks=false",
    "order_by=due_date",
    "reverse=true"
  ].join("&");

  let tareas = [];
  for (let page = 0; page < 5; page++) {
    const result = clickupRequest(`team/18905578/task?${baseParams}&page=${page}`);
    const pageTareas = result ? result.tasks : [];
    tareas = tareas.concat(pageTareas);
    if (pageTareas.length < 100) break;
  }

  return filtrarActivas(tareas);
}

/**
 * Query D — Tareas completadas HOY.
 * FIX: GAP-M07-B / GAP-M08-B (checkpoint y cierredia no tenían conteo completadas).
 * @returns {Array} Lista de tareas {id, name, list}
 */
function getTareasCompletadasHoy() {
  const hoy = new Date();
  const desdeMs = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 0, 0, 0).getTime();
  const hastaMs = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 23, 59, 59).getTime();

  const params = [
    `assignees[]=${MAXI_CONFIG.usuarios.brahin.id}`,
    `assignees[]=${MAXI_CONFIG.usuarios.stannum.id}`,
    `date_done_gt=${desdeMs - 1}`,
    `date_done_lt=${hastaMs + 1}`,
    "include_closed=true",
    "subtasks=true",
    "page=0"
  ].join("&");

  try {
    const result = clickupRequest(`team/18905578/task?${params}`);
    const tareas = result ? result.tasks : [];
    return tareas
      .filter(t => t.status && t.status.type === 'closed')
      .map(t => ({
        id:   t.id,
        name: t.name,
        list: t.list ? t.list.name : ''
      }));
  } catch(e) {
    Logger.log(`❌ getTareasCompletadasHoy error: ${e}`);
    return [];
  }
}

/**
 * Agrupa un array de tareas por antigüedad de vencimiento.
 * Devuelve: { criticas (>30d), medias (7-30d), recientes (<7d), sinFecha }
 */
function agruparPorEdad(tareas) {
  const ahora = Date.now();
  const d7  = ahora - (7  * 86400000);
  const d30 = ahora - (30 * 86400000);
  return {
    criticas:  tareas.filter(t => t.due_date && parseInt(t.due_date) < d30),
    medias:    tareas.filter(t => t.due_date && parseInt(t.due_date) >= d30 && parseInt(t.due_date) < d7),
    recientes: tareas.filter(t => t.due_date && parseInt(t.due_date) >= d7),
    sinFecha:  tareas.filter(t => !t.due_date)
  };
}

/**
 * Agrupa un array de tareas por nombre de lista ClickUp.
 * Devuelve array ordenado por cantidad desc: [{ nombre, items }]
 */
function agruparPorLista(tareas) {
  const grupos = {};
  tareas.forEach(t => {
    const lista = t.list?.name || "Sin lista";
    if (!grupos[lista]) grupos[lista] = [];
    grupos[lista].push(t);
  });
  return Object.entries(grupos)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([nombre, items]) => ({ nombre, items }));
}

/**
 * Post-filtro: excluye tareas con status final.
 * También colapsa "seguimientos" recurrentes para reducir ruido.
 */
function filtrarActivas(tareas) {
  const statusExcluidos = ["complete", "closed", "cancelled", "done", "completado"];
  const activas = tareas.filter(t => !statusExcluidos.includes(t.status?.status?.toLowerCase()));

  // Colapsar tareas de seguimiento recurrente (ruido)
  const esRutina = (nombre) => {
    const rutinaPatterns = [/^seguimiento\s+/i, /^reunión diteg$/i, /^backlong/i, /^adfin \|/i, /^seguimiento - /i];
    return rutinaPatterns.some(p => p.test(nombre));
  };

  const rutinas = activas.filter(t => esRutina(t.name));
  const proyectos = activas.filter(t => !esRutina(t.name));

  return { proyectos, rutinas, total: activas.length };
}

/**
 * FIX GAP-M06-A + GAP-M06-D
 * Filtra tareas para el bloque 🔵 del #buendia:
 * - Solo assignee Brahin (174284252), no STANNUM ID genérico
 * - Excluye listas de Agencias y Martin Speaker (ruido)
 * - Separa urgentes/altas de rutinas
 */
function filtrarParaBuendia(tareas) {
  const statusExcluidos = ["complete", "closed", "cancelled", "done", "completado"];
  const listasExcluidas = MAXI_CONFIG.listas.excluir_buendia || [];

  // Solo tareas asignadas a Brahin directamente, en listas operativas
  const deBrahin = tareas.filter(t =>
    !statusExcluidos.includes(t.status?.status?.toLowerCase()) &&
    t.assignees?.some(a => a.id === parseInt(MAXI_CONFIG.usuarios.brahin.id)) &&
    !listasExcluidas.includes(t.list?.id)
  );

  const esRutina = (nombre) => {
    const rutinaPatterns = [/^seguimiento\s+/i, /^reunión diteg$/i, /^adfin \|/i, /^seguimiento - /i];
    return rutinaPatterns.some(p => p.test(nombre));
  };

  const rutinas   = deBrahin.filter(t => esRutina(t.name));
  const proyectos = deBrahin.filter(t => !esRutina(t.name));

  // Clasificar proyectos por prioridad para el bloque 🔵
  const urgentes = proyectos.filter(t => t.priority?.priority === "urgent");
  const altas    = proyectos.filter(t => t.priority?.priority === "high");
  const resto    = proyectos.filter(t => !["urgent","high"].includes(t.priority?.priority));

  return { urgentes, altas, resto, rutinas, proyectos, total: deBrahin.length };
}

/**
 * FIX GAP-M07-B
 * Pre-carga el estado por área para el temario de #reunionditeg.
 * Devuelve resumen: { GECO: { activas: N, vencidas: N }, ... }
 */
function getEstadoPorArea() {
  const areas = MAXI_CONFIG.areas_diteg;
  if (!areas) return {};

  const resumen = {};
  Object.entries(areas).forEach(([area, listaId]) => {
    const result = clickupRequest(`list/${listaId}/task?subtasks=false&include_closed=false`);
    if (!result) {
      resumen[area] = { activas: 0, vencidas: 0, error: true };
      return;
    }
    const activas = result.tasks.filter(t =>
      !["complete","closed","cancelled"].includes(t.status?.status?.toLowerCase())
    );
    const vencidas = activas.filter(t =>
      t.due_date && parseInt(t.due_date) < Date.now()
    );
    const bloqueadas = activas.filter(t =>
      t.status?.status?.toLowerCase() === "waiting" ||
      t.name.toLowerCase().includes("bloqueado")
    );
    resumen[area] = {
      activas: activas.length,
      vencidas: vencidas.length,
      bloqueadas: bloqueadas.length
    };
  });

  return resumen;
}

// ── FORMATEO DEL #BUENDIA ────────────────────────────────────────────────────

/**
 * Genera el mensaje #buendia formateado para Google Chat.
 * Formato: 3 bloques de DECISIÓN + contador real de backlog + CTA #triage.
 *
 * FIX GAP-M06-TRIAGE: ahora muestra el TOTAL REAL de vencidas.
 * El display se limita a 8 items (foco operativo), pero el número real
 * siempre es visible. Para procesar todas, usar #triage.
 *
 * 🔵 LO HACE BRA — presencia, decisión, relación directa
 * 🟢 LO DELEGO A CLAUDE — redacción, informes, documentos, estructuras
 * 🟡 LO REPROGRAMO — bloqueadas, duplicadas, sin urgencia inmediata
 *
 * @param {Object} tareasHoy         — resultado de getTareasHoy()
 * @param {Object} tareasVencidas    — resultado de getTareasVencidas()
 * @param {Array}  eventosHoy        — [{summary, start}]
 * @param {Object} [transcripciones] — resultado de getTranscripcionesAyer() (opcional)
 */
function generarBuendia(tareasHoy, tareasVencidas, eventosHoy, transcripciones) {
  const hoy = new Date();
  const fecha = Utilities.formatDate(hoy, MAXI_CONFIG.zona_horaria, "EEEE d 'de' MMMM yyyy");
  const esFeriado = esFeriadoArgentino(hoy);

  const vencidas     = filtrarParaBuendia(tareasVencidas.proyectos || tareasVencidas);
  const hoyFiltradas = filtrarParaBuendia(tareasHoy.proyectos || tareasHoy);

  // Total REAL del backlog (todas las clasificaciones)
  const totalVencidasReal = vencidas.urgentes.length + vencidas.altas.length +
                            vencidas.resto.length + vencidas.rutinas.length;

  let msg = `☀️ *#buendia Brahin — ${fecha}*\n`;
  if (esFeriado) msg += `⚡ _Hoy es feriado nacional._\n`;
  msg += `\n`;

  // ── Bloque transcripciones del día anterior ──
  if (transcripciones) {
    const { eventosAyer, docsAyer } = transcripciones;
    if (eventosAyer && eventosAyer.length > 0) {
      msg += `📝 *AYER (${eventosAyer.length} reunión/es):*\n`;
      eventosAyer.slice(0, 4).forEach(e => {
        msg += `• ${e.getTitle()}\n`;
      });
      if (docsAyer && docsAyer.length > 0) {
        docsAyer.slice(0, 3).forEach(d => {
          msg += `  └ <${d.url}|${d.nombre}>\n`;
        });
      }
      msg += `\n`;
    }
  }

  // ── Eventos del día ──
  if (eventosHoy.length > 0) {
    msg += `📅 *HOY EN CALENDAR:*\n`;
    eventosHoy.slice(0, 6).forEach(e => {
      const hora = e.start?.dateTime ?
        Utilities.formatDate(new Date(e.start.dateTime), MAXI_CONFIG.zona_horaria, "HH:mm") : "Todo el día";
      msg += `• ${hora} — ${e.summary}\n`;
    });
    msg += `\n`;
  } else {
    msg += `📅 _Sin eventos externos hoy._\n\n`;
  }

  // ── Alerta de backlog si supera el umbral ──
  if (totalVencidasReal > 10) {
    msg += `⚠️ *BACKLOG: ${totalVencidasReal} tareas vencidas* — mostrando top 8.\n`;
    msg += `→ _Respondé *#triage* para procesar todas agrupadas por área._\n\n`;
  }

  msg += `─────────────────────────────\n\n`;

  // ── BLOQUE 🔵 LO HACE BRA ──
  // Armamos la lista priorizada: tareas de hoy → urgentes vencidas → altas vencidas
  const tareasBra = [];
  if (hoyFiltradas.proyectos) {
    hoyFiltradas.proyectos.slice(0, 3).forEach(t => tareasBra.push({ t, icono: "📌" }));
  }
  vencidas.urgentes.forEach(t => tareasBra.push({ t, icono: "🔴" }));
  vencidas.altas.forEach(t    => tareasBra.push({ t, icono: "🟠" }));

  const displayBra = tareasBra.slice(0, 8);
  const sufijoTotal = totalVencidasReal > 8 ? ` de ${totalVencidasReal} total` : "";
  msg += `🔵 *LO HACÉS VOS (${displayBra.length} críticas${sufijoTotal})*\n`;
  displayBra.forEach(({ t, icono }) => msg += `${icono} <${t.url}|${t.name}>\n`);
  msg += `\n`;

  // ── BLOQUE 🟢 LO DELEGO A CLAUDE ──
  const delegables = vencidas.proyectos.filter(t => esDelegableAClaude(t.name)).slice(0, 6);
  msg += `🟢 *LO DELEGO A CLAUDE (${delegables.length})*\n`;
  if (delegables.length > 0) {
    delegables.forEach(t => msg += `• ${t.name}\n`);
    msg += `→ _Decime cuál arrancamos hoy._\n`;
  } else {
    msg += `_(Sin tareas delegables identificadas hoy)_\n`;
  }
  msg += `\n`;

  // ── BLOQUE 🟡 LO REPROGRAMO ──
  const reprogramar = vencidas.resto.concat(vencidas.rutinas);
  msg += `🟡 *LO REPROGRAMO / CIERRA (${reprogramar.length})*\n`;
  reprogramar.slice(0, 5).forEach(t => msg += `• ${t.name}\n`);
  if (reprogramar.length > 5) {
    msg += `_+${reprogramar.length - 5} más → usá *#triage* para mover en bloque_\n`;
  }
  msg += `\n`;

  // Footer con totales reales
  msg += `─────────────────────────────\n`;
  msg += `📊 BRA: ${displayBra.length} · Claude: ${delegables.length} · Reprog: ${reprogramar.length}`;
  if (totalVencidasReal > 10) msg += ` · *Backlog total: ${totalVencidasReal}*`;
  msg += `\n_MAXI v2.4 · #triage para ver todo · #checkpoint 13:00_`;

  return msg;
}

/**
 * Genera el reporte #triage completo — todas las tareas vencidas agrupadas.
 * FIX GAP-M06-TRIAGE: nueva función para procesar el backlog de 120+ tareas.
 *
 * Vista 1: por ANTIGÜEDAD (crítico +30d / acumulado 7-30d / reciente <7d)
 * Vista 2: por LISTA/ÁREA (dónde está concentrado el volumen)
 * Envía el mensaje a MAXI (Google Chat privado de Brahin).
 */
function generarTriage() {
  try {
    const todasVencidas  = getTareasVencidasTodas();
    const { proyectos, rutinas, total } = filtrarParaBuendia(
      todasVencidas.proyectos || todasVencidas
    );

    const porEdad  = agruparPorEdad(proyectos);
    const porLista = agruparPorLista(proyectos);

    const hoy   = new Date();
    const fecha = Utilities.formatDate(hoy, MAXI_CONFIG.zona_horaria, "dd/MM/yyyy HH:mm");

    let msg = `🗂️ *#triage — Backlog completo | ${fecha}*\n`;
    msg += `_Total vencidas: ${total} (${proyectos.length} proyectos + ${rutinas.length} rutinas)_\n\n`;

    // Vista por antigüedad
    msg += `⏱️ *POR ANTIGÜEDAD*\n`;
    msg += `🔴 +30 días vencidas: *${porEdad.criticas.length}* → cerrar o archivar\n`;
    msg += `🟠 7-30 días: *${porEdad.medias.length}* → reprogramar esta semana\n`;
    msg += `🟡 Últimos 7 días: *${porEdad.recientes.length}* → accionar o mover\n\n`;

    if (porEdad.criticas.length > 0) {
      msg += `🔴 *TOP 5 MÁS ANTIGUAS (acción: cerrar o renegociar)*\n`;
      porEdad.criticas.slice(0, 5).forEach(t => {
        const dias = Math.floor((Date.now() - parseInt(t.due_date)) / 86400000);
        msg += `• <${t.url}|${t.name}> · _${dias}d vencida_\n`;
      });
      if (porEdad.criticas.length > 5) msg += `_+${porEdad.criticas.length - 5} más_\n`;
      msg += `\n`;
    }

    // Vista por lista/área
    msg += `📋 *POR ÁREA / LISTA (top 6)*\n`;
    porLista.slice(0, 6).forEach(g => {
      msg += `• *${g.nombre}*: ${g.items.length} vencidas\n`;
    });
    msg += `\n`;

    if (rutinas.length > 0) {
      msg += `🔄 *RUTINAS ACUMULADAS (${rutinas.length})* → reprogramar en bloque\n`;
      rutinas.slice(0, 3).forEach(t => msg += `• ${t.name}\n`);
      if (rutinas.length > 3) msg += `_+${rutinas.length - 3} más_\n`;
      msg += `\n`;
    }

    msg += `─────────────────────────────\n`;
    msg += `*PROTOCOLO de triage recomendado:*\n`;
    msg += `1. Cerrar/archivar los +30d que ya no son relevantes\n`;
    msg += `2. Reprogramar los 7-30d con fecha real\n`;
    msg += `3. Delegar a Claude los de tipo doc/estructura/informe\n`;
    msg += `4. Dejar en 🔵 solo los que VOS hacés esta semana\n`;
    msg += `\n_MAXI v2.4 · #triage_`;

    enviarAMaxi(msg);
    Logger.log(`✅ #triage enviado: ${total} tareas procesadas.`);

  } catch (e) {
    Logger.log(`❌ Error #triage: ${e.message}`);
    enviarAMaxi(`⚠️ *MAXI ERROR* #triage: ${e.message}`);
  }
}

/**
 * Detecta si una tarea es delegable a Claude por su nombre.
 * Patrones: plantilla, template, armar, redactar, documento, informe, estructura, plan.
 */
function esDelegableAClaude(nombre) {
  const patrones = [
    /plantilla/i, /template/i, /redact/i, /armar\s+(doc|plan|informe|propuesta)/i,
    /documento/i, /estructura/i, /informe/i, /arquitectura/i, /playbook/i,
    /flujo/i, /sop/i, /checklist/i
  ];
  return patrones.some(p => p.test(nombre));
}

/**
 * Detecta si hoy es feriado nacional argentino.
 * Lista de feriados 2026 (inamovibles + trasladables principales).
 */
function esFeriadoArgentino(fecha) {
  const mes = fecha.getMonth() + 1; // 1-12
  const dia = fecha.getDate();
  const feriados = [
    [1,1],[2,24],[3,24],[4,2],[5,1],[5,25],[6,20],[7,9],[8,17],[10,12],[11,20],[12,8],[12,25]
  ];
  return feriados.some(([m, d]) => m === mes && d === dia);
}

/**
 * Busca transcripciones / actas del día anterior.
 * FIX GAP-M06-TRANSCRIPCIONES: nueva función para incluir contexto del día previo.
 *
 * Fuente 1: Eventos de Calendar de ayer (qué reuniones hubo)
 * Fuente 2: Documentos creados ayer en la carpeta Drive de reuniones DITEG
 *
 * @returns {{ eventosAyer: CalendarEvent[], docsAyer: {nombre, url}[] }}
 */
function getTranscripcionesAyer() {
  try {
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    ayer.setHours(0, 0, 0, 0);
    const finAyer = new Date(ayer);
    finAyer.setHours(23, 59, 59, 999);

    // Eventos de Calendar de ayer (excluye eventos MAXI y todo-el-día)
    const eventosAyer = getEventos(ayer, finAyer).filter(e =>
      !e.getTitle().startsWith("MAX |") && !e.isAllDayEvent()
    );

    // Documentos en carpeta meetings creados ayer
    const docsAyer = [];
    const folderId = MAXI_CONFIG.drive_folders.meetings;
    if (folderId) {
      try {
        const carpeta = DriveApp.getFolderById(folderId);
        const archivos = carpeta.getFiles();
        while (archivos.hasNext()) {
          const archivo = archivos.next();
          const creado = archivo.getDateCreated();
          if (creado >= ayer && creado <= finAyer) {
            docsAyer.push({ nombre: archivo.getName(), url: archivo.getUrl() });
          }
        }
      } catch (driveErr) {
        Logger.log(`⚠️ Drive meetings no accesible: ${driveErr.message}`);
      }
    }

    return { eventosAyer, docsAyer };

  } catch (e) {
    Logger.log(`⚠️ getTranscripcionesAyer error: ${e.message}`);
    return { eventosAyer: [], docsAyer: [] };
  }
}

// ── SPRINT MAXI ─────────────────────────────────────────────────────────────

/**
 * Obtiene el estado del sprint MAXI (lista 901415394335).
 */
function getEstadoSprintMaxi() {
  const result = clickupRequest(`list/${MAXI_CONFIG.listas.maxi_sprint}/task?subtasks=true&include_closed=false`);
  if (!result) return null;

  const tareas = result.tasks;
  const enProgreso = tareas.filter(t => t.status?.status === "in progress");
  const pendientes = tareas.filter(t => t.status?.status === "to do");
  const vencidas = tareas.filter(t => {
    if (!t.due_date) return false;
    return parseInt(t.due_date) < Date.now() &&
           !["complete", "closed", "cancelled"].includes(t.status?.status);
  });

  return { tareas, enProgreso, pendientes, vencidas, total: tareas.length };
}

// ── CREAR TAREA ──────────────────────────────────────────────────────────────

/**
 * Crea una tarea en ClickUp con validación de duplicados.
 */
function crearTareaClickUp(listId, nombre, descripcion, prioridad, dueDateMs, assignees) {
  // Verificar duplicados primero
  const busqueda = clickupRequest(`list/${listId}/task?${encodeURIComponent(nombre)}`);
  if (busqueda && busqueda.tasks) {
    const duplicado = busqueda.tasks.find(t =>
      t.name.toLowerCase().trim() === nombre.toLowerCase().trim()
    );
    if (duplicado) {
      Logger.log(`⚠️ Tarea duplicada encontrada: ${duplicado.url}`);
      return { duplicado: true, tarea: duplicado };
    }
  }

  const payload = {
    name: nombre,
    description: descripcion || "",
    priority: prioridad || 3, // 1=urgent, 2=high, 3=normal, 4=low
    assignees: assignees || [parseInt(MAXI_CONFIG.usuarios.brahin.id)]
  };

  if (dueDateMs) payload.due_date = dueDateMs;

  const result = clickupRequest(`list/${listId}/task`, "POST", payload);
  return { duplicado: false, tarea: result };
}

/**
 * Agrega un comentario a una tarea (registro de actualización).
 */
function comentarTarea(taskId, texto) {
  return clickupRequest(`task/${taskId}/comment`, "POST", {
    comment_text: `[MAXI ${new Date().toLocaleDateString("es-AR")}] ${texto}`
  });
}
