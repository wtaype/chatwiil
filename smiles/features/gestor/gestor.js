import estilosGestor from './gestor.css?inline';
import { db } from '@core/firebase-db.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { wiAuth, getls, savels, removels, Saludar, getNombre } from '@core/widev/widev.js';
import Chart from 'chart.js/auto';

let chartInstancia = null;

const getMesActual = () => {
  const hoy = new Date();
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}`;
};

export const render = () => `
<style>${estilosGestor}</style>

  <div class="smw_gestor_view">
    
    <!-- HEADER HERO PREMIUM -->
    <header class="smw_g_hero wi_fadeUp">
      <div class="smw_g_hero_bg"></div>
      <div class="smw_g_hero_content">
        <div class="smw_g_profile">
          <div class="smw_g_avatar" id="smwGestorAvatar"></div>
          <div class="smw_g_saludo">
            <h1 id="smwGestorSaludo">Cargando...</h1>
            <p><i class="fas fa-crown"></i> Dirección General — Huacachina</p>
          </div>
        </div>
        <div class="smw_g_date_wrap">
          <button class="smw_refresh_btn" id="btnRefreshGestor" title="Actualizar Dashboard">
            <i class="fas fa-sync-alt"></i>
          </button>
          <div class="smw_g_date">
            <i class="fas fa-calendar-alt"></i> <span id="smwGestorMesLabel">Mes Actual</span>
          </div>
        </div>
      </div>
    </header>

    <!-- KPIs SUPERIORES -->
    <section class="smw_g_kpis wi_fadeUp" style="animation-delay: 0.1s">
      <div class="smw_g_kpi_card">
        <div class="smw_g_kpi_ico" style="--c: var(--Dulce)"><i class="fas fa-chart-line"></i></div>
        <div class="smw_g_kpi_data">
          <span>Ingresos Brutos</span>
          <strong id="kpiIngresos">S/ 0.00</strong>
        </div>
      </div>
      <div class="smw_g_kpi_card">
        <div class="smw_g_kpi_ico" style="--c: var(--Paz)"><i class="fas fa-piggy-bank"></i></div>
        <div class="smw_g_kpi_data">
          <span>Ganancia Neta</span>
          <strong id="kpiGanancias">S/ 0.00</strong>
        </div>
      </div>
      <div class="smw_g_kpi_card">
        <div class="smw_g_kpi_ico" style="--c: #F59E0B"><i class="fas fa-file-invoice-dollar"></i></div>
        <div class="smw_g_kpi_data">
          <span>Por Cobrar</span>
          <strong id="kpiDeuda">S/ 0.00</strong>
        </div>
      </div>
      <div class="smw_g_kpi_card">
        <div class="smw_g_kpi_ico" style="--c: var(--Cielo)"><i class="fas fa-ticket-alt"></i></div>
        <div class="smw_g_kpi_data">
          <span>Ventas Totales</span>
          <strong id="kpiVentas">0</strong>
        </div>
      </div>
    </section>

    <!-- BLOQUE CENTRAL: GRÁFICO + TOP -->
    <div class="smw_g_grid wi_fadeUp" style="animation-delay: 0.2s">
      
      <!-- Panel de Gráfico -->
      <div class="smw_g_panel smw_g_panel_chart">
        <div class="smw_g_panel_head">
          <h3><i class="fas fa-chart-area"></i> Flujo de Ingresos (S/)</h3>
          <span class="smw_badge_dulce">Mes Actual</span>
        </div>
        <div class="smw_g_chart_wrap">
          <canvas id="gestorChart"></canvas>
        </div>
      </div>

      <!-- Panel Lateral (Rankings) -->
      <div class="smw_g_side">
        <!-- Top Vendedores -->
        <div class="smw_g_panel">
          <div class="smw_g_panel_head">
            <h3><i class="fas fa-medal"></i> Top Vendedores</h3>
          </div>
          <div class="smw_g_list" id="smwGTopVendedores">
            <!-- Skeletons -->
            <div class="smw_g_sk_list"></div>
            <div class="smw_g_sk_list"></div>
            <div class="smw_g_sk_list"></div>
          </div>
        </div>

        <!-- Top Tours -->
        <div class="smw_g_panel">
          <div class="smw_g_panel_head">
            <h3><i class="fas fa-route"></i> Top Tours</h3>
          </div>
          <div class="smw_g_tours" id="smwGTopTours">
            <!-- Skeletons -->
            <div class="smw_g_sk_tour"></div>
            <div class="smw_g_sk_tour"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <section class="smw_g_actions wi_fadeUp" style="animation-delay: 0.3s">
      <a href="/rrhh" class="smw_g_action_btn" style="--c: var(--Mora)">
        <i class="fas fa-users-gear"></i>
        <span>Personal (RRHH)</span>
      </a>
      <a href="/precios" class="smw_g_action_btn" style="--c: var(--Oro)">
        <i class="fas fa-tags"></i>
        <span>Precios Catálogo</span>
      </a>
      <a href="/historial" class="smw_g_action_btn" style="--c: var(--Cielo)">
        <i class="fas fa-clipboard-list"></i>
        <span>Historial General</span>
      </a>
      <a href="/ranking" class="smw_g_action_btn" style="--c: #FF5C69">
        <i class="fas fa-trophy"></i>
        <span>Ranking del Mes</span>
      </a>
    </section>

  </div>
`;

const listeners = [];
const addDocListener = (type, selector, handler) => {
  const wrapper = e => {
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  };
  document.addEventListener(type, wrapper);
  listeners.push({ type, wrapper });
};

export const init = async () => {
  const user = wiAuth.user;
  const wi = getls('wiSmile');
  const nombre = getNombre(wi?.nombre || user.displayName || 'Gerente');
  const iniciales = nombre.substring(0,2).toUpperCase();

  const avatarEl = document.getElementById('smwGestorAvatar');
  if (avatarEl) avatarEl.textContent = iniciales;

  const saludoEl = document.getElementById('smwGestorSaludo');
  if (saludoEl) saludoEl.innerHTML = `${Saludar()} <strong>${nombre}</strong>`;
  
  const mesActual = getMesActual();
  const mesLabel = document.getElementById('smwGestorMesLabel');
  if (mesLabel) mesLabel.textContent = mesActual;

  document.querySelectorAll('.wi_fadeUp').forEach(el => {
    el.classList.add('visible', 'wi_visible');
  });
  
  _cargarDatosGerencia(mesActual);
  _bindEvents(mesActual);

  window.__WIREADY__ = true;
};

export const cleanup = () => {
  listeners.forEach(({ type, wrapper }) => document.removeEventListener(type, wrapper));
  listeners.length = 0;
  if (chartInstancia) {
    chartInstancia.destroy();
    chartInstancia = null;
  }
};

function _bindEvents(mesActual) {
  addDocListener('click', '#btnRefreshGestor', async function() {
    await _cargarDatosGerencia(mesActual, true);
  });
}

async function _cargarDatosGerencia(mes, forceRefresh = false) {
  const cacheKey = `gestor_data_${mes}`;
  const btnRefresh = document.getElementById('btnRefreshGestor');

  if (forceRefresh && btnRefresh) {
    btnRefresh.classList.add('spinning');
    removels(cacheKey);
  }

  try {
    let cached = getls(cacheKey);

    if (cached && !forceRefresh) {
      _procesarEImprimir(cached.ventas, cached.empleados);
    }

    const [snapVentas, snapEmp] = await Promise.all([
      getDocs(collection(db, 'registrosdb')),
      getDocs(query(collection(db, 'smiles'), where('participa', '==', 'si')))
    ]);

    const [yr, mm] = mes.split('-').map(Number);
    let ventas = [];

    snapVentas.forEach(d => {
      const v = { id: d.id, ...d.data() };
      const f = v.fechaTour;
      let a, m;
      if (typeof f === 'string') { [a, m] = f.split('-').map(Number); }
      else if (f?.toDate) { const fd = f.toDate(); a = fd.getFullYear(); m = fd.getMonth()+1; }
      else return;

      if (a === yr && m === mm) {
        ventas.push(v);
      }
    });

    const empleados = snapEmp.docs.map(d => ({ id: d.id, ...d.data() }));

    savels(cacheKey, { ventas, empleados }, 5); // Cache 5 mins

    _procesarEImprimir(ventas, empleados);

  } catch (error) {
    console.error("Error cargando dashboard:", error);
  } finally {
    if (btnRefresh) btnRefresh.classList.remove('spinning');
  }
}

function _procesarEImprimir(ventas, empleados) {
  let ingresos = 0, ganancias = 0, deuda = 0, qVentas = ventas.length;
  const ventasDiarias = {};
  const mapVendedores = {};
  const mapTours = {};

  ventas.forEach(v => {
    const imp = parseFloat(v.importeTotal) || 0;
    const gan = parseFloat(v.ganancia) || 0;
    
    ingresos += imp;
    ganancias += gan;
    
    if (v.estadoPago === 'cobrar') {
      deuda += imp;
    }
    const esPropio = v.estadoPago === 'pagado' || v.estadoPago === 'pagado2';
    if (!esPropio && v.pagoOperadorSiNo === 'no') {
      deuda += (parseFloat(v.PagoOperador) || 0);
    }

    // Ventas por día para el chart
    let dia = '01';
    const f = v.fechaTour;
    if (typeof f === 'string') dia = f.split('-')[2]?.substring(0,2) || '01';
    else if (f?.toDate) dia = String(f.toDate().getDate()).padStart(2,'0');

    ventasDiarias[dia] = (ventasDiarias[dia] || 0) + imp;

    // Vendedores
    mapVendedores[v.vendedor] = (mapVendedores[v.vendedor] || 0) + imp;

    // Tours
    const t = v.tipoTour || 'Otro';
    mapTours[t] = (mapTours[t] || 0) + 1;
  });

  // Pintar KPIs
  const kpiIngresos = document.getElementById('kpiIngresos');
  const kpiGanancias = document.getElementById('kpiGanancias');
  const kpiDeuda = document.getElementById('kpiDeuda');
  const kpiVentas = document.getElementById('kpiVentas');
  
  if (kpiIngresos) kpiIngresos.textContent = `S/ ${ingresos.toFixed(2)}`;
  if (kpiGanancias) kpiGanancias.textContent = `S/ ${ganancias.toFixed(2)}`;
  if (kpiDeuda) kpiDeuda.textContent = `S/ ${deuda.toFixed(2)}`;
  if (kpiVentas) kpiVentas.textContent = String(qVentas);

  // Pintar Top Vendedores
  const topV = Object.entries(mapVendedores).sort((a,b) => b[1] - a[1]).slice(0, 3);
  let htmlVendedores = topV.length ? topV.map(([u, val], i) => {
    const emp = empleados.find(e => e.usuario === u);
    const nom = emp?.nombre || u;
    const img = emp?.imagen || emp?.avatar || `${import.meta.env.BASE_URL}smile.avif`;
    const percent = ingresos > 0 ? ((val / ingresos) * 100).toFixed(1) : 0;
    
    return `
      <div class="smw_g_top_user">
        <div class="smw_g_tu_pos">${i+1}</div>
        <img src="${img}" class="smw_g_tu_img" onerror="this.src='${import.meta.env.BASE_URL}smile.avif'">
        <div class="smw_g_tu_info">
          <strong>${nom}</strong>
          <span>S/ ${val.toFixed(2)} (${percent}%)</span>
        </div>
      </div>
    `;
  }).join('') : '<p style="color:var(--tx3);font-size:13px;padding:10px">Aún no hay ventas</p>';
  
  const vendedoresEl = document.getElementById('smwGTopVendedores');
  if (vendedoresEl) vendedoresEl.innerHTML = htmlVendedores;

  // Pintar Top Tours
  const topT = Object.entries(mapTours).sort((a,b) => b[1] - a[1]).slice(0, 3);
  let maxTours = topT[0]?.[1] || 1;
  let htmlTours = topT.length ? topT.map(([t, count]) => {
    const w = (count / maxTours) * 100;
    return `
      <div class="smw_g_top_tour">
        <div class="smw_g_tt_head">
          <span>${t}</span>
          <strong>${count} pax</strong>
        </div>
        <div class="smw_g_tt_bar_wrap">
          <div class="smw_g_tt_bar" style="width: ${w}%"></div>
        </div>
      </div>
    `;
  }).join('') : '<p style="color:var(--tx3);font-size:13px;padding:10px">Aún no hay tours</p>';
  
  const toursEl = document.getElementById('smwGTopTours');
  if (toursEl) toursEl.innerHTML = htmlTours;

  // Pintar Chart
  const diasOrdenados = Object.keys(ventasDiarias).sort();
  const dataChart = diasOrdenados.map(d => ventasDiarias[d]);

  _initChart(diasOrdenados, dataChart);
}

function _initChart(labels, data) {
  const ctx = document.getElementById('gestorChart');
  if (!ctx) return;
  
  if (chartInstancia) chartInstancia.destroy();

  const colorDulce = getComputedStyle(document.documentElement).getPropertyValue('--Dulce').trim() || '#FF5C69';
  const colorBg = `color-mix(in srgb, ${colorDulce} 20%, transparent)`;

  chartInstancia = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.map(l => `Día ${l}`),
      datasets: [{
        label: 'Ingresos (S/)',
        data: data,
        borderColor: colorDulce,
        backgroundColor: colorBg,
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#fff',
        pointBorderColor: colorDulce,
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#fff',
          titleColor: '#000',
          bodyColor: '#666',
          borderColor: colorDulce,
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: function(context) { return 'S/ ' + context.parsed.y.toFixed(2); }
          }
        }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#999', font: {family: 'Outfit'} } },
        y: { 
          grid: { color: 'rgba(0,0,0,0.04)', borderDash: [5, 5] }, 
          ticks: { color: '#999', font: {family: 'Outfit'}, callback: (value) => 'S/ ' + value },
          beginAtZero: true 
        }
      }
    }
  });
}
