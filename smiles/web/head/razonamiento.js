// 🧩 GENERAR RESPUESTA LÓGICA
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // ========== POR QUÉ / EXPLICACIONES ==========
  if (/por qué|porque|razón|motivo|explicar|explica/i.test(msg)) {
    
    // Preguntas existenciales
    if (/por qué exist|por qué estoy aquí|sentido de la vida/i.test(msg)) {
      return `🤔 **Gran pregunta filosófica.**\n\n` +
             `Desde una perspectiva espiritual:\n` +
             `📖 **Fuiste creado con propósito.** Eclesiastés 3:11 dice que Dios "hizo todo hermoso en su tiempo, y puso eternidad en el corazón del hombre."\n\n` +
             `🌟 **Tu existencia tiene significado:**\n` +
             `• Para amar y ser amado\n` +
             `• Para crecer y aprender\n` +
             `• Para hacer el bien a otros\n` +
             `• Para buscar y conocer a Dios\n\n` +
             `💡 El sentido de la vida no es un destino, es un camino que construyes cada día con tus decisiones.`;
    }

    // Por qué las cosas malas pasan
    if (/por qué (pasa|sucede|ocurre).*(malo|bad|tragic|sufr)/i.test(msg)) {
      return `💭 **Es una pregunta profunda que todos nos hacemos.**\n\n` +
             `📖 Romanos 8:28: "Sabemos que Dios hace que todas las cosas cooperen para el bien de quienes lo aman."\n\n` +
             `🧩 **Algunas reflexiones:**\n` +
             `• Vivimos en un mundo imperfecto con libre albedrío\n` +
             `• Las pruebas nos fortalecen (Santiago 1:2-4)\n` +
             `• No siempre entendemos el "por qué", pero podemos confiar\n` +
             `• El sufrimiento temporal puede llevar a crecimiento eterno\n\n` +
             `💚 Aunque no tengamos todas las respuestas, no estás solo en tus luchas.`;
    }
  }

  // ========== CÓMO FUNCIONA ==========
  if (/cómo funciona|cómo se hace|cómo trabaja/i.test(msg)) {
    if (/internet|wifi|red/i.test(msg)) {
      return `🌐 **Cómo funciona Internet (simplificado):**\n\n` +
             `1️⃣ **Tu dispositivo** envía una solicitud (ej: abrir Google)\n` +
             `2️⃣ **El router** envía la solicitud a tu proveedor de Internet\n` +
             `3️⃣ **Viaja por cables/fibra** hasta el servidor de Google\n` +
             `4️⃣ **El servidor responde** con la página web\n` +
             `5️⃣ **Tu navegador la muestra** en pantalla\n\n` +
             `Todo esto ocurre en **milisegundos**. 🚀\n\n` +
             `💡 Es como enviar una carta súper rápida que viaja por el mundo en segundos.`;
    }
  }

  // ========== LÓGICA DE DECISIONES ==========
  if (/debería|debo|tengo que|es mejor/i.test(msg)) {
    return `🧠 **Para tomar buenas decisiones, considera:**\n\n` +
           `1️⃣ **Valores:** ¿Está alineado con mis principios?\n` +
           `2️⃣ **Consecuencias:** ¿Qué pasará a corto y largo plazo?\n` +
           `3️⃣ **Intuición:** ¿Qué dice mi corazón?\n` +
           `4️⃣ **Consejo:** ¿Qué dirían personas sabias?\n` +
           `5️⃣ **Oración:** Si tienes fe, pide guía a Dios\n\n` +
           `📖 Proverbios 3:5-6: "Confía en el Señor de todo corazón, y no te apoyes en tu propio entendimiento."\n\n` +
           `💡 No hay decisiones perfectas, pero sí decisiones hechas con sabiduría.`;
  }

  return null;
};