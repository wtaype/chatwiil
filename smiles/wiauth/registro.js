// src/lib/wiauth/registro.js
// Plantilla de registro, sanitización, validaciones y creación de cuenta

import { auth } from '../firebase-auth.js';
import { db } from '../firebase.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDocs, query, collection, where, limit, serverTimestamp } from 'firebase/firestore';
import { wiSpin, Mensaje, wiTip, cerrarTodos, wiRateLimit } from '../widev/widev.js';
import { app, dtema } from '../wii.js';
import { entrar } from './sesion.js';
import { campo, mapearErrorAuth } from './login.js';

let rolPublico = 'usuario';
let avatarMain = '/smile.avif';

// --- SANITIZACIÓN ESTRICTA ---
export const sanName  = v => v.replace(/[<>="'`;/\\$}{]/g, '').replace(/\s{2,}/g, ' ');
export const sanEmail = v => v.replace(/[<>="'`;/\\$}{ ]/g, '').toLowerCase().trim();
export const sanUser  = v => v.toLowerCase().replace(/[^a-z0-9_-]/g, '').trim();

export const reglas = {
  regEmail:     [sanEmail, v => /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v) || 'Email no válido'],
  regUsuario:   [sanUser,  v => v.length >= 4 || 'Mínimo 4 caracteres'],
  regNombre:    [sanName,  v => v.length > 0 || 'Ingresa tu nombre'],
  regApellidos: [sanName,  v => v.length > 0 || 'Ingresa tus apellidos'],
  regPassword:  [v => v,   v => v.length >= 6 || 'Mínimo 6 caracteres'],
  regPassword1: [v => v,   v => {
    const pwd = document.getElementById('regPassword');
    return v === (pwd ? pwd.value : '') || 'No coinciden';
  }]
};

// Template HTML del formulario de registro
export const tplRegistrar = () => `
  <div class="wilg_head">
    <div class="wilg_logo"><img src="/smile.avif" alt="${app}"></div>
    <h2>Crear Cuenta</h2><p>Únete a la comunidad</p>
  </div>
  <button type="button" class="wilg_btn_google" id="btnGoogle"><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google"> Continuar con Google</button>
  <div class="wilg_or"><span>o usa tu email</span></div>
  <div class="wilg_grid">
    ${campo('envelope', 'email', 'regEmail', 'Email')}
    ${campo('user', 'text', 'regUsuario', 'Usuario')}
    ${campo('user-tie', 'text', 'regNombre', 'Nombre')}
    ${campo('user-tie', 'text', 'regApellidos', 'Apellidos')}
    ${campo('lock', 'password', 'regPassword', 'Contraseña', true)}
    ${campo('lock', 'password', 'regPassword1', 'Confirmar contraseña', true)}
  </div>
  <div class="wilg_check">
    <label><input type="checkbox" id="regTerminos">
    <span>Acepto los <a href="/terminos" target="_blank">términos y condiciones</a></span></label>
  </div>
  <button type="button" id="Registrar" class="wilg_btn inactivo" disabled><i class="fas fa-user-plus"></i> Registrarme</button>
  <div class="wilg_links"><span class="wilg_log"><i class="fas fa-arrow-left"></i> Ya tengo cuenta</span></div>`;

// Comprobación y activación del botón de registro
export const checkRegisterBtn = () => {
  const regBtn = document.getElementById('Registrar');
  if (regBtn) {
    const reqFields = ['regEmail', 'regUsuario', 'regNombre', 'regApellidos', 'regPassword', 'regPassword1'];
    const ok = reqFields.every(id => {
      const el = document.getElementById(id);
      return el?.dataset.ok === 'true';
    });
    regBtn.classList.toggle('inactivo', !ok);
    regBtn.disabled = !ok;
  }
};

// Comprobación y activación de Completar Registro (Google)
export const checkCompleteBtn = () => {
  const compBtn = document.getElementById('CompletarGoogle');
  if (compBtn) {
    const uEl = document.getElementById('regUsuario');
    const ok = uEl?.dataset.ok === 'true';
    compBtn.classList.toggle('inactivo', !ok);
    compBtn.disabled = !ok;
  }
};

// Validación y chequeo de disponibilidad en el servidor en tiempo real
export const checkField = async (el, forzarTip = false) => {
  const id = el.id, value = el.value.trim();
  if (!value) return;

  const rule = reglas[id];
  if (rule) {
    const [trans, vld] = rule;
    const v = trans(value); el.value = v;
    const r = vld(v);
    if (r !== true) {
      if (forzarTip) { wiTip(el, r, 'error', 2500); el.dataset.ok = 'false'; }
      return;
    }
  }

  let ok = true;
  if (id === 'regEmail') {
    const rl = wiRateLimit('regValidacion', 5);
    if (!rl.ok) {
      el.dataset.ok = 'false';
      wiTip(el, `Demasiados intentos. Espera ${rl.min} min`, 'error', 2500);
      return;
    }
    rl.fail();
    
    // Consultar disponibilidad del email en Firestore
    const q = query(collection(db, 'smiles'), where('email', '==', value), limit(1));
    const snap = await getDocs(q);
    ok = snap.empty;
    wiTip(el, ok ? 'Email disponible <i class="fa-solid fa-check-circle"></i>' : 'Email no disponible', ok ? 'success' : 'error', 2500);
  } else if (id === 'regUsuario') {
    if (value.includes('@')) {
      el.dataset.ok = 'false';
      if (forzarTip) wiTip(el, 'No puede contener @', 'error', 2500);
      return;
    }
    const rl = wiRateLimit('regValidacion', 5);
    if (!rl.ok) {
      el.dataset.ok = 'false';
      wiTip(el, `Demasiados intentos. Espera ${rl.min} min`, 'error', 2500);
      return;
    }
    rl.fail();
    
    // Consultar disponibilidad del usuario en Firestore
    const q = query(collection(db, 'smiles'), where('usuario', '==', value), limit(1));
    const snap = await getDocs(q);
    ok = snap.empty;
    wiTip(el, ok ? 'Usuario disponible <i class="fa-solid fa-check-circle"></i>' : 'Usuario no disponible', ok ? 'success' : 'error', 2500);
  } else if (id === 'regNombre' || id === 'regApellidos') {
    ok = value.length > 0;
  } else if (id === 'regPassword') {
    ok = value.length >= 6;
  } else if (id === 'regPassword1') {
    const p1El = document.getElementById('regPassword');
    const p1 = p1El ? p1El.value : '';
    ok = value.length >= 6 && value === p1;
    if (ok) wiTip(el, 'Contraseñas coinciden <i class="fa-solid fa-check-circle"></i>', 'success', 2500);
    else if (p1 && value !== p1 && forzarTip) wiTip(el, 'No coinciden', 'error', 2500);
  }

  el.dataset.ok = ok ? 'true' : 'false';
};

// Registrar nuevo usuario
export const registrarUsuario = async (btn) => {
  const termEl = document.getElementById('regTerminos');
  const userEl = document.getElementById('regUsuario');
  const emailEl = document.getElementById('regEmail');
  if (termEl && !termEl.checked) return wiTip(termEl, 'Acepta los términos', 'error', 2500);
  if (userEl?.dataset.ok !== 'true') return wiTip(userEl, 'Verifica el usuario', 'error', 2500);
  if (emailEl?.dataset.ok !== 'true') return wiTip(emailEl, 'Verifica el email', 'error', 2500);

  const getVal = id => {
    const inputEl = document.getElementById(id);
    return inputEl ? inputEl.value.trim() : '';
  };

  const d = {
    email: getVal('regEmail'),
    usuario: getVal('regUsuario'),
    nombre: getVal('regNombre'),
    apellidos: getVal('regApellidos'),
    password: getVal('regPassword')
  };

  wiSpin(btn, true, 'Registrarme');
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, d.email, d.password);
    const user = userCredential.user;

    const userProfile = {
      uid: user.uid,
      usuario: d.usuario,
      email: d.email,
      nombre: d.nombre,
      apellidos: d.apellidos,
      rol: rolPublico,
      activo: true,
      estado: 'pendiente',
      terminos: true,
      terminosFecha: serverTimestamp(),
      tema: localStorage.wiTema || dtema,
      avatar: avatarMain,
      plan: 'free',
      segmento: 'general',
      verificado: false,
      registradoPor: 'email',
      creado: serverTimestamp(),
      actualizado: serverTimestamp()
    };
    
    // Registrar displayName del Auth user
    await updateProfile(user, { displayName: d.usuario });

    // Guardar perfil en Firestore
    await setDoc(doc(db, 'smiles', d.usuario), userProfile);

    if (document.querySelector('#wilg_modal.active') !== null) cerrarTodos();
    window.location.href = '/registrado';
  } catch (e) {
    Mensaje(mapearErrorAuth(e), 'error');
  } finally {
    wiSpin(btn, false);
  }
};

// Completar registro SSO
export const completarGoogleSSO = async (btn, googleUser) => {
  const termEl = document.getElementById('regTerminos');
  const uEl = document.getElementById('regUsuario');
  const u = uEl ? uEl.value.trim() : '';

  if (termEl && !termEl.checked) return wiTip(termEl, 'Acepta los términos', 'error', 2500);
  if (!u || uEl?.dataset.ok !== 'true') return wiTip(uEl, 'Verifica el usuario', 'error', 2500);
  if (!googleUser) return Mensaje('Error de sesión con Google. Intenta de nuevo.', 'error');

  wiSpin(btn, true, 'Completar Registro');
  try {
    const partes = googleUser.displayName ? googleUser.displayName.split(' ') : ['Usuario', ''];
    const wi = {
      uid: googleUser.uid,
      usuario: u,
      email: googleUser.email,
      nombre: partes[0] || 'Usuario',
      apellidos: partes.slice(1).join(' ') || '',
      rol: rolPublico,
      activo: true,
      estado: 'activo',
      terminos: true,
      terminosFecha: serverTimestamp(),
      tema: localStorage.wiTema || dtema,
      avatar: googleUser.photoURL || avatarMain,
      plan: 'free',
      segmento: 'general',
      verificado: false,
      registradoPor: 'google',
      creado: serverTimestamp(),
      actualizado: serverTimestamp()
    };
    
    // Registrar displayName
    await updateProfile(googleUser, { displayName: u });

    // Guardar perfil en Firestore
    await setDoc(doc(db, 'smiles', u), wi);
    entrar(wi);
  } catch (e) {
    Mensaje(mapearErrorAuth(e), 'error');
  } finally {
    wiSpin(btn, false);
  }
};
