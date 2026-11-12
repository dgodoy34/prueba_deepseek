'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart, Menu, MessageCircle, MousePointer2, Play, Sparkles, X } from 'lucide-react';
import { platforms, services } from '@/lib/content';

type PlatformId = (typeof platforms)[number]['id'];

function Header() {
  const [open, setOpen] = useState(false);
  return <nav className="sticky top-0 z-50 border-b border-ink/10 bg-canvas/90 backdrop-blur-xl" aria-label="Navegación principal">
    <div className="shell flex h-[76px] items-center justify-between gap-4">
      <a href="#inicio" className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight" aria-label="Social Studio, inicio"><span className="grid h-9 w-9 place-items-center rounded-2xl bg-lilac text-white"><Sparkles size={19}/></span>social<span className="text-lilac">studio.</span></a>
      <div className="hidden items-center gap-8 text-sm font-bold md:flex"><a href="#servicios" className="nav-link">Qué hacemos</a><a href="#plataformas" className="nav-link">Plataformas</a><a href="#enfoque" className="nav-link">Nuestra forma</a><a href="#resultados" className="nav-link">Resultados</a></div>
      <button className="rounded-xl border border-ink/15 p-2 md:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(v => !v)}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
    </div>
    {open && <div id="mobile-navigation" className="flex flex-col gap-4 border-t border-ink/10 bg-canvas px-6 py-5 text-sm font-bold md:hidden">{[['Qué hacemos','#servicios'],['Plataformas','#plataformas'],['Nuestra forma','#enfoque'],['Resultados','#resultados']].map(([label,href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}</div>}
  </nav>;
}

function Ticker() {
  const words = ['IDEAS QUE CONECTAN ✳', 'CREATIVIDAD EN MOVIMIENTO ✴', 'COMUNIDADES REALES ✳', 'UNA VOZ EN CADA PLATAFORMA ✴'];
  return <div className="overflow-hidden border-y border-ink/10 bg-[#e6ddff] py-3" aria-label="Ideas que conectan, creatividad en movimiento, comunidades reales">
    <div className="ticker-track flex w-max gap-12 whitespace-nowrap text-xs font-extrabold uppercase tracking-[.16em] text-[#5833ce]" aria-hidden="true">{[...words,...words,...words,...words].map((word,i) => <span key={i}>{word}</span>)}</div>
  </div>;
}

function Hero() {
  return <section id="inicio" className="relative overflow-hidden pt-14 pb-16 md:pt-24 md:pb-24">
    <div className="pointer-events-none absolute -right-24 top-4 h-80 w-80 rounded-full bg-[#f8e4bd] blur-3xl"/>
    <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
      <div>
        <div className="eyebrow mb-6"><span className="h-2 w-2 rounded-full bg-[#fe8769]"/> SOCIAL MEDIA, PERO CON ONDA</div>
        <h1 className="max-w-[730px] text-[clamp(3.3rem,7vw,6.8rem)] font-extrabold leading-[1.03] tracking-[-.075em]">Que tu marca <span className="relative inline-block text-lilac">se haga notar<span className="absolute -bottom-2 left-0 h-3 w-full -rotate-2 rounded-full bg-[#f5c96c]/65 -z-10"/></span><span className="text-[#fe8769]">.</span></h1>
        <p className="mt-7 max-w-xl text-base leading-8 text-ink/70 md:text-xl">Dos mentes, mil ideas y una misión: crear contenido que genere conversaciones, construya comunidad y se sienta auténtico en cada plataforma.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4"><a href="#plataformas" className="primary-link">Explorá el universo <ArrowUpRight size={18}/></a><a href="#servicios" className="inline-flex items-center gap-2 text-sm font-extrabold hover:text-lilac">Descubrí qué hacemos <ArrowDown size={17}/></a></div>
        <div className="mt-12 flex flex-wrap gap-2 text-xs font-extrabold text-ink/60"><span className="chip">#SocialFirst</span><span className="chip">#Creatividad</span><span className="chip">#Multiplataforma</span></div>
      </div>
      <div className="hero-stage" aria-label="Ilustración de ideas, contenido y redes sociales">
        <div className="absolute inset-[12%_8%_9%_7%] rotate-[-7deg] rounded-[3.5rem] bg-[#bdb2fb]"/>
        <div className="absolute inset-[7%_12%_14%_10%] rotate-[6deg] rounded-[3.5rem] bg-[#ffc8b7]"/>
        <div className="absolute inset-[10%_10%_12%_10%] flex flex-col justify-between rounded-[3.2rem] border-2 border-ink bg-[#fffef9] p-7 shadow-[12px_16px_0_#211b2e] sm:p-9">
          <div className="flex items-center justify-between"><div className="flex items-center gap-2"><span className="h-9 w-9 rounded-full bg-lilac"/><div><p className="text-sm font-extrabold">social.studio</p><p className="text-[10px] text-ink/50">Ideas en acción</p></div></div><span className="rounded-full bg-[#f2ebff] px-3 py-1 text-[10px] font-black text-lilac">EN LÍNEA ●</span></div>
          <div className="relative mx-auto grid h-44 w-44 place-items-center rounded-[2.8rem] bg-[#f9d86f] sm:h-52 sm:w-52"><div className="absolute -right-6 -top-5 rounded-2xl bg-white p-3 shadow-soft"><Heart className="fill-[#ff856c] text-[#ff856c]"/></div><MessageCircle className="h-24 w-24 -rotate-12 stroke-[1.6] text-ink"/><span className="absolute bottom-5 right-2 -rotate-12 rounded-full bg-[#fd8678] px-3 py-2 text-sm font-black text-white">HEY!</span></div>
          <div className="flex items-center justify-around border-t border-ink/10 pt-5 text-ink"><span className="flex items-center gap-2 text-xs font-bold"><Heart size={19} className="text-[#fc6c77]"/> Conexiones</span><span className="flex items-center gap-2 text-xs font-bold"><MessageCircle size={19} className="text-lilac"/> Conversaciones</span></div>
        </div>
        <div className="float-slow absolute left-0 top-6 rotate-[-12deg] rounded-2xl border-2 border-ink bg-[#c8f19f] px-4 py-3 text-xs font-black shadow-[5px_5px_0_#211b2e]">GOOD VIBES ✷</div>
        <div className="float-slower absolute bottom-4 right-0 rotate-[9deg] rounded-2xl border-2 border-ink bg-white px-4 py-3 text-sm font-black shadow-[5px_5px_0_#211b2e]">¡Esto funciona! ↗</div>
      </div>
    </div>
  </section>;
}

function Services() {
  const [expanded, setExpanded] = useState<number | null>(null);
  return <section id="servicios" className="scroll-mt-24 bg-[#fffdf9] py-20 md:py-28"><div className="shell">
    <div className="mb-11 flex flex-wrap items-end justify-between gap-5"><div><p className="section-kicker">TODO LO QUE PODEMOS HACER</p><h2 className="section-title">Menos bla, <span className="text-lilac">más conexión.</span></h2></div><p className="max-w-xs text-sm leading-7 text-ink/65">Tocá una tarjeta para descubrir cómo llevamos cada idea a la práctica.</p></div>
    <div className="grid gap-4 md:grid-cols-2">{services.map((service,i) => <button key={service.number} type="button" aria-expanded={expanded === i} onClick={() => setExpanded(v => v === i ? null : i)} className={`service-card ${service.bg} group text-left`}>
      <div className="mb-8 flex items-start justify-between"><span className="rounded-full border border-ink/20 px-3 py-1 text-xs font-extrabold">{service.tag}</span><span className="grid h-10 w-10 place-items-center rounded-full bg-white/65 transition-transform group-hover:rotate-45"><ArrowUpRight size={21}/></span></div>
      <p className="mb-2 text-xs font-black tracking-widest opacity-55">{service.number} / 04</p><h3 className="max-w-lg text-[clamp(1.6rem,3vw,2.45rem)] font-extrabold leading-tight tracking-[-.05em]">{service.title}</h3><p className="mt-4 max-w-lg text-sm leading-7 text-ink/75 md:text-base">{service.description}</p>
      <div className="mt-7 flex items-center gap-2 text-sm font-extrabold">{expanded === i ? 'Ver menos' : 'Ver lo que incluye'} <ChevronDown size={17} className={`transition-transform ${expanded === i ? 'rotate-180' : ''}`}/></div>
      {expanded === i && <ul className="mt-5 grid gap-3 border-t border-ink/15 pt-5 text-sm" >{service.details.map(detail => <li key={detail} className="flex items-center gap-2"><Check size={16} strokeWidth={3}/>{detail}</li>)}</ul>}
    </button>)}</div>
  </div></section>;
}

function Platforms() {
  const [selected,setSelected] = useState<PlatformId>('instagram');
  const item = platforms.find(p => p.id === selected)!;
  return <section id="plataformas" className="scroll-mt-24 bg-[#241d37] py-20 text-white md:py-28"><div className="shell">
    <p className="section-kicker !text-[#c4b2ff]">CADA RED TIENE SU PROPIO IDIOMA</p><h2 className="section-title max-w-3xl">Una buena idea. <span className="text-[#f8cf84]">Mil formas de contarla.</span></h2>
    <p className="mt-5 max-w-xl text-white/65">No publicamos lo mismo en todos lados. Adaptamos el mensaje, el formato y el ritmo a cada comunidad.</p>
    <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="Seleccionar plataforma">{platforms.map(p => <button type="button" key={p.id} id={`tab-${p.id}`} role="tab" aria-selected={selected === p.id} aria-controls="platform-panel" onClick={() => setSelected(p.id)} className={`rounded-full border px-5 py-3 text-sm font-bold transition-all ${selected === p.id ? 'border-white bg-white text-ink' : 'border-white/20 text-white/75 hover:border-white/60 hover:text-white'}`}>{p.name}</button>)}</div>
    <div id="platform-panel" role="tabpanel" aria-labelledby={`tab-${item.id}`} className="mt-8 grid items-center gap-10 overflow-hidden rounded-[2rem] bg-white/10 p-6 md:grid-cols-[1fr_1fr] md:p-12">
      <div><span className="mb-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-black tracking-wider">{item.tag}</span><h3 className="text-4xl font-extrabold tracking-tight md:text-5xl">{item.name}</h3><p className="mt-5 max-w-sm text-lg text-white/75">{item.format}</p><p className="mt-9 flex items-center gap-2 text-sm font-semibold text-[#f8cf84]"><MousePointer2 size={18}/> Elegí otra plataforma para cambiar el ejemplo</p></div>
      <div key={item.id} className={`sample-preview ${item.color}`}><div className="mb-16 flex items-center justify-between text-sm font-extrabold"><span>social.studio ✳</span><span>● ● ●</span></div><p className="max-w-sm text-[clamp(1.6rem,3.8vw,3rem)] font-extrabold leading-tight tracking-tight">“{item.sample}”</p><div className="mt-12 flex items-center justify-between border-t border-current/20 pt-5 text-xs font-extrabold"><span>CONCEPTO ILUSTRATIVO</span><span className="flex items-center gap-2"><Heart size={18}/><MessageCircle size={18}/><Play size={18}/></span></div></div>
    </div>
  </div></section>;
}

function Approach() { return <section id="enfoque" className="scroll-mt-24 bg-canvas py-20 md:py-28"><div className="shell grid items-center gap-12 lg:grid-cols-2"><div><p className="section-kicker">ASÍ TRABAJAMOS</p><h2 className="section-title">Estrategia con cabeza. <span className="text-[#f27d68]">Contenido con corazón.</span></h2><p className="mt-5 max-w-lg leading-8 text-ink/70">La creatividad sola no alcanza. La combinamos con escucha, agilidad y datos para que cada publicación tenga una razón de ser.</p></div><div className="space-y-3">{[['01', 'Escuchamos', 'Entendemos a la marca, la comunidad y la conversación.'],['02', 'Creamos', 'Planeamos ideas y las transformamos en contenido nativo.'],['03', 'Conversamos', 'Estamos presentes: respondemos, moderamos y conectamos.'],['04', 'Aprendemos', 'Medimos, ajustamos y volvemos a crear.']].map(([number,title,desc]) => <div key={number} className="flex gap-5 rounded-3xl border border-ink/10 bg-white p-6 transition-transform hover:translate-x-1"><span className="text-2xl font-black text-lilac">{number}</span><div><h3 className="text-lg font-extrabold">{title}</h3><p className="mt-1 text-sm leading-6 text-ink/65">{desc}</p></div></div>)}</div></div></section>; }

function Results() { return <section id="resultados" className="scroll-mt-24 bg-[#d8f1bd] py-20 md:py-28"><div className="shell grid items-center gap-12 lg:grid-cols-[1fr_.85fr]"><div><p className="section-kicker">EL IMPACTO IMPORTA</p><h2 className="section-title">Más que likes, <span className="underline decoration-[#8aca86] decoration-[9px] underline-offset-[9px]">conexiones reales.</span></h2><p className="mt-6 max-w-xl text-base leading-8 text-ink/75">Comunidad, conversación y aprendizaje constante. Medimos para entender qué conecta y cómo seguir creciendo.</p><p className="mt-7 max-w-xl rounded-2xl border border-ink/15 bg-white/55 px-5 py-4 text-sm text-ink/75"><strong>Importante:</strong> el HTML de referencia incluía “+12.5K impresiones diarias” y “+5.3K comunidad fidelizada”, pero no adjunta evidencia. No publicamos esas cifras hasta validarlas con métricas reales.</p></div><div className="relative rounded-[2.5rem] border-2 border-ink bg-[#fffdf9] p-7 shadow-[11px_12px_0_#211b2e] md:p-10"><div className="mb-7 flex items-center justify-between"><span className="text-sm font-extrabold">¿Qué miramos?</span><span className="rounded-full bg-[#e6ddff] px-3 py-1 text-xs font-black">KPIs CON SENTIDO</span></div><div className="space-y-5">{[['Interacciones','78%'],['Conversación','64%'],['Retención','89%']].map(([label,value]) => <div key={label}><div className="mb-2 flex justify-between text-xs font-bold"><span>{label}</span><span className="text-ink/50">Indicador ilustrativo</span></div><div className="h-4 overflow-hidden rounded-full bg-[#ece6e0]"><div className="h-full rounded-full bg-lilac" style={{ width: value }}/></div></div>)}</div><p className="mt-7 text-xs text-ink/55">Visualización de ejemplo. Los porcentajes no son resultados reales.</p></div></div></section>; }

export function SocialLanding() {
  return <main className="min-h-screen overflow-x-hidden bg-canvas text-ink"><Header/><Hero/><Ticker/><Services/><Platforms/><Approach/><Results/><footer className="bg-[#241d37] px-6 py-9 text-white"><div className="shell flex flex-wrap items-center justify-between gap-4"><span className="text-lg font-extrabold">social<span className="text-[#bdaaff]">studio.</span></span><span className="text-xs text-white/55">Creatividad, estrategia y comunidad. Hecho para conectar ✳</span><a href="#inicio" className="flex items-center gap-2 text-xs font-bold hover:text-[#f8cf84]">Volver arriba <ArrowRight className="-rotate-90" size={16}/></a></div></footer></main>;
}
