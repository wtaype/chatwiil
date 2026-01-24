import './principal.css';
import $ from 'jquery';
import { version } from '../wii.js';
import * as brain from './head/brain.js';
import * as memory from './head/memoria.js';

export const render = () => `
<div class="miia">
  <div class="miia_messages" id="miiaMessages">
    <div class="miia_empty">
      <div class="miia_welcome_icon">
        <img src="/smile.avif" alt="ChatWiil" class="welcome_avatar">
      </div>
      <h2 class="miia_welcome_title">¡Hola! Soy ChatWiil 🕊️</h2>
      <p class="miia_welcome_text">
        Tu asistente espiritual inteligente. Puedo ayudarte con <strong>matemáticas</strong>, 
        darte <strong>consejos de vida</strong>, compartir <strong>reflexiones espirituales</strong> 
        y mucho más. Háblame con confianza, estoy aquí para ti.
      </p>
      <div class="miia_suggestions">
        <div class="suggestion_card" data-prompt="Me siento triste, ¿puedes ayudarme?">
          <i class="fas fa-heart"></i><span>Apoyo emocional</span>
        </div>
        <div class="suggestion_card" data-prompt="¿Puedes resolver esta ecuación: 2x + 5 = 15?">
          <i class="fas fa-calculator"></i><span>Matemáticas</span>
        </div>
        <div class="suggestion_card" data-prompt="Dame un verso bíblico de esperanza">
          <i class="fas fa-book-bible"></i><span>Reflexiones</span>
        </div>
        <div class="suggestion_card" data-prompt="¿Cómo puedo mejorar mi vida?">
          <i class="fas fa-lightbulb"></i><span>Consejos de vida</span>
        </div>
      </div>
    </div>
  </div>
  <div class="miia_input_area">
    <div class="miia_input_wrapper">
      <textarea class="miia_input" id="miiaInput" placeholder="Escribe tu pregunta... 💚" rows="1"></textarea>
      <button class="miia_send" id="miiaSend" disabled>
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
    <div class="miia_input_info">
      <span><i class="fas fa-info-circle"></i> Presiona <kbd>Enter</kbd> para enviar, <kbd>Shift + Enter</kbd> para nueva línea</span>
    </div>
  </div>
</div>`;

// ==================== PARTE 1: ESTADO Y UTILIDADES ====================
let isTyping = false;
let messageCounter = 0;

const getElements = () => ({ $messages: $('#miiaMessages'), $input: $('#miiaInput'), $sendBtn: $('#miiaSend') });

const scrollToBottom = (smooth = false) => {
  const { $messages } = getElements();
  if (!$messages.length) return;
  const container = $messages[0];
  smooth ? container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
         : container.scrollTop = container.scrollHeight;
};

// ==================== PARTE 2: MENSAJES Y EFECTOS ====================
const addMessage = (text, type) => {
  const { $messages } = getElements();
  const time = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  const avatar = type === 'user' ? '<i class="fas fa-user-circle"></i>' : '<img src="/smile.avif" alt="ChatWiil" class="message_avatar_img">';
  const name = type === 'user' ? 'Tú' : 'ChatWiil';
  
  const $msg = $(`
    <div class="miia_message ${type}" data-time="${time}">
      <div class="message_avatar">${avatar}</div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">${name}</span>
          <span class="message_time">${time}</span>
        </div>
        <div class="message_text"></div>
      </div>
    </div>
  `);
  
  const $textEl = $msg.find('.message_text');
  type === 'user' ? $textEl.text(text) : $textEl.html(text);
  
  $messages.append($msg);
  scrollToBottom();
};

const toggleTypingIndicator = (show) => {
  const { $messages } = getElements();
  $('.miia_message.typing').remove();
  
  if (show) {
    $messages.append(`
      <div class="miia_message ai typing">
        <div class="message_avatar"><img src="/smile.avif" alt="ChatWiil" class="message_avatar_img"></div>
        <div class="message_content">
          <div class="message_text"><div class="typing_dots"><span></span><span></span><span></span></div></div>
        </div>
      </div>
    `);
    scrollToBottom();
  }
};

const typeWriterEffect = (htmlContent, callback) => {
  const { $messages } = getElements();
  const time = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
  const id = `typewriter_${Date.now()}_${++messageCounter}`;
  
  const $msg = $(`
    <div class="miia_message ai" data-time="${time}">
      <div class="message_avatar"><img src="/smile.avif" alt="ChatWiil" class="message_avatar_img"></div>
      <div class="message_content">
        <div class="message_header">
          <span class="message_name">ChatWiil</span>
          <span class="message_time">${time}</span>
        </div>
        <div class="message_text" id="${id}"></div>
      </div>
    </div>
  `);
  
  $messages.append($msg);
  scrollToBottom();
  
  const $textEl = $(`#${id}`);
  const temp = $('<div>').html(htmlContent);
  const text = temp.text();
  const html = temp.html();
  
  let index = 0;
  let lastScrollTime = 0;
  const speed = 15;
  const scrollInterval = 100; // Solo hacer scroll cada 100ms
  
  const type = () => {
    if (index < text.length) {
      let displayHTML = '';
      let textCount = 0;
      let insideTag = false;
      
      for (let i = 0; i < html.length; i++) {
        const char = html[i];
        if (char === '<') insideTag = true;
        displayHTML += char;
        if (char === '>') { insideTag = false; continue; }
        if (!insideTag && char !== '<' && char !== '>') {
          textCount++;
          if (textCount >= index + 1) break;
        }
      }
      
      $textEl.html(displayHTML);
      index++;
      
      // Scroll optimizado: solo cada 100ms
      const now = Date.now();
      if (now - lastScrollTime > scrollInterval) {
        scrollToBottom();
        lastScrollTime = now;
      }
      
      setTimeout(type, speed);
    } else {
      $textEl.html(html).removeAttr('id');
      scrollToBottom(true);
      if (callback) callback();
    }
  };
  
  type();
};

// ==================== PARTE 3: EVENTOS Y CONTROL ====================
const sendMessage = async () => {
  const { $input } = getElements();
  const message = $input.val().trim();
  
  if (!message || isTyping) return;
  
  $('.miia_empty').fadeOut(200, function() { $(this).remove(); });
  addMessage(message, 'user');
  $input.val('').css('height', 'auto').trigger('input');
  
  isTyping = true;
  toggleTypingIndicator(true);
  
  try {
    const response = await brain.process(message);
    toggleTypingIndicator(false);
    if (!response || typeof response !== 'string') throw new Error('Respuesta inválida');
    typeWriterEffect(response, () => isTyping = false);
  } catch (err) {
    console.error('❌ Error procesando mensaje:', err);
    toggleTypingIndicator(false);
    addMessage('😔 Disculpa, tuve un problema procesando tu mensaje. Por favor, intenta de nuevo. 💚', 'ai');
    isTyping = false;
  }
};

export const init = () => {
  const { $input, $sendBtn } = getElements();
  
  $input.on('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    const hasText = $(this).val().trim().length > 0;
    $sendBtn.prop('disabled', !hasText).toggleClass('active', hasText);
  });
  
  $input.on('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } });
  $sendBtn.on('click', sendMessage);
  $(document).on('click', '.suggestion_card', function() {
    $input.val($(this).data('prompt')).css('height', 'auto').trigger('input').focus();
  });
  
  memory.loadHistory();
  console.log(`✅ ChatWiil IA ${version} iniciado`);
};

export const cleanup = () => {
  $('#miiaInput, #miiaSend').off();
  $(document).off('click', '.suggestion_card');
  memory.clear();
  console.log('🧹 ChatWiil IA limpiado');
};