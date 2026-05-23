# SKILL: gchat-routing
**Tipo:** Utility (interna — no de usuario)
**Propósito:** Reglas de routing de mensajes Google Chat para evitar envíos al canal equivocado
**Creada:** 2026-05-22 · post-incidente de routing S21

---

## ⚠️ REGLA CRÍTICA — NO NEGOCIABLE

```
enviar_mensaje (mcp__cae8afc6__)  →  EXCLUSIVO GECO / Martín Merlini
                                      NUNCA usar para DITEG, EVENTOS, MARK, ADFIN, ECLI
```

---

## Tabla de routing por área

| Área | Método correcto | Tool / Comando |
|------|-----------------|----------------|
| **GECO** | MCP `enviar_mensaje` | `mcp__cae8afc6__enviar_mensaje` |
| **DITEG** | stannum-mcp `crear_informe(area="DITEG")` | Ver método 1 abajo |
| **DITEG** (simple) | Bash curl → GAS URL | Ver método 2 abajo |
| **MAXI / Brahin** | GAS `enviarAMaxi()` | Via trigger GAS o curl |
| **EVENTOS** | LARA webhook | Ver SKILL LARA |

---

## Método 1 — stannum-mcp (informes completos)

```
crear_informe(
  area: "DITEG",
  semana: "[N]",
  resumen_ejecutivo: "[texto]",
  estado_general: "🟢" | "🟡" | "🔴",
  proyectos: "[estado]",
  bloqueadores: "[bloqueadores]",
  proxima_semana: "[prioridades]"
)
```

## Método 2 — Bash curl (notificaciones simples / fallback)

```bash
cat > /tmp/msg_diteg.json << 'EOF'
{
  "accion": "enviarDITEG",
  "texto": "[MENSAJE]"
}
EOF

curl -s -X POST \
  "https://script.google.com/macros/s/AKfycbx59gHM7BGdjQ6fx2WtkymYffMTeW223XxNdEJ_sKtvc34xGaHMSnO3o0v20XURFLbE/exec" \
  -H "Content-Type: application/json" \
  --data-binary @/tmp/msg_diteg.json
```

Respuesta esperada: `{ "success": true }` — si llega → NO reintentar.

---

## Estado de webhooks (ALERTA-001 activa)

| Propiedad GAS | Estado | Bloqueador |
|---------------|--------|-----------|
| `GCHAT_WEBHOOK_DITEG` | ⚠️ Pendiente rotación | ALERTA-001 · Mateo Lohezic · tarea `86ba2ehnn` |
| `GCHAT_WEBHOOK_MAXI` | ⚠️ Pendiente rotación | ALERTA-001 |
| `CLICKUP_TOKEN` | ⚠️ Expuesto | NO cargar en GAS hasta rotación confirmada |

**Mientras ALERTA-001 esté activa:** usar Drive + ClickUp comment como canal primario.

---

## Checklist antes de enviar cualquier mensaje

```
☐ ¿Para DITEG? → stannum-mcp crear_informe o curl GAS · NUNCA enviar_mensaje
☐ ¿Para GECO / Martín? → enviar_mensaje (mcp__cae8afc6...)
☐ ¿Para Brahin privado? → GAS enviarAMaxi()
☐ ¿Para EVENTOS? → LARA webhook (AAQAtcD7Myc)
```
