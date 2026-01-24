// ========== PARTE 1: DATOS BASE ==========
const consejos = {
  motivacion: [
    '💪 Cada día es una nueva oportunidad para ser mejor. ¡Tú puedes! 🔥',
    '🌟 No te rindas. Los mejores logros requieren tiempo y esfuerzo. 💯',
    '🚀 Cree en ti mismo. Eres más fuerte de lo que piensas. 💪'
  ],
  tristeza: [
    '💙 Es normal sentirse triste a veces. Permítete sentir, pero no te quedes ahí. 🌈',
    '🫂 No estás solo. Habla con alguien de confianza. 💚',
    '🌻 Después de la tormenta siempre sale el sol. Ten paciencia. ☀️'
  ],
  estres: [
    '😌 Respira profundo. Cuenta hasta 10. Todo va a estar bien. 🌿',
    '🧘 Toma un descanso. Tu salud mental es importante. 💚',
    '☕ Date un momento para ti. El estrés pasa, tú permaneces. 🕊️'
  ],
  mejora: [
    '📈 Lee 10 minutos al día. El conocimiento es poder. 📚',
    '💧 Bebe más agua, duerme 8 horas, haz ejercicio. Lo básico funciona. 💪',
    '🙏 Practica la gratitud. Agradece 3 cosas cada día. ✨'
  ]
};

// ========== PARTE 2: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 3: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (/triste|deprimido|mal|solo/i.test(msg)) return random(consejos.tristeza);
  if (/estres|ansiedad|preocupado|nervioso/i.test(msg)) return random(consejos.estres);
  if (/motivación|animo|fuerzas/i.test(msg)) return random(consejos.motivacion);
  if (/mejorar|mejor|cambiar|superarme/i.test(msg)) return random(consejos.mejora);
  
  return null;
};