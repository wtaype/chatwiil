import './acerca.css';
import './terminos.css';
import { app } from '../../wii.js';

const CANALES = [
  {
    ico: 'fa-envelope', color: '#0EBEFF', bg: 'var(--wb)', txt: 'var(--tx)',
    tit: 'Correo Administrativo',
    desc: 'Escríbenos directamente para consultas sobre nóminas, comisiones o contratos.',
    url: 'mailto:soporte.interno@retodelmes.com',
    cta: 'Enviar correo'
  },
  {
    ico: 'fa-comment-dots', color: '#29C72E', bg: 'var(--wb)', txt: 'var(--tx)',
    tit: 'Formulario de Soporte',
    desc: 'Reporta errores de sistema, tickets no validados o solicita soporte técnico inmediato.',
    url: '/acerca/contacto',
    cta: 'Abrir Formulario'
  },
];

const CATS = [
  { ico: 'fa-bug', color: '#FF5C69', tit: 'Problema con Comisión', desc: 'El monto calculado de tus soles o acumulados tiene discrepancias.' },
  { ico: 'fa-star', color: '#FFDA34', tit: 'Error de Puntos o Venta', desc: 'El tour registrado no aparece en el ranking o no sumó puntos.' },
  { ico: 'fa-user-lock', color: '#0EBEFF', tit: 'Acceso y Credenciales', desc: 'Dificultades para iniciar sesión o problemas con tu contraseña.' },
  { ico: 'fa-lightbulb', color: '#29C72E', tit: 'Sugerencia de la App', desc: 'Propuestas para optimizar el registro de tours en las dunas de Ica.' },
];

export const render = () => `
<main id="wimain">
<div class="ac_wrap tm_wrap">

  <section class="ac_hero tm_hero">
    <div class="ac_hero_orb ac_orb1"></div><div class="ac_hero_orb ac_orb2"></div><div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-headset"></i> Canal de Comunicación Interno</div>
      <h1 class="ac_hero_tit">Centro de<br><span class="ac_grad">Soporte 🛠️</span></h1>
      <p class="ac_hero_sub">
        Tu retroalimentación nos permite optimizar los registros y corregir comisiones.
        <strong>Estamos para garantizar la transparencia del sistema.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-bolt"></i> Atención Prioritaria</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> Confidencial</span>
        <span class="tm_chip"><i class="fas fa-lock"></i> Exclusivo Colaboradores</span>
      </div>
    </div>
  </section>

  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-comments"></i> Canales de ayuda</div>
      <h2 class="ac_sec_tit">¿Cómo reportar <span class="ac_grad">una incidencia?</span></h2>
      <p class="ac_sec_sub">Elige la vía más cómoda para comunicarte con administración</p>
    </div>
    <div class="fb_canales">
      ${CANALES.map(c => `
        <a href="${c.url}" class="fb_canal wi_fadeUp" style="--cc:${c.color}">
          <div class="fb_canal_ico" style="background:${c.bg};color:${c.txt}"><i class="fas ${c.ico}"></i></div>
          <div class="fb_canal_info">
            <strong>${c.tit}</strong>
            <span>${c.desc}</span>
          </div>
          <div class="fb_canal_cta" style="color:${c.color}">${c.cta} <i class="fas fa-arrow-right"></i></div>
        </a>`).join('')}
    </div>
  </section>

  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-layer-group"></i> Categorías</div>
      <h2 class="ac_sec_tit">¿Qué tipo de problema <span class="ac_grad">presentas?</span></h2>
      <p class="ac_sec_sub">Clasifica tu solicitud para darle trámite prioritario</p>
    </div>
    <div class="ac_feat_grid">
      ${CATS.map(c => `
        <div class="ac_feat_card wi_fadeUp" style="--sc:${c.color}">
          <div class="ac_feat_ico"><i class="fas ${c.ico}"></i></div>
          <h3>${c.tit}</h3><p>${c.desc}</p>
        </div>`).join('')}
    </div>
  </section>

</div></main>`;

let _obs = null;
const listeners = [];

const addDocListener = (type, selector, handler) => {
  const wrapper = e => {
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  };
  document.addEventListener(type, wrapper);
  listeners.push({ type, wrapper });
};

export const init = () => {
  _obs = new IntersectionObserver(
    (entries) => entries.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }),
    { threshold: 0.1 }
  );
  
  document.querySelectorAll('.wi_fadeUp').forEach(el => _obs.observe(el));

  // Interceptar navegación SPA en links internos
  addDocListener('click', '.fb_canal', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('/')) {
      e.preventDefault();
      import('../../rutas.js').then(m => m.rutas.navigate(href));
    }
  });

  console.log(`💬 ${app} Feedback cargado`);
};

export const cleanup = () => {
  if (_obs) {
    _obs.disconnect();
    _obs = null;
  }
  listeners.forEach(({ type, wrapper }) => document.removeEventListener(type, wrapper));
  listeners.length = 0;
};
