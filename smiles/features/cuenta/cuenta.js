import estilosCuenta from './cuenta.css?inline';
import * as perfilMod from './perfil.js';
import * as ajustesMod from './ajustes.js';
import * as permisoMod from './permiso.js';
import * as historialMod from './historial.js';
import * as descargarMod from './descargar.js';
import * as enviarMod from './enviar.js';
import { wiAuth } from '@core/widev/widev.js';

let _currentMod = null;

const SUB_PAGES = {
  '/cuenta/perfil': { name: 'Mi Perfil', icon: 'fa-user', mod: perfilMod },
  '/cuenta/ajustes': { name: 'Ajustes', icon: 'fa-gear', mod: ajustesMod },
  '/cuenta/permisos': { name: 'Permisos', icon: 'fa-key', mod: permisoMod },
  '/cuenta/historial': { name: 'Historial', icon: 'fa-history', mod: historialMod },
  '/cuenta/descargar': { name: 'Descargar', icon: 'fa-download', mod: descargarMod },
  '/cuenta/enviar': { name: 'Enviar', icon: 'fa-paper-plane', mod: enviarMod }
};

export const render = () => {
  const user = wiAuth.user;
  if (!user) return `<div class="cta_denied"><i class="fas fa-ban"></i> Acceso denegado.</div>`;

  const path = window.location.pathname;
  const activeKey = SUB_PAGES[path] ? path : '/cuenta/perfil';
  const activeSub = SUB_PAGES[activeKey];
  _currentMod = activeSub.mod;

  // Sidebar Tabs HTML
  const tabsHtml = Object.entries(SUB_PAGES).map(([route, item]) => {
    const isAct = route === activeKey;
    return `
      <a href="${route}" class="cta_tab_btn ${isAct ? 'active' : ''}" data-page="${route.replace('/cuenta/', 'cuenta/')}">
        <i class="fas ${item.icon}"></i>
        <span>${item.name}</span>
      </a>
    `;
  }).join('');

  // Renderiza sub-módulo
  const subHtml = _currentMod.render ? _currentMod.render() : '';

  return `
    <style>${estilosCuenta}</style>
    <div class="cta_container">
      
      <!-- Barra lateral de la cuenta -->
      <aside class="cta_sidebar">
        <div class="cta_user_card">
          <img src="${user.avatar || '/smile.avif'}" alt="Avatar" class="cta_avatar">
          <div class="cta_user_details">
            <h3>${user.nombre}</h3>
            <span>${user.rol.toUpperCase()}</span>
          </div>
        </div>

        <nav class="cta_nav">
          ${tabsHtml}
        </nav>

        <footer class="cta_footer">
          <a href="/smile" class="cta_back_btn"><i class="fas fa-arrow-left"></i> Volver al Chat</a>
        </footer>
      </aside>

      <!-- Panel de Contenido -->
      <main class="cta_content_pane" id="cuenta_content_pane">
        ${subHtml}
      </main>

    </div>
  `;
};

export const init = () => {
  if (_currentMod && typeof _currentMod.init === 'function') {
    _currentMod.init();
  }
};

export const cleanup = () => {
  if (_currentMod && typeof _currentMod.cleanup === 'function') {
    _currentMod.cleanup();
  }
};
