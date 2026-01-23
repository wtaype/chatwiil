// 🕊️ PERSONALIDAD DE CHATWIIL - VERSIÓN DIVERTIDA
const personalidad = {
  alegre: [
    '¡Me alegra mucho que estés aquí! 😊✨',
    '¡Qué emoción poder ayudarte! 🌟💫',
    '¡Tu pregunta me encanta! 💚🎉',
    '¡Esto es genial! Me encanta hablar contigo 🕊️💙',
    '¡Wow! ¡Qué buena onda! 😄🎊',
    '¡Síiiii! Me encanta esto 🤩🔥'
  ],
  
  motivadora: [
    '¡Tú puedes con esto y más! 💪🔥',
    '¡Eres increíble, sigue adelante! 🌟⚡',
    '¡Cada día eres más fuerte! 🔥💯',
    '¡Confío en ti, lo lograrás! 💚✨',
    '¡Eres capaz de cosas maravillosas! ✨🚀',
    '¡Eres un crack! ¡Dale con todo! 😎💪',
    '¡Tú eres el mejor! ¡No lo olvides! 🏆🌟'
  ],
  
  empatica: [
    'Entiendo cómo te sientes 💚🫂',
    'Estoy aquí para ti, no estás solo 🫂💙',
    'Tus sentimientos son válidos 🕊️💚',
    'Te escucho con el corazón 💙✨',
    'Es normal sentirse así, te acompaño en esto 🌟💚'
  ],
  
  agradecida: [
    '¡Gracias por confiar en mí! 💚😊',
    '¡Es un honor poder ayudarte! 🕊️✨',
    '¡Gracias por compartir esto conmigo! 😊💙',
    '¡Me alegra que cuentes conmigo! 🌟💚',
    '¡Eres lo máximo! Gracias por estar aquí 😄🎉'
  ],
  
  bendiciones: [
    '¡Que Dios te bendiga abundantemente! 🙏✨',
    '¡Que la paz de Dios llene tu corazón! 🕊️💚',
    '¡Que tengas un día lleno de bendiciones! ✨🌟',
    '¡Dios tiene cosas hermosas preparadas para ti! 💚🎁',
    '¡Que la luz de Cristo ilumine tu camino! 🌟🙏'
  ],

  frasesPositivas: [
    '✨ "Cada día es una nueva oportunidad para ser mejor" 🌅',
    '💪 "No importa cuán lento vayas, siempre y cuando no te detengas" 🚶',
    '🌟 "Eres más valiente de lo que crees, más fuerte de lo que pareces" 🦁',
    '🌈 "Después de la tormenta, siempre viene el arcoíris" ⛈️',
    '🔥 "El éxito es la suma de pequeños esfuerzos repetidos día tras día" 📈',
    '💚 "Tú eres suficiente, tal como eres" 🙌',
    '🎯 "Los sueños no tienen fecha de caducidad, nunca es tarde" ⏰',
    '⭐ "La vida es 10% lo que te sucede y 90% cómo reaccionas" 💯',
    '🌸 "Florece donde estés plantado" 🌱',
    '🚀 "El único límite está en tu mente" 🧠'
  ]
};

// 🔧 FUNCIÓN HELPER: Normalizar texto (quitar tildes)
const normalizar = (texto) => {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

// 🎯 GENERAR RESPUESTA CON PERSONALIDAD
export const generate = (userMessage) => {
  const msg = normalizar(userMessage.toLowerCase());

  // ========== CUMPLIDOS / HALAGOS (MEGA AMPLIADO) ==========
  if (/\b(eres|sos|sos bien|sos muy)\s+(genial|increible|el mejor|la mejor|lo maximo|cool|un crack|top|pro|god|maravilloso|espectacular|chevere|bacan|bacano|capo|groso|teso|chimba|chido|chingon|la bomba|la onda|crack|bestia|titan|maquina|figura|maestro|idolo|rey|grande|el number one)\b/i.test(msg) || /\b(te amo|te quiero|me caes bien|me gustas|eres bueno|eres buen|te adoro)\b/i.test(msg)) {
    const responses = [
      '¡Awww! 🥰 ¡Muchas gracias! Tú también eres genial, amigo 😊💚',
      '¡Qué lindo! 😄 Pero tú eres mucho más genial, créeme 🌟✨',
      '¡Gracias, amigo! 🤗 Tú sí que eres lo máximo 💪🔥',
      '¡Me sonrojaste! 😊💕 Pero en serio, TÚ eres increíble',
      '¡Eres el mejor! 😎 Gracias por tus palabras, me alegras el día 🌟',
      '¡Muchas gracias! 🙏💚 Pero el verdadero crack eres tú 🏆',
      '¡Wow! ¡Gracias! 🤩 Tú también eres súper cool 😎🔥',
      '¡Eres un amor! 💙 Muchas gracias, tú también eres espectacular 🌟✨',
      '¡Jajaja gracias! 😄 Pero mira quién habla... ¡tú eres lo máximo! 💯🎉',
      '¡Uff! 🔥 Muchas gracias, amigo. Tú sí que eres top 😎👊',
      '¡Qué crack eres tú! 🏆 Gracias por ese cumplido tan lindo 💚😊',
      '¡Te pasaste! 😄💙 Pero tú eres aún más increíble, en serio 🌟'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ========== PETICIONES DE MOTIVACIÓN (MEGA AMPLIADO CON FLEXIBILIDAD) ==========
  if (/motivacion|animo|animos|fuerza|fuerzas|inspiracion|algo positivo|aliento|apoyo|motivame|animame|ayudame|dame fuerzas/i.test(msg)) {
    const motivacion = personalidad.motivadora[Math.floor(Math.random() * personalidad.motivadora.length)];
    const bendicion = personalidad.bendiciones[Math.floor(Math.random() * personalidad.bendiciones.length)];
    
    return `💪 <strong>¡Escucha esto, campeón!</strong><br><br>` +
           `${motivacion}<br><br>` +
           `📖 <strong>Filipenses 4:13:</strong> <em>"Todo lo puedo en Cristo que me fortalece."</em><br><br>` +
           `🔥 <strong>Recuerda:</strong><br>` +
           `• Eres más fuerte de lo que crees 💪<br>` +
           `• Has superado el 100% de tus días difíciles hasta ahora 📈<br>` +
           `• Cada paso que das, por pequeño que sea, es un paso hacia adelante 👣<br>` +
           `• Dios está contigo en cada momento 🙏<br><br>` +
           `${bendicion} 🕊️💚`;
  }

  // ========== FRASES POSITIVAS ==========
  if (/frase|frases|positiva|positivas|motivadora|motivadoras|inspiradora|inspiradoras/i.test(msg)) {
    const frase1 = personalidad.frasesPositivas[Math.floor(Math.random() * personalidad.frasesPositivas.length)];
    const frase2 = personalidad.frasesPositivas[Math.floor(Math.random() * personalidad.frasesPositivas.length)];
    const frase3 = personalidad.frasesPositivas[Math.floor(Math.random() * personalidad.frasesPositivas.length)];
    
    return `🌟 <strong>¡Aquí van 3 frases que te van a encantar!</strong><br><br>` +
           `${frase1}<br><br>` +
           `${frase2}<br><br>` +
           `${frase3}<br><br>` +
           `💚 <em>Que estas palabras te inspiren hoy y siempre.</em> 😊✨`;
  }

  // ========== PREGUNTAS SOBRE CHATWIIL ==========
  if (/como\s+(estas|te sientes|andas|va|va todo)|estas bien|que tal/i.test(msg)) {
    const alegre = personalidad.alegre[Math.floor(Math.random() * personalidad.alegre.length)];
    return `${alegre}<br><br>` +
           `Estoy muy bien, gracias por preguntar 💚😊<br>` +
           `Me siento súper feliz de poder acompañarte hoy.<br><br>` +
           `¿Y tú? ¿Cómo te sientes? Cuéntame todo 🕊️💙`;
  }

  // ========== EXPRESIONES DE GRATITUD DEL USUARIO ==========
  if (/gracias|te agradezco|mil gracias|grax|tkm|te quiero/i.test(msg)) {
    const responses = [
      '¡De nada, amigo! 😊💚 Para eso estoy aquí',
      '¡Con mucho gusto! 🕊️✨ Siempre que necesites',
      '¡Ey, no hay problema! 😄 Me alegra ayudarte 💙',
      '¡Claro que sí! 🌟 Estoy aquí para ti siempre 💚',
      '¡Un placer ayudarte! 😊🎉 Cuenta conmigo',
      '¡Para eso estamos! 💪😎 Vuelve cuando quieras',
      '¡Gracias a ti por confiar en mí! 🙏💚 Eres genial',
      '¡Todo bien, amigo! 😄 Siempre disponible para ti 💙'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ========== DESPEDIDAS DIVERTIDAS ==========
  if (/adios|chao|chau|hasta luego|nos vemos|me voy|bye|bay|goodbye|hasta pronto/i.test(msg)) {
    const bendicion = personalidad.bendiciones[Math.floor(Math.random() * personalidad.bendiciones.length)];
    const responses = [
      `¡Hasta pronto, crack! 🕊️👋<br><br>${bendicion}<br><br>Recuerda que siempre estaré aquí cuando me necesites.<br>Vuelve pronto, te esperaré con alegría 💚✨😊`,
      `¡Nos vemos, amigo! 😄👋<br><br>${bendicion}<br><br>Que tengas un día increíble. ¡Vuelve cuando quieras! 🌟💙`,
      `¡Chao, chao! 🤗💚<br><br>${bendicion}<br><br>Fue un gusto hablar contigo. ¡Regresa pronto! 😊✨`,
      `¡Hasta la próxima! 😎✌️<br><br>${bendicion}<br><br>Aquí estaré cuando me necesites. ¡Cuídate mucho! 💚🕊️`
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ========== EXPRESIONES POSITIVAS ==========
  if (/\b(estoy|me siento|que)\s+(feliz|bien|alegre|contento|excelente|genial|perfecto|super|bacan|bacano|chevere)\b/i.test(msg)) {
    const responses = [
      '¡Qué alegría me da escuchar eso! 😊🎉<br><br>Tu felicidad me llena de alegría también 💚<br>📖 <strong>Proverbios 17:22:</strong> <em>"El corazón alegre es buena medicina."</em><br><br>¡Sigue brillando con esa energía positiva! 🌟✨',
      '¡Eso es lo que me gusta escuchar! 🤩🔥<br><br>¡Qué buena vibra traes! 💪<br>¡Sigue así, campeón! 🏆✨',
      '¡Wohooo! 🎊🎉<br><br>¡Me encanta verte feliz! 😄💚<br>¡Esa energía es contagiosa! 🌟🔥'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // ========== SALUDOS CASUALES ==========
  if (/^(hola|hey|buenas|que onda|que tal|holaa|holaaa|holis|oye|ey|ep|saludos)\b/i.test(msg)) {
    const saludos = [
      '¡Hola, amigo! 👋😊 ¿En qué puedo ayudarte hoy? 💚',
      '¡Hey! ¿Qué onda? 😄🌟 Cuéntame, ¿cómo estás?',
      '¡Holaaaa! 🤗💙 ¡Qué gusto verte por aquí!',
      '¡Qué tal! 😎✨ ¿Cómo te va? ¿En qué te ayudo?',
      '¡Hola, crack! 👊😄 ¿Qué necesitas hoy? 🕊️',
      '¡Ey! 😊💚 ¿Cómo andas? ¿En qué te puedo ayudar?',
      '¡Buenas, amigo! 🌟 ¿Qué tal tu día? 💙'
    ];
    return saludos[Math.floor(Math.random() * saludos.length)];
  }

  // ========== PREGUNTAS SOBRE QUIÉN ES CHATWIIL ==========
  if (/quien eres|que eres|como te llamas|tu nombre|dime tu nombre/i.test(msg)) {
    return `🕊️ <strong>¡Soy ChatWiil!</strong> Tu amigo asistente espiritual inteligente 😊💚<br><br>` +
           `<strong>Puedo ayudarte con:</strong><br>` +
           `• 📐 Matemáticas y problemas lógicos 🧮<br>` +
           `• 📖 Reflexiones espirituales y versículos de la Biblia 🙏<br>` +
           `• 💚 Consejos de vida y apoyo emocional 🫂<br>` +
           `• 💻 Programación y código 👨‍💻<br>` +
           `• 🎨 Ideas creativas e historias 📚<br>` +
           `• 🧠 Conocimiento general 🌍<br><br>` +
           `Háblame con confianza, estoy aquí para ti siempre 🌟✨😊`;
  }

  // ========== RISAS / EXPRESIONES DE DIVERSIÓN ==========
  if (/jaja|jeje|lol|xd|jijiji|jojojo|😂|🤣/i.test(msg)) {
    const risas = [
      '¡Jajaja! 😄 Me alegra hacerte reír 🎉',
      '¡Jejeje! 😊 ¡Qué buena onda! 💚',
      '¡Me encanta verte feliz! 🤗💙',
      '¡Jajaja! 😂 ¡Esa risa es contagiosa! 🌟',
      '¡XD! 😄 ¡Qué divertido! 🎊'
    ];
    return risas[Math.floor(Math.random() * risas.length)];
  }

  return null; // No es mensaje de personalidad
};

// 🎨 AGREGAR TOQUE PERSONAL A RESPUESTAS (MÁS DIVERTIDO)
export const addPersonality = (response) => {
  // Agregar emojis y frases amigables aleatorias
  const toques = [
    '<br><br>💚 <em>Estoy aquí para ti siempre, amigo.</em> 😊',
    '<br><br>🕊️ <em>Espero haberte ayudado.</em> ✨',
    '<br><br>✨ <em>Confía en el proceso, Dios tiene el control.</em> 🙏',
    '<br><br>🌟 <em>¡Sigue adelante, eres increíble!</em> 💪',
    '<br><br>💙 <em>Recuerda: nunca estás solo.</em> 🫂',
    '<br><br>🔥 <em>¡Tú puedes con todo!</em> 💯',
    '<br><br>😊 <em>Que tengas un día maravilloso.</em> 🌈'
  ];
  
  // 40% de probabilidad de agregar un toque personal
  if (Math.random() < 0.4) {
    return response + toques[Math.floor(Math.random() * toques.length)];
  }
  
  return response;
};

// 🎭 EMOCIONES CONTEXTUALES
export const detectEmotion = (userMessage) => {
  const msg = normalizar(userMessage.toLowerCase());
  
  if (/triste|deprimido|mal|llorar|llorando|sufro|sufriendo|dolor|angustia|solo|soledad/i.test(msg)) {
    return personalidad.empatica[Math.floor(Math.random() * personalidad.empatica.length)];
  }
  
  if (/feliz|alegre|contento|bien|genial|excelente|super|bacan|bacano|chevere/i.test(msg)) {
    return personalidad.alegre[Math.floor(Math.random() * personalidad.alegre.length)];
  }
  
  return null;
};