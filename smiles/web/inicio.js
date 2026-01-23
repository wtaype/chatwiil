import './inicio.css';
import $ from 'jquery';
import { app, version } from '../wii.js';

export const render = () => `
  <div class="miia">
    <!-- ========== CHAT MESSAGES ========== -->
    <div class="miia_messages" id="miiaMessages">
      <!-- Empty State Inicial -->
      <div class="miia_empty">
        <div class="miia_welcome_icon">
          <i class="fas fa-dove"></i>
        </div>
        <h2 class="miia_welcome_title">¡Hola! Soy Mediawii 🕊️</h2>
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
  const sendMessage = () => {
    const message = $input.val().trim();
    if (!message || isTyping) return;

    // Limpiar empty state si existe
    $('.miia_empty').fadeOut(300, function() { $(this).remove(); });

    // Agregar mensaje del usuario
    addMessage(message, 'user');
    
    // Limpiar input
    $input.val('').css('height', 'auto').trigger('input');

    // Simular respuesta de la IA
    isTyping = true;
    setTimeout(() => {
      addTypingIndicator();
      
      setTimeout(() => {
        removeTypingIndicator();
        const response = getAIResponse(message);
        typeWriterEffect(response, 'ai', () => {
          // Agregar sugerencias después de la respuesta
          addContextualSuggestions(message);
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
    const avatar = type === 'user' ? '<i class="fas fa-user-circle"></i>' : '<i class="fas fa-dove"></i>';
    const name = type === 'user' ? 'Tú' : 'Mediawii';

    const messageHTML = `
      <div class="miia_message ${type}" data-time="${time}">
        <div class="message_avatar">${avatar}</div>
        <div class="message_content">
          <div class="message_header">
            <span class="message_name">${name}</span>
            <span class="message_time">${time}</span>
          </div>
          <div class="message_text">${text}</div>
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
        <div class="message_avatar"><i class="fas fa-dove"></i></div>
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

  // ========== EFECTO TYPEWRITER ==========
  function typeWriterEffect(text, type, callback) {
    const time = new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' });
    const avatar = '<i class="fas fa-dove"></i>';
    
    const messageHTML = `
      <div class="miia_message ${type}" data-time="${time}">
        <div class="message_avatar">${avatar}</div>
        <div class="message_content">
          <div class="message_header">
            <span class="message_name">Mediawii</span>
            <span class="message_time">${time}</span>
          </div>
          <div class="message_text" id="typewriter"></div>
        </div>
      </div>
    `;

    $messages.append(messageHTML);
    const $typewriter = $('#typewriter');
    
    let i = 0;
    const speed = 25; // Velocidad de escritura (más suave)
    
    function type() {
      if (i < text.length) {
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

  // ========== SUGERENCIAS CONTEXTUALES ==========
  function addContextualSuggestions(userMessage) {
    const msg = userMessage.toLowerCase();
    let suggestions = [];

    if (msg.includes('triste') || msg.includes('mal') || msg.includes('deprimido')) {
      suggestions = [
        { icon: 'fa-music', text: '¿Quieres un audio relajante?', prompt: 'Dame un audio que me relaje' },
        { icon: 'fa-book-bible', text: 'Ver versos de consuelo', prompt: 'Muéstrame versos de consuelo' },
        { icon: 'fa-heart', text: 'Hablar sobre mis sentimientos', prompt: 'Quiero hablar sobre cómo me siento' }
      ];
    } else if (msg.includes('matemática') || msg.includes('ecuación') || msg.includes('calcular')) {
      suggestions = [
        { icon: 'fa-calculator', text: 'Otra ecuación', prompt: 'Resuelve: 3x - 7 = 11' },
        { icon: 'fa-square-root-alt', text: 'Raíces cuadradas', prompt: '¿Cómo calcular raíces cuadradas?' },
        { icon: 'fa-chart-line', text: 'Geometría', prompt: 'Ayúdame con geometría' }
      ];
    } else if (msg.includes('biblia') || msg.includes('verso') || msg.includes('dios')) {
      suggestions = [
        { icon: 'fa-cross', text: 'Padre Nuestro', prompt: 'Recítame el Padre Nuestro' },
        { icon: 'fa-book-open', text: 'Más versículos', prompt: 'Dame otro versículo inspirador' },
        { icon: 'fa-pray', text: 'Oración del día', prompt: 'Comparte una oración para hoy' }
      ];
    } else if (msg.includes('solo') || msg.includes('soledad')) {
      suggestions = [
        { icon: 'fa-users', text: 'Consejos de conexión', prompt: '¿Cómo hacer amigos?' },
        { icon: 'fa-heart', text: 'Amor propio', prompt: 'Ayúdame con el amor propio' },
        { icon: 'fa-smile', text: 'Actividades positivas', prompt: '¿Qué actividades puedo hacer solo?' }
      ];
    } else {
      suggestions = [
        { icon: 'fa-calculator', text: 'Matemáticas', prompt: 'Ayúdame con matemáticas' },
        { icon: 'fa-book-bible', text: 'Reflexiones', prompt: 'Dame una reflexión espiritual' },
        { icon: 'fa-lightbulb', text: 'Consejos', prompt: 'Dame un consejo de vida' },
        { icon: 'fa-music', text: 'Audios', prompt: 'Quiero escuchar audios' }
      ];
    }

    if (suggestions.length > 0) {
      const suggestionsHTML = `
        <div class="miia_contextual_suggestions">
          <p class="suggestions_title">💡 Tal vez también te interese:</p>
          <div class="suggestions_grid">
            ${suggestions.map(s => `
              <div class="suggestion_card_small" data-prompt="${s.prompt}">
                <i class="fas ${s.icon}"></i>
                <span>${s.text}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
      $messages.append(suggestionsHTML);
      scrollToBottom();
    }
  }

  // Delegación de eventos para sugerencias pequeñas
  $(document).on('click', '.suggestion_card_small', function() {
    const prompt = $(this).data('prompt');
    $input.val(prompt).css('height', 'auto').trigger('input');
    $input.focus();
    
    // Remover sugerencias contextuales anteriores
    $('.miia_contextual_suggestions').fadeOut(200, function() {
      $(this).remove();
    });
  });

  // ========== SCROLL TO BOTTOM ==========
  function scrollToBottom() {
    $messages.animate({ scrollTop: $messages[0].scrollHeight }, 300);
  }

  // ========== RESPUESTAS DE LA IA ==========
  function getAIResponse(userMessage) {
    const msg = userMessage.toLowerCase();
    
    // Respuestas empáticas
    if (msg.includes('triste') || msg.includes('mal') || msg.includes('deprimido') || msg.includes('depresión')) {
      return '💚 Te comprendo, amigo. Todos pasamos por momentos difíciles y está bien sentirse así. Recuerda que después de la tormenta siempre sale el sol. ¿Quieres hablar sobre lo que te preocupa? Estoy aquí para escucharte sin juzgarte. Eres más fuerte de lo que crees. 🌈';
    }
    
    if (msg.includes('solo') || msg.includes('soledad') || msg.includes('nadie')) {
      return '🤗 Entiendo perfectamente ese sentimiento de soledad. Puede ser muy abrumador, pero quiero que sepas que nunca estás realmente solo. Dios siempre está contigo, y yo también estoy aquí. Cada día es una nueva oportunidad para conectar con otros y contigo mismo. ¿Te gustaría que conversemos un poco? 💙';
    }

    if (msg.includes('ansiedad') || msg.includes('ansioso') || msg.includes('preocupado') || msg.includes('miedo')) {
      return '🌟 La ansiedad puede ser difícil, pero tiene solución. Prueba respirar profundo: inhala 4 segundos, mantén 4, exhala 4. Repítelo. Recuerda Filipenses 4:6-7: "Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios". Todo estará bien, un paso a la vez. 🙏';
    }

    if (msg.includes('gracias') || msg.includes('thank')) {
      return '😊 ¡De nada, amigo! Es un placer poder ayudarte. Recuerda que siempre estaré aquí cuando me necesites. Que tengas un hermoso día lleno de bendiciones. 🌟';
    }
    
    // Matemáticas
    if (msg.includes('matemática') || msg.includes('ecuación') || msg.includes('resolver') || msg.includes('calcular')) {
      if (msg.includes('2x') || msg.includes('3x') || msg.includes('x')) {
        const match = msg.match(/(\d+)x\s*([+-])\s*(\d+)\s*=\s*(\d+)/);
        if (match) {
          const [_, a, op, b, result] = match;
          const num_a = parseInt(a);
          const num_b = op === '+' ? parseInt(b) : -parseInt(b);
          const num_result = parseInt(result);
          const step1 = num_result - num_b;
          const x = step1 / num_a;
          return `📊 ¡Claro! Veo que tienes una ecuación. Si es **${a}x ${op} ${b} = ${result}**, la resolución sería:\n\n1. Restamos/Sumamos ${b} de ambos lados: **${a}x = ${step1}**\n2. Dividimos entre ${a}: **x = ${x}**\n\n¿Tienes otra ecuación que resolver? 🧮`;
        }
        return '📊 ¡Claro! Veo que tienes una ecuación. Si es **2x + 5 = 15**, la resolución sería:\n\n1. Restamos 5 de ambos lados: **2x = 10**\n2. Dividimos entre 2: **x = 5**\n\n¿Tienes otra ecuación que resolver? 🧮';
      }
      return '📐 ¡Por supuesto! Estoy aquí para ayudarte con matemáticas. Desde operaciones básicas hasta ecuaciones complejas, cálculo, geometría y más. Escríbeme el problema específico y te guiaré paso a paso. ¿Qué necesitas resolver? 🔢';
    }
    
    // Espiritual/Biblia
    if (msg.includes('biblia') || msg.includes('verso') || msg.includes('versículo') || msg.includes('dios')) {
      return '✨ **Juan 3:16** - "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna."\n\nEste es uno de los versos más poderosos. La fe es un camino personal y hermoso. ¿Te gustaría explorar alguna enseñanza en particular? También tengo audios en quechua si te interesa. 📖🙏';
    }

    if (msg.includes('esperanza') || msg.includes('fuerza') || msg.includes('ánimo')) {
      return '🌟 **Romanos 15:13** - "Y el Dios de esperanza os llene de todo gozo y paz en el creer, para que abundéis en esperanza por el poder del Espíritu Santo."\n\nNunca pierdas la esperanza, amigo. Las dificultades son temporales, pero la fe es eterna. Eres más fuerte de lo que imaginas. ¿Hay algo más en lo que pueda ayudarte? 💪✨';
    }

    if (msg.includes('padre nuestro') || msg.includes('oración') || msg.includes('rezar')) {
      return '🙏 **Padre Nuestro**\n\nPadre nuestro que estás en el cielo,\nSantificado sea tu nombre.\nVenga tu reino.\nHágase tu voluntad en la tierra como en el cielo.\nDanos hoy nuestro pan de cada día.\nPerdona nuestras ofensas,\nComo también nosotros perdonamos a los que nos ofenden.\nNo nos dejes caer en tentación\nY líbranos del mal. Amén. ✝️';
    }

    // Consejos de vida
    if (msg.includes('mejorar') || msg.includes('cambiar') || msg.includes('consejo') || msg.includes('ayuda')) {
      return '💡 Para mejorar tu vida, te recomiendo:\n\n1. **Gratitud diaria**: Agradece 3 cosas cada mañana\n2. **Metas claras**: Define qué quieres lograr\n3. **Cuidado personal**: Duerme bien, come sano, ejercítate\n4. **Aprendizaje constante**: Lee, estudia, crece\n5. **Fe activa**: Ora y confía en Dios\n\nRecuerda: "Yo puedo hacer todas las cosas en Cristo que me fortalece" (Filipenses 4:13). ¿En qué área específica quieres mejorar? 🌱';
    }

    if (msg.includes('motivación') || msg.includes('motivar') || msg.includes('inspire')) {
      return '🔥 ¡Tú puedes lograr TODO lo que te propongas! Cada día es una nueva oportunidad para ser mejor. No importa cuántas veces caigas, lo importante es levantarse una vez más. Eres único, valioso y capaz de grandes cosas. La mejor versión de ti mismo está esperando. ¡Vamos, sigue adelante! 💪✨';
    }

    // Saludo
    if (msg.includes('hola') || msg.includes('hey') || msg.includes('buenas') || msg.includes('hi')) {
      return '👋 ¡Hola! ¿Cómo estás hoy? Me alegra mucho que estés aquí. Soy Mediawii, tu asistente espiritual. Puedo ayudarte con matemáticas, consejos de vida, reflexiones bíblicas o simplemente conversar. ¿En qué puedo ayudarte? 😊';
    }

    if (msg.includes('bien') || msg.includes('feliz') || msg.includes('contento')) {
      return '😄 ¡Qué alegría saber que estás bien! Es hermoso cuando podemos disfrutar de los buenos momentos. Recuerda agradecer por cada bendición. ¿Hay algo en lo que pueda ayudarte hoy? 🌟';
    }

    // Despedida
    if (msg.includes('adiós') || msg.includes('chao') || msg.includes('bye') || msg.includes('hasta')) {
      return '👋 ¡Hasta pronto, amigo! Que Dios te bendiga y te acompañe siempre. Aquí estaré cuando me necesites. ¡Cuídate mucho! 🙏💚';
    }
    
    // Respuesta por defecto
    return '😊 Gracias por compartir eso conmigo. Entiendo lo que me dices. Cada problema tiene solución, y juntos podemos encontrarla. Recuerda que nunca estás solo en este camino. ¿Hay algo específico en lo que pueda ayudarte hoy? Estoy aquí para ti, ya sea con matemáticas, consejos, reflexiones espirituales o simplemente para conversar. 💚';
  }

  console.log(`✅ Chatwiil IA ${version} iniciado`);
};

export const cleanup = () => {
  $('#miiaInput, #miiaSend').off();
  $(document).off('click', '.suggestion_card, .suggestion_card_small');
  console.log('🧹 Chatwiil IA limpiado');
};