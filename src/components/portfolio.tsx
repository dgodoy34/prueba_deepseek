'use client';

import { useState } from 'react';
import { ArrowUpRight, Clapperboard, Megaphone, Radio, Images, Play, X } from 'lucide-react';
import { portfolioCategories, portfolioItems, type PortfolioItem, type PortfolioCategory } from '@/lib/portfolio';

const palette: Record<PortfolioItem['accent'], string> = {
  violet: 'from-[#e4d7ff] to-[#b49af8]',
  coral: 'from-[#ffd9c9] to-[#fdab98]',
  lime: 'from-[#def4bb] to-[#a7db82]',
  blue: 'from-[#d5ecff] to-[#9fc5ef]',
};

const icons = { Reels: Clapperboard, Campañas: Megaphone, Eventos: Radio, Contenido: Images };

export function Portfolio() {
  const [filter, setFilter] = useState<PortfolioCategory>('Todos');
  const [active, setActive] = useState<PortfolioItem | null>(null);
  const items = portfolioItems.filter((item) => filter === 'Todos' || item.category === filter);

  return (
    <section id="portfolio" className="scroll-mt-24 bg-[#fffdf9] py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-kicker">PORTFOLIO CREATIVO</p>
            <h2 className="section-title max-w-3xl">Ideas para ver. <span className="text-lilac">Historias para contar.</span></h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-ink/65">Explorá los formatos que desarrollamos. Próximamente vas a encontrar acá piezas, campañas y coberturas reales.</p>
        </div>

        <div className="mt-9 flex flex-wrap gap-2" role="group" aria-label="Filtrar formatos del portfolio">
          {portfolioCategories.map((category) => (
            <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}
              className={`rounded-full border px-5 py-2.5 text-sm font-extrabold transition-colors ${filter === category ? 'border-ink bg-ink text-white' : 'border-ink/15 bg-white text-ink hover:border-lilac hover:text-lilac'}`}>
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = icons[item.category];
            return (
              <button key={item.id} type="button" onClick={() => setActive(item)}
                className="group overflow-hidden rounded-[2rem] border border-ink/10 bg-white text-left shadow-soft transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lilac"
                aria-label={`Ver formato: ${item.title}`}>
                <div className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-gradient-to-br ${palette[item.accent]} p-6`}>
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-black uppercase tracking-wide">{item.category}</span>
                    <ArrowUpRight size={23} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"/>
                  </div>
                  <div className="grid place-items-center">
                    {item.imageUrl ? <img src={item.imageUrl} alt={item.title} className="absolute inset-0 h-full w-full object-cover" /> : <Icon className="h-20 w-20 opacity-80 transition-transform group-hover:scale-110" strokeWidth={1.5}/>}
                    {item.videoUrl && <Play className="absolute h-10 w-10 fill-current text-white" aria-hidden="true"/>}
                  </div>
                  <span className="relative text-xs font-bold text-ink/70">{item.published ? item.platform : 'Formato de ejemplo'}</span>
                </div>
                <div className="p-5"><h3 className="text-lg font-extrabold leading-snug">{item.title}</h3><p className="mt-2 text-sm leading-6 text-ink/65">{item.description}</p></div>
              </button>
            );
          })}
        </div>
        <p className="mt-5 text-xs text-ink/55">Las tarjetas muestran categorías y ejemplos de formato; no representan campañas publicadas ni resultados atribuidos.</p>
      </div>

      {active && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/75 p-4" onMouseDown={() => setActive(null)} role="presentation">
        <div role="dialog" aria-modal="true" aria-labelledby="portfolio-dialog-title" className="w-full max-w-lg rounded-[2rem] bg-[#fffdf9] p-7 shadow-2xl md:p-10" onMouseDown={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between"><span className="rounded-full bg-[#e4d7ff] px-4 py-2 text-xs font-black">{active.category} · {active.platform}</span><button onClick={() => setActive(null)} aria-label="Cerrar detalle" className="rounded-full border border-ink/15 p-2"><X size={20}/></button></div>
          <h3 id="portfolio-dialog-title" className="mt-8 text-3xl font-extrabold tracking-tight">{active.title}</h3>
          <p className="mt-4 leading-7 text-ink/70">{active.description}</p>
          {active.videoUrl ? <video controls preload="metadata" className="mt-6 w-full rounded-xl" src={active.videoUrl}/> : active.imageUrl ? <img src={active.imageUrl} alt={active.title} className="mt-6 w-full rounded-xl object-cover"/> : <div className="mt-7 rounded-2xl border border-dashed border-ink/20 bg-[#eee9fa] p-6 text-sm text-ink/70">Este espacio está preparado para incorporar el material real: video, imágenes, descripción y resultados.</div>}
        </div>
      </div>}
    </section>
  );
}
