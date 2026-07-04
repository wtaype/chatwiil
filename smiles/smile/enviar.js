// smiles/smile/enviar.js
// ChatWii Remote — Página de envío de mensajes desde chatwii-web
// Escribe en Firestore colección "parati" / doc {uid}

import './enviar.css';
import { db } from '../firebase.js';
import { doc, setDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { wiAuth, Mensaje } from '../widev/widev.js';

// ── Sugerencias rápidas ──────────────────────────────────────────────────────
const SUGS = [
  'continúa',
  'muchas gracias',
  'siguiente',
  'Revisa la pantalla',
  'Explica en más detalle',
  'Dame un ejemplo',
  '¿Qué debo hacer ahora?',
];

// ── Estado local ─────────────────────────────────────────────────────────────
let _enviando  = false;
let _unsubConf = null;      // listener de confirmación (cuando el doc se borra = recibido)
const _historial = [];

// ── render ───────────────────────────────────────────────────────────────────
export const render = () => {
  const chips = SUGS.map(s =>
    `<button class="env_chip" data-msg="${s}">${s}</button>`
  ).join('');

  return `
    <div class="env_wrap">

      <!-- Hero -->
      <div class="env_hero wi_fadeUp">
        <div class="env_hero_icon">
          <i class="fas fa-satellite-dish"></i>
        </div>
        <div class="env_hero_info">
          <p class="env_hero_title">ChatWii Remote</p>
          <span class="env_hero_sub">
            <span class="env_status_dot"></span>
            <span id="envStatusLabel">Listo para enviar</span>
          </span>
        </div>
      </div>

      <!-- Compose -->
      <div class="env_compose wi_fadeUp">
        <p class="env_compose_label">
          <i class="fas fa-pen-to-square"></i>
          Escribe tu mensaje de apoyo
        </p>
        <textarea
          class="env_textarea"
          id="envTextarea"
          placeholder="Ej: Revisa la pantalla y considera el punto anterior..."
          maxlength="2000"
          rows="4"
          aria-label="Mensaje a enviar remotamente"
        ></textarea>
        <div class="env_compose_footer">
          <span class="env_char_count" id="envCharCount">0 / 2000</span>
          <button class="env_btn_send" id="envBtnSend" disabled>
            <i class="fas fa-paper-plane"></i>
            Enviar
          </button>
        </div>
      </div>

      <!-- Sugerencias -->
      <div class="env_sugs wi_fadeUp">
        <p class="env_sugs_title">
          <i class="fas fa-bolt"></i>
          Sugerencias rápidas
        </p>
        <div class="env_sugs_grid" id="envSugsGrid">
          ${chips}
        </div>
      </div>

      <!-- Historial de sesión -->
      <div class="env_historial wi_fadeUp">
        <p class="env_historial_title">
          <i class="fas fa-clock-rotate-left"></i>
          Enviados en esta sesión
        </p>
        <ul class="env_historial_list" id="envHistorialList">
          <li class="env_historial_empty">Aún no has enviado mensajes.</li>
        </ul>
      </div>

    </div>
  `;
};

// ── init ─────────────────────────────────────────────────────────────────────
export const init = () => {
  const user     = wiAuth.user;
  const uid      = user?.uid;
  const textarea = document.getElementById('envTextarea');
  const btnSend  = document.getElementById('envBtnSend');
  const charCnt  = document.getElementById('envCharCount');
  const statusLbl = document.getElementById('envStatusLabel');
  const histList  = document.getElementById('envHistorialList');
  const sugsGrid  = document.getElementById('envSugsGrid');

  if (!uid) return;

  // Animaciones de entrada
  document.querySelectorAll('.wi_fadeUp').forEach(el =>
    el.classList.add('visible', 'wi_visible')
  );

  // ── Contador de caracteres y habilitar botón ─────────────────────────────
  textarea?.addEventListener('input', () => {
    const len = textarea.value.length;
    if (charCnt) charCnt.textContent = `${len} / 2000`;
    if (btnSend) btnSend.disabled = len === 0 || _enviando;
  });

  // ── Sugerencias rápidas ──────────────────────────────────────────────────
  sugsGrid?.addEventListener('click', (e) => {
    const chip = e.target.closest('.env_chip');
    if (!chip || !textarea) return;
    textarea.value = chip.dataset.msg;
    textarea.dispatchEvent(new Event('input'));
    textarea.focus();
  });

  // ── Enviar ───────────────────────────────────────────────────────────────
  const _enviar = async () => {
    if (_enviando || !textarea) return;
    const texto = textarea.value.trim();
    if (!texto) return;

    _enviando = true;
    btnSend?.classList.add('enviando');
    btnSend?.setAttribute('disabled', '');
    if (statusLbl) statusLbl.textContent = 'Enviando...';

    try {
      const ref = doc(db, 'parati', uid);
      await setDoc(ref, { texto, creado: serverTimestamp() });

      // Escuchar confirmación: el doc desaparece cuando la extensión lo procesa
      if (_unsubConf) _unsubConf();
      _unsubConf = onSnapshot(ref, (snap) => {
        if (!snap.exists()) {
          // Recibido por la extensión ✓
          if (statusLbl) statusLbl.textContent = '✓ Recibido por la extensión';
          if (_unsubConf) { _unsubConf(); _unsubConf = null; }
          setTimeout(() => {
            if (statusLbl) statusLbl.textContent = 'Listo para enviar';
          }, 2500);
        }
      });

      // Feedback visual de éxito
      btnSend?.classList.remove('enviando');
      btnSend?.classList.add('enviado');
      if (statusLbl) statusLbl.textContent = '📤 Mensaje enviado';

      // Agregar al historial de sesión
      _historial.unshift(texto);
      _renderHistorial(histList);

      textarea.value = '';
      textarea.dispatchEvent(new Event('input'));

      setTimeout(() => {
        btnSend?.classList.remove('enviado');
      }, 1800);

    } catch (err) {
      console.warn('[Enviar] Error:', err);
      Mensaje('Error al enviar. Verifica tu conexión.', 'error');
      if (statusLbl) statusLbl.textContent = 'Error al enviar';
      btnSend?.classList.remove('enviando');
    } finally {
      _enviando = false;
      if (textarea.value.trim().length > 0) {
        btnSend?.removeAttribute('disabled');
      }
    }
  };

  btnSend?.addEventListener('click', _enviar);

  // Enviar con Enter directo (y Shift+Enter para salto de línea)
  textarea?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      _enviar();
    }
  });
};

// ── cleanup ──────────────────────────────────────────────────────────────────
export const cleanup = () => {
  if (_unsubConf) { _unsubConf(); _unsubConf = null; }
  _enviando = false;
};

// ── helpers ──────────────────────────────────────────────────────────────────
function _renderHistorial(listEl) {
  if (!listEl) return;
  if (_historial.length === 0) {
    listEl.innerHTML = '<li class="env_historial_empty">Aún no has enviado mensajes.</li>';
    return;
  }
  listEl.innerHTML = _historial
    .slice(0, 6)
    .map(t => `
      <li class="env_historial_item">
        <i class="fas fa-check-circle"></i>
        <span>${t}</span>
      </li>
    `)
    .join('');
}
