import estilosInicio from './inicio.css?inline';
import { app, version, by, linkme } from '@wii';
import { wiVista, year, wiTip, Saludar, getls } from '@core/widev/widev.js';

// ── DATA ──────────────────────────────────────────────────────
const roles = [
  'Asistente de IA Inteligente',
  'Soporte para Estudiantes',
  'Guía para Trabajadores',
  'Aliado para Empresas',
  'Consejos Cristianos y Empatía'
];

const stats = [
  { valor: 100,  label: 'Gratuito y Veloz',        sufijo: '%' },
  { valor: 10,   label: 'Limpio y Sin Distracciones', sufijo: '/10' },
];

const features = [
  { id: 'ia_rapida',  icon: 'fa-bolt', color: '#0EBEFF', nombre: 'IA Ultra Rápida',  desc: 'Respuestas al instante con el motor más veloz',
    items: [{ icon: 'fa-gauge-high', name: 'Velocidad Máxima', desc: 'Respuestas en milisegundos sin demoras' }, { icon: 'fa-wind', name: 'Interfaz Limpia', desc: 'Sin anuncios ni distracciones visuales' }, { icon: 'fa-microchip', name: 'Modelos Optimistas', desc: 'Enfoque positivo en cada consulta' }] },
  { id: 'estudiantes', icon: 'fa-graduation-cap', color: '#7000FF', nombre: 'Soporte Estudiantil', desc: 'Tutoría y ayuda académica personalizada',
    items: [{ icon: 'fa-book-open', name: 'Explicaciones Claras', desc: 'Conceptos complejos explicados a tu nivel' }, { icon: 'fa-spell-check', name: 'Resúmenes Eficientes', desc: 'Sintetiza lecturas largas al instante' }, { icon: 'fa-brain', name: 'Tutor de Aprendizaje', desc: 'Ejemplos prácticos y guías de estudio' }] },
  { id: 'trabajadores', icon: 'fa-briefcase', color: '#FF8F00', nombre: 'Productividad Laboral', desc: 'Impulsa tu rendimiento diario en el trabajo',
    items: [{ icon: 'fa-envelope-open-text', name: 'Redacción de Correos', desc: 'Mensajes profesionales en segundos' }, { icon: 'fa-file-invoice', name: 'Estructuración de Informes', desc: 'Formatos listos para tus reportes' }, { icon: 'fa-lightbulb', name: 'Lluvia de Ideas', desc: 'Soluciones creativas a desafíos diarios' }] },
  { id: 'empresas', icon: 'fa-building', color: '#388E3C', nombre: 'Aliado Empresarial', desc: 'Optimiza procesos y flujos en tu negocio',
    items: [{ icon: 'fa-chart-pie', name: 'Análisis Inteligente', desc: 'Interpretación rápida de textos e ideas' }, { icon: 'fa-shuffle', name: 'Automatización Básica', desc: 'Agiliza tareas repetitivas' }, { icon: 'fa-lock', name: 'Espacio Seguro', desc: 'Seguridad y privacidad para tu información' }] },
  { id: 'cristianos', icon: 'fa-cross', color: '#FFDA34', nombre: 'Consejos Cristianos', desc: 'Soporte espiritual y principios de fe',
    items: [{ icon: 'fa-bible', name: 'Mensajes de Fe', desc: 'Reflexiones y aliento espiritual diario' }, { icon: 'fa-heart', name: 'Valores y Principios', desc: 'Respuestas basadas en valores éticos y cristianos' }, { icon: 'fa-peace', name: 'Paz Mental', desc: 'Enfoque centrado en la serenidad y la oración' }] },
  { id: 'empatia', icon: 'fa-hand-holding-heart', color: '#FF5C69', nombre: 'Empatía y Positivismo', desc: 'Un apoyo amigable con la mejor actitud',
    items: [{ icon: 'fa-smile-beam', name: 'Enfoque Positivo', desc: 'Buscamos siempre ver el lado bueno de todo' }, { icon: 'fa-hands-helping', name: 'Escucha Activa', desc: 'Soporte emocional y tono de voz cálido' }, { icon: 'fa-sun', name: 'Motivación Diaria', desc: 'Frases y consejos para empezar bien el día' }] }
];

const beneficios = [
  { icon: 'fa-bolt', titulo: 'Más Veloz y Limpio', desc: 'Diseñado desde cero para ser más rápido que otras alternativas tradicionales, con una interfaz limpia, libre de distracciones y publicidad.' },
  { icon: 'fa-hand-holding-heart', titulo: 'Empatía y Valores', desc: 'Un espacio seguro que no solo te ayuda a resolver tus dudas, sino que te brinda un apoyo bonito de empatía, consejos de fe y siempre viendo el lado positivo de todo.' },
  { icon: 'fa-circle-check', titulo: 'Accesible y Versátil', desc: 'Ideal para estudiantes, trabajadores, profesionales y empresas que buscan potenciar su productividad diaria con la mejor tecnología de inteligencia artificial.' }
];

// ── PLANTILLAS ────────────────────────────────────────────────
const tplStat = s => `
  <div class="ini_stat">
    <div class="ini_stat_n" data-target="${s.valor}" data-sufijo="${s.sufijo}">0</div>
    <div class="ini_stat_l">${s.label}</div>
  </div>`;

const tplFeature = f => `
  <div class="ini_cat_card ${f.id}">
    <div class="ini_cat_bar"></div>
    <div class="ini_cat_top">
      <div class="ini_cat_ico"><i class="fas ${f.icon}"></i></div>
      <div class="ini_cat_info"><h3>${f.nombre}</h3><p>${f.desc}</p></div>
    </div>
    <ul class="ini_cat_tools">
      ${f.items.map(it=>`
        <li><div class="ini_tool_a">
          <i class="fas ${it.icon}"></i>
          <div><strong>${it.name}</strong><span>${it.desc}</span></div>
          <i class="fas fa-check ini_ext" style="color:var(--success)"></i>
        </div></li>`).join('')}
    </ul>
  </div>`;

const tplBeneficio = b => `
  <div class="ini_about_card">
    <div class="ini_card_ico"><i class="fas ${b.icon}"></i></div>
    <h3>${b.titulo}</h3>
    <p>${b.desc}</p>
  </div>`;

// ── RENDER ────────────────────────────────────────────────────
export const render = () => `
<style>${estilosInicio}</style>

<div class="ini_wrap">

  <!-- ===== HERO ===== -->
  <section class="ini_hero">
    <div class="ini_hero_content">

      <div class="ini_saludo">
        <span>${Saludar()} Bienvenido a </span><span class="ini_wave_icon"><i class="fa-regular fa-hand"></i></span>
      </div>

      <h1 class="ini_titulo">
        Tu Asistente de IA <span class="ini_grad">Inteligente, Veloz y Limpio</span>
      </h1>

      <div class="ini_roles">
        ${roles.map((r,i)=>`<span class="ini_role${i===0?' active':''}">${r}</span>`).join('')}
      </div>

      <p class="ini_sub">
        Soporte inteligente y empático para estudiantes, trabajadores y empresas. Encuentra consejos cristianos, respuestas claras y siempre la mejor actitud para ver el lado positivo de todo.
      </p>

      <div class="ini_stats" id="in_stats">
        ${stats.map(tplStat).join('')}
      </div>

      <div class="ini_btns">
        <a href="/login" class="ini_btn_p ini_auth_btn"><i class="fas fa-rocket"></i> Iniciar Sesión</a>
        <a href="#beneficios" class="ini_btn_s"><i class="fas fa-arrow-down"></i> Saber Más</a>
      </div>

    </div>

    <!-- Derecha: Asistente IA sonriente y positivo -->
    <div class="ini_hero_visual">
      <div class="ini_grid_pattern"></div>
      
      <div class="ini_smile_avatar_box">
        <div class="ini_avatar_ring"></div>
        <img src="/smile.avif" alt="${app} Mascot" class="ini_avatar_img" />
      </div>

      <div class="ini_mini_bubble">
        <span class="ini_bubble_dot"></span>
        <p>¡Hola! ¿Qué creamos hoy?</p>
      </div>

      <div class="ini_ftech ini_ft1" ${wiTip('IA Rápida')}><i class="fas fa-bolt"></i></div>
      <div class="ini_ftech ini_ft2" ${wiTip('Estudiar')}><i class="fas fa-graduation-cap"></i></div>
      <div class="ini_ftech ini_ft3" ${wiTip('Consejos')}><i class="fas fa-cross"></i></div>
      <div class="ini_ftech ini_ft4" ${wiTip('Empatía')}><i class="fas fa-hand-holding-heart"></i></div>
    </div>
  </section>

  <!-- ===== FUNCIONALIDADES ===== -->
  <section class="ini_cats_sec" id="beneficios">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">Potencia tu Vida con <span class="ini_grad">${app}</span></h2>
      <div class="ini_sec_line"></div>
      <p class="ini_sec_desc">Inteligencia artificial al servicio de tu crecimiento personal, académico y profesional</p>
    </div>
    <div class="ini_cats_grid">${features.map(tplFeature).join('')}</div>
  </section>

  <!-- ===== ¿POR QUÉ? ===== -->
  <section class="ini_about_sec">
    <div class="ini_sec_head">
      <h2 class="ini_sec_tit">¿Qué beneficios tenemos al usar <span class="ini_grad">${app}?</span></h2>
      <div class="ini_sec_line"></div>
    </div>
    <div class="ini_about_grid">${beneficios.map(tplBeneficio).join('')}</div>
  </section>

  <!-- ===== CTA ===== -->
  <section class="ini_cta_sec">
    <div class="ini_cta_wrap">
      <i class="fas fa-bolt ini_cta_ico"></i>
      <h2>¿Listo para experimentar una IA más limpia y rápida?</h2>
      <p>Accede de forma gratuita y empieza a optimizar tu tiempo con un enfoque positivo.</p>
      <div class="ini_cta_chips">
        <a href="/login" class="ini_btn_p ini_auth_btn"><i class="fas fa-arrow-right"></i> Entrar a la plataforma</a>
      </div>
      <p class="ini_cta_autor">Creado con <i class="fas fa-heart ini_heart"></i> por <a href="${linkme}" target="_blank" rel="noopener">${by}</a> · ${version} © ${year()}</p>
    </div>
  </section>

</div>`;

// ── INIT ──────────────────────────────────────────────────────
export const init = () => {
  // 1. Efecto escribir en los roles (máquina de escribir ultra optimizada)
  const rolesEls = document.querySelectorAll('.ini_role');
  let activeIdx = 0;
  
  const rotateRoles = () => {
    if (rolesEls.length === 0) return;
    rolesEls.forEach(el => el.classList.remove('active'));
    activeIdx = (activeIdx + 1) % rolesEls.length;
    rolesEls[activeIdx].classList.add('active');
  };
  const interval = setInterval(rotateRoles, 4000);

  // 2. Animación de números en estadísticas (solo si entra en pantalla)
  const countStats = () => {
    const statEls = document.querySelectorAll('.ini_stat_n');
    statEls.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target'));
      const sufijo = el.getAttribute('data-sufijo') || '';
      let current = 0;
      const step = target / 30; // 30 pasos de animación
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.round(current) + sufijo;
      }, 30);
    });
  };

  // Observador de vista para estadísticas
  wiVista('#in_stats', countStats);

  // Observador para animaciones de tarjetas de funcionalidades y beneficios
  wiVista('.ini_cat_card', null, { anim: 'wi_fadeUp', stagger: 100 });
  wiVista('.ini_about_card', null, { anim: 'wi_fadeUp', stagger: 140 });

  // 3. Modificación dinámica de sesión/autenticación
  const wi = getls('wiSmile');
  if (wi) {
    const ROL_PATH = {
      smile: '/registrar',
      gestor: '/gestor',
      admin: '/admin'
    };
    const userPath = ROL_PATH[wi.rol] || '/smile';
    const authBtnEls = document.querySelectorAll('.ini_auth_btn');
    authBtnEls.forEach(btn => {
      btn.innerHTML = '<i class="fas fa-user-gear"></i> Ir a mi Panel';
      btn.setAttribute('href', userPath);
    });
  }

  // Guardar intervalo para limpieza
  window._iniInterval = interval;
};

export const cleanup = () => {
  if (window._iniInterval) {
    clearInterval(window._iniInterval);
    delete window._iniInterval;
  }
};