import estilosMore from './more.css?inline';
import { wiAuth } from '@core/widev/widev.js';
import { NAV } from '@rutas';

export const render = () => {
  const user = wiAuth.user;
  if (!user) return `<style>${estilosMore}</style><div class="z_page"><div class="z_empty"><i class="fas fa-ban"></i> Acceso denegado.</div></div>`;

  const rol = user.rol || 'smile';
  const tools = NAV[rol]?.more || [];

  const cardsHtml = tools
    .map((c, i) => `
      <a href="${c.href}" class="z_card nv_item" data-page="${c.href.slice(1)}" data-search="${(c.txt || '').toLowerCase()} ${(c.desc || '').toLowerCase()}" style="animation-delay: ${i * 0.04}s">
        <div class="z_card_bar"></div>
        <div class="z_card_top">
          <div class="z_card_ico"><i class="fas ${c.ico}"></i></div>
          <div class="z_card_body">
            <h3>${c.txt}</h3>
            <p>${c.desc || ''}</p>
          </div>
          <i class="fas fa-arrow-right z_card_arrow"></i>
        </div>
      </a>
    `)
    .join('');

  return `
    <style>${estilosMore}</style>
    <div class="z_wrap">
      <header class="z_header wi_fadeUp">
        <div class="z_header_txt">
          <div class="z_badge"><i class="fas fa-cubes"></i> Módulos del Sistema</div>
          <h1>Más Herramientas</h1>
          <p>Explora y accede a las herramientas y módulos adicionales autorizados para tu cuenta.</p>
        </div>
        <div class="z_search_box">
          <i class="fas fa-search"></i>
          <input type="text" id="zSearchInput" placeholder="Buscar módulo..." autocomplete="off">
        </div>
      </header>
      
      <div class="z_grid wi_fadeUp" style="animation-delay: 0.1s">
        ${cardsHtml || `<div class="z_empty_grid"><i class="fas fa-ban"></i> No tienes herramientas adicionales asignadas.</div>`}
      </div>
    </div>
  `;
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

export const init = () => {
  const user = wiAuth.user;
  if (!user) return;

  addDocListener('input', '#zSearchInput', function() {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('.z_card').forEach(card => {
      if (!q) {
        card.style.display = '';
        return;
      }
      const searchData = card.getAttribute('data-search') || '';
      card.style.display = searchData.includes(q) ? '' : 'none';
    });
  });

  document.querySelectorAll('.wi_fadeUp').forEach(el => {
    el.classList.add('visible', 'wi_visible');
  });
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  listeners.forEach(({ type, wrapper }) => document.removeEventListener(type, wrapper));
  listeners.length = 0;
};
