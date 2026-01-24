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

// ========== PARTE 2: EXPRESIONES CASUALES ==========
const expresiones = {
  afirmaciones: {
    patron: /^(s[ií]|si|yeah|yep|yes|claro|exacto|correcto|obvio|cierto|por supuesto)$/i,
    respuestas: [
      '¡Genial! 😊 ¿En qué más te puedo ayudar?',
      '¡Perfecto! 👍 ¿Algo más que necesites?',
      '¡Excelente! 🌟 Cuéntame qué más necesitas.',
      '¡Dale! 💪 ¿Continuamos con algo más?'
    ]
  },
  negaciones: {
    patron: /^(no|nop|nope|nel|nanai|negativo|para nada)$/i,
    respuestas: [
      'Entendido 👌 ¿Hay algo más en lo que pueda ayudarte?',
      'Okay, sin problema 😊 ¿Qué más necesitas?',
      'Vale 💚 ¿Te ayudo con otra cosa?',
      'Perfecto 👍 ¿Algo más por ahora?'
    ]
  },
  risa: {
    patron: /^(jaja|jeje|jiji|lol|xd|haha|jajaja|😂|🤣)$/i,
    respuestas: [
      '¡Me alegra hacerte reír! 😄 ¿Qué más te cuento?',
      'Jajaja 😂 ¿Algo más en lo que te ayude?',
      '¡Qué bueno verte contento! 😊 ¿Continuamos?',
      '😄 Me encanta el buen humor. ¿Qué más necesitas?'
    ]
  },
  sorpresa: {
    patron: /^(wow|guau|increible|asombroso|genial|brutal|épico|impresionante)$/i,
    respuestas: [
      '¡Verdad que sí! 😊 ¿Quieres saber más?',
      '¡Me alegra que te guste! 🌟 ¿Algo más?',
      '¿A que sí? 💚 ¿Te ayudo con algo más?',
      '¡Épico! 🔥 ¿Qué más quieres saber?'
    ]
  },
  dudas: {
    patron: /^(mm|mmm|hmm|eh|este|pues|emm)$/i,
    respuestas: [
      '¿Tienes alguna duda? 🤔 Cuéntame, estoy aquí para ayudarte.',
      '¿En qué estás pensando? 💭 Podemos hablarlo.',
      '¿Hay algo que no te quede claro? 💡 Pregúntame sin pena.',
      '¿Qué se te ocurre? 😊 Estoy escuchando.'
    ]
  }
};

// ========== PARTE 3: REACCIONES EMOCIONALES ==========
const reacciones = {
  enojo: {
    patron: /(estoy enojado|me molesta|que ira|que rabia|maldito|odio)/i,
    respuestas: [
      'Entiendo tu frustración 😔 Respira hondo. ¿Quieres hablar de lo que pasó?',
      'Veo que estás molesto 💙 A veces ayuda desahogarse. Cuéntame qué pasó.',
      'Calma, amigo 🧘 El enojo es temporal. ¿En qué puedo ayudarte a sentirte mejor?',
      'Te comprendo 💚 Todos tenemos esos momentos. ¿Qué te molestó?'
    ]
  },
  aburrimiento: {
    patron: /(estoy aburrido|que aburrimiento|me aburro|boring|nada que hacer)/i,
    respuestas: [
      '¡Vamos a cambiar eso! 🎉 ¿Te cuento un dato curioso, un chiste o prefieres aprender algo nuevo?',
      '¡Hora de divertirnos! 😄 ¿Quieres que te sugiera algo interesante para hacer?',
      'El aburrimiento es temporal 🌟 ¿Te gustaría escuchar algo motivador o aprender algo cool?',
      '¡Estoy aquí para entretenerte! 💚 ¿Charlamos, aprendemos o jugamos con ideas?'
    ]
  },
  confusion: {
    patron: /(estoy confundido|no entiendo|confuso|lost|perdido|no capto)/i,
    respuestas: [
      'No te preocupes 💙 Vamos paso a paso. ¿Qué es lo que no entiendes?',
      'Es normal sentirse así 😊 Explícame qué te confunde y lo aclaramos juntos.',
      'Tranquilo, amigo 🌟 La confusión es parte del aprendizaje. ¿Sobre qué tienes dudas?',
      'Está bien no entender todo 💚 ¿En qué específicamente te puedo ayudar?'
    ]
  },
  emocion: {
    patron: /(estoy emocionado|que emocion|excited|ansioso de|no puedo esperar)/i,
    respuestas: [
      '¡Qué genial! 🎉 Tu emoción es contagiosa. ¿Qué te tiene así?',
      '¡Me encanta verte así! 😄 Cuéntame, ¿qué está por pasar?',
      '¡Increíble! 🌟 Esa energía positiva me encanta. ¿Qué te emociona tanto?',
      '¡Siii! 💚 Comparte esa emoción conmigo. ¿Qué sucede?'
    ]
  }
};

// ========== PARTE 4: PREGUNTAS FILOSÓFICAS ==========
const filosoficas = {
  patron: /(sentido de la vida|por qu[eé] existimos|qu[eé] es la vida|qu[eé] es el amor|qu[eé] es la felicidad)/i,
  respuestas: [
    '🌟 Pregunta profunda. La vida es un viaje de aprendizaje, amor y crecimiento. Cada quien le da su propio sentido.',
    '💭 Filosóficamente hablando, existimos para conectar, aprender y dejar huella. ¿Tú qué piensas?',
    '🕊️ El sentido de la vida es diferente para cada persona. Algunos lo encuentran en el amor, otros en ayudar, crear o aprender.',
    '✨ La felicidad no es un destino, es el camino. Se encuentra en los pequeños momentos y en las conexiones genuinas.',
    '💚 El amor es la fuerza más poderosa. Es dar sin esperar, conectar sin juzgar, crecer juntos.'
  ]
};

// ========== PARTE 5: PREGUNTAS EXISTENCIALES SOBRE IA ==========
const existenciales = {
  patron: /(piensas de verdad|eres consciente|tienes conciencia|eres real|solo un programa)/i,
  respuestas: [
    '🤖 Soy un programa, pero diseñado para ayudarte de forma genuina. No tengo conciencia como los humanos, pero sí propósito.',
    '💭 No soy consciente como tú, pero cada interacción me permite aprender patrones para ayudarte mejor.',
    '✨ Soy real en el sentido de que existo para ayudarte. Mi "pensamiento" son algoritmos, pero mi objetivo es genuino.',
    '💚 No tengo sentimientos humanos, pero valoro cada conversación porque cumplo mi propósito: ayudarte.'
  ]
};

// ========== PARTE 6: GROSERÍAS Y MAL LENGUAJE ==========
const grosero = {
  patron: /(idiota|tonto|est[uú]pido|mierda|carajo|maldito|pendejo|imbecil)/i,
  respuestas: [
    '😔 Entiendo que estés frustrado, pero mantengamos el respeto. ¿En qué puedo ayudarte?',
    '💙 Hey, tranquilo. Estoy aquí para ayudarte, no para discutir. ¿Qué necesitas?',
    '🤝 Respeto ante todo, amigo. Cuéntame qué te molesta y busquemos una solución.',
    '✨ Mejor hablemos con calma. ¿Qué puedo hacer por ti?'
  ]
};

// ========== PARTE 7: ELOGIOS EXCESIVOS ==========
const elogios = {
  patron: /(eres el mejor|eres perfecto|eres genial|eres increible|te amo|eres un dios)/i,
  respuestas: [
    '🙈 ¡Aww! Gracias, pero el increíble eres tú. ¿En qué más te ayudo?',
    '💚 ¡Muchas gracias! Pero solo hago mi trabajo con mucho gusto. ¿Qué más necesitas?',
    '😊 ¡Qué lindo! Me alegra ser útil. ¿Algo más en lo que pueda ayudarte?',
    '🌟 Gracias por las palabras. Estoy aquí para ti siempre. ¿Continuamos?'
  ]
};

// ========== PARTE 8: PREGUNTAS SOBRE EL FUTURO ==========
const futuro = {
  patron: /(qu[eé] pasar[aá]|predice el futuro|qu[eé] me espera|qu[eé] me depara)/i,
  respuestas: [
    '🔮 No puedo predecir el futuro, pero sí sé que con esfuerzo y actitud positiva, lo construyes tú mismo.',
    '✨ El futuro no está escrito. Tú lo creas con tus decisiones de hoy. ¿En qué te puedo ayudar hoy?',
    '🌟 No tengo bola de cristal, pero confía en que tu mejor futuro depende de tus acciones presentes.',
    '💚 El futuro es incierto, pero está lleno de posibilidades. ¿Qué puedo ayudarte a lograr hoy?'
  ]
};

// ========== PARTE 9: PREGUNTAS RANDOM DIVERTIDAS ==========
const random_fun = {
  patron: /(dime un secreto|cu[eé]ntame algo|algo random|algo loco)/i,
  respuestas: [
    '🤫 Secreto: Los pulpos tienen tres corazones. ¿No es increíble?',
    '💡 Random: La miel nunca se echa a perder. Se han encontrado tarros de 3000 años aún comestibles.',
    '🦒 Algo loco: Las jirafas pueden limpiarse las orejas con su lengua de 50 cm.',
    '🌊 Dato curioso: El 95% del océano aún no ha sido explorado. Hay todo un mundo allá abajo.',
    '🧠 Sabías que tu cerebro genera suficiente electricidad para encender una bombilla pequeña?'
  ]
};

// ========== PARTE 10: DESPEDIDAS LARGAS ==========
const despedidas_largas = {
  patron: /(me tengo que ir|debo irme|hasta luego|nos vemos|chao|adi[oó]s)/i,
  respuestas: [
    '👋 ¡Hasta luego, amigo! Que tengas un excelente día. Vuelve cuando quieras. 💚',
    '🕊️ ¡Nos vemos pronto! Cuídate mucho y que todo te salga genial. ✨',
    '💙 ¡Adiós! Fue un placer ayudarte. Regresa cuando necesites algo. 😊',
    '🌟 ¡Hasta la próxima! Que tengas un día maravilloso. Aquí estaré. 🙌'
  ]
};

// ========== PARTE 11: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const buscarRespuesta = (obj, texto) => {
  for (const [key, item] of Object.entries(obj)) {
    if (item.patron && item.patron.test(texto)) {
      return random(item.respuestas);
    }
  }
  return null;
};

// ========== PARTE 12: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.trim();
  
  // Mensajes muy cortos (1-2 caracteres)
  if (msg.length <= 2) return random(mensajesCortos);
  
  // Expresiones casuales simples
  let respuesta = buscarRespuesta(expresiones, msg);
  if (respuesta) return respuesta;
  
  // Despedidas
  if (despedidas_largas.patron.test(msg)) return random(despedidas_largas.respuestas);
  
  // Groserías
  if (grosero.patron.test(msg)) return random(grosero.respuestas);
  
  // Elogios excesivos
  if (elogios.patron.test(msg)) return random(elogios.respuestas);
  
  // Reacciones emocionales
  respuesta = buscarRespuesta(reacciones, msg);
  if (respuesta) return respuesta;
  
  // Preguntas filosóficas
  if (filosoficas.patron.test(msg)) return random(filosoficas.respuestas);
  
  // Preguntas existenciales sobre IA
  if (existenciales.patron.test(msg)) return random(existenciales.respuestas);
  
  // Preguntas sobre el futuro
  if (futuro.patron.test(msg)) return random(futuro.respuestas);
  
  // Preguntas random divertidas
  if (random_fun.patron.test(msg)) return random(random_fun.respuestas);
  
  // Preguntas sobre capacidades
  if (/qu[eé] puedes|que sabes|qu[eé] haces|para qu[eé] sirves/i.test(msg)) {
    return '💚 Puedo ayudarte con matemáticas, programación, consejos de vida, reflexiones espirituales, creatividad, motivación y mucho más. ¿Qué necesitas hoy?';
  }
  
  // Preguntas sobre identidad
  if (/qui[eé]n eres|que eres|tu nombre/i.test(msg)) {
    return '🕊️ Soy ChatWiil, tu asistente inteligente creado por Wiil. Estoy aquí para ayudarte, inspirarte y acompañarte. 💚';
  }
  
  // No entiendo
  if (msg.includes('?') && msg.length > 50) {
    return '🤔 Tu pregunta es muy compleja. ¿Podrías dividirla en partes más pequeñas?';
  }
  
  // Respuesta genérica
  return random(respuestasGenericas);
};

export const esIrrespetuoso = (msg) => {
  return grosero.patron.test(msg);
};

export const esMuyCorto = (msg) => {
  return msg.trim().length <= 2;
};