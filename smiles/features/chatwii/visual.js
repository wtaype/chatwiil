// visual.js - Orquestador visual del ChatWii para la Web
import estilosChat from './visual.css?inline';
import {
  initCoach,
  enviarMensaje,
  obtenerHistorial,
  limpiarHistorial,
  obtenerSaludo,
  obtenerArchivos,
  eliminarArchivo
} from './brain.js';
import { coachPersona } from './personalidad.js';
import { mdToHtml } from './lib/escribirmd.js';
import { limpiarDOM } from './lib/procesarver.js';
import { contieneCodigoProhibido, registrarIntentoBloqueo, estaBloqueadoTemporalmente } from './lib/seguridad.js';
import { tomarCaptura } from './lib/ojos.js';
import { escucharPestana } from './lib/oidos.js';
import { wiAuth, Mensaje } from '@core/widev/widev.js';

let _enviando = false;
let _imagenesCargadas = [];
const _listeners = [];

/**
 * Agrega un listener de eventos del documento para limpieza posterior
 */
const addDocListener = (type, selector, handler) => {
  const wrapper = (e) => {
    if (!e.target?.closest) return;
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  };
  document.addEventListener(type, wrapper);
  _listeners.push({ type, wrapper });
};

/**
 * Agrega una burbuja de mensaje al área de chat
 */
const agregarBurbuja = (role, contenido, scroll = true) => {
  const area = document.getElementById('cr_chat_mensajes_area');
  if (!area) return null;

  const burbuja = document.createElement('div');
  const classRole = role === 'user' ? 'user' : 'chatwii';
  burbuja.className = `cr_chat_burbuja ${classRole}`;

  if (role === 'model') {
    const avatarImg = document.createElement('img');
    avatarImg.className = 'cr_cwii_avatar_img';
    avatarImg.src = coachPersona.avatar;
    avatarImg.alt = coachPersona.nombre;
    burbuja.appendChild(avatarImg);
  }

  const textoDiv = document.createElement('div');
  textoDiv.className = 'cr_chat_texto';

  if (Array.isArray(contenido)) {
    contenido.forEach(part => {
      if (part.text) {
        const textSpan = document.createElement('div');
        if (role === 'model') {
          textSpan.innerHTML = mdToHtml(part.text);
        } else {
          textSpan.textContent = part.text;
        }
        textoDiv.appendChild(textSpan);
      } else if (part.inlineData) {
        if (part.inlineData.mimeType && part.inlineData.mimeType.startsWith('audio/')) {
          const audioEl = document.createElement('audio');
          audioEl.className = 'cr_chat_bubble_audio';
          audioEl.controls = true;
          audioEl.src = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          textoDiv.appendChild(audioEl);
        } else {
          const imgEl = document.createElement('img');
          imgEl.className = 'cr_chat_bubble_img';
          imgEl.src = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          textoDiv.appendChild(imgEl);
        }
      }
    });
  } else {
    if (role === 'model') {
      textoDiv.innerHTML = mdToHtml(contenido);
    } else {
      textoDiv.textContent = contenido;
    }
  }

  burbuja.appendChild(textoDiv);
  area.appendChild(burbuja);

  if (scroll) {
    area.scrollTop = area.scrollHeight;
  }
  return burbuja;
};

/**
 * Agrega el indicador de escritura ("Typing...")
 */
const agregarBurbujaStreaming = () => {
  const area = document.getElementById('cr_chat_mensajes_area');
  if (!area) return null;

  const burbuja = document.createElement('div');
  burbuja.className = 'cr_chat_burbuja chatwii cr_chat_msg_streaming';
  
  const avatarImg = document.createElement('img');
  avatarImg.className = 'cr_cwii_avatar_img';
  avatarImg.src = coachPersona.avatar;
  avatarImg.alt = coachPersona.nombre;
  burbuja.appendChild(avatarImg);

  const textoDiv = document.createElement('div');
  textoDiv.className = 'cr_chat_texto';
  textoDiv.innerHTML = `
    <span class="cr_typing_dot"></span>
    <span class="cr_typing_dot"></span>
    <span class="cr_typing_dot"></span>
  `;
  
  burbuja.appendChild(textoDiv);
  area.appendChild(burbuja);
  area.scrollTop = area.scrollHeight;
  return burbuja;
};

/**
 * Renderiza el historial completo del chat activo
 */
export const renderHistorialChat = () => {
  const area = document.getElementById('cr_chat_mensajes_area');
  if (!area) return;
  area.innerHTML = '';

  const hist = obtenerHistorial();
  if (hist.length === 0) {
    const skeletonBurbuja = agregarBurbujaStreaming();
    setTimeout(() => {
      if (!skeletonBurbuja) {
        agregarBurbuja('model', obtenerSaludo(), true);
        return;
      }
      const txtDiv = skeletonBurbuja.querySelector('.cr_chat_texto');
      if (txtDiv) {
        txtDiv.innerHTML = mdToHtml(obtenerSaludo());
        skeletonBurbuja.classList.remove('cr_chat_msg_streaming');
      }
      area.scrollTop = area.scrollHeight;
    }, 700);
    return;
  }

  hist.forEach(msg => {
    const partsToShow = msg.parts ? JSON.parse(JSON.stringify(msg.parts)) : [];
    if (msg.role === 'user') {
      partsToShow.forEach(part => {
        if (part.text && part.text.startsWith('CONTEXTO DE LA PÁGINA WEB')) {
          const splitParts = part.text.split('\n\nPREGUNTA U ORDEN DEL USUARIO:\n');
          if (splitParts.length > 1) {
            part.text = splitParts[1];
          }
        }
      });
    }
    agregarBurbuja(msg.role, partsToShow, false);
  });

  area.scrollTop = area.scrollHeight;
};

/**
 * Renderiza la lista de conversaciones archivadas en la barra lateral
 */
const renderHistorialArchivos = async () => {
  const container = document.getElementById('chatHistoryList');
  if (!container) return;

  const archivos = await obtenerArchivos();
  if (archivos.length === 0) {
    container.innerHTML = `<div class="chat_history_skeleton">No hay chats archivados</div>`;
    return;
  }

  container.innerHTML = archivos.map(a => `
    <div class="chat_history_item" data-id="${a.id}">
      <div class="chat_history_info">
        <strong>${a.titulo}</strong>
        <span>${a.fecha}</span>
      </div>
      <button class="chat_history_delete" data-id="${a.id}" title="Eliminar conversacion">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join('');
};

const CONTROLWII = {
  ojos: {
    regex: /\b(captura|captura\s+pantalla|captura\s+imagen)\b/i
  },
  oidos: {
    regex: /\b(escucha|graba|audio)\b/i,
    duracionRegex: /\b(?:escucha|graba|audio)\b.*?\b(\d+)\s*(?:s|seg|segundo)/i,
    duracionDefectoMs: 10000,
    duracionMaxMs: 35000,
    duracionMinMs: 3000
  }
};

/**
 * Procesa y envía el mensaje activo
 */
const procesarEnvioMensaje = async () => {
  if (_enviando) return;

  if (estaBloqueadoTemporalmente()) {
    agregarBurbuja('model', 'Acceso bloqueado temporalmente debido a políticas de seguridad.');
    return;
  }

  const textarea = document.getElementById('cr_chat_textarea');
  const btnSend = document.getElementById('cr_chat_btn_send');
  if (!textarea) return;

  const texto = textarea.value.trim();
  const tieneTexto = texto.length > 0;
  const tieneImagenes = _imagenesCargadas.length > 0;

  if (!tieneTexto && !tieneImagenes) return;

  if (tieneTexto && contieneCodigoProhibido(texto)) {
    registrarIntentoBloqueo();
    agregarBurbuja('model', 'Advertencia: Se detectaron caracteres o scripts no válidos en el mensaje.');
    textarea.value = '';
    return;
  }

  const pideVer = CONTROLWII.ojos.regex.test(texto);
  const pideEscuchar = CONTROLWII.oidos.regex.test(texto);

  let duracionAudioMs = CONTROLWII.oidos.duracionDefectoMs;
  if (pideEscuchar) {
    const match = CONTROLWII.oidos.duracionRegex.exec(texto);
    if (match && match[1]) {
      const segs = parseInt(match[1], 10);
      duracionAudioMs = Math.min(Math.max(segs * 1000, CONTROLWII.oidos.duracionMinMs), CONTROLWII.oidos.duracionMaxMs);
    }
  }

  if (pideVer || pideEscuchar) {
    if (btnSend) btnSend.disabled = true;
    textarea.disabled = true;
  }

  const imagenesAEnviar = [..._imagenesCargadas];
  _imagenesCargadas = [];

  // Ojos: Captura de pantalla web
  if (pideVer) {
    try {
      Mensaje('📸 Capturando pantalla...', 'info');
      const imgObj = await tomarCaptura();
      imagenesAEnviar.push(imgObj);
    } catch (e) {
      console.warn('[Ojos] Error al tomar captura:', e);
    }
  }

  // Oídos: Grabación de micrófono web
  if (pideEscuchar) {
    try {
      const segs = Math.round(duracionAudioMs / 1000);
      Mensaje(`🎤 Grabando audio por ${segs}s...`, 'info');
      const audioObj = await escucharPestana(duracionAudioMs);
      imagenesAEnviar.push(audioObj);
      Mensaje('🎤 Grabación completada', 'success');
    } catch (e) {
      console.warn('[Oídos] Error al grabar:', e);
      Mensaje(e.message || 'Error al capturar audio.', 'error');
    }
  }

  textarea.disabled = false;
  textarea.value = '';
  textarea.style.height = 'auto';

  const previewsContainer = document.getElementById('cr_chat_image_previews');
  if (previewsContainer) previewsContainer.innerHTML = '';
  if (btnSend) btnSend.disabled = true;

  const userParts = [];
  imagenesAEnviar.forEach(img => {
    userParts.push({
      inlineData: {
        mimeType: img.mime,
        data: img.base64.split(',')[1] || img.base64
      }
    });
  });
  if (texto) {
    userParts.push({ text: texto });
  }

  agregarBurbuja('user', userParts);
  const streamBubble = agregarBurbujaStreaming();
  _enviando = true;
  let accumulated = '';

  // Capturar DOM del cuerpo de la pestaña activa de la aplicación
  let activeTabDomText = '';
  try {
    activeTabDomText = limpiarDOM(document.body.innerText);
  } catch (e) {}

  try {
    await enviarMensaje(texto, activeTabDomText, imagenesAEnviar, (chunk) => {
      accumulated += chunk;
      if (streamBubble) {
        const txtDiv = streamBubble.querySelector('.cr_chat_texto');
        if (txtDiv) {
          txtDiv.innerHTML = mdToHtml(accumulated);
        }
        const area = document.getElementById('cr_chat_mensajes_area');
        if (area) area.scrollTop = area.scrollHeight;
      }
    });
    renderHistorialArchivos(); // Recargar barra lateral de archivos
  } catch (err) {
    console.warn('[Gemini Error]:', err);
    if (streamBubble) {
      const txtDiv = streamBubble.querySelector('.cr_chat_texto');
      if (txtDiv) {
        txtDiv.className = 'cr_chat_texto error';
        txtDiv.textContent = `Error: ${err.message || 'No se pudo conectar con Gemini.'}`;
      }
    }
  } finally {
    _enviando = false;
    if (btnSend) btnSend.disabled = !textarea.value.trim();
  }
};

export const render = () => {
  const user = wiAuth.user;
  if (!user) return `<div class="cta_denied"><i class="fas fa-ban"></i> Acceso denegado.</div>`;

  return `
    <style>${estilosChat}</style>
    <div class="chat_layout">
      
      <!-- 1. Barra Lateral -->
      <aside class="chat_sidebar">
        <div class="chat_brand">
          <i class="fas fa-comment-dots"></i>
          <span>ChatWii</span>
        </div>
        
        <div class="chat_search_wrap">
          <i class="fas fa-search"></i>
          <input type="text" id="chatSearchConversations" class="chat_search_input" placeholder="Buscar chats...">
        </div>
        
        <button class="chat_btn_new" id="chatBtnNew">
          <i class="fas fa-plus"></i> Nueva Conversación
        </button>
        
        <div class="chat_history_list" id="chatHistoryList">
          <div class="chat_history_skeleton">Cargando chats...</div>
        </div>
      </aside>

      <!-- 2. Workspace de Chat -->
      <main class="chat_workspace">
        <header class="chat_header">
          <div class="chat_header_info">
            <h3 id="chatHeaderTitle">Chat Activo</h3>
            <span class="chat_status">
              <span class="chat_online_dot"></span>
              <span>Asistente de IA · Activo</span>
            </span>
          </div>
          
          <div class="chat_header_actions">
            <!-- Botón Perfil -->
            <a href="/cuenta/perfil" class="chat_nv_item" title="Mi Cuenta" data-page="cuenta/perfil">
              <img src="${user.avatar || '/smile.avif'}" alt="Avatar" id="chatHeaderAvatar" class="chat_user_avatar">
              <span>Mi Cuenta</span>
            </a>
            <!-- Botón Salir -->
            <button class="chat_nv_item bt_salir" id="chatBtnSalir" title="Salir">
              <i class="fa-solid fa-sign-out-alt"></i>
              <span>Salir</span>
            </button>
          </div>
        </header>

        <!-- Área de Mensajes -->
        <div class="chat_body" id="cr_chat_mensajes_area"></div>

        <!-- Pie de Entrada -->
        <footer class="chat_footer">
          <div id="cr_chat_image_previews" class="chat_image_previews"></div>
          <div class="chat_input_pill">
            <textarea 
              class="chat_textarea" 
              id="cr_chat_textarea"
              placeholder="Pregúntale a ChatWii (ej: 'graba audio' o 'captura pantalla')..." 
              rows="1"
              maxlength="50000"
              spellcheck="true"
            ></textarea>
            <button class="chat_btn_send" id="cr_chat_btn_send" disabled>
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          <div class="chat_disclaimer">
            La IA de ChatWii puede cometer errores. Considera verificar la información importante.
          </div>
        </footer>
      </main>
    </div>
  `;
};

export const init = () => {
  const user = wiAuth.user;
  if (!user) return;

  // 1. Inicializar Coach & Historial
  initCoach().then(() => {
    renderHistorialChat();
    renderHistorialArchivos();
  });

  const textarea = document.getElementById('cr_chat_textarea');
  const btnSend = document.getElementById('cr_chat_btn_send');
  const btnNew = document.getElementById('chatBtnNew');
  const btnSalir = document.getElementById('chatBtnSalir');
  const previewsContainer = document.getElementById('cr_chat_image_previews');

  const actualizarEstadoBotonEnviar = () => {
    if (btnSend && textarea) {
      btnSend.disabled = !textarea.value.trim() && _imagenesCargadas.length === 0;
    }
  };

  const renderizarPrevisualizaciones = () => {
    if (!previewsContainer) return;
    previewsContainer.innerHTML = _imagenesCargadas.map((img, index) => `
      <div class="cr_chat_preview_thumb">
        <img src="${img.base64}" alt="Vista previa">
        <button class="cr_chat_preview_remove" data-index="${index}" title="Quitar imagen">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');

    previewsContainer.querySelectorAll('.cr_chat_preview_remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        _imagenesCargadas.splice(idx, 1);
        renderizarPrevisualizaciones();
        actualizarEstadoBotonEnviar();
      });
    });
  };

  // Auto-resize y keydowns del Textarea
  if (textarea) {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
      actualizarEstadoBotonEnviar();
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        procesarEnvioMensaje();
      }
    });

    // Evento Pegar imagen (clipboard paste)
    textarea.addEventListener('paste', (e) => {
      const items = (e.clipboardData || e.originalEvent.clipboardData).items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (!blob) continue;

          const reader = new FileReader();
          reader.onload = (event) => {
            _imagenesCargadas.push({
              base64: event.target.result,
              mime: blob.type
            });
            renderizarPrevisualizaciones();
            actualizarEstadoBotonEnviar();
          };
          reader.readAsDataURL(blob);
        }
      }
    });
  }

  btnSend?.addEventListener('click', procesarEnvioMensaje);

  const pill = document.querySelector('.chat_input_pill');
  pill?.addEventListener('click', (e) => {
    if (e.target !== btnSend && !btnSend?.contains(e.target)) {
      textarea?.focus();
    }
  });

  // Nueva conversación (+)
  btnNew?.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas archivar esta conversación e iniciar un nuevo chat?')) {
      limpiarHistorial().then(() => {
        renderHistorialChat();
        renderHistorialArchivos();
        Mensaje('Nueva conversación iniciada', 'success');
      });
    }
  });

  // Salir (Logout)
  btnSalir?.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      localStorage.removeItem('wiSmile');
      window.location.href = '/';
    }
  });

  // Cambiar de conversación desde la barra lateral (Cargar archivo)
  addDocListener('click', '.chat_history_item', function(e) {
    if (e.target.closest('.chat_history_delete')) return; // ignorar si hace click en eliminar

    const id = this.getAttribute('data-id');
    obtenerArchivos().then(archivos => {
      const arch = archivos.find(a => a.id === id);
      if (arch) {
        // Guardar el actual en almacenamiento antes de sobreescribirlo
        archivarConversacionActiva().then(() => {
          // Guardar el seleccionado en localStorage temporal del chat activo
          localStorage.setItem('chatwii_historial', JSON.stringify(arch.messages));
          initCoach().then(() => {
            renderHistorialChat();
            document.querySelectorAll('.chat_history_item').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            Mensaje('Conversación cargada', 'success');
          });
        });
      }
    });
  });

  // Eliminar conversación archivada
  addDocListener('click', '.chat_history_delete', function(e) {
    e.stopPropagation();
    const id = this.getAttribute('data-id');
    if (confirm('¿Estás seguro de que deseas eliminar este chat archivado?')) {
      eliminarArchivo(id).then(() => {
        renderHistorialArchivos();
        Mensaje('Chat eliminado', 'success');
      });
    }
  });

  // Limpiar chat si el gestor lanza el evento de limpieza global
  window.addEventListener('wichats_cleared', () => {
    initCoach().then(() => {
      renderHistorialChat();
      renderHistorialArchivos();
    });
  });
};

export const cleanup = () => {
  _listeners.forEach(({ type, wrapper }) => document.removeEventListener(type, wrapper));
  _listeners.length = 0;
};
