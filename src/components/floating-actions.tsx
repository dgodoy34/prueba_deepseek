'use client';

import { useEffect, useState } from 'react';
import { ArrowUp, MessageCircle, X } from 'lucide-react';

/**
 * Definir NEXT_PUBLIC_WHATSAPP_NUMBER con el número comercial del estudio,
 * en formato internacional y sin "+", espacios ni guiones.
 * Ejemplo de formato (no es un número real): 54911XXXXXXXX.
 */
const phone = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');
const message = 'Hola, vi el portfolio de Social Studio y quisiera consultarles por un proyecto.';

export function FloatingActions() {
  const [visible, setVisible] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 700);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-2 sm:bottom-7 sm:right-7 sm:gap-3" aria-label="Accesos rápidos">
      {contactOpen && !phone && (
        <div className="relative max-w-[260px] rounded-2xl border border-ink/10 bg-white p-5 text-ink shadow-xl">
          <button type="button" onClick={() => setContactOpen(false)} aria-label="Cerrar aviso" className="absolute right-3 top-3 rounded-full p-1 hover:bg-ink/10"><X size={17}/></button>
          <p className="pr-5 text-sm font-extrabold">¡Conectemos!</p>
          <p className="mt-2 text-xs leading-5 text-ink/65">Estamos preparando el contacto oficial de WhatsApp del estudio.</p>
        </div>
      )}

      {phone ? (
        <a
          href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Consultar a Social Studio por WhatsApp"
          title="Hablemos por WhatsApp"
          className="group flex items-center gap-2 rounded-full border-2 border-[#175d3f] bg-[#25d366] p-3 font-extrabold sm:px-4 sm:py-3 text-[#153c2b] shadow-[4px_5px_0_#211b2e] transition-transform hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lilac"
        >
          <MessageCircle size={22} strokeWidth={2.5}/>
          <span className="hidden text-sm sm:inline">WhatsApp</span>
        </a>
      ) : (
        <button
          type="button"
          onClick={() => setContactOpen((open) => !open)}
          aria-expanded={contactOpen}
          aria-label="Información de contacto por WhatsApp"
          title="WhatsApp del estudio"
          className="group flex items-center gap-2 rounded-full border-2 border-[#175d3f] bg-[#25d366] p-3 font-extrabold sm:px-4 sm:py-3 text-[#153c2b] shadow-[4px_5px_0_#211b2e] transition-transform hover:-translate-y-1"
        >
          <MessageCircle size={22} strokeWidth={2.5}/>
          <span className="hidden text-sm sm:inline">WhatsApp</span>
        </button>
      )}

      <button type="button" onClick={toTop} aria-label="Al cielo, volver al inicio"
        className={`flex items-center gap-2 rounded-full border-2 border-ink bg-[#e3d8ff] p-3 text-sm font-extrabold sm:px-4 sm:py-3 text-ink shadow-[4px_5px_0_#211b2e] transition-all hover:-translate-y-1 ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
        <ArrowUp size={19} strokeWidth={2.5}/><span className="hidden sm:inline">Al cielo</span>
      </button>
    </aside>
  );
}
