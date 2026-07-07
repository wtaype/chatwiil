/**
 * chat.js - Generador HTML del Widget del ChatWii (Versión Embebida Plana)
 * Escrito en espanol sin tildes para evitar problemas de codificacion.
 */

export const crearVentanaChat = (idioma, persona) => {
  const widget = document.createElement('div');
  widget.id = 'chat_nuevo';
  widget.className = 'cr_chat_widget cr_chat_widget_plano active'; // clase plano y active para aplicar overrides si es necesario

  const estadoText = idioma === 'en' ? persona.estadoOnline.en : persona.estadoOnline.es;
  const titClear = idioma === 'en' ? 'Clear Chat' : 'Limpiar Chat';
  const placeholder = idioma === 'en' ? 'Ask Coach Wii...' : 'Preguntale al Coach Wii...';
  const disclaimer = idioma === 'en'
    ? 'Workwii AI can make mistakes. Consider checking important information.'
    : 'La IA de Workwii puede cometer errores. Considera verificar la informacion importante.';

  const isSidepanel = document.body.classList.contains('mode-sidepanel');
  const sidebarTip = isSidepanel ? 'Abrir en Ventana Emergente' : 'Abrir Panel Lateral';
  const sidebarIcon = isSidepanel ? 'fas fa-window-restore' : 'fas fa-columns';

  const sidebarBtn = `
    <button class="cr_chat_btn_header sidebar" id="cr_chat_btn_sidepanel" data-witip="${sidebarTip}" data-wtipo="left">
      <i class="${sidebarIcon}"></i>
    </button>
  `;

  widget.innerHTML = `
    <!-- Cabecera del Chat -->
    <div class="chatwii_header">
      <img src="${persona.avatar}" alt="${persona.nombre}" class="cr_chat_header_avatar" />
      <div class="cr_chat_header_info">
        <div class="cr_chat_header_name">Chatwii (<span class="cr_chat_msg_count" data-witip="100 respuestas gratis" data-wtipo="right">0</span>/100)</div>
        <div class="cr_chat_header_status">
          <span class="cr_chat_online_dot"></span>
          <span>${estadoText}</span>
        </div>
      </div>
      <div class="cr_chat_header_actions">
        <button class="cr_chat_btn_header nuevo" id="cr_chat_btn_nuevo" data-witip="Nuevo Chat" data-wtipo="left">
          <i class="fas fa-plus"></i>
        </button>
        <button class="cr_chat_btn_header permiso" id="cr_chat_btn_permiso" data-witip="Activar Permisos (Audio y Micro)" data-wtipo="left">
          <i class="fas fa-shield-halved"></i>
        </button>
        <button class="cr_chat_btn_header recibido" id="cr_chat_btn_recibido" data-witip="Modo Remoto" data-wtipo="left">
          <i class="fas fa-mobile-alt"></i>
        </button>
        ${sidebarBtn}
      </div>
    </div>

    <!-- Barra de Estado del Piloto Automático (Oculta por defecto) -->
    <div class="cr_chat_autopilot_bar" id="cr_chat_autopilot_bar">
      <i class="fas fa-robot cr_chat_autopilot_spin"></i>
      <span id="cr_chat_autopilot_text">Piloto automático: analizando en 45s...</span>
    </div>

    <!-- Barra de Estado del Modo Remoto (Oculta por defecto) -->
    <div class="cr_chat_recibido_bar" id="cr_chat_recibido_bar">
      <i class="fas fa-mobile-alt cr_recibido_pulse" id="cr_recibido_icon"></i>
      <span id="cr_chat_recibido_text">📱 Remoto: escuchando mensajes...</span>
      <button class="cr_recibido_retry_btn" id="cr_recibido_retry_btn" data-witip="Reconectar Modo Remoto" data-wtipo="top">
        <i class="fas fa-sync-alt"></i>
      </button>
    </div>

    <!-- Area de mensajes -->
    <div class="chatwii_body" id="cr_chat_mensajes_area"></div>

    <!-- Area de Input -->
    <div class="chatwii_footer">
      <div id="cr_chat_image_previews" class="cr_chat_image_previews"></div>
      <div class="cr_chat_input_wrapper">
        <textarea 
          class="cr_chat_textarea" 
          id="cr_chat_textarea"
          placeholder="${placeholder}" 
          rows="1"
          maxlength="50000"
          lang="${idioma === 'en' ? 'en-US' : 'es-419'}"
          spellcheck="true"
        ></textarea>
        <button class="cr_chat_btn_send" id="cr_chat_btn_send" disabled>
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="cr_chat_disclaimer">
        ${disclaimer}
      </div>
    </div>
  `;

  return widget;
};

export const crearModalConfirmacion = (idioma) => {
  const modal = document.createElement('div');
  modal.id = 'chat_confirm';
  modal.className = 'wiModal';

  const titConfirmar = idioma === 'en' ? 'Clear Conversation' : 'Limpiar conversacion';
  const descConfirmar = idioma === 'en'
    ? 'Are you sure you want to clear all messages? This action cannot be undone.'
    : '¿Estas seguro de que deseas borrar todos los mensajes? Esta accion no se puede deshacer.';
  const btnSi = idioma === 'en' ? 'Yes, clear' : 'Si, limpiar';
  const btnNo = idioma === 'en' ? 'Cancel' : 'Cancelar';

  modal.innerHTML = `
    <div class="modalBody cr_modal_body">
      <button class="modalX">&times;</button>
      <div class="cr_confirm_content">
        <div class="cr_modal_icon warning">
          <i class="fas fa-trash-alt"></i>
        </div>
        <h3 class="cr_modal_title">${titConfirmar}</h3>
        <p class="cr_modal_desc">${descConfirmar}</p>
        <div class="cr_modal_actions">
          <button id="cr_chat_btn_confirm_clear" class="cr_modal_btn danger">
            ${btnSi}
          </button>
          <button id="cr_chat_btn_cancel_clear" class="cr_modal_btn outline">
            ${btnNo}
          </button>
        </div>
      </div>
    </div>
  `;

  return modal;
};
