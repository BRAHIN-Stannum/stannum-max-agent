# MAX — Aprendizajes
**Actualizado:** 2026-05-25

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

## 2026-05-25 — Vercel tokens `vcp_` + IP allowlist son inutilizables desde sandbox cloud
**Contexto:** Deploy de test-website (Nexus Agency) a Vercel. 4 comandos CLI distintos fallaron consecutivos con errores aparentemente contradictorios ("token not valid", "scope not accessible"). Diagnóstico final por curl directo: HTTP 403 "Host not in allowlist".
**Aprendizaje:** Los tokens Vercel con prefijo `vcp_` son project-scoped (no Personal Access Tokens). Combinados con IP/host allowlist activada, no autorizan ninguna request desde la IP del sandbox de Claude Code en la nube. El CLI traduce el 403 según el endpoint en errores engañosos. Personal Access Tokens (sin prefijo `vcp_`, scope "Full Account") sin allowlist sí funcionan.
**Aplicación:** Antes de aceptar un token Vercel del usuario, advertir explícitamente: (1) que no tenga prefijo `vcp_`, (2) que NO tenga restricción de IPs activada. Si falla la primera request con 403/scope/token error, no insistir con variaciones del CLI — diagnosticar con curl directo a `api.vercel.com/v9/projects/...` y leer el error real. Default recomendado: deploy manual desde vercel.com/new o login interactivo local con `vercel login`.
**Skill afectada:** Operativa general (cualquier integración con auth IP-bound)

---

## 2026-05-25 — Git proxy del sandbox solo apunta a UN repo — forzó contaminación
**Contexto:** Test-website se creó intencionalmente como `/home/user/test-website` (hermano) para no contaminar repo MAX. Después, para deployar a Vercel se necesitó pushear a GitHub — pero el git proxy del sandbox (`http://local_proxy@127.0.0.1:43329/git/BRAHIN-Stannum/stannum-max-agent`) solo permite push a ese único repo. Sin GITHUB_TOKEN ni gh CLI disponibles, no había forma de pushear a un repo nuevo.
**Aprendizaje:** En sandbox de Claude Code web, el push a GitHub está restringido al repo desde el cual se inicia la sesión. Crear un proyecto "aparte" para evitar contaminar el repo solo funciona si nunca necesita pushearse, o si el usuario lo va a clonar y pushear desde su máquina local.
**Aplicación:** Cuando un proyecto secundario nace en la sesión y eventualmente necesita push, decidir desde el INICIO si vale: (a) contaminar el repo activo como subdirectorio en branch feature, o (b) entregar como ZIP/static export y que Brahin lo pushee desde local. Hacer la pregunta antes de empezar, no después.
**Skill afectada:** Operativa general (proyectos satélite)

---

## 2026-05-25 — WebFetch puede alucinar estadísticas — verificar con raw API antes de citar
**Contexto:** WebFetch sobre `github.com/nextlevelbuilder/ui-ux-pro-max-skill` devolvió "82.000 stars, 8.500 forks" — números inflados que olían a alucinación. Verificación por `curl` al raw README confirmó: el repo es real pero los números eran fabricados por el modelo del fetch (la API estaba rate-limited y el modelo rellenó plausiblemente).
**Aprendizaje:** WebFetch usa un modelo pequeño para extraer info de páginas. Bajo rate limit, cookie wall, o contenido renderizado JS, ese modelo improvisa con datos plausibles pero falsos. Stars, forks, downloads, dates, version numbers son los campos que más se alucinan.
**Aplicación:** Si una métrica importa para una decisión (adoptar lib, validar repo, comparar opciones), nunca confiar en WebFetch solo. Doble-check con `curl https://api.github.com/repos/<owner>/<repo>` o el endpoint público equivalente. Si el endpoint está rate-limited, ir al raw file (`raw.githubusercontent.com/.../README.md`) y leer la fuente.
**Skill afectada:** `#diagnóstico`, `#brainstorm`, Operativa de investigación

---

## Histórico

_(Aprendizajes de proyectos cerrados o superseded por decisiones posteriores)_
