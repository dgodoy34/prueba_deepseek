export type PortfolioCategory = 'Todos' | 'Reels' | 'Campañas' | 'Eventos' | 'Contenido';
export type WorkCategory = Exclude<PortfolioCategory, 'Todos'>;
export type MediaAsset = { type: 'image' | 'video'; src?: string; poster?: string; alt: string };
export type PortfolioItem = {
  id: string;
  title: string;
  category: WorkCategory;
  platform: string;
  description: string;
  role: string;
  accent: 'violet' | 'coral' | 'lime' | 'blue';
  media: MediaAsset[];
  featured?: boolean;
  published: boolean;
  sourceUrl?: string;
};

export const portfolioCategories: PortfolioCategory[] = ['Todos', 'Reels', 'Campañas', 'Eventos', 'Contenido'];

/**
 * Datos editoriales de DEMOSTRACIÓN. NO representan trabajos efectivamente realizados.
 * El portfolio usa un contrato de contenido reutilizable: Firebase reemplazará esta
 * fuente, sin cambiar la estructura visual de las tarjetas o del visor.
 */
export const portfolioItems: PortfolioItem[] = [
  { id: 'reel-formato-vertical', title: 'Historias en vertical', category: 'Reels', platform: 'Instagram · TikTok', description: 'Un concepto de video corto que combina ritmo, edición y mensaje.', role: 'Guion, edición y storytelling', accent: 'coral', featured: true, published: false, media: [{ type: 'video', alt: 'Vista previa de reel vertical' }] },
  { id: 'campana-concepto', title: 'Ideas que se vuelven campaña', category: 'Campañas', platform: 'Multiplataforma', description: 'Un universo visual pensado para adaptarse a diferentes canales.', role: 'Concepto creativo y adaptación', accent: 'violet', featured: true, published: false, media: [{ type: 'image', alt: 'Concepto creativo, pieza principal' }, { type: 'image', alt: 'Adaptación de campaña para redes' }, { type: 'image', alt: 'Tercera pieza de campaña' }] },
  { id: 'evento-vivo', title: 'El minuto a minuto', category: 'Eventos', platform: 'X · Cobertura en vivo', description: 'Seguir la conversación mientras sucede y elegir qué merece contarse.', role: 'Cobertura en tiempo real', accent: 'blue', featured: true, published: false, media: [{ type: 'image', alt: 'Cobertura de evento' }, { type: 'video', alt: 'Video de cobertura en vivo' }] },
  { id: 'contenido-carrusel', title: 'Carruseles con personalidad', category: 'Contenido', platform: 'Instagram', description: 'Una secuencia visual que atrapa, explica y deja una idea clara.', role: 'Diseño y redacción creativa', accent: 'lime', featured: true, published: false, media: [{ type: 'image', alt: 'Primera lámina del carrusel' }, { type: 'image', alt: 'Segunda lámina del carrusel' }, { type: 'image', alt: 'Tercera lámina del carrusel' }] },
  { id: 'reel-detras-de-escena', title: 'Detrás de escena', category: 'Reels', platform: 'Instagram', description: 'El proceso de producción también puede transformarse en una historia.', role: 'Grabación y montaje', accent: 'violet', published: false, media: [{ type: 'video', alt: 'Reel detrás de escena' }] },
  { id: 'reel-tendencias', title: 'Tendencias con identidad', category: 'Reels', platform: 'TikTok', description: 'Adaptación de tendencias sin perder la personalidad de la marca.', role: 'Idea, formato y edición', accent: 'lime', published: false, media: [{ type: 'video', alt: 'Reel de tendencias' }] },
  { id: 'campana-lanzamiento', title: 'Lanzamiento en movimiento', category: 'Campañas', platform: 'Instagram · X', description: 'Una campaña con piezas para generar conversación antes, durante y después.', role: 'Concepto y piezas de lanzamiento', accent: 'coral', published: false, media: [{ type: 'image', alt: 'Pieza teaser' }, { type: 'image', alt: 'Pieza de lanzamiento' }] },
  { id: 'evento-backstage', title: 'Desde el backstage', category: 'Eventos', platform: 'Instagram · X', description: 'Fotografías, historias y clips para contar lo que no se ve.', role: 'Cobertura y edición ágil', accent: 'lime', published: false, media: [{ type: 'image', alt: 'Foto del backstage' }, { type: 'image', alt: 'Momento de evento' }] },
  { id: 'contenido-editorial', title: 'Contenido editorial', category: 'Contenido', platform: 'LinkedIn · X', description: 'Diseño y textos que convierten una idea compleja en una publicación simple.', role: 'Redacción y diseño', accent: 'blue', published: false, media: [{ type: 'image', alt: 'Publicación editorial' }] },
  { id: 'reel-resumen', title: 'Lo mejor en 30 segundos', category: 'Reels', platform: 'YouTube Shorts', description: 'Una historia condensada para que cada segundo cuente.', role: 'Selección de momentos y edición', accent: 'blue', published: false, media: [{ type: 'video', alt: 'Resumen vertical de evento' }] },
  { id: 'campana-comunidad', title: 'Comunidad en primer plano', category: 'Campañas', platform: 'X · Instagram', description: 'Una idea participativa que invita a crear conversación.', role: 'Estrategia y dinámica comunitaria', accent: 'lime', published: false, media: [{ type: 'image', alt: 'Post participativo' }, { type: 'image', alt: 'Resultado visual de participación' }] },
  { id: 'contenido-historias', title: 'Historias que siguen', category: 'Contenido', platform: 'Instagram Stories', description: 'Una serie de piezas breves que construyen una narrativa.', role: 'Guion visual y piezas sociales', accent: 'coral', published: false, media: [{ type: 'image', alt: 'Historia inicial' }, { type: 'image', alt: 'Historia de continuidad' }] },
];

export const xCaseStudy = {
  title: 'Comunidad y contenido en X',
  period: 'Últimos 12 meses',
  accountUrl: null as string | null,
  metrics: [
    { label: 'Impresiones', value: '12.2M' },
    { label: 'Tasa de interacción', value: '5.6%' },
    { label: 'Interacciones', value: '684.7K' },
    { label: 'Visitas al perfil', value: '42.2K' },
    { label: 'Respuestas', value: '5.3K' },
    { label: 'Me gusta', value: '551.1K' },
    { label: 'Reposts', value: '60.9K' },
    { label: 'Guardados', value: '18.5K' },
    { label: 'Compartidos', value: '6.4K' },
  ],
};
