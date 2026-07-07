import { app, icon } from '@wii';
import { rutas, NAV } from '@rutas';
import { Mensaje, wiAuth } from '@core/widev/widev.js';

// ── LOGO — generado desde wii.js ─────────────────────────────────────────────
const LOGO = `<a href="/"><i class="fa-solid ${icon}"></i> ${app}</a>`;

// ── MOTOR DE RENDERIZADO ──────────────────────────────────────────────────────
const buildNav = (items, wi, pageAct) => items.map(i => {
  if (i.isBtn) return `<button class="${i.cls}"><i class="fas ${i.ico}"></i><span>${i.txt}</span></button>`;
  if (i.isPerfil) {
    const isAct = pageAct === 'perfil';
    return `<a href="/perfil" class="nv_item ${isAct ? 'active' : ''}" data-page="perfil"><img src="${wi?.avatar || `${import.meta.env.BASE_URL}smile.avif`}" alt="${wi?.nombre}"><span>${wi?.nombre}</span></a>`;
  }
  if (i.isSalir) return `<button class="nv_item bt_salir" data-page="inicio"><i class="fa-solid fa-sign-out-alt"></i> <span>Salir</span></button>`;
  const isAct = pageAct === i.page;
  return `<a href="${i.href}" class="nv_item ${isAct ? 'active' : ''}" data-page="${i.page}"><i class="fas ${i.ico}"></i> <span>${i.txt}</span></a>`;
}).join('');

const renderHeader = (wi, ruta = window.location.pathname) => {
  let cfg = NAV[wi?.rol] ?? NAV.todos;
  if (ruta === '/verificar') cfg = NAV.verificar;
  const pageAct = (ruta === '/' || ruta === '/inicio') ? 'inicio' : ruta.slice(1);
  const left = buildNav(cfg.nvleft, wi, pageAct), right = buildNav(cfg.nvright, wi, pageAct);
  
  const wilogo = document.querySelector('.wilogo');
  if (wilogo) wilogo.innerHTML = LOGO;
  
  const winav = document.querySelector('.winav');
  if (winav) winav.innerHTML = left;
  
  const nv_right = document.querySelector('.nv_right');
  if (nv_right) nv_right.innerHTML = right;

  const movil_nav = document.querySelector('.movil_nav');
  if (movil_nav) movil_nav.innerHTML = left + right;
};

// ── MOBILE DRAWER ─────────────────────────────────────────────────────────────
if (!document.querySelector('.movil_drawer')) {
  document.body.insertAdjacentHTML('beforeend', `
  <div class="movil_overlay"></div>
  <nav class="movil_drawer" role="navigation" aria-label="Menú móvil">
    <button class="movil_close" aria-label="Cerrar menú"><i class="fas fa-times"></i></button>
    <div class="movil_logo">${LOGO}</div>
    <div class="movil_nav"></div>
  </nav>`);
}

const listeners = [];
const addDocListener = (type, selector, handler) => {
  const wrapper = e => {
    if (!e.target?.closest) return;
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  };
  document.addEventListener(type, wrapper);
  listeners.push({ type, wrapper });
};

addDocListener('click', '.wimenu', () => document.body.classList.add('movil_open'));
addDocListener('click', '.movil_close, .movil_overlay, .movil_nav .nv_item, .movil_nav button', () => document.body.classList.remove('movil_open'));

// ── AUTH LISTENER ─────────────────────────────────────────────────────────────
wiAuth.on(wi => wi ? renderHeader(wi) : (renderHeader(), rutas.cargand = false, rutas.navigate('/')));
const wi = wiAuth.user; wi ? renderHeader(wi) : renderHeader();

// ── ROUTE LISTENER — re-renderiza el nav en cada navegación SPA ───────────────
window.addEventListener('winavigate', ({ detail: { norm } }) => renderHeader(wiAuth.user, norm));

// ── EVENTOS GLOBALES ──────────────────────────────────────────────────────────
addDocListener('click', '.bt_salir', async () => {
  const { salir } = await import('@features/auth/visual.js');
  salir(['wiTema', 'wiSmart']);
});

const prefetchLogin = () => import('@features/auth/visual.js');
addDocListener('mouseenter', '.bt_auth', prefetchLogin);
addDocListener('touchstart', '.bt_auth', prefetchLogin);

addDocListener('click', '.bt_auth', async function () {
  const { abrirLogin } = await import('@features/auth/visual.js');
  const isRegistrar = this.classList.contains('registrar');
  abrirLogin(isRegistrar ? 'registrar' : 'login');
});
