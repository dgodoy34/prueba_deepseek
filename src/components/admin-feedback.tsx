'use client';

import { useEffect, useRef } from 'react';
import { AlertCircle, CheckCircle2, Trash2, X } from 'lucide-react';

export type AdminNotice = { kind: 'success' | 'error'; message: string };

export function AdminToast({ notice, onDismiss }: { notice: AdminNotice; onDismiss: () => void }) {
  const success = notice.kind === 'success';

  useEffect(() => {
    if (!success) return;
    const timeout = window.setTimeout(onDismiss, 5000);
    return () => window.clearTimeout(timeout);
  }, [success, notice, onDismiss]);

  return (
    <div role={success ? 'status' : 'alert'} aria-live={success ? 'polite' : 'assertive'}
      className={['fixed left-4 right-4 top-4 z-[120] mx-auto flex max-w-md items-start gap-3 rounded-2xl border p-4 shadow-2xl sm:left-auto sm:right-6 sm:mx-0',
        success ? 'border-[#abdcb8] bg-[#f0fff1] text-[#1b5733]' : 'border-[#f2b4b4] bg-[#fff3f2] text-[#7f2020]'].join(' ')}>
      {success ? <CheckCircle2 size={23} className="shrink-0"/> : <AlertCircle size={23} className="shrink-0"/>}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold">{success ? 'Operación completada' : 'Atención'}</p>
        <p className="mt-1 break-words text-sm leading-5">{notice.message}</p>
      </div>
      <button type="button" onClick={onDismiss} aria-label="Cerrar aviso"
        className="shrink-0 rounded-lg p-1 hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current">
        <X size={19}/>
      </button>
    </div>
  );
}

export function ConfirmDelete({
  title, busy, onCancel, onConfirm,
}: { title: string; busy: boolean; onCancel: () => void; onConfirm: () => void }) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cancelRef.current?.focus();
    return () => { document.body.style.overflow = oldOverflow; previous?.focus(); };
  }, []);

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      if (!busy) onCancel();
    }
    if (event.key === 'Tab') {
      const first = cancelRef.current;
      const last = confirmRef.current;
      if (first && last) {
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#211b2e]/65 p-4 backdrop-blur-sm"
      onMouseDown={event => { if (event.target === event.currentTarget && !busy) onCancel(); }}>
      <div role="alertdialog" aria-modal="true" aria-labelledby="confirm-delete-title" aria-describedby="confirm-delete-description"
        onKeyDown={handleKeyDown} className="w-full max-w-md rounded-[2rem] bg-white p-6 text-ink shadow-2xl sm:p-8">
        <div className="mb-5 inline-flex rounded-2xl bg-[#fff1ef] p-3 text-[#ae3a30]"><Trash2 size={26}/></div>
        <h2 id="confirm-delete-title" className="text-2xl font-extrabold tracking-tight">¿Eliminar publicación?</h2>
        <p id="confirm-delete-description" className="mt-3 break-words text-sm leading-7 text-ink/70">
          Vas a eliminar <strong>{title}</strong> del administrador y del portfolio público si estaba publicada.
          Esta acción no se puede deshacer.
        </p>
        <div className="mt-7 flex flex-wrap justify-end gap-3">
          <button ref={cancelRef} type="button" disabled={busy} onClick={onCancel}
            className="rounded-full border border-ink/20 px-5 py-3 text-sm font-bold disabled:opacity-50">Cancelar</button>
          <button ref={confirmRef} type="button" disabled={busy} onClick={onConfirm}
            className="inline-flex items-center gap-2 rounded-full bg-[#a92e35] px-5 py-3 text-sm font-extrabold text-white disabled:opacity-50">
            <Trash2 size={17}/> {busy ? 'Eliminando…' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}
