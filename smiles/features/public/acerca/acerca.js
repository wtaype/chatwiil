import estilosAcerca from './acerca.css?inline';
import { app, version, by, linkme } from '@wii';
import { year, wiTip, wicopy } from '@core/widev/widev.js';

// ============================================================
// 🎨 RENDER
// ============================================================
export const render = () => `
<style>${estilosAcerca}</style>

<main id="wimain">
<div class="ac_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_logo">
        <img src="/smile.avif" alt="${app}" loading="lazy">
      </div>
      <div class="ac_hero_badge"><i class="fas fa-lock"></i> Canal Interno Restringido</div>
      <h1 class="ac_hero_tit">${app}</h1>
      <p class="ac_hero_sub">
        Herramienta corporativa para el registro de ventas, cálculo de comisiones y gamificación 
        de los guías y promotores turísticos en <strong>Huacachina, Ica.</strong>
      </p>
      <div class="ac_hero_stats">
          <div class="ac_stat" style="--sc:#0EBEFF">
            <i class="fas fa-shield-halved" style="color:#0EBEFF"></i>
            <strong>100%</strong>
            <span>Confidencial</span>
          </div>
          <div class="ac_stat" style="--sc:#FF5C69">
            <i class="fas fa-chart-line" style="color:#FF5C69"></i>
            <strong>Ventas</strong>
            <span>Comisiones reales</span>
          </div>
          <div class="ac_stat" style="--sc:#29C72E">
            <i class="fas fa-user-check" style="color:#29C72E"></i>
            <strong>Revisado</strong>
            <span>Auditoría activa</span>
          </div>
          <div class="ac_stat" style="--sc:#7000FF">
            <i class="fas fa-star" style="color:#7000FF"></i>
            <strong>Puntos</strong>
            <span>Premios mensuales</span>
          </div>
      </div>
      <div class="ac_hero_btns">
        <a href="/smile" class="ac_btn_p"><i class="fas fa-list-check"></i> Registrar Mis Ventas</a>
        <button class="ac_btn_s" id="ac_compartir"><i class="fas fa-share-nodes"></i> Compartir App</button>
      </div>
      <div class="ac_hero_scroll"><i class="fas fa-chevron-down"></i></div>
    </div>
  </section>

  <!-- ══ COUNTER BAND ══ -->
  <div class="ac_counter_band">
    <div class="ac_counter_item">
      <span class="ac_counter_num" data-target="100">100</span><span>%</span>
      <p>Seguridad de datos</p>
    </div>
    <div class="ac_counter_sep"></div>
    <div class="ac_counter_item">
      <span class="ac_counter_num" data-target="18">18</span>
      <p>Tours autorizados</p>
    </div>
    <div class="ac_counter_sep"></div>
    <div class="ac_counter_item">
      <span>∞</span>
      <p>Esfuerzo en equipo</p>
    </div>
    <div class="ac_counter_sep"></div>
    <div class="ac_counter_item">
      <span class="ac_counter_num" data-target="2026">2026</span>
      <p>Sistema auditado</p>
    </div>
  </div>

  <!-- ══ NUESTRA HISTORIA ══ -->
  <section class="ac_sec">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-circle-info"></i> Uso Administrativo</div>
      <h2 class="ac_sec_tit">El propósito de <span class="ac_grad">${app}</span></h2>
    </div>
    <div class="ac_historia wi_fadeUp">
      <p><strong>${app}</strong> es una plataforma interna exclusiva diseñada para optimizar y transparentar el registro de los tours vendidos y ejecutados por nuestro equipo de guías y agentes comerciales en la región de Ica-Huacachina.</p>
      
      <p>Nuestra misión principal es brindar a los colaboradores una herramienta digital en la cual puedan ingresar de forma rápida y sencilla los servicios prestados (paseos en buggies areneros 4x4, práctica de sandboarding, recorridos vinícolas y excursiones regionales) obteniendo el cálculo automatizado de sus comisiones y puntos acumulados para las competencias de incentivos.</p>
      
      <p>Debido a la naturaleza de las operaciones comerciales, rutas, precios de los servicios y comisiones de los colaboradores, <strong>toda la información registrada dentro de esta aplicación es sensible y de propiedad corporativa</strong>. Se prohíbe terminantemente su divulgación o exposición ante personas externas a la empresa.</p>

      <p>Todo el sistema es auditado activamente por la oficina administrativa de turismo en Huacachina, garantizando la seguridad en el pago de tus comisiones y la legitimidad del ranking mensual de colaboradores.</p>

      <div class="ac_firma">
        <strong>Administración y Desarrollo</strong>
        <span>Ica - Huacachina, Perú</span>
      </div>
    </div>
  </section>

</div></main>
`;

// ============================================================
// 🔢 COUNTER ANIMATION
// ============================================================
const animateCounters = () => {
  document.querySelectorAll('.ac_counter_num').forEach(el => {
    const targetVal = el.getAttribute('data-target');
    if (!targetVal) return;
    
    const target = parseInt(targetVal);
    const duration = 2000;
    let start = null;
    
    const step = ts => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(ease * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
};

// ============================================================
// ⚡ INIT
// ============================================================
let shareListener = null;

export const init = () => {
  // Animación de entrada para los elementos wi_fadeUp
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.wi_fadeUp').forEach(el => {
    observer.observe(el);
  });

  // Contadores al entrar en vista
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const band = document.querySelector('.ac_counter_band');
  if (band) counterObserver.observe(band);

  // Compartir
  const shareBtn = document.getElementById('ac_compartir');
  if (shareBtn) {
    shareListener = () => {
      const url = window.location.origin;
      if (navigator.share) {
        navigator.share({ title: app, text: `🔒 Acceso interno de ${app} - Plataforma de Ventas.`, url }).catch(() => {});
      } else {
        wicopy(url, shareBtn, '¡Link copiado!');
      }
    };
    shareBtn.addEventListener('click', shareListener);
  }

  // Tooltips
  if (window.wiInitTips) window.wiInitTips();

  console.log(`🔒 ${app} Acerca actualizado`);
  window.__WIREADY__ = true;
};

export const cleanup = () => {
  const shareBtn = document.getElementById('ac_compartir');
  if (shareBtn && shareListener) {
    shareBtn.removeEventListener('click', shareListener);
  }
};