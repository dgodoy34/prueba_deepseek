'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clapperboard, Images, Megaphone, Play, Radio, X } from 'lucide-react';
import { portfolioCategories, portfolioItems, type PortfolioCategory, type PortfolioItem, type WorkCategory, type MediaAsset } from '@/lib/portfolio';

const theme: Record<PortfolioItem['accent'], { gradient: string; subtle: string }> = {
  violet: { gradient: 'from-[#e4d7ff] to-[#b49af8]', subtle: 'bg-[#ebe2ff]' },
  coral: { gradient: 'from-[#ffd9c9] to-[#fdab98]', subtle: 'bg-[#ffdfd0]' },
  lime: { gradient: 'from-[#def4bb] to-[#a7db82]', subtle: 'bg-[#e5f5d2]' },
  blue: { gradient: 'from-[#d5ecff] to-[#9fc5ef]', subtle: 'bg-[#d9eafe]' },
};
const categoryIcons = { Reels: Clapperboard, Campañas: Megaphone, Eventos: Radio, Contenido: Images };
const categories: WorkCategory[] = ['Reels', 'Campañas', 'Eventos', 'Contenido'];

function PreviewMedia({ item, media, large = false }: { item: PortfolioItem; media: MediaAsset; large?: boolean }) {
  const Icon = categoryIcons[item.category];
  if (media.type === 'video' && media.src) {
    return <video key={media.src} src={media.src} poster={media.poster} controls={large} preload="metadata" playsInline className="h-full w-full object-contain" aria-label={media.alt}/>;
  }
  if (media.type === 'image' && media.src) {
    return <img src={media.src} alt={media.alt} className="h-full w-full object-cover" loading="lazy"/>;
  }
  return <div className={`flex h-full w-full flex-col items-center justify-center gap-5 bg-gradient-to-br ${theme[item.accent].gradient} px-5 text-center`}>
    <span className="grid h-24 w-24 place-items-center rounded-[2rem] bg-white/35 shadow-sm transition-transform group-hover:scale-105"><Icon size={53} strokeWidth={1.4}/></span>
    <span className="max-w-[14rem] text-sm font-extrabold leading-relaxed text-ink/70">{large ? media.alt : 'Formato de ejemplo'}</span>
  </div>;
}

function MediaViewer({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const count = item.media.length;
  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => { document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), video[controls]'));
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }
      if (event.key === 'ArrowRight') setIndex(i => (i + 1) % count);
      if (event.key === 'ArrowLeft') setIndex(i => (i - 1 + count) % count);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [count, onClose]);
  const media = item.media[index];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#16101f]/90 p-3 backdrop-blur-sm md:p-6"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="work-dialog-title" aria-describedby="work-dialog-description"
        className="relative grid max-h-[92dvh] w-full max-w-5xl overflow-y-auto rounded-[1.7rem] bg-[#fffdf9] text-ink shadow-2xl lg:grid-cols-[minmax(0,1.1fr)_minmax(310px,.9fr)]">
        <div className={`relative flex min-h-[330px] items-center justify-center overflow-hidden ${theme[item.accent].subtle} lg:min-h-[560px]`}>
          <div className={`group mx-auto w-full ${item.category === 'Reels' ? 'max-w-[320px] aspect-[9/16]' : 'aspect-[4/3]'} overflow-hidden rounded-2xl shadow-soft`}>
            <PreviewMedia item={item} media={media} large/>
          </div>
          {count > 1 && <>
            <button type="button" onClick={() => setIndex(i => (i - 1 + count) % count)} aria-label="Contenido anterior" className="absolute left-3 top-1/2 rounded-full bg-white/90 p-3 shadow-soft transition hover:scale-105"><ArrowLeft size={19}/></button>
            <button type="button" onClick={() => setIndex(i => (i + 1) % count)} aria-label="Contenido siguiente" className="absolute right-3 top-1/2 rounded-full bg-white/90 p-3 shadow-soft transition hover:scale-105"><ArrowRight size={19}/></button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/85 px-3 py-2" aria-label={`Elemento ${index + 1} de ${count}`}>
              {item.media.map((asset, i) => <button type="button" key={i} onClick={() => setIndex(i)} aria-label={`Ver contenido ${i + 1}: ${asset.alt}`} aria-current={index === i ? 'true' : undefined} className={`h-2 rounded-full transition-all ${index === i ? 'w-6 bg-lilac' : 'w-2 bg-ink/25'}`}/>)}
            </div>
          </>}
        </div>
        <div className="relative flex flex-col p-6 md:p-9">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full bg-[#eee7ff] px-4 py-2 text-xs font-black">{item.category} · {item.platform}</span>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar publicación" className="rounded-full border border-ink/15 p-2 transition hover:bg-ink/10"><X size={21}/></button>
          </div>
          <div className="mt-9">
            <p className="section-kicker">DENTRO DEL STUDIO</p>
            <h3 id="work-dialog-title" className="text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">{item.title}</h3>
            <p id="work-dialog-description" className="mt-5 text-base leading-7 text-ink/70">{item.description}</p>
            <div className="mt-7 border-t border-ink/10 pt-6"><p className="text-xs font-extrabold uppercase tracking-widest text-lilac">Qué hacemos</p><p className="mt-2 font-semibold">{item.role}</p></div>
            {!item.published && <p className="mt-7 rounded-2xl border border-ink/10 bg-[#f5f0ff] p-4 text-sm leading-6 text-ink/65">Vista de ejemplo. Cuando recibamos el material real, esta ficha mostrará el video o la galería correspondiente.</p>}
          </div>
          {item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 self-start text-sm font-extrabold text-lilac hover:underline">Ver publicación original <ArrowUpRight size={17}/></a>}
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory>('Todos');
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const visible = portfolioItems.filter(item => filter === 'Todos' || item.category === filter);

  const choose = (category: PortfolioCategory) => {
    setFilter(category);
    requestAnimationFrame(() => feedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  return <section id="portfolio" className="scroll-mt-24 bg-[#fffdf9] py-20 md:py-28">
    <div className="shell">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="section-kicker">PORTFOLIO CREATIVO</p><h2 className="section-title max-w-3xl">Ideas para ver. <span className="text-lilac">Historias para contar.</span></h2></div>
        <p className="max-w-sm text-sm leading-7 text-ink/65">Una mirada al universo de formatos que creamos. Elegí una categoría y explorá el feed.</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5" aria-label="Categorías de trabajos">
        {categories.map(category => {
          const first = portfolioItems.find(item => item.category === category)!;
          const Icon = categoryIcons[category];
          const count = portfolioItems.filter(item => item.category === category).length;
          return <button type="button" key={category} onClick={() => choose(category)} aria-pressed={filter === category}
            className={`group relative flex min-h-[165px] flex-col justify-between overflow-hidden rounded-[1.7rem] border-2 p-5 text-left transition-all hover:-translate-y-1 md:min-h-[205px] md:p-6 ${filter === category ? 'border-ink shadow-[6px_7px_0_#211b2e]' : 'border-transparent hover:border-ink/20'} bg-gradient-to-br ${theme[first.accent].gradient}`}>
            <div className="flex items-start justify-between"><Icon size={30} strokeWidth={1.5}/><ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" size={21}/></div>
            <div><h3 className="text-xl font-extrabold tracking-tight md:text-2xl">{category}</h3><p className="mt-1 text-xs font-semibold text-ink/65">{count} ejemplos de formato</p></div>
          </button>;
        })}
      </div>

      <div ref={feedRef} className="scroll-mt-28 pt-16">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="section-kicker">EXPLORÁ EL FEED</p><h3 className="text-3xl font-extrabold tracking-tight md:text-4xl">{filter === 'Todos' ? 'Dentro de nuestro universo' : `Explorando ${filter}`}</h3></div>
          <span className="rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-bold">{visible.length} {visible.length === 1 ? 'formato' : 'formatos'} de muestra</span>
        </div>
        <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Filtrar publicaciones">
          {portfolioCategories.map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}
            className={`rounded-full border px-4 py-2 text-sm font-extrabold transition-colors ${filter === category ? 'border-ink bg-ink text-white' : 'border-ink/15 bg-white hover:border-lilac hover:text-lilac'}`}>{category}</button>)}
        </div>
        <div className="mt-8 grid grid-cols-2 items-stretch gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {visible.map(item => {
            const firstMedia = item.media[0];
            return <button key={item.id} type="button" onClick={() => setActive(item)} aria-label={`Abrir ${item.title}`}
              className="group overflow-hidden rounded-[1.5rem] border border-ink/10 bg-white text-left shadow-soft transition-all hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lilac">
              <div className="relative aspect-[4/5] overflow-hidden">
                <PreviewMedia item={item} media={firstMedia}/>
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-black uppercase">{item.category}</span>
                <span className="absolute right-3 top-3 rounded-full bg-white/90 p-2">{firstMedia.type === 'video' ? <Play size={15}/> : <Images size={15}/>}</span>
                {item.media.length > 1 && <span className="absolute bottom-3 right-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-bold text-white">{item.media.length} piezas</span>}
              </div>
              <div className="p-4 md:p-5"><p className="text-[11px] font-bold uppercase tracking-wider text-lilac">{item.platform}</p><h4 className="mt-2 text-base font-extrabold leading-snug md:text-lg">{item.title}</h4><p className="mt-2 line-clamp-2 text-xs leading-5 text-ink/65 sm:text-sm">{item.description}</p></div>
            </button>;
          })}
        </div>
        <p className="mt-6 rounded-xl border border-ink/10 bg-[#f5f0ff] px-4 py-3 text-sm text-ink/70">Boceto interactivo: estas publicaciones son ejemplos de formato, no trabajos reales. Se reemplazarán por material del equipo antes de presentar el portfolio definitivo.</p>
      </div>
    </div>
    {active && <MediaViewer key={active.id} item={active} onClose={() => setActive(null)}/>}
  </section>;
}
