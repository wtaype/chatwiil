// ========== PARTE 1: DATOS BASE ==========
const respuestasGenericas = [
  '💭 Interesante pregunta. ¿Podrías darme más detalles para ayudarte mejor?',
  '🤔 Hmm, no estoy seguro de entender completamente. ¿Podrías reformular tu pregunta?',
  '💡 Me gustaría ayudarte. ¿Puedes ser más específico con lo que necesitas?',
  '🔍 Estoy procesando tu pregunta. ¿Hay algo en particular que quieras saber?',
  '✨ Cuéntame más sobre lo que buscas, así podré ayudarte mejor.'
];

const mensajesCortos = [
  '🤔 Eso es muy corto. ¿Podrías decirme más?',
  '💬 Necesito un poco más de información. ¿Qué necesitas?',
  '🔤 Mensaje muy corto. ¿Puedes explicar un poco más?'
];

const noEntiendo = [
  '😅 Lo siento, no entendí bien. ¿Puedes reformular tu pregunta?',
  '🤷 No estoy seguro de cómo responder a eso. ¿Puedes ser más claro?',
  '💭 Hmm, no capté eso. Intenta preguntarme de otra forma.'
];

// ========== PARTE 2: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 3: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.trim();
  
  // Mensajes muy cortos
  if (msg.length <= 2) return random(mensajesCortos);
  
  // Preguntas sobre capacidades
  if (/qué puedes|que sabes|qué haces|para qué sirves/i.test(msg)) {
    return '💚 Puedo ayudarte con matemáticas, programación, consejos de vida, reflexiones espirituales, creatividad y mucho más. ¿Qué necesitas hoy?';
  }
  
  // Preguntas sobre identidad
  if (/quién eres|que eres|tu nombre/i.test(msg)) {
    return '🕊️ Soy ChatWiil, tu asistente espiritual inteligente. Estoy aquí para ayudarte, inspirarte y acompañarte. 💚';
  }
  
  // Respuesta genérica
  return random(respuestasGenericas);
};