# SOCIAL STUDIO — ESTADO Y ROADMAP DE CONTINUIDAD
**Corte:** 13 de noviembre de 2026  
**Proyecto:** Landing y portfolio de Social Media Manager (equipo de dos personas)  
**Estado:** Página pública en refinamiento/QA; administrador todavía no implementado.  
**Criterio de trabajo:** completar y probar un módulo antes de comenzar el siguiente; preservar el diseño visual aprobado.

## 1. Identidad, alcance y stack
- Landing/portfolio juvenil, fresco, amigable, colorido, con paleta violeta, durazno, lima, azul y fondos cálidos. El equipo aprobó la estética actual: **no rediseñar ni volver al viejo estilo oscuro**.
- Next.js **15.5.29** (App Router), TypeScript, React, Tailwind **3.4.17**, Vercel, Git/GitHub.
- Firebase **12.1.0** instalado localmente como preparación para un futuro administrador, pero **sin integración funcional aún**.
- Aplicación pública: https://mercarg.vercel.app
- Repositorio: https://github.com/dgodoy34/prueba_deepseek
- Rama de trabajo de cambios visuales y portfolio: `feat/portfolio-resultados-x`.
- Pull Request de integración a `main`: https://github.com/dgodoy34/prueba_deepseek/pull/1 . **No asumir que ya se fusionó ni que el dominio público refleja la rama.**

## 2. Página pública desarrollada
### Navegación / Header
- Logo «social studio.» y menú para Qué hacemos, Portfolio, Resultados, Plataformas y Nuestra forma.
- Menú responsive con botón hamburguesa para mobile y pantallas intermedias.

### Hero
- Titular: «Que tu marca se haga notar.»
- Bajada de presentación del equipo y llamada principal **«Explorá los trabajos»** con ancla al portfolio; CTA secundario «Descubrí qué hacemos».
- Ilustración propia tipo tarjeta de red social y elementos decorativos; fondo cálido.
- Ajustes realizados el 13/11 a partir de capturas reales de celular: menos espaciado vertical, texto y CTA más compactos, ilustración hasta **330 px** en mobile, elementos internos reducidos, stickers **GOOD VIBES** y **¡Esto funciona!** ocultos en pantallas pequeñas; hashtags ocultos en mobile.
- **Validación del usuario:** pantalla grande se ve muy bien; última captura en celular: «ahora quedó mejor». Considerar el Hero **aprobado visualmente**; todavía corresponde prueba funcional en tamaños pequeños y descartar overflow horizontal.

### Servicios
- Tarjetas interactivas desplegables y contenido en `src/lib/content.ts`.

### Portfolio / Feed
- Categorías: **Reels, Campañas, Eventos, Contenido**.
- Grilla de categorías que filtra un feed de trabajos; botones para alternar «Todos» y cada categoría.
- Tarjetas con miniatura, plataforma, título y descripción.
- Visor modal para galerías, fotos y videos; navegación con flechas y teclado, cierre con Escape, foco gestionado.
- **Los registros actuales son ilustrativos**, no atribuirlos como trabajos reales. Sustituir con material auténtico antes de presentación comercial definitiva.
- No inventar likes, comentarios, publicaciones ni nombres de clientes.
- Ajustes responsive de grilla y modal sobre `src/components/portfolio.tsx`.

### Resultados reales de X (12 meses)
- Impresiones: **12,2 M**
- Tasa de interacción: **5,6 %**
- Interacciones: **684,7 K**
- Visitas al perfil: **42,2 K**
- Respuestas: **5,3 K**
- Me gusta: **551,1 K**
- Reposts: **60,9 K**
- Marcadores: **18,5 K**
- Compartidos: **6,4 K**
- En el módulo de resultados/caso de éxito. **No inventar el enlace a la cuenta gestionada**: está pendiente de recibir del equipo.

### Plataformas, enfoque y cierre
- Selector visual de plataformas con conceptos ilustrativos claramente identificados.
- Bloque «Así trabajamos»: Escuchamos, Creamos, Conversamos, Aprendemos.
- Footer y navegación de vuelta al inicio.
- Orden de secciones: **Header → Hero → Ticker → Servicios → Portfolio → Resultados → Plataformas → Enfoque → Footer**.

### Botones flotantes
- WhatsApp flotante con número configurado mediante `NEXT_PUBLIC_WHATSAPP_NUMBER` (internacional, solo dígitos), **número comercial todavía no suministrado**. Sin número, botón muestra aviso informativo en lugar de inventar enlace.
- «Al cielo» retorna al inicio.
- En mobile ambos son **solo íconos**; «Al cielo» aparece tras ~**700 px** de scroll.
- El botón **negro lateral** visto en capturas parece corresponder a widget/herramienta externa, no a estos componentes; identificar su procedencia si interfiere.

## 3. Archivos principales
- `src/app/page.tsx`: renderiza SocialLanding.
- `src/components/social-landing.tsx`: Header, Hero, Ticker, Services, Platforms, Approach y composición.
- `src/components/portfolio.tsx`: feed, filtros, tarjetas y modal multimedia.
- `src/components/results.tsx`: métricas verificadas de X.
- `src/components/floating-actions.tsx`: WhatsApp y botón Al cielo.
- `src/lib/content.ts`: contenido de servicios/plataformas.
- `src/lib/portfolio.ts`: datos mock y modelo de portfolio.
- `src/app/globals.css` y `tailwind.config.js`: estilos y configuración.
- `.env.example`: ejemplo de variable de WhatsApp.

## 4. Firebase — exploración efectuada, sin implementación de admin
- Firebase existente a reciclar: **marketplace-app**, ID `marketplace-app-ae060`.
- Authentication tiene cuentas de la aplicación antigua; usuario confirmó que **pueden eliminarse**, pero no se ha documentado su eliminación efectiva.
- Firestore conserva colecciones antiguas: `users`, `orders`, `products`, `carts`, `adminSettings`; no asumir que se borraron.
- **Hallazgo crítico en reglas heredadas:** `/users/{userId}` permitía a cada usuario escribir su documento completo, incluso `role`; la función `hasRole('admin')` confía en ese campo. **No exponer un admin conectado sin cerrar esta elevación de privilegios**.
- Storage sin configurar; consola pide actualizar plan para usarlo. Decisión funcional: **enfoque híbrido**, enlaces externos a Instagram/TikTok/YouTube y alojamiento de imágenes propias; evaluar costo/servicio de hosting de imágenes y videos exclusivos antes de habilitar facturación.
- Propuesta arquitectónica (NO creada): ámbito `socialStudio` separado del marketplace, usuarios administradores con autorización robusta (claims asignados en backend o equivalente), colecciones de proyectos, publicaciones, métricas, configuración; estados `draft`/`published` y solo datos publicados accesibles al público.
- **Objetivo del admin:** dos cuentas independientes para integrantes del estudio, login protegido, CRUD de proyectos y publicaciones, fotos, galerías, reels y casos de éxito, previsualización y publicación.
- No existe todavía `/admin/login` ni panel CRUD completado.

## 5. Dependencias y auditoría (pendientes)
- En entorno local: Node **22.14.0**, npm **10.9.2**.
- Instalación inicial de `firebase` reciente emitió `EBADENGINE` por requerir Node 24.12+.
- Se fijó `firebase@12.1.0` con `--save-exact`; compiló correctamente con Next 15.5.29, TypeScript y lint.
- `npm install --package-lock-only --engine-strict` sin errores de engine.
- `npm audit` reportó **12 vulnerabilidades (7 moderadas, 5 altas)** totales; `npm audit --omit=dev`: **6 (1 moderada, 5 altas)**.
- Árbol observado:
  - `firebase@12.1.0` → `@firebase/firestore@4.9.0` → `@grpc/grpc-js@1.9.16` (avisos de seguridad).
  - `next@15.5.29` → `postcss@8.4.31` (avisos de seguridad).
  - PostCSS de raíz `8.5.32`.
- **No usar `npm audit fix --force`**: proponía migraciones mayores incompatibles (Next 16 y Firebase 9). Evaluar upgrades/overrides en rama con pruebas de build y funcionales; no afirmar que las vulnerabilidades ya fueron corregidas.
- Build local mostraba advertencia por otro `C:\Users\DIEGO\package-lock.json` que Next detecta como workspace root; analizar configuración `outputFileTracingRoot` sin borrar archivos ajenos al proyecto.
- No asumir que los cambios de `npm install` locales fueron commiteados a GitHub.

## 6. GitHub y Vercel — precauciones
- Local del proyecto: `~/Documents/GitHub/social-media`.
- Historial: hubo un incidente anterior por raíz Git situada en un directorio superior que incluyó contenido de otro proyecto. La raíz correcta debe ser la carpeta `social-media`; verificar `git rev-parse --show-toplevel`, `git remote -v` antes de cambios o push.
- Mantener `main` estable. Cambios visuales en `feat/portfolio-resultados-x`; PR #1 pendiente de revisión/fusión.
- Hay **dos proyectos Vercel vinculados** (`prueba-deepseek` y `social-media`) con estados de preview que pueden diferir. Confirmar build del proyecto que efectivamente sirve el preview antes de afirmar publicación.
- No fusionar sin probar escritorio/mobile y build.

## 7. Validación y estado de aceptación
| Área | Estado |
| --- | --- |
| Identidad visual y desktop | Aprobado visualmente por usuario |
| Hero mobile | Aprobado visualmente tras cambios 13/11, pendiente QA de overflow/responsividad extrema |
| Portfolio interactivo | Implementado con ejemplos; faltan trabajos reales y QA final |
| Métricas X | Incorporadas con cifras reales; enlace de fuente/cuenta pendiente |
| WhatsApp | Control implementado; falta número comercial |
| Admin Firebase | No implementado |
| Firestore reglas seguras | Pendiente — bloqueo de seguridad |
| Storage | No habilitado |
| Integración a main | Pendiente PR #1 |
| Producción final con todos los cambios | No confirmado |

## 8. Próximos pasos — orden acordado
1. **Cerrar QA de página pública**: revisar en celular (incluyendo 320–390 px), tablet y escritorio; grilla de portfolio, modal/galerías, navegación, CTA, botones flotantes, overflow y accesibilidad.
2. **Cargar trabajos reales** en portfolio: nombres autorizados, portadas, reels/enlaces, galerías, copy; eliminar gradualmente ejemplos y avisos de boceto; conseguir enlace auténtico a caso X.
3. **Revisar PR #1, checks Vercel y fusionar a main** solo una vez aprobado; comprobar `mercarg.vercel.app`.
4. **Retomar Firebase**: seguridad Firestore antigua, limpieza controlada, autorización de dos administradores, variables de entorno y login protegido; resolver auditoría de dependencias antes de exponer funcionalidad administrativa.
5. **CRUD del administrador** para proyectos/publicaciones, borradores/publicados, multimedia híbrida y lectura pública de contenido aprobado.
6. **Pruebas integrales, despliegue y documentación** del flujo editorial.

## 9. Decisiones que no debemos olvidar
- La página debe ser una **vidriera profesional** para productoras/marcas, no una red social real.
- No inventar publicaciones, clientes, seguidores ni resultados.
- No sobrecargar mobile con stickers, chips y botones flotantes.
- Conservar **diseño de escritorio aprobado** al corregir mobile.
- No hardcodear teléfonos ni secretos. La configuración web de Firebase no equivale a autorización.
- No comenzar nuevas funcionalidades mientras portfolio y QA pública estén inconclusos.
- No confundir **implementado**, **probado**, **aprobado visualmente**, **pendiente** y **desplegado**.

---
**Última revisión:** 13/11/2026. Documento de continuidad; requiere actualizarse tras cada etapa validada.
