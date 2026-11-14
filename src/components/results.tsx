import { ArrowUpRight, ChartNoAxesCombined } from 'lucide-react';
import { xCaseStudy } from '@/lib/portfolio';

export function Results() {
  const featured = xCaseStudy.metrics.slice(0, 4);
  const other = xCaseStudy.metrics.slice(4);

  return (
    <section id="resultados" className="scroll-mt-24 bg-[#d8f1bd] py-20 md:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.06fr]">
        <div>
          <p className="section-kicker">EL IMPACTO IMPORTA</p>
          <h2 className="section-title">Más que likes, <span className="underline decoration-[#8aca86] decoration-[9px] underline-offset-[9px]">resultados reales.</span></h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-ink/75">Una comunidad en X, contenido y millones de impresiones. Estos son los resultados propios de los últimos 12 meses.</p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-4 py-2 text-xs font-extrabold">
            <ChartNoAxesCombined size={17}/> Caso de éxito · X · Últimos 12 meses
          </div>
          {xCaseStudy.accountUrl && <a href={xCaseStudy.accountUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-extrabold text-lilac hover:underline">Visitar cuenta en X <ArrowUpRight size={18}/></a>}
        </div>
        <div className="rounded-[2.5rem] border-2 border-ink bg-[#fffdf9] p-6 shadow-[11px_12px_0_#211b2e] md:p-9">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-3"><span className="text-base font-extrabold">Resultados en X</span><span className="rounded-full bg-[#e6ddff] px-3 py-1 text-xs font-black">12 MESES</span></div>
          <div className="grid grid-cols-2 gap-3">
            {featured.map((metric) => <div key={metric.label} className="rounded-2xl bg-[#f1ebfa] p-4"><p className="text-[11px] font-bold text-ink/65">{metric.label}</p><p className="mt-2 text-[clamp(1.5rem,3vw,2.2rem)] font-black tracking-tight">{metric.value}</p></div>)}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-ink/10 pt-6 sm:grid-cols-3">
            {other.map((metric) => <div key={metric.label}><p className="text-xl font-black">{metric.value}</p><p className="mt-1 text-xs text-ink/60">{metric.label}</p></div>)}
          </div>
          <p className="mt-6 text-xs leading-5 text-ink/55">Fuente: captura de analítica facilitada por el equipo. Resultados de su cuenta en X durante los últimos 12 meses.</p>
        </div>
      </div>
    </section>
  );
}
