import { app, lanzamiento, by, linkme, version, icon } from './wii.js';
import { savels, getls } from './widev/widev.js';

// ── Redes Sociales ───────────────────────────────────────────────────────────
const REDES = [
  { tit: 'YouTube',   ico: 'fab fa-youtube',   url: 'https://www.youtube.com/@wiihope',   bg: '#ff0000' },
  { tit: 'Facebook',  ico: 'fab fa-facebook-f', url: 'https://www.facebook.com/wiihopee', bg: '#1877F2' },
  { tit: 'Instagram', ico: 'fab fa-instagram',  url: 'https://www.instagram.com/WiiHopee',bg: 'linear-gradient(45deg,#f58529,#dd2a7b,#515bd4)' },
  { tit: 'TikTok',    ico: 'fab fa-tiktok',     url: 'https://www.tiktok.com/@wiihope',   bg: '#000'    },
];

export { footer };
function footer(){
  const ahora = new Date();
  return `
  <footer class="foo">
    <div class="foo_inner">
      <div class="foo_left">
        <div class="foo_brand">
          <span class="foo_app"><a href="/">${app}</a></span>
          <span class="foo_ver">${version}</span>
        </div>
        <div class="foo_links">
          <a href="/acerca"   class="foo_link nv_item" data-page="acerca"  ><i class="fas fa-circle-info"></i> Acerca</a>
          <a href="/terminos"   class="foo_link nv_item" data-page="terminos"  ><i class="fas fa-file-contract"></i> Términos</a> 
          <a href="/cookies"    class="foo_link nv_item" data-page="cookies"   ><i class="fas fa-cookie-bite"></i> Cookies</a>
          <a href="/privacidad" class="foo_link nv_item" data-page="privacidad"><i class="fas fa-lock"></i> Privacidad</a>
          <a href="/feedback"   class="foo_link nv_item" data-page="feedback"  ><i class="fas fa-comment-dots"></i> Feedback</a>
          <a href="/contacto"   class="foo_link nv_item" data-page="contacto"  ><i class="fas fa-envelope"></i> Contacto</a>
        </div>
      </div>
      <div class="foo_right">
        <span>Creado con <i class="fas fa-heart" style="color:var(--mco);"></i> by <a href="${linkme}" target="_blank"><strong>${by}</strong></a> ${lanzamiento} - ${ahora.getFullYear()}</span>
      </div>
    </div>
  </footer>
  `;
}

if (!document.querySelector('.foo')) {
  document.body.insertAdjacentHTML('beforeend', footer());
}

if (!document.getElementById('wi_bg_style')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'wi_bg_style';
  styleEl.textContent = `:root{--bgim:url("${import.meta.env.BASE_URL}wpuntos.svg")}body{background: var(--bgim), var(--bg)}`;
  document.head.appendChild(styleEl);
}

// ── BANNER COOKIES ────────────────────────────────────────────────────────────
const CK_KEY = 'cookies';

const cerrarBanner = (val) => {
  savels(CK_KEY, val);
  const cookEl = document.getElementById('cookies');
  if (cookEl) {
    cookEl.classList.remove('cookies_show');
    setTimeout(() => cookEl.remove(), 150);
  }
};

const listeners = [];
const addDocListener = (type, selector, handler) => {
  const wrapper = e => {
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  };
  document.addEventListener(type, wrapper);
  listeners.push({ type, wrapper });
};

// Los listeners siempre se registran con pointerdown para respuesta instantánea
addDocListener('pointerdown', '#ck_aceptar',  () => cerrarBanner(true));
addDocListener('pointerdown', '#ck_rechazar', () => cerrarBanner(false));

if (!getls(CK_KEY)) {
  if (!document.getElementById('cookies')) {
    document.body.insertAdjacentHTML('beforeend', `
  <div class="cookiess cookiess_show" id="cookies" role="dialog" aria-live="polite" aria-label="Consentimiento de Cookies">
    <p class="cookiess_txt"><i class="fas fa-cookie-bite cookiess_ico"></i>Usamos cookies para mejorar tu experiencia y mostrarte anuncios relevantes
    <a class="cookiess_link nv_item" href="/cookies">Más info</a></p>
    <div class="cookiess_btns"><button class="cookiess_aceptar" id="ck_aceptar"><i class="fas fa-check"></i> Aceptar</button>
    <button class="cookiess_rechazar" id="ck_rechazar">Rechazar</button></div>
  </div>`);
  }
  setTimeout(() => {
    const cookEl = document.getElementById('cookies');
    if (cookEl) cookEl.classList.add('cookies_show');
  }, 800);
} else {
  const cookEl = document.getElementById('cookies');
  if (cookEl) cookEl.remove();
}