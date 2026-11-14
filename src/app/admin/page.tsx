'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc,
} from 'firebase/firestore';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ExternalLink, LogOut, Plus, Save, Trash2 } from 'lucide-react';
import { firebaseServices, ADMIN_COLLECTION, STUDIO_COLLECTION } from '@/lib/firebase/client';
import { safePortfolioItem } from '@/lib/firebase/publications';
import type { MediaAsset, PortfolioItem, WorkCategory } from '@/lib/portfolio';
import { AdminToast, ConfirmDelete, type AdminNotice } from '@/components/admin-feedback';

type Draft = Omit<PortfolioItem, 'id'>;
const emptyDraft: Draft = {
  title: '', category: 'Reels', platform: 'Instagram', description: '',
  role: '', accent: 'violet', published: false,
  media: [{ type: 'video', alt: 'Vista previa del proyecto' }],
  sourceUrl: '',
};
const categories: WorkCategory[] = ['Reels', 'Campañas', 'Eventos', 'Contenido'];

function validUrl(value: string) {
  if (!value.trim()) return true;
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
}

export default function StudioAdmin() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<AdminNotice | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<PortfolioItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [failure, setFailure] = useState('');

  const refresh = useCallback(async () => {
    const { db } = firebaseServices();
    const snapshot = await getDocs(collection(db, STUDIO_COLLECTION));
    setItems(snapshot.docs.map(item => safePortfolioItem(item.id, item.data()))
      .filter((item): item is PortfolioItem => Boolean(item))
      .sort((a, b) => a.title.localeCompare(b.title)));
  }, []);

  useEffect(() => {
    let disposed = false;
    let unsubscribe = () => {};
    try {
      const { auth, db } = firebaseServices();
      unsubscribe = onAuthStateChanged(auth, async nextUser => {
        if (!nextUser) {
          if (!disposed) router.replace('/admin/login');
          return;
        }
        try {
          const allowed = await getDoc(doc(db, ADMIN_COLLECTION, nextUser.uid));
          if (!allowed.exists() || allowed.data().enabled !== true) {
            await signOut(auth);
            throw new Error('Cuenta sin permisos para administrar el portfolio.');
          }
          if (disposed) return;
          setUser(nextUser);
          await refresh();
        } catch (error) {
          if (!disposed) setFailure(error instanceof Error ? error.message : 'No se pudo cargar el administrador.');
        } finally {
          if (!disposed) setLoading(false);
        }
      });
    } catch (error) {
      setFailure(error instanceof Error ? error.message : 'No se pudo conectar con Firebase.');
      setLoading(false);
    }
    return () => { disposed = true; unsubscribe(); };
  }, [refresh, router]);

  function edit(item: PortfolioItem) {
    setSelectedId(item.id);
    setDraft({
      title: item.title, category: item.category, platform: item.platform,
      description: item.description, role: item.role, accent: item.accent,
      media: item.media.map(asset => ({ ...asset })), published: item.published,
      sourceUrl: item.sourceUrl || '',
    });
    setNotice(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function newProject() {
    setSelectedId(null);
    setDraft({ ...emptyDraft, media: [{ type: 'video', alt: 'Vista previa del proyecto' }] });
    setNotice(null);
  }

  function updateMedia(index: number, values: Partial<MediaAsset>) {
    setDraft(previous => ({
      ...previous,
      media: previous.media.map((asset, i) => i === index ? { ...asset, ...values } : asset),
    }));
  }

  async function save(publish: boolean) {
    setNotice(null);
    if (!draft.title.trim() || !draft.description.trim() || !draft.platform.trim() || !draft.role.trim()) {
      setNotice({ kind: 'error', message: 'Completá título, descripción, plataforma y trabajo realizado.' }); return;
    }
    if (draft.media.some(asset => !asset.alt.trim() || !validUrl(asset.src || '') || !validUrl(asset.poster || '')) ||
        !validUrl(draft.sourceUrl || '')) {
      setNotice({ kind: 'error', message: 'Completá las descripciones y usá enlaces HTTPS válidos para las imágenes, videos y publicaciones.' }); return;
    }
    if (publish && !draft.media.some(asset => asset.src) && !draft.sourceUrl) {
      setNotice({ kind: 'error', message: 'Para publicar necesitás al menos una imagen/video HTTPS o un enlace a la publicación original.' }); return;
    }
    setSaving(true);
    try {
      const { db } = firebaseServices();
      const payload = {
        title: draft.title.trim().slice(0, 120),
        category: draft.category,
        platform: draft.platform.trim().slice(0, 100),
        description: draft.description.trim().slice(0, 1500),
        role: draft.role.trim().slice(0, 250),
        accent: draft.accent,
        published: publish,
        media: draft.media.map(asset => ({
          type: asset.type, alt: asset.alt.trim().slice(0, 200),
          ...(asset.src?.trim() ? { src: asset.src.trim() } : {}),
          ...(asset.poster?.trim() ? { poster: asset.poster.trim() } : {}),
        })),
        ...(draft.sourceUrl?.trim() ? { sourceUrl: draft.sourceUrl.trim() } : {}),
        updatedAt: serverTimestamp(),
      };
      if (selectedId) {
        await updateDoc(doc(db, STUDIO_COLLECTION, selectedId), payload);
      } else {
        const created = await addDoc(collection(db, STUDIO_COLLECTION), { ...payload, createdAt: serverTimestamp() });
        setSelectedId(created.id);
      }
      setDraft(previous => ({ ...previous, published: publish }));
      await refresh();
      setNotice({ kind: 'success', message: publish ? 'Proyecto publicado correctamente.' : 'Borrador guardado correctamente.' });
    } catch (error) {
      setNotice({ kind: 'error', message: error instanceof Error ? error.message : 'No pudimos guardar el proyecto.' });
    } finally { setSaving(false); }
  }

  async function confirmRemove() {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    setNotice(null);
    try {
      const { db } = firebaseServices();
      await deleteDoc(doc(db, STUDIO_COLLECTION, deleteTarget.id));
      if (selectedId === deleteTarget.id) newProject();
      setDeleteTarget(null);
      await refresh();
      setNotice({ kind: 'success', message: 'Publicación eliminada correctamente.' });
    } catch (error) {
      setDeleteTarget(null);
      setNotice({ kind: 'error', message: error instanceof Error ? error.message : 'No pudimos eliminar la publicación.' });
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <main className="grid min-h-screen place-items-center bg-canvas text-ink">Cargando Social Studio Admin…</main>;
  if (!user) return <main className="grid min-h-screen place-items-center bg-canvas px-5 text-ink">
    <div className="max-w-lg text-center">
      <p role="alert" className="mb-5">{failure || 'Necesitás iniciar sesión para ingresar.'}</p>
      <Link href="/admin/login" className="primary-link">Ir al acceso</Link>
    </div>
  </main>;

  return <main className="min-h-screen bg-canvas pb-20 text-ink">
    {notice && <AdminToast notice={notice} onDismiss={() => setNotice(null)} />}
    {deleteTarget && <ConfirmDelete title={deleteTarget.title} busy={deleting} onCancel={() => setDeleteTarget(null)} onConfirm={confirmRemove} />}
    <header className="border-b border-ink/10 bg-white">
      <div className="shell flex flex-wrap items-center justify-between gap-4 py-5">
        <div><p className="text-xs font-black uppercase tracking-[.15em] text-lilac">SOCIAL STUDIO</p>
          <h1 className="text-2xl font-extrabold">Administrador</h1>
          <p className="text-xs text-ink/55">{user.email}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/" target="_blank" className="inline-flex items-center gap-2 rounded-xl border border-ink/20 px-4 py-2 text-sm font-bold"><ExternalLink size={16}/> Ver sitio</Link>
          <button type="button" onClick={async () => { await signOut(firebaseServices().auth); router.replace('/admin/login'); }}
            className="inline-flex items-center gap-2 rounded-xl border border-ink/20 px-4 py-2 text-sm font-bold"><LogOut size={16}/> Salir</button>
        </div>
      </div>
    </header>

    <div className="shell mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(290px,.8fr)]">
      <section className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft sm:p-8">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div><p className="section-kicker">EDITOR</p><h2 className="text-2xl font-extrabold">{selectedId ? 'Editar proyecto' : 'Nuevo proyecto'}</h2></div>
          <button type="button" onClick={newProject} className="inline-flex items-center gap-2 rounded-xl bg-[#e6ddff] px-4 py-2 text-sm font-bold"><Plus size={17}/> Nuevo</button>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2 text-sm font-bold">Título
            <input maxLength={120} value={draft.title} onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} className="admin-input" placeholder="Ej. Cobertura de festival" />
          </label>
          <label className="text-sm font-bold">Categoría
            <select value={draft.category} onChange={e => setDraft(d => ({ ...d, category: e.target.value as WorkCategory }))} className="admin-input">
              {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label className="text-sm font-bold">Plataforma
            <input maxLength={100} value={draft.platform} onChange={e => setDraft(d => ({ ...d, platform: e.target.value }))} className="admin-input" placeholder="Instagram · X" />
          </label>
          <label className="sm:col-span-2 text-sm font-bold">Descripción del proyecto
            <textarea rows={3} maxLength={1500} value={draft.description} onChange={e => setDraft(d => ({ ...d, description: e.target.value }))} className="admin-input resize-y" placeholder="Qué hicieron y cómo lo resolvieron" />
          </label>
          <label className="sm:col-span-2 text-sm font-bold">Trabajo realizado
            <input maxLength={250} value={draft.role} onChange={e => setDraft(d => ({ ...d, role: e.target.value }))} className="admin-input" placeholder="Producción, edición y community management" />
          </label>
          <label className="text-sm font-bold">Color de tarjeta
            <select value={draft.accent} onChange={e => setDraft(d => ({ ...d, accent: e.target.value as Draft['accent'] }))} className="admin-input">
              <option value="violet">Violeta</option><option value="coral">Coral</option><option value="lime">Lima</option><option value="blue">Azul</option>
            </select>
          </label>
          <label className="sm:col-span-2 text-sm font-bold">Enlace a publicación original (Instagram, TikTok, YouTube, X…)
            <input type="url" value={draft.sourceUrl || ''} onChange={e => setDraft(d => ({ ...d, sourceUrl: e.target.value }))} className="admin-input" placeholder="https://www.instagram.com/reel/..." />
            <span className="mt-1 block text-xs font-normal text-ink/60">El visitante podrá abrir la publicación original. Los enlaces sociales no son archivos de video directos.</span>
          </label>
        </div>

        <div className="mt-8 border-t border-ink/10 pt-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div><h3 className="font-extrabold">Galería multimedia</h3><p className="text-xs text-ink/60">Enlaces HTTPS públicos a fotos o videos MP4. Por ahora no hay carga de archivos.</p></div>
            <button type="button" disabled={draft.media.length >= 12} onClick={() => setDraft(d => ({ ...d, media: [...d.media, { type: 'image', alt: '' }] }))} className="rounded-xl bg-[#e6ddff] px-3 py-2 text-sm font-bold disabled:opacity-50">+ Agregar pieza</button>
          </div>
          <div className="mt-4 space-y-4">
            {draft.media.map((asset, i) => <div key={i} className="rounded-2xl border border-ink/10 bg-[#faf8f4] p-4">
              <div className="mb-3 flex items-center justify-between"><span className="text-xs font-black">PIEZA {i + 1}</span>
                <button type="button" disabled={draft.media.length === 1} onClick={() => setDraft(d => ({ ...d, media: d.media.filter((_, index) => index !== i) }))}
                  aria-label={'Quitar pieza ' + (i + 1)} className="rounded-full p-2 text-red-700 disabled:opacity-30"><Trash2 size={17}/></button>
              </div>
              <div className="grid gap-3">
                <label className="text-sm font-bold">Tipo
                  <select value={asset.type} onChange={e => updateMedia(i, { type: e.target.value as MediaAsset['type'] })} className="admin-input"><option value="image">Imagen</option><option value="video">Video directo (MP4)</option></select>
                </label>
                <label className="text-sm font-bold">URL del archivo
                  <input type="url" value={asset.src || ''} onChange={e => updateMedia(i, { src: e.target.value })} placeholder="https://..." className="admin-input" />
                </label>
                <label className="text-sm font-bold">Descripción accesible
                  <input maxLength={200} value={asset.alt} onChange={e => updateMedia(i, { alt: e.target.value })} placeholder="Qué se ve en esta pieza" className="admin-input" />
                </label>
                {asset.type === 'video' && <label className="text-sm font-bold">Portada del video (opcional)
                  <input type="url" value={asset.poster || ''} onChange={e => updateMedia(i, { poster: e.target.value })} placeholder="https://..." className="admin-input" />
                </label>}
              </div>
            </div>)}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" disabled={saving} onClick={() => save(false)} className="inline-flex items-center gap-2 rounded-full border-2 border-ink px-5 py-3 text-sm font-extrabold disabled:opacity-50"><Save size={17}/> Guardar borrador</button>
          <button type="button" disabled={saving} onClick={() => save(true)} className="primary-link disabled:opacity-50">{saving ? 'Guardando…' : 'Publicar en el portfolio'}</button>
        </div>
        <p className="mt-4 text-xs text-ink/60">La página pública solo lee registros publicados. Los borradores son privados.</p>
      </section>

      <section className="rounded-[2rem] border border-ink/10 bg-white p-5 shadow-soft sm:p-7">
        <h2 className="text-xl font-extrabold">Proyectos guardados</h2>
        <p className="mt-1 text-sm text-ink/60">{items.length} proyectos · {items.filter(item => item.published).length} publicados</p>
        <div className="mt-5 space-y-3">
          {!items.length && <p className="rounded-xl bg-[#f5f0ff] p-4 text-sm">Todavía no hay publicaciones. Creá la primera usando el editor.</p>}
          {items.map(item => <div key={item.id} className="rounded-2xl border border-ink/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-bold text-lilac">{item.category} · {item.published ? 'Publicado' : 'Borrador'}</p>
                <p className="mt-1 break-words font-extrabold">{item.title}</p>
              </div>
              <button type="button" onClick={() => setDeleteTarget(item)} aria-label={'Eliminar ' + item.title} className="shrink-0 rounded-full p-2 text-red-700 hover:bg-red-50"><Trash2 size={17}/></button>
            </div>
            <button type="button" onClick={() => edit(item)} className="mt-3 inline-flex items-center gap-1 text-sm font-extrabold text-lilac"><ArrowLeft size={16}/> Editar</button>
          </div>)}
        </div>
      </section>
    </div>
  </main>;
}
