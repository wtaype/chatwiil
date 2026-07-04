// src/lib/wiauth/sesion.js
// Gestor unificado del ciclo de vida de la sesión, bus de eventos reactivo y guards de seguridad

import { auth } from '../firebase-auth.js';
import { db } from '../firebase.js';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getls, savels, removels } from '../widev/storage.js';
import { witemas } from '../widev/tema.js';
import { Mensaje } from '../widev/mensajes.js';
import { cerrarTodos } from '../widev/modales.js';

import { ROL_PATH } from '../rutas.js';

const bus = new Set();

// Bus de eventos y control de estado reactivo para autenticación de usuario
export const wiAuth = {
  get user() {
    return getls('wiSmile');
  },

  on(fn) {
    if (typeof fn !== 'function') return () => {};
    bus.add(fn);
    const u = this.user;
    if (u) {
      try {
        fn(u);
      } catch (e) {
        console.error('wiAuth init callback error:', e);
      }
    }
    return () => bus.delete(fn);
  },

  emit(wi) {
    bus.forEach(fn => {
      try {
        fn(wi);
      } catch (e) {
        console.error('wiAuth emit error:', e);
      }
    });
  },

  login(wi, h = 144, keep = []) {
    // Limpia todo localStorage excepto temas, cookies y las especificadas en keep
    removels.except(['wiTema', 'cookiesPrivacidad', 'wiSmart', ...keep]);
    savels('wiSmile', wi, h);
    this.emit(wi);
  },

  logout(keep = []) {
    removels.except(['wiTema', 'cookiesPrivacidad', 'wiSmart', ...keep]);
    this.emit(null);
  }
};

// --- APLICADOR DE TEMAS ---
export const aplicarTema = (name) => {
  if (!name || typeof window === 'undefined') return;
  const color = witemas[name] || '#FFC107';
  document.documentElement.dataset.theme = name;
  const meta = document.querySelector('meta[name="theme-color"]') || document.head.appendChild(Object.assign(document.createElement('meta'), { name: 'theme-color' }));
  meta.setAttribute('content', color);
};

// --- LOGICA DE SESIÓN Y REDIRECCIONES ---

export const entrar = (wi) => {
  wiAuth.login(wi, 7, ['wiSmart', 'cookiesPrivacidad']);
  if (wi?.tema) {
    localStorage.wiTema = wi.tema;
    aplicarTema(wi.tema);
  }
  if (typeof document !== 'undefined' && document.querySelector('#wilg_modal.active') !== null) {
    cerrarTodos();
  }

  // Traducción y bienvenida en español
  Mensaje(`<i class="fa-solid fa-hand-wave"></i> ¡Hola de nuevo, ${wi?.nombre || ''}!`, 'success');

  // Actualizar última actividad en la base de datos
  updateDoc(doc(db, 'smiles', wi.usuario), {
    actualizado: serverTimestamp()
  }).catch(error => {
    console.error('Error actualizando actividad:', error);
  });

  setTimeout(() => {
    window.location.href = ROL_PATH[wi?.rol] || '/';
  }, 1000);
};

export const salir = async (keep = []) => {
  try {
    await signOut(auth);
  } catch (e) {
    console.error('Error signing out from Firebase:', e);
  }
  wiAuth.logout(keep);
  window.location.replace('/');
};

/**
 * Espera a obtener el usuario autenticado de Firebase.
 */
export async function waitAuth() {
  return new Promise(resolve => {
    if (auth.currentUser) return resolve(auth.currentUser);
    const unsub = onAuthStateChanged(auth, u => {
      unsub();
      resolve(u);
    });
  });
}

/**
 * Valida la sesión del usuario en Firebase y localStorage.
 */
export async function protegerRuta(rolesPermitidos = []) {
  const localUser = wiAuth.user;
  if (!localUser) {
    window.location.replace('/');
    return null;
  }

  if (rolesPermitidos.length && !rolesPermitidos.includes(localUser.rol)) {
    window.location.replace('/');
    return null;
  }

  const fbUser = await waitAuth();
  if (!fbUser) {
    wiAuth.logout();
    window.location.replace('/');
    return null;
  }

  return localUser;
}

export { ROL_PATH };
