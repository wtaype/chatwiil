// src/lib/wiauth/twofa.js
// Vistas y validación para el segundo factor de autenticación (2FA)

import { auth } from '../firebase-auth.js';
import { db } from '../firebase.js';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { wiSpin, Mensaje } from '../widev/widev.js';
import { app } from '../wii.js';
import { entrar, waitAuth } from './sesion.js';
import { campo, mapearErrorAuth } from './login.js';

// Template HTML de verificación 2FA
export const tplTwoFA = () => `
  <div class="wilg_head">
    <div class="wilg_logo wilg_logo_sm"><img src="/smile.avif" alt="${app}"></div>
    <h2>Autenticación 2FA</h2><p>Ingresa el código OTP enviado a tu dispositivo</p>
  </div>
  ${campo('shield-halved', 'text', 'otpCode', 'Código OTP de 6 dígitos')}
  <button type="button" id="Verificar2FA" class="wilg_btn"><i class="fas fa-lock-open"></i> Verificar</button>
  <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Volver</span></div>`;

// Lógica de verificación 2FA
export const verificar2FA = async (btn) => {
  const otpEl = document.getElementById('otpCode');
  const code = otpEl ? otpEl.value.trim() : '';
  if (code.length < 6) return;

  wiSpin(btn, true, 'Verificando...');
  try {
    const user = await waitAuth();
    if (!user) throw { code: 'auth/user-not-found' };

    const q = query(collection(db, 'smiles'), where('email', '==', user.email), limit(1));
    const snap = await getDocs(q);
    if (snap.empty) throw { code: 'auth/user-not-found' };
    const profile = snap.docs[0].data();

    entrar(profile);
  } catch (e) {
    Mensaje(mapearErrorAuth(e), 'error');
  } finally {
    wiSpin(btn, false);
  }
};
