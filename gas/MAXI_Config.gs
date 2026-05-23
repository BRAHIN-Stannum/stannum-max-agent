/**
 * MAXI — Configuración Central
 * Agente de Dirección Estratégica DITEG | STANNUM
 * Versión: 1.0 | Fecha: 01/05/2026
 *
 * INSTRUCCIONES DE SEGURIDAD:
 * NO guardar tokens ni webhook URLs directamente aquí.
 * Usar Script Properties: Archivo > Propiedades del proyecto > Propiedades de script
 * Keys requeridas:
 *   CLICKUP_TOKEN       → token de API ClickUp (rotar después de GAP-006)
 *   GCHAT_WEBHOOK_DITEG → webhook del espacio DITEG en Google Chat
 *   GCHAT_WEBHOOK_MAXI  → webhook del espacio privado MAXI/Brahin
 *   DRIVE_FOLDER_DITEG  → ID carpeta Drive raíz DITEG
 */

const MAXI_CONFIG = {

  // ── IDENTIDAD ──────────────────────────────────────────────────────────────
  agente: "MAXI",
  version: "1.0",
  area: "DITEG",
  zona_horaria: "America/Argentina/Buenos_Aires",

  // ── USUARIOS CLICKUP ───────────────────────────────────────────────────────
  usuarios: {
    brahin: {
      id: "174284252",
      email: "eventos@stannum.com.ar",
      nombre: "Brahin Carrillo"
    },
    stannum: {
      id: "18905578",
      email: "stannum@stannum.com.ar",
      nombre: "STANNUM"
    }
  },

  // ── LISTAS CLICKUP CRÍTICAS ────────────────────────────────────────────────
  listas: {
    maxi_sprint:        "901415394335",  // MAX | AGENTE DITEG
    pipeline_proyectos: "901415219852",  // PIPELINE DE PROYECTOS
    diteg_gestion:      "901413931989",  // 1. DITEG - Gestión Operativa
    pipeline_eventos:   "901410895386",  // Pipeline - Eventos
    operaciones_eventos:"901414214459",  // OPERACIONES DIARIAS - EVENTOS

    // M08 BRAINSTORM — lista destino de ideas
    brainstorm_ideas:   "901415394341",  // Backlog / Ideas (Space DITEG > SER CON IA)

    // FIX GAP-M06-A: Excluir estas listas del bloque 🔵 del #buendia
    // Son seguimientos de Martín Speaker / Agencias — no tareas DITEG operativas
    excluir_buendia: [
      "901415707448",  // Agencias (28+ contactos en pipeline)
      "901413512928",  // Martin Speaker
    ],
  },

  // ── SPACES CLICKUP — M18 #informe ─────────────────────────────────────────
  // REGLA CRÍTICA: El informe semanal SIEMPRE consulta AMBOS spaces
  spaces: {
    diteg:     "90144409477",  // Space DITEG
    proyectos: "90144409623",  // Space PROYECTOS (no omitir — tiene datos distintos)
  },

  // ── ÁREAS DITEG — M07 #reunionditeg ──────────────────────────────────────
  // FIX GAP-M07-B: Pre-cargar estado por área antes de generar el temario
  areas_diteg: {
    GECO:    "901414425218",  // 5. GECO - DITEG
    MARK:    "901414425200",  // 4. MARK - DITEG
    ECLI:    "901414425220",  // 2. ECLI - DITEG
    ADFIN:   "901414425214",  // 6. ADFIN - DITEG
    EVENTOS: "901414214459",  // OPERACIONES DIARIAS - EVENTOS
  },

  // ── AGENTES SER CON IA ─────────────────────────────────────────────────────
  agentes_ser_con_ia: {
    MAXI:    "901415394335",
    LARA:    "901415394337",
    STANNIO: "901415759182",
    VAR:     "901415394340",
    KAIROS:  "901415788112",
    TORO:    "901415974497"
    // Chronos: en desarrollo — agregar cuando esté activo
  },

  // ── DOCUMENTOS CLICKUP ─────────────────────────────────────────────────────
  docs: {
    canonical:      "c9ra2-8614",  // ⚡ SYSTEM PROMPT MAXI v2.4
    lean_prompt:    "c9ra2-8474",  // 01 — MAXI | Instrucciones de Proyecto
    arquitectura:   "c9ra2-8774",  // 00B — Nota de Arquitectura
    auto_analisis:  "c9ra2-8794",  // 🔬 Protocolo Auto-Análisis (page ID)
    ser_con_ia_doc: "c9ra2-20754", // Memoria SER CON IA
  },

  // ── DRIVE FOLDERS ─────────────────────────────────────────────────────────
  // FIX GAP-M18-B: Integrar lectura de Drive antes del brief M18
  drive_folders: {
    meetings:  "17Ud_r0JZtUog3xY4AE5idywQw3GuMdmA",  // Carpeta Reuniones DITEG
    // informes: agregar ID carpeta informes semanales cuando esté creada
  },

  // ── EQUIPO DITEG — IDs confirmados 01/05/2026 desde Pipeline ──────────────
  // FIX GAP-M17-B: IDs de todos los miembros del equipo DITEG
  // Actualizar si se incorporan nuevos miembros
  equipo: {
    brahin:   { id: "174284252", nombre: "Brahin Carrillo",          area: "DITEG"    },
    ale:      { id: "3275623",   nombre: "Alejandro De la Zerda",    area: "ECLI/GEQ" },
    sofi:     { id: "94219785",  nombre: "Sofía Fernandez Bravo",    area: "ADFIN"    },
    flor:     { id: "88335665",  nombre: "Florencia Ferreyra",       area: "ADFIN"    },
    seba:     { id: "88335666",  nombre: "Sebastián Palacios",       area: "MARK"     },
    nicoN:    { id: "67292897",  nombre: "Nicolás Nasrallah",        area: "GECO"     },
    nicoD:    { id: "42901073",  nombre: "Nicolas Darelli",          area: "GAME"     },
    stannum:  { id: "18905578",  nombre: "STANNUM (cuenta general)", area: "ORG"      },
    // Pendiente confirmar IDs: Martín Merlini, Agustina Cabrera, Mateo Lohezic
    // Buscar con clickup_find_member_by_name cuando sea necesario
  },

  // ── FOLDERS CLICKUP — M16 #diagnóstico ────────────────────────────────────
  // FIX GAP-M16-A: Folder Táctica Bernabéu para análisis situacional
  folders: {
    tactica_bernabeu: "90147739792",    // Folder con listas Táctica Bernabéu
  },

  // ── DOCS ADICIONALES — M15 #govIA ─────────────────────────────────────────
  // FIX GAP-M15-A: Doc del ecosistema SER CON IA para auditoría
  // docs.ser_con_ia_doc ya está en la sección docs de arriba (c9ra2-20754)
  // Página del mapa: c9ra2-8094 (verificar que sigue siendo válida)

  // ── TENSIONES DEL ECOSISTEMA IA — M10 #bajada ─────────────────────────────
  // FIX GAP-M10-B: Las 5 tensiones deben estar disponibles en AppScript si
  // alguna función de AppScript las necesita. Para Claude (Cowork) están
  // en el system prompt canónico (c9ra2-8614).
  tensiones_ecosistema: [
    "T1: Velocidad de ejecución vs. documentación y estandarización",
    "T2: Autonomía de directores vs. cuello de botella en aprobaciones Brahin",
    "T3: Construcción de nuevos agentes vs. consolidación de agentes existentes",
    "T4: Urgencia comercial (objetivo USD 46K/mes) vs. inversión en infraestructura IA",
    "T5: Escala (nuevas áreas/agentes) vs. consolidación (hacer bien lo existente)"
  ],

  // ── EMAILS STANNUM (calendarios) ──────────────────────────────────────────
  calendarios: {
    brahin:    "eventos@stannum.com.ar",
    stannum:   "stannum@stannum.com.ar",
    comercial: "comercial@stannum.com.ar",
    ecli:      "ecli@stannum.com.ar",
    adfin:     "adfin@stannum.com.ar"
  },

  // ── TRIGGERS ──────────────────────────────────────────────────────────────
  triggers: {
    buenosdias:    { hora: 7,  minuto: 25, comando: "#buenosdias" },
    checkpoint:    { hora: 12, minuto: 55, comando: "#checkpoint" },
    cierredia:     { hora: 17, minuto: 55, comando: "#cierredia" },
    concentracion: { diaSemana: 1, hora: 9, minuto: 0 }  // Lunes 9:00
  }
};

/**
 * Obtiene una propiedad segura desde Script Properties.
 * Nunca hardcodear tokens en el código.
 */
function getSecureProperty(key) {
  const props = PropertiesService.getScriptProperties();
  const value = props.getProperty(key);
  if (!value) {
    Logger.log(`⚠️ MAXI CONFIG: Property "${key}" no encontrada. Verificar Script Properties.`);
    return null;
  }
  return value;
}

/**
 * Verifica que todas las propiedades críticas estén configuradas.
 * Ejecutar manualmente después de instalar para validar setup.
 */
function verificarConfiguracion() {
  const requeridas = [
    "CLICKUP_TOKEN",
    "GCHAT_WEBHOOK_DITEG",
    "GCHAT_WEBHOOK_MAXI",
    "DRIVE_FOLDER_DITEG"
  ];

  let todas_ok = true;
  requeridas.forEach(key => {
    const val = getSecureProperty(key);
    if (!val) {
      Logger.log(`❌ Falta: ${key}`);
      todas_ok = false;
    } else {
      Logger.log(`✅ OK: ${key} = [configurado]`);
    }
  });

  if (todas_ok) {
    Logger.log("✅ MAXI CONFIG: Todas las propiedades están configuradas.");
  } else {
    Logger.log("⚠️ MAXI CONFIG: Hay propiedades faltantes. Ver instrucciones en MAXI_Config.gs");
  }
}
