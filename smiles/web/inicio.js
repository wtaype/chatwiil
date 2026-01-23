import './inicio.css';
import $ from 'jquery';
import { app, version } from '../wii.js';
import * as brain from './head/brain.js';

export const render = () => `
  <div class="miia">
    <!-- ========== CHAT MESSAGES ========== -->
    <div class="miia_messages" id="miiaMessages">
      <!-- Empty State Inicial -->
      <div class="miia_empty">
        <div class="miia_welcome_icon">
          <img src="/smile.avif" alt="Mediawii" class="welcome_avatar">
        </div>
        <h2 class="miia_welcome_title">¡Hola! Soy ChatWiil 🕊️</h2>
        <p class="miia_welcome_text">
          Tu asistente espiritual inteligente. Puedo ayudarte con <strong>matemáticas</strong>, 
          darte <strong>consejos de vida</strong>, compartir <strong>reflexiones espirituales</strong> 
          y mucho más. Háblame con confianza, estoy aquí para ti.
        </p>
        
        <div class="miia_suggestions">
          <div class="suggestion_card" data-prompt="Me siento triste, ¿puedes ayudarme?">
            <i class="fas fa-heart"></i>
            <span>Apoyo emocional</span>
          </div>
          <div class="suggestion_card" data-prompt="¿Puedes resolver esta ecuación: 2x + 5 = 15?">
            <i class="fas fa-calculator"></i>
            <span>Matemáticas</span>
          </div>
          <div class="suggestion_card" data-prompt="Dame un verso bíblico de esperanza">
            <i class="fas fa-book-bible"></i>
            <span>Reflexiones</span>
          </div>
          <div class="suggestion_card" data-prompt="¿Cómo puedo mejorar mi vida?">
            <i class="fas fa-lightbulb"></i>
            <span>Consejos de vida</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ========== INPUT AREA ========== -->
    <div class="miia_input_area">
      <div class="miia_input_wrapper">
        <textarea 
          class="miia_input" 
          id="miiaInput"
          placeholder="Escribe tu pregunta... 💚"
          rows="1"
        ></textarea>
        <button class="miia_send" id="miiaSend" disabled>
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
      <div class="miia_input_info">
        <span><i class="fas fa-info-circle"></i> Presiona <kbd>Enter</kbd> para enviar, <kbd>Shift + Enter</kbd> para nueva línea</span>
      </div>
    </div>
  </div>
`;

export const init = () => {
  const $messages = $('#miiaMessages');
  const $input = $('#miiaInput');
  const $sendBtn = $('#miiaSend');
  let isTyping = false;

  // ========== AUTO-RESIZE TEXTAREA (SIN SCROLL) ==========
  $input.on('input', function() {
    this.style.height = 'auto';
    const newHeight = Math.min(this.scrollHeight, 120);
    this.style.height = newHeight + 'px';
    
    // Habilitar/deshabilitar botón de envío
    const hasText = $(this).val().trim().length > 0;
    $sendBtn.prop('disabled', !hasText);
    $sendBtn.toggleClass('active', hasText);
  });

  // ========== ENVIAR MENSAJE ==========
  const sendMessage = async () => {
    const message = $input.val().trim();
    if (!message || isTyping) return;

    // Limpiar empty state si existe
    $('.miia_empty').fadeOut(300, function() { $(this).remove(); });

    // Agregar mensaje del usuario
    addMessage(message, 'user');
    
    // Limpiar input
    $input.val('').css('height', 'auto').trigger('input');

    // Procesar con el cerebro
    isTyping = true;
    setTimeout(() => {
      addTypingIndicator();
      
      setTimeout(async () => {
        removeTypingIndicator();
        
        // 🧠 USAR EL CEREBRO PARA PROCESAR
        const response = await brain.process(message);
        
        typeWriterEffect(response, 'ai', () => {
          isTyping = false;
        });
      }, 1500 + Math.random() * 1000);
    }, 500);
  };

  // Enter para enviar (Shift+Enter para nueva línea)
  $input.on('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  $sendBtn.on('click', sendMessage);

  // ========== SUGERENCIAS ==========
  $(document).on('click', '.suggestion_card', function() {
    const prompt = $(this).data('prompt');
    $input.val(prompt).css('height', 'auto').trigger('input');
    $input.focus();
  });

  // ========== AGREGAR MENSAJE ==========
  function addMessage(text, type) {
    const time = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    const avatar = type === 'user' 
      ? '<i class="fas fa-user-circle"></i>' 
      : '<img src="/smile.avif" alt="ChatWiil" class="message_avatar_img">';
    const name = type === 'user' ? 'Tú' : 'ChatWiil';

    // Convertir saltos de línea a <br> para mensajes de usuario
    const formattedText = type === 'user' ? text.replace(/\n/g, '<br>') : text;

    const messageHTML = `
      <div class="miia_message ${type}" data-time="${time}">
        <div class="message_avatar">${avatar}</div>
        <div class="message_content">
          <div class="message_header">
            <span class="message_name">${name}</span>
            <span class="message_time">${time}</span>
          </div>
          <div class="message_text">${formattedText}</div>
        </div>
      </div>
    `;

    $messages.append(messageHTML);
    scrollToBottom();
  }

  // ========== TYPING INDICATOR ==========
  function addTypingIndicator() {
    const typingHTML = `
      <div class="miia_message ai typing">
        <div class="message_avatar">
          <img src="/smile.avif" alt="ChatWiil" class="message_avatar_img">
        </div>
        <div class="message_content">
          <div class="message_text">
            <div class="typing_dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
    `;
    $messages.append(typingHTML);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    $('.miia_message.typing').remove();
  }

  // ========== EFECTO TYPEWRITER CON HTML ==========
  function typeWriterEffect(text, type, callback) {
    const time = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    const avatar = '<img src="/smile.avif" alt="ChatWiil" class="message_avatar_img">';
    
    const messageHTML = `
      <div class="miia_message ${type}" data-time="${time}">
        <div class="message_avatar">${avatar}</div>
        <div class="message_content">
          <div class="message_header">
            <span class="message_name">ChatWiil</span>
            <span class="message_time">${time}</span>
          </div>
          <div class="message_text" id="typewriter"></div>
        </div>
      </div>
    `;

    $messages.append(messageHTML);
    const $typewriter = $('#typewriter');
    
    let i = 0;
    const speed = 15; // Más rápido para mejor UX
    
    function type() {
      if (i < text.length) {
        // Si el siguiente carácter es parte de una etiqueta HTML, agregar toda la etiqueta de una vez
        if (text[i] === '<') {
          const closingTag = text.indexOf('>', i);
          if (closingTag !== -1) {
            const htmlTag = text.substring(i, closingTag + 1);
            $typewriter.append(htmlTag);
            i = closingTag + 1;
            scrollToBottom();
            setTimeout(type, 0); // Sin delay para etiquetas HTML
            return;
          }
        }
        
        $typewriter.append(text.charAt(i));
        i++;
        scrollToBottom();
        setTimeout(type, speed);
      } else {
        $typewriter.removeAttr('id');
        if (callback) callback();
      }
    }
    
    type();
  }

  // ========== SCROLL TO BOTTOM ==========
  function scrollToBottom() {
    $messages.animate({ scrollTop: $messages[0].scrollHeight }, 300);
  }

  console.log(`✅ Chatwiil IA ${version} iniciado con 🧠 Brain System + 🎭 Personalidad`);
};

export const cleanup = () => {
  $('#miiaInput, #miiaSend').off();
  $(document).off('click', '.suggestion_card');
  console.log('🧹 Chatwiil IA limpiado');
};