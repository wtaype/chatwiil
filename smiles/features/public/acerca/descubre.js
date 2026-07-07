import estilosDescubre from './descubre.css?inline';
import { app, version } from '@wii';
import { wiVista } from '@core/widev/widev.js';

export const render = () => `
<style>${estilosDescubre}</style>

<div class="dc_wrap">
  <div class="dc_hero wi_fadeUp" style="--d:0s">
    <div class="dc_badge"><i class="fas fa-lock"></i> Funciones Internas</div>
    <h1 class="dc_title">Control, Puntos y <span class="dc_grad">Comisiones</span></h1>
    <p class="dc_desc">Explora los módulos de ${app}. Una herramienta corporativa diseñada para empoderar a nuestros guías, transparentar sus ventas y registrar sus comisiones en Huacachina.</p>
  </div>
  
  <div class="dc_bento">
    <!-- Carta 1: Registro de Tours -->
    <div class="dc_card dc_c_large wi_fadeUp" style="--d:0.1s">
      <div class="dc_icon"><i class="fas fa-car-side"></i></div>
      <div class="dc_info">
        <h3>Registro de Tours</h3>
        <p>Sube tus ventas de buggies, sandboarding, Polaris y tours regionales en tiempo real directamente desde el campo de operaciones de forma inmediata.</p>
      </div>
      <div class="dc_visual">
        <div class="dc_graph">
          <div class="dc_bar"></div><div class="dc_bar"></div><div class="dc_bar"></div><div class="dc_bar"></div><div class="dc_bar"></div>
        </div>
      </div>
    </div>

    <!-- Carta 2: Comisiones -->
    <div class="dc_card wi_fadeUp" style="--d:0.2s">
      <div class="dc_icon" style="color:#E4405F; background:rgba(228,64,95,0.1);"><i class="fas fa-coins"></i></div>
      <div class="dc_info">
        <h3>Comisiones en vivo</h3>
        <p>Visualiza en tiempo real tus comisiones acumuladas, evitando cálculos manuales e incertidumbres al final del mes.</p>
      </div>
      <div class="dc_visual">
        <div class="dc_apps">
          <div class="dc_app"><i class="fas fa-percent"></i></div>
          <div class="dc_app"><i class="fas fa-wallet"></i></div>
          <div class="dc_app"><i class="fas fa-sack-dollar"></i></div>
          <div class="dc_app"><i class="fas fa-file-invoice-dollar"></i></div>
        </div>
      </div>
    </div>

    <!-- Carta 3: Ranking -->
    <div class="dc_card wi_fadeUp" style="--d:0.3s">
      <div class="dc_icon" style="color:#7000FF; background:rgba(112,0,255,0.1);"><i class="fas fa-trophy"></i></div>
      <div class="dc_info">
        <h3>Ranking por Puntos</h3>
        <p>Compite sanamente acumulando estrellas de rendimiento y lidera la tabla de guías para ganar bonos mensuales.</p>
      </div>
      <div class="dc_visual">
        <div class="dc_blocks">
          <div class="dc_block"></div>
          <div class="dc_block"></div>
          <div class="dc_block"></div>
        </div>
      </div>
    </div>

    <!-- Carta 4: Validaciones (Span 2) -->
    <div class="dc_card dc_c_large wi_fadeUp" style="--d:0.4s">
      <div class="dc_icon" style="color:#0EBEFF; background:rgba(14,190,255,0.1);"><i class="fas fa-user-check"></i></div>
      <div class="dc_info">
        <h3>Validación Administrativa</h3>
        <p>Cada registro de tour pasa por un riguroso proceso de revisión por parte del supervisor de Huacachina para asegurar la veracidad del ticket de venta y evitar fraudes.</p>
      </div>
      <div class="dc_visual">
        <div class="dc_colors">
          <div class="dc_color"></div><div class="dc_color"></div><div class="dc_color"></div><div class="dc_color"></div>
        </div>
      </div>
    </div>

    <!-- Carta 5: Confidencialidad -->
    <div class="dc_card wi_fadeUp" style="--d:0.5s">
      <div class="dc_icon" style="color:#29C72E; background:rgba(41,199,46,0.1);"><i class="fas fa-shield-halved"></i></div>
      <div class="dc_info">
        <h3>Datos Sensibles</h3>
        <p>Toda la información del sistema es de carácter confidencial y uso estrictamente interno. Está prohibido exportar o mostrar datos a externos.</p>
      </div>
      <div class="dc_visual">
        <div class="dc_pay">
          <div class="dc_pay_top"></div>
          <div class="dc_pay_bot"><div></div><div></div></div>
        </div>
      </div>
    </div>

    <!-- Carta 6: Soporte e Incidencias (Span 2) -->
    <div class="dc_card dc_c_large wi_fadeUp" style="--d:0.6s">
      <div class="dc_icon" style="color:#FF8C00; background:rgba(255,140,0,0.1);"><i class="fas fa-headset"></i></div>
      <div class="dc_info">
        <h3>Soporte e Incidencias</h3>
        <p>¿Tuviste un error al ingresar un número de ticket o no aparece tu comisión aprobada? Notifícalo directamente al equipo de administración para corregirlo.</p>
      </div>
      <div class="dc_visual">
        <div class="dc_form">
          <div></div><div></div><div></div><div></div>
        </div>
      </div>
    </div>
  </div>

  <div class="dc_cta wi_fadeUp" style="--d:0.8s">
    <a href="/login" class="dc_cta_btn"><i class="fas fa-lock"></i> Iniciar Sesión de Trabajo</a>
  </div>
</div>
`;

export const init = () => {
  wiVista('.wi_fadeUp', null, { anim: 'wi_fadeUp', stagger: 80 });
  console.log(`🚀 ${app} ${version} · Descubre OK`);
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  console.log('🧹 Descubre limpiado');
};