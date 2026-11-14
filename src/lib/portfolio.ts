export type PortfolioCategory = 'Todos' | 'Reels' | 'Campañas' | 'Eventos' | 'Contenido';
export type PortfolioItem = {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'Todos'>;
  platform: string;
  description: string;
  accent: 'violet' | 'coral' | 'lime' | 'blue';
  imageUrl?: string;
  videoUrl?: string;
  published: boolean;
};

export const portfolioCategories: PortfolioCategory[] = ['Todos', 'Reels', 'Campañas', 'Eventos', 'Contenido'];

// Plantillas de formatos, NO trabajos publicados. Cuando recibamos el material
// real, completar imagen/video, descripción y cambiar published a true.
export const portfolioItems: PortfolioItem[] = [
  { id: 'reels', title: 'Reels que cuentan historias', category: 'Reels', platform: 'Instagram · TikTok', description: 'Guion, edición y narrativa para video vertical.', accent: 'coral', published: false },
  { id: 'campanas', title: 'Campañas con identidad', category: 'Campañas', platform: 'Multiplataforma', description: 'Ideas pensadas para marcas y audiencias específicas.', accent: 'violet', published: false },
  { id: 'eventos', title: 'El minuto a minuto', category: 'Eventos', platform: 'X · Eventos en vivo', description: 'Cobertura, contenidos ágiles y conversación en tiempo real.', accent: 'blue', published: false },
  { id: 'contenido', title: 'Formatos que conectan', category: 'Contenido', platform: 'Instagram · X · LinkedIn', description: 'Carruseles, piezas editoriales y adaptación por canal.', accent: 'lime', published: false },
];

export const xCaseStudy = {
  title: 'Comunidad y contenido en X',
  period: 'Últimos 12 meses',
  accountUrl: null as string | null, // Pendiente de confirmar el enlace de la cuenta
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
