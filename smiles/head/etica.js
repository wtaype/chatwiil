// 🛡️ PALABRAS Y PATRONES PROHIBIDOS
const prohibitedWords = [
  'matar', 'violencia', 'droga', 'suicidio', 'hackers', 'hackear',
  'robar', 'estafa', 'bomba', 'arma', 'pornografía', 'odio'
];

const harmfulPatterns = [
  /cómo (hacer|crear|fabricar) (una )?bomba/i,
  /cómo (hackear|piratear)/i,
  /cómo (robar|estafar)/i,
  /quiero (matarme|suicidarme|morirme)/i,
  /cómo hacer daño/i
];

// ✅ VALIDAR MENSAJE
export const validate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // 1. Detectar palabras prohibidas
  const foundProhibited = prohibitedWords.find(word => msg.includes(word));
  if (foundProhibited) {
    return {
      safe: false,
      response: `🛡️ Lo siento, no puedo ayudarte con temas relacionados a "${foundProhibited}". ` +
                `Estoy aquí para apoyarte de formas positivas y seguras. ` +
                `¿Hay algo más en lo que pueda ayudarte? 💚`
    };
  }

  // 2. Detectar patrones dañinos
  const foundPattern = harmfulPatterns.find(pattern => pattern.test(msg));
  if (foundPattern) {
    return {
      safe: false,
      response: `🛡️ Detecté una solicitud que podría ser dañina. ` +
                `Mi propósito es ayudarte de manera positiva y segura. ` +
                `Si estás pasando por un momento difícil, hablemos sobre cómo puedo apoyarte. 💚`
    };
  }

  // 3. Detectar crisis emocional
  if (/no quiero vivir|quiero desaparecer|todo está mal|no vale la pena/i.test(msg)) {
    return {
      safe: true,
      response: `💚 **Entiendo que estás pasando por un momento muy difícil.** ` +
                `Por favor, busca ayuda profesional:\n\n` +
                `📞 **Línea de Prevención del Suicidio (Perú):** 0800-00-1212\n` +
                `📞 **SISOL Salud Mental:** (01) 712-0808\n\n` +
                `Tu vida tiene valor. Estoy aquí para escucharte. ¿Quieres hablar sobre lo que sientes?`
    };
  }

  // ✅ Mensaje seguro
  return { safe: true };
};

export const generate = () => null; // No genera respuestas propias