import * as memory from './memoria.js';

// ========== SANITIZACIÓN HTML ==========
const sanitize = (text) => {
  if (typeof text !== 'string') return '';
  
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
};

// ========== PROCESAMIENTO PRINCIPAL ==========
export const process = async (userMessage) => {
  // Guardar mensaje del usuario
  memory.add('user', userMessage);
  
  const msg = userMessage.toLowerCase().trim();
  let response = '';
  
  // ========== MATEMÁTICAS ==========
  if (/\d+\s*[\+\-\*\/]\s*\d+/.test(msg)) {
    response = processMath(userMessage);
  }
  // ========== SALUDOS ==========
  else if (/^(hola|hi|hey|buenas|que tal)/i.test(msg)) {
    response = '¡Hola, amigo! 👋😊 ¿En qué puedo ayudarte hoy? 💚';
  }
  // ========== EMOCIONES ==========
  else if (/(triste|deprimido|mal|solo|ansiedad)/i.test(msg)) {
    response = '💙 Lamento que te sientas así. Recuerda que no estás solo. ¿Quieres hablar de lo que te preocupa? Estoy aquí para escucharte. 🤗';
  }
  // ========== AGRADECIMIENTOS ==========
  else if (/(gracias|thank|agradezco)/i.test(msg)) {
    response = '¡De nada! 🙏💚 Siempre es un placer ayudarte. ¿Algo más en lo que pueda asistirte?';
  }
  // ========== HALAGOS ==========
  else if (/(genial|maximo|excelente|increible|crack|numero|number)/i.test(msg)) {
    response = '¡Muchas gracias! 🙏💚 Pero el verdadero crack eres tú 🏆';
  }
  else if (/(te amo|te quiero|love you)/i.test(msg)) {
    response = '¡Eres un amor! 💙 Muchas gracias, tú también eres espectacular 🌟✨';
  }
  // ========== BIBLIA ==========
  else if (/(biblia|verso|dios|jesus|fe)/i.test(msg)) {
    response = '✨ **"Porque de tal manera amó Dios al mundo..."** (Juan 3:16)\n\nLa fe es un camino personal. ¿Te gustaría explorar alguna enseñanza en particular?';
  }
  // ========== MENSAJES CORTOS (1-2 caracteres) ==========
  else if (msg.length <= 2) {
    response = '🤔 Hmm, no estoy seguro de cómo responder a eso. ¿Podrías reformular tu pregunta?';
  }
  // ========== RESPUESTA GENÉRICA ==========
  else {
    response = '💭 Interesante pregunta. ¿Podrías darme más detalles para ayudarte mejor?';
  }
  
  // Agregar footer motivacional aleatorio
  response += getMotivationalFooter();
  
  // Guardar respuesta en memoria
  memory.add('assistant', response);
  
  // Retornar HTML sanitizado
  return sanitize(response);
};

// ========== PROCESAMIENTO DE MATEMÁTICAS ==========
const processMath = (expr) => {
  try {
    const match = expr.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
    if (!match) return '❌ No pude entender la operación matemática';
    
    const [, a, op, b] = match;
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    let result;
    
    switch (op) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num2 !== 0 ? num1 / num2 : 'Error: División por cero'; break;
      default: result = 'Operación no válida';
    }
    
    const symbol = { '+': '➕', '-': '➖', '*': '✖️', '/': '➗' }[op] || op;
    
    return `¡Súper! ⭐ Te va a encantar esto ${symbol}\n\n**Operación:**\n\n${num1} ${op} ${num2} = **${result}** ✅ 🎯`;
  } catch (err) {
    return '❌ Hubo un error al calcular. Verifica la operación.';
  }
};

// ========== FOOTER MOTIVACIONAL ==========
const getMotivationalFooter = () => {
  const footers = [
    '\n\n🕊️ *Espero haberte ayudado.* ✨',
    '\n\n😊 *Que tengas un día maravilloso.* 🌈',
    '\n\n🔥 *¡Tú puedes con todo!* 💯',
    '\n\n💚 *Siempre a tu servicio.* 🙏',
    ''
  ];
  
  return footers[Math.floor(Math.random() * footers.length)];
};