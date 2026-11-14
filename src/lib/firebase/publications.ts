import type { DocumentData } from 'firebase/firestore';
import type { PortfolioItem, MediaAsset, WorkCategory } from '@/lib/portfolio';

const categories = ['Reels', 'Campañas', 'Eventos', 'Contenido'] as const;
const accents = ['violet', 'coral', 'lime', 'blue'] as const;

export function safePortfolioItem(id: string, value: DocumentData): PortfolioItem | null {
  if (typeof value.title !== 'string' || !categories.includes(value.category as WorkCategory)) return null;
  if (typeof value.description !== 'string' || typeof value.platform !== 'string' || typeof value.role !== 'string') return null;
  if (!Array.isArray(value.media) || value.media.length < 1) return null;

  const media = value.media.filter((entry: unknown): entry is MediaAsset => {
    if (!entry || typeof entry !== 'object') return false;
    const asset = entry as Record<string, unknown>;
    return (asset.type === 'image' || asset.type === 'video') &&
      typeof asset.alt === 'string' &&
      (asset.src === undefined || typeof asset.src === 'string') &&
      (asset.poster === undefined || typeof asset.poster === 'string');
  });
  if (!media.length) return null;

  return {
    id,
    title: value.title,
    category: value.category,
    platform: value.platform,
    description: value.description,
    role: value.role,
    accent: accents.includes(value.accent) ? value.accent : 'violet',
    media,
    published: value.published === true,
    sourceUrl: typeof value.sourceUrl === 'string' ? value.sourceUrl : undefined,
  };
}
