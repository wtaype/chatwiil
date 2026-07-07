import estilosAcerca from './acerca.css?inline';
import estilosContacto from './contacto.css?inline';
import { app } from '@wii';
import { Notificacion, wiSpin, wiVista, wicopy, wiSmart } from '@core/widev/widev.js';

// ── Configuración EmailJS ──────────────────────────────────────────────────────
const EJS = {
  pub: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  sid: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  tid: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
};
wiSmart({
  js: [() => import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js')],
});

// ── Datos de contacto interno ─────────────────────────────────────────────────
const INFO = [
  { ico: 'fa-envelope',     color: '#0EBEFF', label: 'Email Soporte', value: 'soporte.interno@retodelmes.com', copiable: true  },
  { ico: 'fa-map-marker-alt', color: '#FF5C69', label: 'Oficina Principal', value: 'Huacachina, Ica, Perú',              copiable: false },
  { ico: 'fa-clock',        color: '#29C72E', label: 'Atención', value: 'Lun-Sáb 9am - 6pm',           copiable: false },
];

const ASUNTOS = [
  'Duda con puntos de ranking',
  'Error en cálculo de comisiones',
  'Venta no cargada o sin validar',
  'Problema con cuenta o credenciales',
  'Sugerencia técnica de la app',
  'Reportar error de sistema',
  'Otro motivo interno',
];

const FAQ = [
  { q: '¿Quién evalúa las solicitudes de cuenta?', r: 'El equipo administrativo y de recursos humanos evalúa y aprueba cada registro de usuario tras validar su contrato laboral activo.' },
  { q: '¿Cuánto tardan en aprobarse mis ventas registradas?', r: 'La validación de comprobantes se realiza diariamente. Generalmente tus puntos y comisiones se confirman en un plazo máximo de 12 a 24 horas.' },
  { q: '¿Es obligatorio registrar los tours en tiempo real?', r: 'Sí, se recomienda ingresar cada tour inmediatamente después de finalizado el servicio para agilizar la conciliación de cuotas de carros areneros y de comisiones.' },
  { q: '¿Qué hago si registré un dato erróneo?', r: 'Envía un mensaje mediante este formulario seleccionando el asunto "Venta no cargada o sin validar" detallando el número de ticket y la corrección requerida.' },
];

const MAX_CHARS = 500;

// ── Anti-spam: timestamp del último envío (localStorage) ──────────────────────
const SPAM_KEY  = 'wi_ct_last';
const SPAM_WAIT = 60 * 1000; // 1 minuto entre envíos

const puedeEnviar = () => {
  const last = parseInt(localStorage.getItem(SPAM_KEY) || '0', 10);
  return Date.now() - last > SPAM_WAIT;
};
const marcarEnvio = () => localStorage.setItem(SPAM_KEY, String(Date.now()));

// ── Estado ─────────────────────────────────────────────────────────────────────
let _obs = [];

// ── Render ─────────────────────────────────────────────────────────────────────
export const render = () => `
<style>${estilosAcerca}</style>
<style>${estilosContacto}</style>

<main id="wimain">
<div class="ac_wrap ct_wrap">

  <!-- ══ HERO ══ -->
  <section class="ac_hero ct_hero">
    <div class="ac_hero_orb ac_orb1"></div>
    <div class="ac_hero_orb ac_orb2"></div>
    <div class="ac_hero_orb ac_orb3"></div>
    <div class="ac_hero_body">
      <div class="ac_hero_badge"><i class="fas fa-lock"></i> Canal de Soporte Corporativo</div>
      <h1 class="ac_hero_tit">Contacto e<br><span class="ac_grad">Incidencias 🛠️</span></h1>
      <p class="ac_hero_sub">
        ¿Tienes problemas con tus comisiones, validación de tours o acceso a tu cuenta?
        <strong>La administración está aquí para asistirte.</strong>
      </p>
      <div class="tm_hero_chips">
        <span class="tm_chip"><i class="fas fa-clock"></i> Respuesta: Lun-Sáb</span>
        <span class="tm_chip"><i class="fas fa-lock"></i> Canal Confidencial</span>
        <span class="tm_chip"><i class="fas fa-shield-halved"></i> Solo personal autorizado</span>
      </div>
    </div>
  </section>

  <!-- ══ GRID: FORM + INFO ══ -->
  <section class="ac_sec ct_sec">
    <div class="ct_grid">

      <!-- Formulario -->
      <div class="ct_form_wrap">
        <div class="ac_sec_head" style="text-align:left;margin-bottom:4vh">
          <div class="ac_sec_badge"><i class="fas fa-comment-dots"></i> Formulario de Incidencias</div>
          <h2 class="ac_sec_tit">Reportar <span class="ac_grad">un problema</span></h2>
        </div>
        <form id="ctForm" class="ct_form" novalidate autocomplete="off">
          <!-- Honeypot anti-bot (invisible) -->
          <input type="text" name="ct_honey" id="ct_honey" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0">

          <div class="ct_field">
            <label for="ct_nombre"><i class="fas fa-user"></i> Nombre del Colaborador</label>
            <input type="text" id="ct_nombre" name="from_name" placeholder="Tu nombre completo" required maxlength="80">
          </div>
          <div class="ct_field">
            <label for="ct_email"><i class="fas fa-envelope"></i> Email Corporativo/Personal</label>
            <input type="email" id="ct_email" name="email" placeholder="tu@empresa.com" required maxlength="120">
          </div>
          <div class="ct_field">
            <label for="ct_telefono"><i class="fas fa-phone"></i> Celular</label>
            <input type="tel" id="ct_telefono" name="telefono" placeholder="Tu número de contacto" maxlength="20">
          </div>
          <div class="ct_field">
            <label for="ct_asunto"><i class="fas fa-tag"></i> Asunto o Incidencia</label>
            <select id="ct_asunto" name="asunto" required>
              <option value="">Selecciona un motivo</option>
              ${ASUNTOS.map(a => `<option value="${a}">${a}</option>`).join('')}
            </select>
          </div>
          <div class="ct_field">
            <label for="ct_mensaje"><i class="fas fa-comment-dots"></i> Detalles de la Incidencia</label>
            <textarea id="ct_mensaje" name="message" rows="6" placeholder="Describe los detalles (Nº ticket de tour, fecha, tour específico, etc.)" required maxlength="${MAX_CHARS}"></textarea>
            <div class="ct_chars"><span id="ct_count">0</span> / ${MAX_CHARS}</div>
          </div>

          <div class="ct_actions">
            <button type="submit" class="ac_btn_p ct_btn_submit" id="ct_submit">
              <i class="fas fa-paper-plane"></i> <span>Enviar Reporte</span>
            </button>
            <button type="reset" class="ac_btn_s">
              <i class="fas fa-redo"></i> <span>Limpiar</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Info -->
      <div class="ct_info_wrap">
        <div class="ct_info_card wi_fadeUp">
          <h3><i class="fas fa-address-card"></i> Información de Contacto</h3>
          <div class="ct_info_items">
            ${INFO.map(it => `
              <div class="ct_info_item">
                <div class="ct_info_ico" style="background:color-mix(in srgb,${it.color} 15%,transparent);color:${it.color}">
                  <i class="fas ${it.ico}"></i>
                </div>
                <div class="ct_info_data">
                  <span class="ct_info_label">${it.label}</span>
                  <span class="ct_info_value">${it.value}</span>
                </div>
                ${it.copiable ? `<button class="ct_copy" data-copy="${it.value}" title="Copiar"><i class="fas fa-copy"></i></button>` : ''}
              </div>`).join('')}
          </div>
        </div>

        <div class="ct_info_card wi_fadeUp" style="margin-top:3vh">
          <h3><i class="fas fa-shield-halved"></i> Confidencialidad de la Información</h3>
          <div style="font-size:0.8rem; color:var(--tx-muted); line-height:1.6; padding:12px;">
            Este formulario de soporte e información enviada se procesa internamente mediante servidores seguros. 
            Toda la información referente a transacciones, números de ticket y comisiones de ventas es confidencial 
            y no se comparte con terceros.
          </div>
        </div>
      </div>

    </div>
  </section>

  <!-- ══ FAQ ══ -->
  <section class="ac_sec ac_sec_alt">
    <div class="ac_sec_head">
      <div class="ac_sec_badge"><i class="fas fa-circle-question"></i> Dudas de Guías</div>
      <h2 class="ac_sec_tit">Preguntas <span class="ac_grad">Frecuentes</span></h2>
    </div>
    <div class="ct_faq">
      ${FAQ.map((f, i) => `
        <div class="ct_faq_item wi_fadeUp" id="faq_${i}">
          <div class="ct_faq_q">
            <i class="fas fa-circle-question"></i>
            <h3>${f.q}</h3>
            <i class="fas fa-chevron-down ct_faq_arr"></i>
          </div>
          <div class="ct_faq_a"><p>${f.r}</p></div>
        </div>`).join('')}
    </div>
  </section>

</div></main>`;

// Eventos listeners Vanilla
const listeners = [];
const addDocListener = (events, selector, handler) => {
  events.split(/\s+/).forEach(type => {
    const wrapper = e => {
      const target = e.target.closest(selector);
      if (target) handler.call(target, e);
    };
    document.addEventListener(type, wrapper);
    listeners.push({ type, wrapper });
  });
};

const val = id => {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
};

// ── Init ──────────────────────────────────────────────────────────────────────
export const init = () => {
  // Contador de caracteres
  addDocListener('input', '#ct_mensaje', function () {
    const v = this.value;
    if (v.length > MAX_CHARS) this.value = v.slice(0, MAX_CHARS);
    const countEl = document.getElementById('ct_count');
    if (countEl) countEl.textContent = Math.min(v.length, MAX_CHARS);
  });

  // Reset → limpiar contador
  addDocListener('reset', '#ctForm', () => {
    setTimeout(() => {
      const countEl = document.getElementById('ct_count');
      if (countEl) countEl.textContent = '0';
    }, 10);
  });

  // Envío del formulario
  addDocListener('submit', '#ctForm', async function (e) {
    e.preventDefault();

    // honeypot
    const honey = document.getElementById('ct_honey');
    if (honey?.value) return;

    if (!puedeEnviar()) {
      Notificacion('Espera un momento antes de enviar otro mensaje.', 'warning');
      return;
    }

    const nombre   = val('ct_nombre');
    const email    = val('ct_email');
    const telefono = val('ct_telefono') || 'No especificado';
    const asunto   = val('ct_asunto');
    const mensaje  = val('ct_mensaje');

    if (nombre.length < 3)                                return Notificacion('El nombre debe tener al menos 3 caracteres.', 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))       return Notificacion('Ingresa un email válido.', 'error');
    if (!asunto)                                          return Notificacion('Selecciona una incidencia.', 'error');
    if (mensaje.length < 10)                              return Notificacion('El mensaje debe tener al menos 10 caracteres.', 'error');

    const btnSubmit = document.getElementById('ct_submit');
    wiSpin(btnSubmit, true, 'Enviando…');

    try {
      if (typeof window.emailjs === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('No se pudo cargar EmailJS'));
          document.head.appendChild(script);
        });
      }
      
      window.emailjs.init(EJS.pub);

      await window.emailjs.send(EJS.sid, EJS.tid, {
        nombre:   nombre,
        email:    email,
        telefono: telefono,
        asunto:   asunto,
        mensaje:  mensaje,
        app_name: app,
      });

      marcarEnvio();
      Notificacion('¡Incidencia enviada al Administrador! Se procesará a la brevedad. 🛠️', 'success', 4500);
      this.reset();
      const countEl = document.getElementById('ct_count');
      if (countEl) countEl.textContent = '0';
    } catch (err) {
      console.error('[contacto] EmailJS error:', err);
      Notificacion('No se pudo enviar el mensaje. Intenta de nuevo.', 'error');
    } finally {
      wiSpin(btnSubmit, false, 'Enviar Reporte');
    }
  });

  // Copiar datos de contacto
  addDocListener('click', '.ct_copy', function () {
    const copyText = this.getAttribute('data-copy');
    wicopy(copyText, this, '¡Copiado!');
  });

  // FAQ acordeón
  addDocListener('click', '.ct_faq_q', function () {
    const item = this.closest('.ct_faq_item');
    if (!item) return;
    const isOpen = item.classList.contains('active');
    
    document.querySelectorAll('.ct_faq_item').forEach(el => {
      el.classList.remove('active');
      const ans = el.querySelector('.ct_faq_a');
      if (ans) ans.style.display = 'none';
      const arr = el.querySelector('.ct_faq_arr');
      if (arr) arr.classList.remove('rotated');
    });
    
    if (!isOpen) {
      item.classList.add('active');
      const ans = item.querySelector('.ct_faq_a');
      if (ans) ans.style.display = 'block';
      const arr = item.querySelector('.ct_faq_arr');
      if (arr) arr.classList.add('rotated');
    }
  });

  _obs.push(wiVista('.wi_fadeUp', (el) => el.classList.add('visible')));
  _obs.push(wiVista('.ct_faq_item', (el, i) => setTimeout(() => el.classList.add('visible'), i * 80)));

  console.log(`📩 ${app} Soporte Contacto cargado`);
  window.__WIREADY__ = true;
};

// ── Cleanup ───────────────────────────────────────────────────────────────────
export const cleanup = () => {
  listeners.forEach(({ type, wrapper }) => document.removeEventListener(type, wrapper));
  listeners.length = 0;
  _obs.forEach(o => o?.disconnect?.()); _obs = [];
};
