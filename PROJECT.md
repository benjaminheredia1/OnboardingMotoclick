# Motoclick — Merchant Onboarding Form

## Descripción
Formulario web de onboarding para merchants de Motoclick. Captura datos del negocio, genera un contrato PDF editable con firma digital y envía la información al backend.

## Repositorio
- **Org:** https://github.com/motoclick/merchant-onboarding
- **Personal:** https://github.com/benjaminheredia1/OnboardingMotoclick

## Rama principal
`main`

## Stack Tecnológico
| Área | Tech |
|------|------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Estilos | Tailwind CSS v3 + shadcn/ui |
| Forms | React Hook Form + Zod |
| PDF | @react-pdf/renderer + html2pdf.js |
| Editor | Tiptap (rich-text) |
| Backend/DB | Supabase + Axios |
| Firma digital | react-signature-canvas |
| Deploy | Docker + Nginx / Vercel |

---

## ✅ Completado recientemente
- **Multi-POS dinámico (SectionH):** el formulario permite agregar/eliminar múltiples sistemas POS con nombre, usuario, contraseña, dueño, teléfono y email.
- **Multi-sucursal con horarios (SectionA):** campos dinámicos por sucursal (dirección + horarios operativos por día). Renderiza correctamente en el PDF.
- **Submit payload completo:** `submit.ts` empaqueta los arrays de POS, plataformas de delivery (incluyendo "Other"), logo, PDF generado y horas en un `FormData` hacia n8n.
- **Backward compatibility:** el primer POS se envía también como campos planos (`pos_access_name`, `pos_access_user`, etc.) para no romper el backend existente.
- **Editor de contrato (editPages.tsx):** editor rich-text tipo Word con Tiptap, precargado con los datos del merchant vía n8n, toolbar completa (bold, italic, align, listas, etc.), guardado con `Ctrl+S` y persist vía `/guardar-contrato`.
- **Validaciones de longitud en inputs** y alertas visuales en errores de formulario.
- **Routing SPA** configurado para Nginx/Dokploy y Vercel.

---

## 🔧 En Progreso (WIP)
- **Rama:** `main` (último commit: `e1e02e0` — *"new changes"*, Apr 8 2026)
- **editPages.tsx** tiene un import roto: `import { process } from "zod/v4/core"` — se importó por error y no se usa. El editor funciona pero esto genera un warning/error de compilación.
- La función `buildDocument()` en `editPages.tsx` **no incluye** los bloques de sucursales (`location_addresses`) ni los datos extendidos de POS múltiple en el contrato editable. Solo refleja `merchant_name` y `main_address`.

---

## 📋 Pendiente (Backlog)
- Reflejar **todos los campos nuevos** (multi-sucursal, multi-POS, horarios) dentro del `buildDocument()` del editor para que el contrato editable esté completo.
- **Firma digital** en el flujo del editor (`editPages.tsx`) — actualmente solo existe en el formulario de onboarding.
- **Descarga del contrato editado** en PDF desde `editPages.tsx` (actualmente solo guarda en backend, no descarga localmente el HTML editado).
- Página de confirmación/success post-submit con resumen de datos enviados.
- Validación de tarjeta de crédito (Luhn algorithm o similar) en SectionG.

---

## 🐛 Bugs conocidos / Deuda Técnica
- **Import sin usar:** `import { process } from "zod/v4/core"` en `editPages.tsx` línea 10 — eliminar.
- **Mensajes de commit genéricos** (`"new changes"`, `"new changes"`) — dificulta el rastreo de cambios en git log.
- **`any` tipado excesivo** en `editPages.tsx` (`merchantData: any`, `d: any`) — debería usar la interfaz `pdf.interface.ts`.
- El editor Tiptap **pierde los estilos inline** del HTML generado por `buildDocument()` al convertirlo a su modelo interno — algunos elementos como `border-left` o `background` no se visualizan en el editor, aunque sí se guardan y renderizan correctamente en PDF.
- **Sin manejo de errores de red** robusto en `submit.ts` — un timeout del fetch no tiene retry ni feedback detallado al usuario.
