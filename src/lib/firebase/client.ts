import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

type Services = { auth: Auth; db: Firestore };

let cached: Services | null = null;

/** Inicialización exclusiva de navegador; permite compilar previews sin credenciales. */
export function firebaseServices(): Services {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Client debe ejecutarse en el navegador.');
  }
  if (cached) return cached;
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  };
  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    throw new Error('Faltan variables NEXT_PUBLIC_FIREBASE_* del proyecto.');
  }
  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(config);
  cached = { auth: getAuth(app), db: getFirestore(app) };
  return cached;
}

export const STUDIO_COLLECTION = 'socialStudioPublications';
export const ADMIN_COLLECTION = 'studioAdmins';
