import estilosCuenta from './cuenta.css?inline';
import * as perfilMod from './perfil.js';
import * as ajustesMod from './ajustes.js';
import * as permisoMod from './permiso.js';
import * as historialMod from './historial.js';
import * as descargarMod from './descargar.js';
import * as enviarMod from './enviar.js';
import { wiAuth, abrirModal, cerrarModal } from '@core/widev/widev.js';

let _currentMod = null;
let _modalEl = null;

const SUB_PAGES = {
  '#cuenta/perfil': { name: 'Mi Perfil', icon: 'fa-user', mod: perfilMod },
  '#cuenta/ajustes': { name: 'Ajustes', icon: 'fa-gear', mod: ajustesMod },
  '#cuenta/permisos': { name: 'Permisos', icon: 'fa-key', mod: permisoMod },
  '#cuenta/historial': { name: 'Historial', icon: 'fa-history', mod: historialMod },
  '#cuenta/descargar': { name: 'Descargar', icon: 'fa-download', mod: descargarMod },
  '#cuenta/enviar': { name: 'Enviar', icon: 'fa-paper-plane', mod: enviarMod }
};

export const abrirCuenta = (hash) => {
  const user = wiAuth.user;
  if (!user) {
    window.location.hash = '';
    return;
  }

  const activeKey = SUB_PAGES[hash] ? hash : '#cuenta/perfil';
  const activeSub = SUB_PAGES[activeKey];

  // 1. Asegurar que el elemento modal existe
  if (!_modalEl) {
    _modalEl = document.getElementById('cuenta_modal');
  }

  if (!_modalEl) {
    _modalEl = document.createElement('div');
    _modalEl.id = 'cuenta_modal';
    _modalEl.className = 'wiModal';
    _modalEl.innerHTML = `
      <div class="wiModal-content cta_modal_content">
        <button class="modalX" id="btn_cta_close" data-wimodal-close>&times;</button>
        <div id="cuenta_modal_body"></div>
      </div>
    `;
    document.body.appendChild(_modalEl);

    // Escuchadores de cierre
    _modalEl.addEventListener('click', (e) => {
      if (e.target === _modalEl) {
        window.location.hash = '';
      }
    });

    _modalEl.querySelector('#btn_cta_close')?.addEventListener('click', () => {
      window.location.hash = '';
    });
  }

  // 2. Limpieza del sub-módulo anterior si cambia
  if (_currentMod && _currentMod !== activeSub.mod) {
    if (typeof _currentMod.cleanup === 'function') {
      _currentMod.cleanup();
    }
  }

  _currentMod = activeSub.mod;

  // 3. Renderizar cabecera horizontal y contenido
  const tabsHtml = Object.entries(SUB_PAGES).map(([route, item]) => {
    const isAct = route === activeKey;
    return `
      <a href="${route}" class="cta_tab_btn ${isAct ? 'active' : ''}">
        <i class="fas ${item.icon}"></i>
        <span>${item.name}</span>
      </a>
    `;
  }).join('');

  const subHtml = _currentMod.render ? _currentMod.render() : '';

  const bodyEl = _modalEl.querySelector('#cuenta_modal_body');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <style>${estilosCuenta}</style>
      <div class="cta_container">
        <!-- Cabecera Horizontal (Glassmorphism) -->
        <header class="cta_header_horizontal">
          <div class="cta_user_card_horizontal">
            <img src="${user.avatar || '/smile.avif'}" alt="Avatar" class="cta_avatar">
            <div class="cta_user_details">
              <h3>${user.nombre}</h3>
              <span>${user.rol.toUpperCase()}</span>
            </div>
          </div>

          <nav class="cta_nav_horizontal">
            ${tabsHtml}
          </nav>
        </header>

        <!-- Panel de Contenido -->
        <main class="cta_content_pane" id="cuenta_content_pane">
          ${subHtml}
        </main>
      </div>
    `;
  }

  // 4. Abrir modal
  abrirModal('cuenta_modal');

  // 5. Inicializar lógica del sub-módulo
  if (_currentMod && typeof _currentMod.init === 'function') {
    _currentMod.init();
  }
};

export const cerrarCuenta = () => {
  if (_currentMod) {
    if (typeof _currentMod.cleanup === 'function') {
      _currentMod.cleanup();
    }
    _currentMod = null;
  }
  cerrarModal('cuenta_modal');
};

// Escuchador global para la tecla Escape
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.location.hash.startsWith('#cuenta')) {
      window.location.hash = '';
    }
  });
}
