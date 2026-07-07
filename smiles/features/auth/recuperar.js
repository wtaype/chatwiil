// src/lib/wiauth/recuperar.js
// Vistas y llamadas para recuperación de contraseñas olvidadas

import { auth } from '@core/firebase-auth.js';
import { db } from '@core/firebase-db.js';
import { sendPasswordResetEmail } from 'firebase/auth';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { wiSpin, Mensaje } from '@core/widev/widev.js';
import { app } from '@wii';
import { campo, mapearErrorAuth } from './login.js';

// Template HTML para formulario de recuperación
export const tplRestablecer = () => `
  <div class="wilg_head">
    <div class="wilg_logo wilg_logo_sm"><img src="/smile.avif" alt="${app}"></div>
    <h2>Recuperar</h2><p>Te enviaremos un enlace a tu email</p>
  </div>
  ${campo('envelope', 'text', 'recEmail', 'Email o usuario')}
  <button type="button" id="Recuperar" class="wilg_btn"><i class="fas fa-paper-plane"></i> Enviar enlace</button>
  <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Volver</span></div>`;

// Enviar enlace de restablecimiento (Soporta resolver Username a Email)
export const enviarEnlaceRecuperacion = async (btn) => {
  const inputEl = document.getElementById('recEmail');
  const input = inputEl ? inputEl.value.trim() : '';
  if (!input) return;

  wiSpin(btn, true, 'Enviar enlace');
  try {
    let email = input;

    // Si es un nombre de usuario, resolvemos su email en la colección 'smiles'
    if (!input.includes('@')) {
      const q = query(collection(db, 'smiles'), where('usuario', '==', input.toLowerCase().trim()), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) throw { code: 'auth/user-not-found' };
      email = snap.docs[0].data().email;
    }

    await sendPasswordResetEmail(auth, email);
    Mensaje('Enlace enviado a tu email', 'success');
  } catch (e) {
    Mensaje(mapearErrorAuth(e), 'error');
  } finally {
    wiSpin(btn, false);
  }
};
