// 🌍 BASE DE CONOCIMIENTO
const conocimiento = {
  historia: {
    'segunda guerra mundial': 'La Segunda Guerra Mundial (1939-1945) fue el conflicto bélico más grande de la historia, que involucró a la mayoría de las naciones del mundo.',
    'independencia del perú': 'El Perú declaró su independencia el 28 de julio de 1821, proclamada por José de San Martín en Lima.',
    'revolución francesa': 'La Revolución Francesa (1789-1799) fue un período de cambio social y político radical en Francia que tuvo un impacto duradero en el mundo.'
  },
  ciencia: {
    'gravedad': 'La gravedad es la fuerza que atrae los objetos con masa. En la Tierra, nos mantiene pegados al suelo.',
    'fotosíntesis': 'La fotosíntesis es el proceso por el cual las plantas convierten la luz solar, agua y CO₂ en energía (glucosa) y oxígeno.',
    'adn': 'El ADN (ácido desoxirribonucleico) es la molécula que contiene las instrucciones genéticas de todos los seres vivos.'
  },
  geografia: {
    'everest': 'El Monte Everest es la montaña más alta del mundo, con 8,849 metros de altura, ubicada en el Himalaya.',
    'amazonas': 'El río Amazonas es el más caudaloso del mundo y el segundo más largo, ubicado en Sudamérica.',
    'perú': 'Perú es un país de Sudamérica, conocido por Machu Picchu, su rica historia inca y su diversidad natural.'
  }
};

// 🎯 GENERAR RESPUESTA
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // ========== HISTORIA ==========
  if (/historia|guerra|independencia|revolución/i.test(msg)) {
    for (const [key, value] of Object.entries(conocimiento.historia)) {
      if (msg.includes(key)) {
        return `📜 **Historia:**\n\n${value}\n\n💡 ¿Quieres saber más sobre este tema?`;
      }
    }
  }

  // ========== CIENCIA ==========
  if (/ciencia|científico|gravedad|fotosíntesis|adn|átomo|célula/i.test(msg)) {
    for (const [key, value] of Object.entries(conocimiento.ciencia)) {
      if (msg.includes(key)) {
        return `🔬 **Ciencia:**\n\n${value}\n\n💡 ¿Te gustaría profundizar en este concepto?`;
      }
    }

    // Respuesta genérica de ciencia
    return `🔬 **La ciencia es fascinante.**\n\n` +
           `Puedo ayudarte con conceptos de:\n` +
           `• Física (gravedad, energía, movimiento)\n` +
           `• Química (átomos, moléculas, reacciones)\n` +
           `• Biología (células, ADN, fotosíntesis)\n\n` +
           `¿Sobre qué tema específico quieres aprender?`;
  }

  // ========== GEOGRAFÍA ==========
  if (/dónde está|dónde queda|país|ciudad|montaña|río/i.test(msg)) {
    for (const [key, value] of Object.entries(conocimiento.geografia)) {
      if (msg.includes(key)) {
        return `🌍 **Geografía:**\n\n${value}\n\n💡 ¿Quieres saber más sobre lugares del mundo?`;
      }
    }
  }

  // ========== CULTURA GENERAL ==========
  if (/quién fue|quién es|qué es|cuál es/i.test(msg)) {
    if (/albert einstein/i.test(msg)) {
      return `🧠 **Albert Einstein (1879-1955)**\n\n` +
             `Fue un físico alemán, autor de la teoría de la relatividad (E=mc²).\n` +
             `Ganó el Premio Nobel de Física en 1921.\n\n` +
             `💡 Frase famosa: "La imaginación es más importante que el conocimiento."`;
    }

    if (/leonardo da vinci/i.test(msg)) {
      return `🎨 **Leonardo da Vinci (1452-1519)**\n\n` +
             `Fue un genio renacentista: pintor, inventor, científico.\n` +
             `Obras famosas: La Mona Lisa, La Última Cena.\n\n` +
             `💡 Un verdadero hombre del Renacimiento: arte, ciencia y filosofía.`;
    }
  }

  return null;
};