# Social Studio — Puesta en marcha del administrador (beta)
Actualizado: 14/11/2026. Rama `feat/firebase-admin-mvp`.

## Alcance de esta beta
- Login privado en `/admin/login` con Firebase Authentication (email/contraseña).
- Autorización separada en Firestore `studioAdmins/{uid}` (`enabled: true`). Los clientes web **nunca pueden crear ni modificar permisos**.
- Editor `/admin`: crear, editar, eliminar, guardar borrador, publicar, título, categoría, plataforma, descripción, labor realizada, colores, varias piezas multimedia, URLs HTTPS.
- Página pública consulta `socialStudioPublications` con `published == true`; mientras no haya ninguna publicación real, se muestra el portfolio demostrativo existente.
- **Sin Storage**: esta beta acepta enlaces HTTPS públicos a imágenes y videos directos (MP4) y enlaces a publicaciones sociales (Instagram, TikTok, YouTube, X). Una URL social **no es** un video MP4 y por ello solo se abre en la publicación original. El campo multimedia puede permanecer sin URL si se usa `sourceUrl`, pero mostrará una tarjeta editorial sin miniatura real.
- Aún no incluye edición del Hero, estadísticas, soporte para uploads ni roles avanzados.

## Importante antes de probar
1. El archivo `package.json` ya incorpora `firebase: 12.1.0`, pero el `package-lock.json` remoto todavía debe actualizarse desde el entorno local con npm. Vercel usa `npm ci` y no podrá instalar un lockfile desactualizado.
2. **No fusionar ni publicar hasta:** actualizar lockfile, obtener build exitoso, aplicar reglas Firestore, configurar variables Vercel y dar de alta usuarios.
3. Hay vulnerabilidades anteriores de Next/PostCSS y Firestore/gRPC identificadas en `npm audit --omit=dev`. Revisar riesgos antes de publicación definitiva; no usar `npm audit fix --force`.
4. Las reglas originales de `/users/{uid}` del marketplace permitían alterar `role`: son inseguras. Las nuevas reglas **reemplazan**, no se agregan a ellas. Antes de publicarlas, confirmar que nadie utiliza aún el marketplace.

## Configuración Firebase (consola)
Proyecto existente: `marketplace-app-ae060`.

1. **Authentication → Sign-in method**: habilitar **Correo electrónico/Contraseña**. No habilitar registro anónimo ni signup público.
2. **Authentication → Users → Add user**: crear **dos cuentas independientes**, una por integrante, con emails propios; entregar claves por canal seguro y que las cambien. No compartir claves en Git/ChatGPT.
3. Copiar el **UID** de cada cuenta creada en Authentication.
4. **Firestore → Data**: crear colección raíz `studioAdmins`. Crear **un documento por UID exacto** con campo booleano `enabled = true`. Opcional `name` para identificar integrante. Este paso únicamente en la consola por un operador confiable.
5. **Firestore → Rules**: reemplazar el texto antiguo por el archivo `firestore.rules` de esta rama, publicar y probar. La política deniega todas las rutas antiguas. No usar `allow read, write: if true`.
6. Crear `socialStudioPublications` no es obligatorio: se crea automáticamente al guardar un proyecto.

## Variables de entorno locales y Vercel
Copiar desde la configuración web de Firebase (Project Settings → Your apps, ya registrada):
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=marketplace-app-ae060.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=marketplace-app-ae060
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
```
Colocarlas en `.env.local` (no subir el archivo) y en Vercel del proyecto **prueba-deepseek** para Preview y posteriormente Production. La apiKey web es pública, **no** es la clave de Firebase Admin.

En Authentication → Settings → Authorized domains, incluir el dominio realmente utilizado al iniciar sesión (dominio preview concreto si se usa). No abrir comodines innecesarios.

## Git y dependencias
Antes de cambiar de rama:
```bash
git rev-parse --show-toplevel
git remote -v
git status
```
Asegurarse de estar en `~/Documents/GitHub/social-media`; conservar cualquier cambio local de dependencias antes de cambiar de rama (commit temporal o stash solo después de revisar `git status`).

Con el árbol de trabajo limpio:
```bash
git fetch origin
git switch --track origin/feat/firebase-admin-mvp
npm install firebase@12.1.0 --save-exact
npm run build
npm audit --omit=dev
git status
```
Si `package-lock.json` cambia y el build pasa, versionarlo en esta rama:
```bash
git add package.json package-lock.json
git commit -m "chore: synchronize Firebase dependency lockfile"
git push -u origin feat/firebase-admin-mvp
```
No subir `.env.local` ni archivos de credenciales.

## QA de aceptación del fin de semana
- [ ] Usuario no logueado abre `/admin` → redirige a login.
- [ ] Email/contraseña erróneos → mensaje de error, sin acceso.
- [ ] Cuenta autenticada sin documento `studioAdmins/{uid}` → sin acceso, y **Firestore niega las escrituras**.
- [ ] Cuenta autorizada → entra, ve lista vacía y crea borrador.
- [ ] Borrador no visible en portfolio público.
- [ ] Publicar con URL HTTPS válida → aparece en página pública tras recargar.
- [ ] Editar título/categoría → actualizar página y comprobar cambio.
- [ ] Eliminar → desaparece del portfolio público.
- [ ] Segundo administrador puede gestionar los mismos documentos.
- [ ] Publicación externa abre enlace original (sin fingir que es archivo multimedia).
- [ ] Mobile: editor y modal público sin desbordes.
- [ ] Firestore Rules Playground / Emulator: cliente anónimo no lee borradores ni escribe; usuario sin admin no publica; permiso administrativo no es autoeditable.
- [ ] Vercel Preview compila (no asumir el estado del segundo proyecto Vercel `social-media`).

## Limitaciones conocidas / evolución
- Esto es un **editor de tarjetas**, no aún un módulo jerárquico independiente de «proyectos con múltiples publicaciones». Para el beta, cada registro representa un proyecto publicable con galería propia; el modelo puede extenderse a entidades independientes sin romper el frontend.
- El acceso a `/admin` se protege en la interfaz y, sobre todo, con **reglas Firestore**. No implementar rutas de servidor privilegiadas usando el token de cliente sin verificación.
- Para uso comercial definitivo: preparar política de medios, hosting/carga de imágenes y videos con costos, revisión de audit, pruebas de Rules en Emulator, índices y observabilidad.
