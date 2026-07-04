// src/lib/wiauth/login.js
// Formulario de inicio de sesión, plantillas HTML localizadas y llamadas de autenticación

import { auth } from '../firebase-auth.js';
import { db } from '../firebase.js';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { wiSpin, Mensaje, wiTip, abrirModal, cerrarTodos } from '../widev/widev.js';
import { app } from '../wii.js';
import { entrar, ROL_PATH } from './sesion.js';

// Mapeo rápido de errores de Firebase a español
export const mapearErrorAuth = (e) => {
  const code = e?.code || '';
  const map = {
    'auth/invalid-credential': 'Email, usuario o contraseña incorrectos',
    'auth/email-already-in-use': 'Email ya registrado',
    'auth/weak-password': 'Contraseña débil (mín. 6)',
    'auth/invalid-email': 'Email no válido',
    'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos.',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/profile-not-found': 'Perfil no encontrado en la base de datos.'
  };
  return map[code] || e?.message || 'Ha ocurrido un error inesperado';
};

// Helper para dibujar campos
export const campo = (ico, tipo, id, place, ojo = false) =>
  `<div class="wilg_grupo"><i class="fas fa-${ico}"></i><input type="${tipo}" id="${id}" placeholder="${place}" autocomplete="off">${ojo ? '<i class="fas fa-eye wilg_ojo"></i>' : ''}</div>`;

// Template HTML del formulario de ingreso
export const tplLogin = () => `
  <div class="wilg_head">
    <div class="wilg_logo"><img src="/smile.avif" alt="${app}"></div>
    <h2>Bienvenido</h2><p>Inicia sesión en tu cuenta</p>
  </div>
  <button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button>
  <div class="wilg_or"><span>o usa tu email</span></div>
  ${campo('envelope', 'text', 'email', 'Email o usuario')}
  ${campo('lock', 'password', 'password', 'Contraseña', true)}
  <button type="button" id="Login" class="wilg_btn inactivo" disabled><i class="fas fa-sign-in-alt"></i> Iniciar Sesión</button>
  <div class="wilg_links">
    <span class="wilg_rec"><i class="fas fa-key"></i> ¿Olvidaste tu contraseña?</span>
    <span class="wilg_reg">Crear cuenta <i class="fas fa-arrow-right"></i></span>
  </div>`;

// Template HTML para completar registro de Google SSO
export const tplUsername = () => `
  <div class="wilg_head">
    <div class="wilg_logo"><img src="/smile.avif" alt="${app}"></div>
    <h2>¡Casi listo!</h2><p>Completa tus datos de acceso</p>
  </div>
  ${campo('user', 'text', 'regUsuario', 'Ingresa un usuario (ej: marcos)')}
  <div class="wilg_check" style="margin-top: 1.5vh;">
    <label><input type="checkbox" id="regTerminos">
    <span>Acepto los <a href="/terminos" target="_blank">términos y condiciones</a></span></label>
  </div>
  <button type="button" id="CompletarGoogle" class="wilg_btn inactivo" disabled style="margin-top: 1.5vh;"><i class="fas fa-rocket"></i> Completar Registro</button>`;

// Activar o desactivar botón de login según inputs
export const checkLoginBtn = () => {
  const loginBtn = document.getElementById('Login');
  if (loginBtn) {
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const ok = (emailInput?.value.trim().length || 0) > 0 && (passInput?.value.length || 0) >= 6;
    loginBtn.classList.toggle('inactivo', !ok);
    loginBtn.disabled = !ok;
  }
};

// Iniciar sesión ordinaria (Soporta Email y Usuario)
export const iniciarSesionOrdinaria = async (btn) => {
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const input = emailInput ? emailInput.value.trim() : '';
  const pass = passInput ? passInput.value : '';

  if (!input || pass.length < 6) return;

  wiSpin(btn, true, 'Iniciar Sesión');
  try {
    let email = input;
    
    // Si no contiene '@', buscamos el email en Firestore usando el nombre de usuario
    if (!input.includes('@')) {
      const q = query(collection(db, 'smiles'), where('usuario', '==', input.toLowerCase().trim()), limit(1));
      const snap = await getDocs(q);
      if (snap.empty) throw { code: 'auth/user-not-found' };
      email = snap.docs[0].data().email;
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;

    // Obtener perfil detallado
    const qProf = query(collection(db, 'smiles'), where('email', '==', email), limit(1));
    const snapProf = await getDocs(qProf);
    if (snapProf.empty) throw { code: 'auth/profile-not-found' };
    const profile = snapProf.docs[0].data();

    if (profile.estado === 'pendiente') {
      await signOut(auth);
      if (document.querySelector('#wilg_modal.active') !== null) cerrarTodos();
      return window.location.href = '/registrado';
    }

    entrar(profile);
  } catch (e) {
    Mensaje(mapearErrorAuth(e), 'error');
  } finally {
    wiSpin(btn, false);
  }
};

// SSO con Google
export const iniciarGoogleSSO = async (btnGoogle, onRegisterGoogle) => {
  if (btnGoogle.dataset.busy === 'true') return;
  btnGoogle.dataset.busy = 'true';
  const prevHtml = btnGoogle.innerHTML;
  btnGoogle.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Conectando...';
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Buscar si existe el perfil en Firestore por email
    const q = query(collection(db, 'smiles'), where('email', '==', user.email), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      entrar(snap.docs[0].data());
    } else {
      // Es un registro nuevo, pasamos el usuario al callback
      if (onRegisterGoogle) onRegisterGoogle(user);
    }
  } catch (errCode) {
    Mensaje(mapearErrorAuth(errCode), 'error');
    btnGoogle.innerHTML = prevHtml;
    btnGoogle.dataset.busy = 'false';
  }
};
