# MAX — Aprendizajes
**Actualizado:** 2026-05-23

---

## 2026-05-21 — Sistema de módulos como menú de herramientas
**Contexto:** Configuración inicial del sistema de skills
**Aprendizaje:** El sistema funciona como menú: Brahin invoca el comando correcto y MAX ejecuta sin contexto adicional. El riesgo es que Brahin no sepa qué comando usar — la primera tarea de MAX en cada sesión es orientar si hay duda.
**Aplicación:** Si Brahin llega sin comando explícito, MAX propone la skill más adecuada basada en la primera frase.
**Skill afectada:** Todas

---

## 2026-05-21 — Estado real del ecosistema (DEEP-SEARCH-MAX)
**Contexto:** DEEP-SEARCH-MAX completo — Drive + ClickUp + Gmail
**Aprendizaje:** El ecosistema tiene más tareas urgentes sin fecha de las que aparecen en superficie. Hay 15+ gaps en el pipeline (proyectos en informes no registrados en ClickUp). CRONOS es la infraestructura que nadie está empujando pero que desbloquea todo lo demás.
**Aplicación:** En cada sesión, antes de avanzar con proyecto nuevo, verificar si CRONOS Fase 1 está completo. Si no está, es la primera acción a proponer.
**Skill afectada:** `#pipeline`, `#govIA`, `#sprint`

---

## 2026-05-21 — Acuerdo Andes Salud confirmado por email
**Contexto:** Email "ACUERDO FIRMADO" de comercial@stannum.com.ar
**Aprendizaje:** Nuevo cliente B2B firmado (Andes Salud, Chile) que no estaba registrado en pipeline de ClickUp en el momento de la búsqueda. Evidencia del patrón "acuerdo firmado sin cargar en Kommo/ClickUp".
**Aplicación:** MAX debe verificar en Kommo si el lead de Andes Salud está registrado antes de cerrar cualquier sesión relacionada con GECO.
**Skill afectada:** `#pipeline`, Regla operativa CRM

---

## 2026-05-21 — Pipeline activo de speakers (Brahin)
**Contexto:** Gmail — múltiples emails salientes de eventos@stannum.com.ar el 21/05
**Aprendizaje:** Brahin tiene campaña activa de prospección de agencias de speakers para Martín Merlini (Indole, SIC Congresos, Mentores LA, Grupo Set, Marketers LATAM, Reuniones CL, Eventpro). No está registrada como proyecto en ClickUp — trabajo invisible.
**Aplicación:** Sugerir a Brahin crear tarea de tracking de agencias de speakers en pipeline.
**Skill afectada:** `#pipeline`, TORO

---

## 2026-05-21 — GAS deployado vs pendiente
**Contexto:** Revisión de 7 archivos GAS
**Aprendizaje:** Los scripts GAS están escritos y listos pero el deployment con clasp no está confirmado. Los triggers están documentados en el código pero puede no haber confirmación de que estén activos en producción.
**Aplicación:** En sesión de `#govIA`, preguntar explícitamente a Brahin si los triggers GAS están activos o solo documentados.
**Skill afectada:** `#govIA`, `#buenosdias`

---

## 2026-05-23 — Migración arquitectura a GitHub
**Contexto:** Sesión de reorganización arquitectural
**Aprendizaje:** La arquitectura GitHub + ClickUp + Claude resuelve el problema de dependencia de archivos locales. Drive local y Obsidian son volátiles (dependen de sync en una sola PC). GitHub es la fuente de verdad online-always.
**Aplicación:** Skills y memoria viven en `stannum-max-agent` repo. CLAUDE.md apunta al repo. Drive/Obsidian son archivos históricos de referencia, no fuente activa.
**Skill afectada:** `#memoria`, `#govIA`

---

## 2026-05-25 — Capacidades MCP reales en flujos de generación de contenido IA externo
**Contexto:** Brahin pidió ejecutar guía "THE LINE PROJECT" (3 pasos: ChatGPT → Nanobanan Pro → ElevenLabs + Creatify Aurora) para generar avatar IA.
**Aprendizaje:** MAX solo tiene MCP conectado para el rol de ChatGPT (Paso 1 — análisis de foto + generación de prompt). Nanobanan Pro, ElevenLabs y Creatify Aurora son UIs externas sin MCP/API conectado. End-to-end agéntico no es posible en flujos de generación de avatar/voz/imagen con esas plataformas hoy.
**Aplicación:** Frente a pedidos de "ejecutá esta guía/automatización" que involucren tools externas, hacer **auditoría de capacidades** explícita (tabla "puedo / no puedo" por paso) antes de prometer ejecución. Nunca avanzar sin clarificar qué paso es agéntico y cuál queda como acción manual del operador.
**Skill afectada:** `#govIA`, todas las skills que orquestan flujos multi-tool

---

## Histórico

_(Aprendizajes de proyectos cerrados o superseded por decisiones posteriores)_
