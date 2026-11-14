'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { ADMIN_COLLECTION, firebaseServices } from '@/lib/firebase/client';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const router = useRouter();

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      const { auth, db } = firebaseServices();
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const permit = await getDoc(doc(db, ADMIN_COLLECTION, credential.user.uid));
      if (!permit.exists() || permit.data().enabled !== true) {
        await signOut(auth);
        throw new Error('Esta cuenta no está autorizada para administrar Social Studio.');
      }
      router.replace('/admin');
    } catch (cause) {
      setError(cause instanceof Error && !cause.message.startsWith('Firebase:') ? cause.message : 'No pudimos iniciar sesión. Revisá el correo y la contraseña.');
    } finally {
      setBusy(false);
    }
  }

  return <main className="min-h-screen bg-canvas px-5 py-16 text-ink">
    <div className="mx-auto max-w-md rounded-[2rem] border border-ink/10 bg-white p-7 shadow-soft sm:p-10">
      <Link href="/" className="text-sm font-extrabold text-lilac">← Volver a Social Studio</Link>
      <p className="section-kicker mt-10">ACCESO PRIVADO</p>
      <h1 className="text-4xl font-extrabold tracking-tight">Hola, equipo ✳</h1>
      <p className="mt-3 text-sm leading-6 text-ink/65">Entrá para editar los proyectos y publicaciones del portfolio.</p>
      <form onSubmit={login} className="mt-8 space-y-5">
        <label className="block text-sm font-bold">Correo electrónico
          <input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink/20 px-4 py-3 font-normal outline-none focus:border-lilac" />
        </label>
        <label className="block text-sm font-bold">Contraseña
          <input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink/20 px-4 py-3 font-normal outline-none focus:border-lilac" />
        </label>
        {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{error}</p>}
        <button type="submit" disabled={busy} className="primary-link w-full disabled:opacity-50">{busy ? 'Ingresando…' : 'Ingresar al estudio'}</button>
      </form>
    </div>
  </main>;
}
