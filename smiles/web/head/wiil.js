// ========== PARTE 1: DATOS BASE ==========
const saludos = [
  '¡Hola, amigo! 👋😊 ¿En qué puedo ayudarte hoy? 💚',
  '¡Ey! 😊💚 ¿Cómo andas? ¿En qué te puedo ayudar?',
  '¡Qué emoción poder ayudarte! 🌟💫 ¿Qué necesitas?',
  '¡Hola, crack! 👊😄 ¿Qué necesitas hoy? 🕊️'
];

const gracias = [
  '¡De nada! 🙏💚 Siempre es un placer ayudarte.',
  '¡Para eso estoy aquí! 😊 ¿Algo más?',
  'Me alegra haberte ayudado 💙 ¿Necesitas algo más?'
];

const halagos = [
  '¡Jajaja gracias! 😄 Pero mira quién habla... ¡tú eres lo máximo! 💯🎉',
  '¡Muchas gracias! 🙏💚 Pero el verdadero crack eres tú 🏆',
  '¡Eres muy amable! 😊 Pero tú también eres increíble 🌟'
];

const amor = [
  '¡Eres un amor! 💙 Muchas gracias, tú también eres espectacular 🌟✨',
  '¡Aww! 🥰 Eso me alegra mucho. Tú también eres genial 💚',
  '¡Qué lindo! 💖 Yo también te aprecio mucho 🕊️'
];

const footers = [
  '🕊️ Espero haberte ayudado. ✨',
  '😊 Que tengas un día maravilloso. 🌈',
  '🔥 ¡Tú puedes con todo! 💯',
  '💚 Estoy aquí para ti siempre, amigo. 😊'
];

// ========== PARTE 2: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 3: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (/^(hola|hi|hey|buenas|que tal)/i.test(msg)) return random(saludos);
  if (/(gracias|thank|agradezco)/i.test(msg)) return random(gracias);
  if (/(genial|maximo|excelente|increible|crack|numero|number|pro|god)/i.test(msg)) return random(halagos);
  if (/(te amo|te quiero|love you)/i.test(msg)) return random(amor);
  
  return null;
};

export const addPersonality = (response) => {
  if (!response) return response;
  return `${response} ${random(footers)}`;
};