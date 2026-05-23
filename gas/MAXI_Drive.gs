/**
 * MAXI — Módulo Google Drive
 * Creación y gestión de documentos en Drive
 * Versión: 1.0 | Fecha: 01/05/2026
 *
 * DEPENDENCIAS: MAXI_Config.gs
 * FIX para GAP-M02-C, GAP-M04-A, GAP-M07-A
 */

// ── ESTRUCTURA DE CARPETAS ────────────────────────────────────────────────────

/**
 * Obtiene o crea una subcarpeta dentro del Drive DITEG.
 * La carpeta raíz se lee desde Script Properties (DRIVE_FOLDER_DITEG).
 */
function obtenerOCrearCarpeta(nombreCarpeta, carpetaPadreId) {
  const padreId = carpetaPadreId || getSecureProperty("DRIVE_FOLDER_DITEG");
  if (!padreId) return null;

  const padre = DriveApp.getFolderById(padreId);
  const carpetasExistentes = padre.getFoldersByName(nombreCarpeta);

  if (carpetasExistentes.hasNext()) {
    return carpetasExistentes.next();
  }

  return padre.createFolder(nombreCarpeta);
}

// ── ACTAS DE REUNIÓN ─────────────────────────────────────────────────────────

/**
 * Crea el doc de actas para la Reunión DITEG.
 * FIX para GAP-M04-A.
 * Retorna la URL del doc creado.
 */
function crearActasReunionDITEG(agenda, fechaReunion) {
  fechaReunion = fechaReunion || new Date();
  const fechaStr = Utilities.formatDate(fechaReunion, MAXI_CONFIG.zona_horaria, "yyyy-MM-dd");
  const semana = obtenerNumeroSemana(fechaReunion);
  const nombreDoc = `[DITEG] Actas Reunión S${semana} — ${fechaStr}`;

  // Carpeta: Drive DITEG / Reuniones DITEG / 2026
  const carpetaReuniones = obtenerOCrearCarpeta("Reuniones DITEG");
  const carpetaAnio = obtenerOCrearCarpeta("2026", carpetaReuniones?.getId());
  const carpetaTarget = carpetaAnio || carpetaReuniones;

  if (!carpetaTarget) {
    Logger.log("❌ No se pudo acceder a la carpeta de reuniones DITEG.");
    return null;
  }

  // Crear el doc
  const doc = DocumentApp.create(nombreDoc);
  const body = doc.getBody();

  // Mover a la carpeta correcta
  const file = DriveApp.getFileById(doc.getId());
  carpetaTarget.addFile(file);
  DriveApp.getRootFolder().removeFile(file); // sacar del root

  // Contenido inicial
  body.appendParagraph("ACTAS REUNIÓN DITEG — STANNUM").setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph(`Fecha: ${fechaStr} | Semana ${semana}`).setHeading(DocumentApp.ParagraphHeading.SUBTITLE);
  body.appendParagraph("");

  body.appendParagraph("AGENDA").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(agenda || "Ver agenda en Google Calendar");
  body.appendParagraph("");

  body.appendParagraph("ASISTENTES").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  const asistentes = [
    "Brahin Carrillo (DITEG)",
    "Martín Merlini (GECO)",
    "Alejandro de la Zerda (ECLI/GEQ)",
    "Sebastián Palacios (MARK)",
    "Sofía Fernández Bravo (ADFIN)",
    "Agustina Cabrera Sogno (EVENTOS)",
    "Nicolás Darelli (STANNUM GAME)",
    "Nicolás Nasrallah (GECO)",
    "Mateo Lohezic (Desarrollo)"
  ];
  asistentes.forEach(a => body.appendListItem(a));
  body.appendParagraph("");

  body.appendParagraph("TEMAS TRATADOS").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph("(completar durante la reunión)");
  body.appendParagraph("");

  body.appendParagraph("DECISIONES TOMADAS").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph("(completar durante la reunión)");
  body.appendParagraph("");

  body.appendParagraph("PRÓXIMOS PASOS Y RESPONSABLES").setHeading(DocumentApp.ParagraphHeading.HEADING1);

  // Tabla de próximos pasos
  const tabla = body.appendTable([
    ["Acción", "Responsable", "Fecha límite", "Estado"],
    ["", "", "", ""],
    ["", "", "", ""],
    ["", "", "", ""]
  ]);
  body.appendParagraph("");

  body.appendParagraph("NOTAS ADICIONALES").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph("");

  body.appendParagraph(`Documento generado por MAXI v2.4 el ${Utilities.formatDate(new Date(), MAXI_CONFIG.zona_horaria, "dd/MM/yyyy HH:mm")}`);

  doc.saveAndClose();

  const url = `https://docs.google.com/document/d/${doc.getId()}/edit`;
  Logger.log(`✅ Actas creadas: ${url}`);
  return url;
}

// ── BAJADA ESTRATÉGICA ────────────────────────────────────────────────────────

/**
 * Crea un doc de Bajada Estratégica a partir del texto procesado.
 * FIX para GAP-M07-A.
 */
function crearDocBajada(titulo, contenido, decisiones, tareas) {
  const fechaStr = Utilities.formatDate(new Date(), MAXI_CONFIG.zona_horaria, "yyyy-MM-dd");
  const nombreDoc = `[DITEG] Bajada — ${titulo} — ${fechaStr}`;

  const carpetaBajadas = obtenerOCrearCarpeta("Bajadas Estratégicas");
  if (!carpetaBajadas) return null;

  const doc = DocumentApp.create(nombreDoc);
  const body = doc.getBody();

  const file = DriveApp.getFileById(doc.getId());
  carpetaBajadas.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  body.appendParagraph(`BAJADA ESTRATÉGICA — ${titulo.toUpperCase()}`).setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph(`Fecha: ${fechaStr} | Área: DITEG`).setHeading(DocumentApp.ParagraphHeading.SUBTITLE);
  body.appendParagraph("");

  body.appendParagraph("CONTENIDO").setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph(contenido || "");
  body.appendParagraph("");

  if (decisiones && decisiones.length > 0) {
    body.appendParagraph("DECISIONES").setHeading(DocumentApp.ParagraphHeading.HEADING1);
    decisiones.forEach(d => body.appendListItem(d));
    body.appendParagraph("");
  }

  if (tareas && tareas.length > 0) {
    body.appendParagraph("TAREAS GENERADAS EN CLICKUP").setHeading(DocumentApp.ParagraphHeading.HEADING1);
    tareas.forEach(t => body.appendListItem(`${t.nombre} → ${t.url || "sin link"}`));
    body.appendParagraph("");
  }

  body.appendParagraph(`Generado por MAXI v2.4 el ${Utilities.formatDate(new Date(), MAXI_CONFIG.zona_horaria, "dd/MM/yyyy HH:mm")}`);

  doc.saveAndClose();

  const url = `https://docs.google.com/document/d/${doc.getId()}/edit`;
  Logger.log(`✅ Doc bajada creado: ${url}`);
  return url;
}

// ── INFORME SEMANAL DITEG ─────────────────────────────────────────────────────

/**
 * Crea el doc de Informe Semanal DITEG (M18 #informe).
 * Estructura estándar para el informe semanal.
 */
function crearInformeSemanalDITEG(datos) {
  const hoy = new Date();
  const semana = obtenerNumeroSemana(hoy);
  const anio = hoy.getFullYear();
  const fechaStr = Utilities.formatDate(hoy, MAXI_CONFIG.zona_horaria, "dd/MM/yyyy");
  const nombreDoc = `[DITEG] Informe Semanal S${semana} — ${anio}`;

  const carpetaInformes = obtenerOCrearCarpeta("Informes Semanales");
  const carpetaAnio = obtenerOCrearCarpeta(anio.toString(), carpetaInformes?.getId());

  const doc = DocumentApp.create(nombreDoc);
  const body = doc.getBody();

  const file = DriveApp.getFileById(doc.getId());
  if (carpetaAnio) {
    carpetaAnio.addFile(file);
    DriveApp.getRootFolder().removeFile(file);
  }

  body.appendParagraph(`INFORME SEMANAL DITEG — Semana ${semana} | ${anio}`).setHeading(DocumentApp.ParagraphHeading.TITLE);
  body.appendParagraph(`Generado: ${fechaStr} | Director: Brahin Carrillo`).setHeading(DocumentApp.ParagraphHeading.SUBTITLE);
  body.appendParagraph("");

  // Secciones estándar
  const secciones = [
    "RESUMEN EJECUTIVO",
    "ESTADO ÁREAS (ECLI | GECO | MARK | ADFIN | EVENTOS | GAME)",
    "PIPELINE — PROYECTOS ACTIVOS",
    "TAREAS CRÍTICAS VENCIDAS",
    "DECISIONES DE LA SEMANA",
    "PRÓXIMOS PASOS SEMANA SIGUIENTE",
    "ALERTAS Y RIESGOS"
  ];

  secciones.forEach(seccion => {
    body.appendParagraph(seccion).setHeading(DocumentApp.ParagraphHeading.HEADING1);
    if (datos && datos[seccion]) {
      body.appendParagraph(datos[seccion]);
    } else {
      body.appendParagraph("(completar)");
    }
    body.appendParagraph("");
  });

  body.appendParagraph(`Documento generado por MAXI v2.4 | ${fechaStr}`);

  doc.saveAndClose();
  const url = `https://docs.google.com/document/d/${doc.getId()}/edit`;
  Logger.log(`✅ Informe semanal creado: ${url}`);
  return url;
}

// ── UTILITIES ────────────────────────────────────────────────────────────────

function obtenerNumeroSemana(fecha) {
  const d = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}
