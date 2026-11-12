export const platforms = [
  { id: 'instagram', name: 'Instagram', format: 'Reels, historias y comunidad', sample: 'Una historia que merece quedarse en tu feed.', tag: 'VISUAL + CERCANO', color: 'coral' },
  { id: 'tiktok', name: 'TikTok', format: 'Videos cortos y tendencias', sample: 'POV: tu marca se anima a hablar como una persona.', tag: 'CREATIVO + ÁGIL', color: 'purple' },
  { id: 'linkedin', name: 'LinkedIn', format: 'Ideas, marca y conversación', sample: 'Buenas ideas. Conversaciones que generan oportunidades.', tag: 'VALOR + CONEXIÓN', color: 'blue' },
  { id: 'x', name: 'X / Twitter', format: 'Cobertura y actualidad', sample: 'Lo que pasa ahora también puede ser una conversación de marca.', tag: 'TIEMPO REAL', color: 'dark' },
  { id: 'youtube', name: 'YouTube', format: 'Shorts y contenido que perdura', sample: 'Hay historias que necesitan más de 15 segundos.', tag: 'STORYTELLING', color: 'yellow' },
] as const;

export const services = [
  { number: '01', title: 'Comunidades con personalidad', tag: 'Community management', description: 'Escuchar, responder, moderar y hacer que cada interacción tenga sentido.', details: ['Gestión de mensajes y comentarios', 'Moderación y escucha activa', 'Construcción de comunidad'], bg: 'lavender' },
  { number: '02', title: 'Contenido que conecta', tag: 'Estrategia creativa', description: 'Ideas con propósito, formatos para cada red y una voz que la gente reconozca.', details: ['Pilares y calendario editorial', 'Guiones, copies y storytelling', 'Adaptación por plataforma'], bg: 'peach' },
  { number: '03', title: 'Tendencias al instante', tag: 'Real time', description: 'Convertimos lo que está pasando en oportunidades relevantes para la marca.', details: ['Cobertura de eventos en vivo', 'Social listening', 'Respuestas ágiles y trendjacking'], bg: 'lime' },
  { number: '04', title: 'Datos sin vueltas', tag: 'Analytics', description: 'Medimos lo que importa para aprender, mejorar y tomar decisiones más inteligentes.', details: ['KPIs según objetivos', 'Reportes y aprendizajes', 'Optimización continua'], bg: 'sky' },
] as const;
