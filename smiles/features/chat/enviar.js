// smiles/smile/enviar.js
// ChatWii Remote — Página de envío de mensajes desde chatwii-web
// Escribe en Realtime Database ruta "parati/{uid}"

import estilosEnviar from './enviar.css?inline';
import { rtdb } from '@core/firebase-db.js';
import { ref as dbRef, set as dbSet, onValue } from 'firebase/database';
import { wiAuth, Mensaje } from '@core/widev/widev.js';

// ── Sugerencias rápidas ──────────────────────────────────────────────────────
const SUGS = [
  // 1. Oídos (Prioridad 1)
  'escucha 10s',
  'escucha 20s',
  'graba 30s',
  // 2. Ojos (Prioridad 2)
  'captura pantalla',
  'captura imagen',
  // 3. Manos / Texto (Prioridad 3)
  'revisa pantalla',
  'revisa',
  'continua',
  // 4. Gracias / Cierre (Prioridad 4)
  'muchas gracias',
  'siguiente'
];

// ── Estado local ─────────────────────────────────────────────────────────────
let _enviando  = false;
let _unsubConf = null;      // listener de confirmación (cuando el nodo se borra = recibido)
const _historial = [];

// ── render ───────────────────────────────────────────────────────────────────
export const render = () => {
  const chips = SUGS.map(s => 
    `<button class="env_chip" data-msg="${s}">${s}</button>`
  ).join('');

  return `<style>${estilosEnviar}</style>
    <div class="env_wrap">

      <!-- Compose -->
      <div class="env_compose wi_fadeUp">
        <p class="env_compose_label">
          <span><i class="fas fa-pen-to-square"></i> Escribe tu mensaje de apoyo</span>
          <span id="envStatusLabel" class="env_status_lbl">Listo para enviar</span>
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
      const nodeRef = dbRef(rtdb, 'parati/' + uid);
      await dbSet(nodeRef, { texto, creado: Date.now() });

      // Escuchar confirmación: el nodo se borra cuando la extensión lo recibe
      if (_unsubConf) _unsubConf();
      _unsubConf = onValue(nodeRef, (snapshot) => {
        if (!snapshot.exists()) {
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

  // ── Sugerencias rápidas con auto-envío inteligente ────────────────────────
  sugsGrid?.addEventListener('click', async (e) => {
    const chip = e.target.closest('.env_chip');
    if (!chip || !textarea || _enviando) return;
    const msg = chip.dataset.msg;
    textarea.value = msg;
    textarea.dispatchEvent(new Event('input'));
    textarea.focus();

    // No auto-enviar si requiere edición (contiene palabras de CONTROLWII)
    const requiereEdicion = /\b(escucha|graba|audio|captura)\b/i.test(msg);
    if (!requiereEdicion) {
      await _enviar();
    }
  });

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
