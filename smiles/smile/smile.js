import './smile.css';
import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import { wiAuth, getNombre, Saludar, getls, savels } from '../widev/widev.js';
import { app } from '../wii.js';

// ── Helper: mes actual en formato YYYY-MM ────────────────────────────────────
const getMesActual = () => {
  const hoy = new Date();
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
};

// ── Ranking del mes desde Firestore ─────────────────────────────────────────
const obtenerRankingMes = async (mes) => {
  const [yr, mm] = mes.split('-').map(Number);
  const snap = await getDocs(collection(db, 'registrosdb'));
  const acum = {};
  snap.docs.forEach(d => {
    const v = d.data();
    const f = v.fechaTour;
    let a, m;
    if (typeof f === 'string') { [a, m] = f.split('-').map(Number); }
    else if (f?.toDate) { const fd = f.toDate(); a = fd.getFullYear(); m = fd.getMonth() + 1; }
    else return;
    if (a === yr && m === mm) {
      if (!acum[v.vendedor]) acum[v.vendedor] = { usuario: v.vendedor, puntos: 0 };
      acum[v.vendedor].puntos += parseInt(v.puntos) || 0;
    }
  });
  return Object.values(acum).sort((a, b) => b.puntos - a.puntos);
};

let mesSeleccionado = getMesActual();

// ── Quick nav: solo páginas que realmente existen ────────────────────────────
const QUICK_NAV = [
  { page: 'win',    ico: 'fa-file-word',     col: '#0EBEFF', tit: 'Win Editor',    sub: 'Escribe y guarda tus notas' },
  { page: 'perfil', ico: 'fa-user-circle',   col: '#7000FF', tit: 'Mi Perfil',     sub: 'Edita tus datos personales' },
  { page: 'more',   ico: 'fa-th-large',      col: '#29C72E', tit: 'Más Módulos',   sub: 'Accede a más herramientas' },
  { page: 'precios',ico: 'fa-tags',           col: '#FFC107', tit: 'Precios Tours', sub: 'Consulta precios y paquetes' },
];

export const render = () => {
  const mesesOptions = selectMes();
  return `
    <div class="smw_dash">
      <header class="smw_hero wi_fadeUp">
        <div class="smw_hero_glow"></div>
        <div class="smw_hero_content">
          <div class="smw_hero_left">
            <div class="smw_avatar_wrap">
              <div class="smw_avatar" id="smwAvatar">?</div>
              <div class="smw_avatar_ring"></div>
            </div>
            <div class="smw_welcome">
              <h1 id="smwSaludo">Cargando...</h1>
              <p id="smwRole"><i class="fas fa-car-side"></i> Colaborador — Reto del Mes</p>
            </div>
          </div>
          <div class="smw_month_selector_container">
            <select id="smwMonthSelector" class="smw_select" style="min-width: 160px; backdrop-filter: blur(10px); background: var(--bg5);">
              ${mesesOptions}
            </select>
          </div>
        </div>
      </header>

      <section class="smw_kpi_band wi_fadeUp" id="smwKpis" style="animation-delay: 0.1s">
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiTours" style="color: var(--Cielo)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Tours este mes</span>
        </div>
        <div class="smw_kpi_sep"></div>
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiPuntos" style="color: var(--Oro)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Mis puntos</span>
        </div>
        <div class="smw_kpi_sep"></div>
        <div class="smw_kpi_item">
          <span class="smw_kpi_val" id="kpiPos" style="color: var(--Mora)"><span class="smw_sk_kpi"></span></span>
          <span class="smw_kpi_lbl">Posición</span>
        </div>
      </section>

      <nav class="smw_quick_nav wi_fadeUp" style="animation-delay: 0.2s">
        ${QUICK_NAV.map((a, i) => `
          <a href="/${a.page}" class="smw_qcard nv_item" data-page="${a.page}" style="--qc:${a.col}; animation-delay: ${i * 0.05}s">
            <div class="smw_qcard_ico" style="--qc: ${a.col}"><i class="fas ${a.ico}"></i></div>
            <div class="smw_qcard_txt">
              <strong>${a.tit}</strong>
              <span>${a.sub}</span>
            </div>
            <i class="fas fa-arrow-right smw_qcard_arr"></i>
          </a>
        `).join('')}
      </nav>
    </div>
  `;
};

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

export const init = async () => {
  const user = wiAuth.user;
  const nombre = getNombre(user.nombre || user.usuario || '');
  const iniciales = `${(user.nombre || '?')[0]}${(user.apellidos || '')[0] || ''}`.toUpperCase();

  const avatarEl = document.getElementById('smwAvatar');
  if (avatarEl) avatarEl.textContent = iniciales;

  const saludoEl = document.getElementById('smwSaludo');
  if (saludoEl) saludoEl.innerHTML = `${Saludar()} <strong>${nombre}</strong>`;
  
  const roleEl = document.getElementById('smwRole');
  if (roleEl) {
    roleEl.innerHTML = user.descripcion
      ? `<i class="fas fa-user-tag"></i> ${user.descripcion}`
      : `<i class="fas fa-car-side"></i> Colaborador — Reto del Mes`;
  }

  const monthSelector = document.getElementById('smwMonthSelector');
  if (monthSelector) monthSelector.value = mesSeleccionado;

  _cargarKpis(user.usuario, mesSeleccionado);

  addDocListener('change', '#smwMonthSelector', function() {
    mesSeleccionado = this.value;
    _cargarKpis(user.usuario, mesSeleccionado);
  });

  document.querySelectorAll('.wi_fadeUp').forEach(el => {
    el.classList.add('visible', 'wi_visible');
  });

  console.log(`🏜️ ${app} Smile Dashboard cargado`);
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  listeners.forEach(({ type, wrapper }) => document.removeEventListener(type, wrapper));
  listeners.length = 0;
};

async function _cargarKpis(vendedor, mes) {
  try {
    const tEl = document.getElementById('kpiTours');
    const pEl = document.getElementById('kpiPuntos');
    const posEl = document.getElementById('kpiPos');
    if (tEl) tEl.innerHTML = '<span class="smw_sk_kpi"></span>';
    if (pEl) pEl.innerHTML = '<span class="smw_sk_kpi"></span>';
    if (posEl) posEl.innerHTML = '<span class="smw_sk_kpi"></span>';

    const cacheKey = `kpiSmile_${vendedor}_${mes}`;
    const cache = getls(cacheKey);
    if (cache) return _pintarKpis(cache);

    const [yr, mm] = mes.split('-').map(Number);
    const snap = await getDocs(collection(db, 'registrosdb'));

    let tours = 0, puntos = 0;
    snap.docs.forEach(d => {
      const v = d.data();
      if (v.vendedor !== vendedor) return;
      const f = v.fechaTour;
      let a, m;
      if (typeof f === 'string') { [a, m] = f.split('-').map(Number); }
      else if (f?.toDate) { const fd = f.toDate(); a = fd.getFullYear(); m = fd.getMonth() + 1; }
      else return;
      if (a === yr && m === mm) {
        tours += parseInt(v.qventa) || 1;
        puntos += parseInt(v.puntos) || 0;
      }
    });

    const ranking = await obtenerRankingMes(mes);
    const pos = ranking.findIndex(e => e.usuario === vendedor);
    const posicion = pos === -1 ? '—' : `#${pos + 1}`;

    const data = { tours, puntos, posicion };
    savels(cacheKey, data, 5);
    _pintarKpis(data);
  } catch (e) {
    console.warn('KPI error:', e);
    _pintarKpis({ tours: '?', puntos: '?', posicion: '?' });
  }
}

function _pintarKpis({ tours, puntos, posicion }) {
  const tEl = document.getElementById('kpiTours');
  const pEl = document.getElementById('kpiPuntos');
  const posEl = document.getElementById('kpiPos');
  if (tEl) tEl.textContent = tours;
  if (pEl) pEl.textContent = puntos;
  if (posEl) posEl.textContent = posicion;
}

function selectMes() {
  const hoy = new Date(), anio = hoy.getFullYear(), mes = hoy.getMonth();
  const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return Array.from({ length: 7 }, (_, i) => {
    const cada = i - 3, des = mes + cada, cyear = anio + Math.floor(des / 12), mesv = ((des % 12) + 12) % 12;
    const tval = `${cyear}-${String(mesv + 1).padStart(2, '0')}`;
    return `<option value="${tval}"${cada === 0 ? ' selected' : ''}>${meses[mesv]} ${cyear}</option>`;
  }).join('');
}
