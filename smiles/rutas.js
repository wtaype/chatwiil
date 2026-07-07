import { app } from './wii.js';
import { Notificacion, wiPath, wiFade } from './core/widev/widev.js';
import * as inicioMod from './features/public/inicio.js';

// ── ROL_PATH — rutas por defecto al iniciar sesión ──────────────────────────
export const ROL_PATH = {
  smile:  '/smile',
  gestor: '/gestor',
  admin:  '/admin'
};

// ── NAV — Config visual por rol (nvleft = izquierda, nvright = derecha) ────────
export const NAV = {
  todos: {
    nvleft:  [{ href: '/', page: 'inicio', ico: 'fa-house', txt: 'Bienvenido' }],
    nvright: [{ isBtn: true, cls: 'bt_auth login', ico: 'fa-sign-in-alt', txt: 'Iniciar sesión' }]
  },
  smile: {
    nvleft: [
      { href: '/smile', page: 'smile', ico: 'fa-house', txt: 'Dashboard' },
      { href: '/enviar', page: 'enviar', ico: 'fa-paper-plane', txt: 'Enviar' },
      { href: '/more',  page: 'more',  ico: 'fa-ellipsis', txt: 'Más' }
    ],
    nvright: [
      { isPerfil: true }, { isSalir: true }
    ],
    more: [
      { href: '/perfil', ico: 'fa-user', txt: 'Mi Perfil', desc: 'Edita tus datos personales y tema visual.' },
      { href: '/win',   page: 'win',   ico: 'fa-file-word', txt: 'Win Editor', desc: 'Redacta, edita y organiza tus notas y apuntes rápidos.' },
    ]
  },
  gestor: {
    nvleft: [
      { href: '/gestor', page: 'gestor', ico: 'fa-house', txt: 'Dashboard' },
      { href: '/precios', page: 'precios', ico: 'fa-tags', txt: 'Precios Tours' },
      { href: '/win',    page: 'win',    ico: 'fa-file-word', txt: 'Win Editor' },
      { href: '/more',   page: 'more',   ico: 'fa-ellipsis', txt: 'Más' }
    ],
    nvright: [
      { isPerfil: true }, { isSalir: true }
    ],
    more: [
      { href: '/smile',  ico: 'fa-users', txt: 'Dashboard Colaborador', desc: 'Panel de ventas y estadísticas personales.' },
      { href: '/perfil', ico: 'fa-user', txt: 'Mi Perfil', desc: 'Edita tus datos personales y tema visual.' }
    ]
  },
  admin: {
    nvleft: [
      { href: '/admin', page: 'admin', ico: 'fa-globe', txt: 'Plataforma' },
      { href: '/win',   page: 'win',   ico: 'fa-file-word', txt: 'Win Editor' },
      { href: '/more',  page: 'more',  ico: 'fa-ellipsis', txt: 'Más' }
    ],
    nvright: [
      { isPerfil: true }, { isSalir: true }
    ],
    more: [
      { href: '/smile',  ico: 'fa-users', txt: 'Dashboard Colaborador', desc: 'Panel de ventas y estadísticas personales.' },
      { href: '/gestor', ico: 'fa-crown', txt: 'Dashboard Gerencia', desc: 'Panel de ingresos, ganancias y estadísticas de la empresa.' },
      { href: '/perfil', ico: 'fa-user', txt: 'Mi Perfil', desc: 'Edita tus datos personales y tema visual.' }
    ]
  },
  verificar: {
    nvleft: [],
    nvright: []
  }
};

// ── CONSTRUCCIÓN DINÁMICA DE RUTAS ──────────────────────────────────────────
export const RUTAS = Object.entries({
  // Públicas (string simple representa el 'area')
  '/inicio': 'todos',
  '/login': { area: 'wiauth', page: 'visual' },
  '/emojis': 'todos',
  '/registrado': 'todos',
  '/precios': 'todos',
  '/acerca': 'todos/acerca',
  '/contacto': 'todos/acerca',
  '/cookies': 'todos/acerca',
  '/descubre': 'todos/acerca',
  '/feedback': 'todos/acerca',
  '/privacidad': 'todos/acerca',
  '/terminos': 'todos/acerca',

  // Autenticadas comunes (objeto define 'area' y 'roles')
  '/smile': { area: 'smile', roles: ['smile', 'gestor', 'admin'] },
  '/enviar': { area: 'smile', roles: ['smile', 'gestor', 'admin'] },
  '/perfil': { area: 'smile', roles: ['smile', 'gestor', 'admin'] },
  '/more': { area: 'smile', roles: ['smile', 'gestor', 'admin'] },
  '/win': { area: 'smile', roles: ['smile', 'gestor', 'admin'] },

  // Gestor
  '/gestor': { area: 'gestor', roles: ['gestor', 'admin'] },

  // Admin
  '/admin': { area: 'admin', roles: ['admin'] },
  '/verificar': { area: 'admin/verificar', roles: ['admin'] }
}).map(([path, cfg]) => {
  const isObj = typeof cfg === 'object';
  return {
    path,
    area: isObj ? cfg.area : cfg,
    page: (isObj && cfg.page) ? cfg.page : path.split('/').pop(),
    roles: (isObj && cfg.roles) ? cfg.roles : null
  };
});

// ── GLOB — Vite mapea todos los módulos en build time ────────────────────────
const MODS = import.meta.glob([
  './features/**/*.js',
  '!./features/public/inicio.js'
]);
const rutasMod = (area, page) => {
  let mappedArea = area;
  if (area === 'wiauth') mappedArea = 'auth';
  else if (area === 'smile') mappedArea = 'chat';
  else if (area === 'todos') mappedArea = 'public';
  
  if (area.startsWith('todos/')) mappedArea = area.replace('todos/', 'public/');
  if (page === 'perfil') mappedArea = 'profile';
  
  return MODS[`./features/${mappedArea}/${page}.js`];
};

// ── MOTOR ───────────────────────────────────────────────────────────────────
class WiRutas {
  constructor() {
    this.rutas     = {};               // funciones lazy originales
    this.cache     = { '/inicio': inicioMod };
    this.modActual = null;
    this.cargand   = false;
    this.HOME      = 'inicio';
    this.main      = '#wimain';
    this.pathActual = null;
    this.isFirstLoad = true;
  }

  register(path, fn) { this.rutas[path] = fn; }
  inicio() { return Promise.resolve(inicioMod); }

  registerAll(getRol) {
    RUTAS.forEach(({ path, area, page, roles }) => {
      if (path === '/inicio') {
        this.register(path, () => this.inicio());
        return;
      }
      const imp = rutasMod(area, page);
      if (!imp) {
        console.warn(`[ruta] no encontrado: ${area}/${page}.js`);
        return;
      }

      this.register(path, () => {
        const rol = getRol?.() || null;
        if (roles && !roles.includes(rol)) {
          return Promise.resolve({
            render: () => '',
            init: () => setTimeout(() => this.navigate('/login'), 0)
          });
        }
        return imp();
      });
    });
  }

  // ── PREFETCH: descarga el módulo al hacer hover, sin bloquear nada ─────────
  async prefetch(ruta) {
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);
    if (this.cache[norm] || !this.rutas[norm]) return;
    try {
      this.cache[norm] = await this.rutas[norm]();
      console.log(`⚡ Listo ${norm.replace('/', '')}`);
    } catch { console.warn('[ruta] prefetch falló:', norm); }
  }

  // ── NAVIGATE: si ya está en cache, carga instantánea ───────────────────────
  async navigate(ruta, historial = true) {
    if (this.cargand) return;
    this.cargand = true;
    const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);

    // ── GUARDIA GLOBAL DE SEGURIDAD ──────────────────────────────────────────
    const { getls } = await import('./core/widev/widev.js');
    const wi = getls('wiSmile');
    const configRuta = RUTAS.find(r => r.path === norm);
    const go = r => (this.cargand = false, this.navigate(r, true));

    if (wi) {
      if (['/login', '/', '/inicio'].includes(norm)) {
        return go(ROL_PATH[wi.rol] || '/smile');
      }
      if (configRuta && configRuta.roles && !configRuta.roles.includes(wi.rol)) {
        return go(ROL_PATH[wi.rol] || '/smile');
      }
      if (['/admin'].includes(norm)) {
        const dest = wi.rol !== 'admin' ? '/' : wi.estado !== 'activo' ? '/registrado' : !sessionStorage.getItem('vault_unlocked') ? '/verificar' : null;
        if (dest) return go(dest);
      }
    } else {
      if (configRuta && configRuta.roles) {
        return go('/login');
      }
    }

    try {
      this.modActual?.cleanup?.();

      // Ruta desconocida → redirigir al home
      if (!this.rutas[norm]) {
        this.cargand = false;
        return this.navigate('/', true);
      }

      const mod = this.cache[norm] ?? await this.rutas[norm]();
      this.cache[norm] = mod;

      const [html] = await Promise.all([mod.render()]);
      
      document.body.classList.remove('is-public-profile');
      this.marcarNav(norm);
      window.dispatchEvent(new CustomEvent('winavigate', { detail: { norm } }));

      // Hydration
      const mainEl = document.querySelector(this.main);
      const esHydration = this.isFirstLoad
        && mainEl
        && mainEl.children.length > 0
        && !window.__WIREADY__
        && norm === `/${this.HOME}`;
      if (esHydration) {
        this.isFirstLoad = false;
      } else {
        await wiFade(this.main, html);
      }
      this.isFirstLoad = false;

      window.scrollTo(0, 0);
      mod.init?.();

      if (historial) wiPath.poner(norm === `/${this.HOME}` ? '/' : norm, document.title);
      this.pathActual = norm;
      this.modActual = mod;
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('Failed to fetch')) return location.reload();
      Notificacion('Error en la ruta');
      console.error('[ruta] navigate:', err);
    } finally {
      this.cargand = false;
    }
  }

  marcarNav(norm) {
    const pag = norm.slice(1) || this.HOME;
    document.querySelectorAll('.nv_item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`.nv_item[data-page="${pag}"]`).forEach(el => el.classList.add('active'));
  }

  init() {
    this.marcarNav(wiPath.actual === '/' ? `/${this.HOME}` : wiPath.limpiar(wiPath.actual));

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

    addDocListener('click', '.nv_item:not(.bt_salir)', (e) => {
      e.preventDefault();
      const currentTarget = e.target?.closest?.('.nv_item:not(.bt_salir)');
      if (currentTarget) {
        const pag = currentTarget.getAttribute('data-page');
        this.navigate(pag === this.HOME ? '/' : `/${pag}`);
      }
    });

    const prefetchHandler = (e) => {
      const currentTarget = e.target?.closest?.('.nv_item[data-page]');
      if (currentTarget) {
        const pag = currentTarget.getAttribute('data-page');
        this.prefetch(pag === this.HOME ? '/' : `/${pag}`);
      }
    };
    addDocListener('mouseenter', '.nv_item[data-page]', prefetchHandler);
    addDocListener('touchstart', '.nv_item[data-page]', prefetchHandler);

    window.addEventListener('popstate', (e) => {
      const ruta = e.state?.ruta || wiPath.actual;
      const norm = wiPath.limpiar(ruta) === '/' ? `/${this.HOME}` : wiPath.limpiar(ruta);
      if (norm === this.pathActual) return;
      this.navigate(ruta, false);
    });
    this.navigate(wiPath.actual, false);
  }
}

export const rutas = new WiRutas();
window._wiRutas = { rutas };
