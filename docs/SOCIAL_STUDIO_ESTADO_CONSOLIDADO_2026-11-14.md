# SOCIAL STUDIO — ESTADO CONSOLIDADO Y CONTINUIDAD
**Fecha de corte:** 14 de noviembre de 2026 (Argentina)  
**Producto:** landing/portfolio para equipo de dos Social Media Managers  
**Repositorio:** https://github.com/dgodoy34/prueba_deepseek  
**Dominio público:** https://mercarg.vercel.app  
**Estado:** Sitio y administrador publicados; funcionalidades fundamentales probadas, todavía beta editorial y con pendientes de seguridad/QA.

> Este documento describe lo verificado, diferencia las implementaciones de las pruebas y evita dar por cerrados puntos no validados. Completa el documento anterior `docs/SOCIAL_STUDIO_ESTADO_Y_ROADMAP_2026-11-13.md`.

## 1. Decisiones de producto que debemos preservar
- Identidad visual juvenil, colorida y moderna de «social studio.» aprobada en escritorio y celular: colores violeta, durazno/coral, lima, azul, fondo cálido. **No rediseñar lo aprobado sin necesidad.**
- Objetivo: portfolio profesional para marcas y productoras, no una red social de imitación. No inventar clientes, likes, comentarios, resultados ni cuentas.
- Primero cerrar funcionalidades existentes, después ampliar. Reutilizar el código y conservar la separación de frontend, administrador y backend de Firebase.
- Equipo podrá autogestionar sus tarjetas y proyectos desde un panel, con credenciales individuales.
- Material multimedia beta: URLs públicas HTTPS (imágenes y archivos MP4 directos) y enlaces a publicaciones originales de Instagram/TikTok/YouTube/X. **La carga de archivos aún no existe**; Firebase Storage no configurado.
- El Hero puede animarse, pero respeta preferencia de movimiento reducido y ofrece botón explícito «Activar animación / Pausar animación».
- Se mantiene un footer con copyright de IA Creativa Tools y acceso discreto a Admin.

## 2. Stack, entornos y repositorio
- Next.js **15.5.29**, React **19.1.0**, TypeScript, Tailwind CSS **3.4.17**, Vercel.
- Firebase Web SDK **12.1.0**, Authentication correo/contraseña, Firestore. Firebase existente reciclado: `marketplace-app-ae060`.
- GitHub `dgodoy34/prueba_deepseek`; desarrollo local `C:/Users/DIEGO/Documents/GitHub/social-media`, con Git independiente en esa carpeta.
- Vercel tiene dos proyectos vinculados a un mismo repositorio: `prueba-deepseek` es el principal de `mercarg.vercel.app`; `social-media` quedó duplicado. Se corrigió su **Root Directory** de `social-media` a `./` y un redeploy quedó **Ready**. No eliminar el proyecto duplicado sin auditar asociaciones de dominios, configuraciones y variables.
- Compilación del último merge del PR #6 (commit `9d6a6eb01b375ef1036522ec7fd14fe280d13fd0`): checks de Vercel **success en ambos proyectos**. Esto confirma CI/deploy reportado, **no** todas las pruebas funcionales posteriores.
- Archivo `package-lock.json` sincronizado con Firebase 12.1.0 y fusionado a main mediante PR #2.

## 3. Página pública — implementación
Ruta principal: `/`, composición en `src/components/social-landing.tsx`.
- Header responsive; Hero: «Que tu marca se haga notar.»; CTA «Explorá los trabajos» y «Descubrí qué hacemos».
- Servicios desplegables, ticker, portfolio interactivo, resultados de X, plataformas y enfoque.
- Orden: Header → Hero → Ticker → Servicios → Portfolio → Resultados → Plataformas → Enfoque → Footer.
- Hero mobile refinado, stickers decorativos ocultos en pantallas pequeñas y tamaños ajustados; validación visual del usuario en desktop/mobile.
- Footer: **«© 2026 Todos los derechos reservados - iacreativatools»**, debajo enlace **Admin** a `/admin/login`.
- Eliminado el texto provisional «El enlace a la cuenta de X se incorporará cuando esté confirmado». Si se conoce cuenta real, añadir URL validada, sin inventarla.
- Botón WhatsApp flotante preparado mediante `NEXT_PUBLIC_WHATSAPP_NUMBER`; número comercial todavía no confirmado. «Al cielo» para volver al inicio.
- Métricas reales de X (últimos 12 meses informados): impresiones 12,2 M; tasa de interacción 5,6 %; interacciones 684,7 K; visitas al perfil 42,2 K; respuestas 5,3 K; me gusta 551,1 K; reposts 60,9 K; marcadores 18,5 K; compartidos 6,4 K. Enlace de cuenta sin confirmar.
- Portfolio: categorías Reels, Campañas, Eventos, Contenido; filtros, grilla, visor modal y enlaces a publicación original. Si hay publicaciones Firestore publicadas se usan para mostrar trabajos. Mantiene datos demo como respaldo cuando no hay publicaciones reales; revisar esa decisión editorial antes del lanzamiento definitivo.

## 4. Firebase Admin — implementado y probado
- Login `/admin/login`, editor `/admin`.
- Authentication email/contraseña habilitado, dominio autorizado y variables NEXT_PUBLIC_FIREBASE_* configuradas en Vercel.
- Firestore: colección `studioAdmins/{uid}` con campo boolean `enabled: true`. **Nunca** habilitar que el usuario se conceda a sí mismo permisos.
- Se publicó el archivo `firestore.rules` preparado para Social Studio (según confirmación del usuario). Reemplaza reglas antiguas del marketplace; evita la antigua elevación de privilegios vía `users/{uid}.role`. El control definitivo requiere pruebas negativas de reglas con cuenta sin permisos.
- Colección editorial `socialStudioPublications`: título, categoría, plataforma, descripción, trabajo realizado/role, color accent, media, URL origen, status boolean `published`, marcas de fecha.
- CRUD: crear, editar, borrar, guardar borrador, publicar. Administrador permite múltiples piezas multimedia por tarjeta, con enlaces.
- **Pruebas verificadas por usuario:** login correcto; creación/publicación en Firestore; tarjeta reflejada en frontend; filtro de categoría operativo; modal con descripción, imagen y enlace; eliminación correcta; una segunda tarjeta guardada como borrador **no aparece en el frontend**.
- **Pendiente de confirmar:** pruebas del segundo administrador, rechazo de usuario no autorizado, pruebas de reglas en Emulator/Rules Playground y QA de editor en celular.
- Alertas PR #3: reemplazada confirmación nativa `window.confirm` por modal propio y mensajes de éxito/error/validaciones vía toast; merge a main correcto. Confirmación visual definitiva de todos los avisos no registrada.

## 5. Últimos cambios frontend — PRs
- PR #1: diseño, portfolio, métricas X, mobile, acciones flotantes y documentación → **fusionado**.
- PR #2: Firebase Admin beta, reglas, login, editor y datos dinámicos → **fusionado**.
- PR #3: alertas/modal de eliminación → **fusionado**.
- PR #4: copyright en footer, enlace Admin y limpieza de nota provisional de X → **fusionado**.
- PR #5: trabajo de animación del Hero. **No fusionar nuevamente**: sus cambios se copiaron al PR #6, que ya fue fusionado; cerrar PR #5 como redundante cuando se confirme.
- PR #6: imágenes `object-contain` en tarjetas/visor, colores del campo `accent` aplicados a marcos/fondos/etiquetas, y todas las animaciones del Hero con control explícito de pausa/activación → **fusionado** (commit `9d6a6eb01b375ef1036522ec7fd14fe280d13fd0`).
- Incidente documentado: se creó primero preview del PR #6 desde `main` sin incluir PR #5, lo que hizo «desaparecer» animación y botón en ese preview. Se integraron ambos en PR #6 **antes del merge**. Siempre probar todas las funcionalidades relacionadas en **un único preview de integración**.

## 6. Animaciones del Hero — causa raíz y solución
- En pruebas de Chrome F12, se observó:
  - `document.querySelector('.hero-card-motion')` → encontrado;
  - `animationName` → `hero-card-float`;
  - `animationDuration` → `0.00001s`;
  - `matchMedia('(prefers-reduced-motion: reduce)').matches` → `true`.
- Causa: regla global `@media (prefers-reduced-motion: reduce)` que imponía casi cero duración a todas las animaciones.
- Solución fusionada: CSS de Hero con movimientos en distintas capas, pulso de corazón, indicador EN LÍNEA, globo y HEY; regla reducida específica en lugar del apagado global y botón accesible «Activar animación / Pausar animación».
- Preferencia `reduce`: animación inicia pausada; visitante puede activarla expresamente, sin tocar Windows/Chrome. Revisar experiencia en mobile y accesibilidad luego de publicar.

## 7. Colores y contenido multimedia
- Problema de imágenes: `object-cover` recortaba fotos; se cambió a `object-contain`, con fondo del color de tarjeta y contenedor del modal más flexible.
- El color guardado en el administrador sí se recuperaba de Firestore, pero antes solo se veía en placeholders. Ahora `accent` aplica a fondo de miniatura, borde de tarjeta y etiqueta del modal.
- Valores: `violet`, `coral`, `lime`, `blue`; ya forman parte del modelo, **sin migración de Firestore**.
- Ajustes integrados en PR #6. Pendiente un QA breve en producción con imágenes horizontales, verticales, cuadradas y video.

## 8. Archivos relevantes
- `src/components/social-landing.tsx` — Hero, navegación y footer.
- `src/app/globals.css` — animaciones y estilos compartidos.
- `src/components/portfolio.tsx` — grilla, filtros, cards, visor y lectura Firestore.
- `src/lib/portfolio.ts` — tipos de portfolio, demos y métricas X.
- `src/components/results.tsx` — presentación de analítica X.
- `src/components/floating-actions.tsx` — WhatsApp y «Al cielo».
- `src/app/admin/login/page.tsx` — login Firebase.
- `src/app/admin/page.tsx` — editor CRUD.
- `src/components/admin-feedback.tsx` — notificaciones y modal de confirmación.
- `src/lib/firebase/client.ts` — Firebase Web SDK.
- `src/lib/firebase/publications.ts` — validación/normalización de documentos.
- `firestore.rules` — permisos Firestore.
- `docs/SOCIAL_STUDIO_ADMIN_BETA_SETUP.md` — pasos de configuración y QA de la beta.
- `docs/SOCIAL_STUDIO_ESTADO_Y_ROADMAP_2026-11-13.md` — estado anterior.

## 9. Riesgos y pendientes — orden recomendado
1. **Smoke test en producción** del merge PR #6: animación visible al activarla y pausable, sin afectar mobile; colores aplicados en tarjetas; imágenes completas en modal; scroll y filtros estables. Comprobar que producción corresponde al commit esperado.
2. **QA de seguridad**: segundo usuario admin (cada integrante con su propia cuenta), usuario autenticado sin permiso no puede editar, lectura anónima de borradores prohibida, reglas Firestore verificadas. No compartir contraseñas ni documentos de credenciales.
3. **QA editorial completo**: crear/editar/publicar/guardar borrador/eliminar; comprobar validaciones y avisos; revisar URLs inválidas y media rotos.
4. **Depurar demo fallback / estado vacío**: evitar que la web presente contenido ficticio cuando se borran todos los trabajos o Firestore falla; distinguir explícitamente modo demo y errores de red. No ocultar fallos críticos tras datos ilustrativos.
5. **Multimedia**: definir almacenamiento de imágenes propias y estrategia para videos (URLs externas vs hosting propio), estimar cuotas/costos antes de activar Firebase Storage/Blaze.
6. **Rendimiento**: revisar optimización y dimensionamiento de imágenes; `<img>` genera warning de Next y puede afectar LCP, elegir estrategia `next/image`/loader compatible con URLs de terceros cuando se conozcan orígenes.
7. **Dependencias/seguridad**: `npm audit` reportó 12 vulnerabilidades totales (7 moderadas, 5 altas); `npm audit --omit=dev` reportó 6 (1 moderada, 5 altas). Cadenas conocidas `@firebase/firestore` → `@grpc/grpc-js@1.9.16`, `next@15.5.29` → `postcss@8.4.31`. No aplicar `npm audit fix --force` a ciegas. Revisar versiones y mitigaciones con pruebas.
8. **Vercel**: eventualmente consolidar proyectos duplicados, manteniendo el dominio correcto y configuración; no eliminar sin auditoría.
9. **Git local**: después de merge remoto, verificar `git status`, rama y respaldo `git stash list` antes de pull; existían cambios locales y stash previo de `next.config.ts`, dependencias, `public/web_old.html` y `src/lib/firebase/`. **No aplicar stash a ciegas ni borrar archivos sin inspección**.
10. **Actualizar este documento** al cerrar cada módulo y agregar contenido auténtico del equipo.

## 10. Criterios de cierre
- **Probado**: login, publicación, lectura pública, filtros, borrador oculto y eliminación (confirmado por el usuario).
- **Implementado/compilado**: animaciones con toggle, fit y colores, alertas; merge #6 exitoso y Vercel reporta success. Falta validación humana final de estos cambios en producción.
- **Pendiente**: pruebas negativas de seguridad, segundo usuario, almacenamiento, contenido definitivo, performance y dependencias.
- **Próxima sesión:** empezar por probar juntos el Hero animado + cards/visor en producción; no reabrir el diseño aprobado si funciona.
