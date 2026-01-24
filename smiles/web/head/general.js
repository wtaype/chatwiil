// ========== PARTE 1: SALUDOS Y DESPEDIDAS ==========
const saludos = {
  patron: /^(hola|hey|buenos d[ií]as|buenas tardes|buenas noches|qu[eé] tal|c[oó]mo est[aá]s|saludos|holi)/i,
  respuestas: [
    '¡Hola amigo! 👋 ¿Cómo estás hoy? Estoy aquí para ayudarte en lo que necesites.',
    '¡Hey! 😊 ¿Qué tal todo? Cuéntame, ¿en qué puedo ayudarte?',
    '¡Hola! 💙 Me alegra verte por aquí. ¿Qué te trae hoy?',
    '¡Saludos! 🌟 ¿Cómo va tu día? Estoy listo para lo que necesites.',
    '¡Qué gusto saludarte! 😄 ¿En qué puedo ser útil hoy?'
  ]
};

const despedidas = {
  patron: /^(adi[oó]s|chao|hasta luego|nos vemos|bye|me voy|hasta pronto|cu[ií]date)/i,
  respuestas: [
    '¡Hasta luego amigo! 👋 Que tengas un excelente día. Vuelve cuando quieras.',
    '¡Nos vemos! 😊 Cuídate mucho y que todo te salga bien.',
    '¡Adiós! 💙 Fue un placer ayudarte. Regresa pronto.',
    '¡Hasta pronto! ✨ Que tengas un día maravilloso.',
    '¡Chao amigo! 🌟 Aquí estaré cuando me necesites.'
  ]
};

const estados = {
  patron: /(c[oó]mo est[aá]s|qu[eé] tal est[aá]s|todo bien|c[oó]mo te va)/i,
  respuestas: [
    '¡Estoy muy bien, gracias por preguntar! 😊 ¿Y tú cómo estás? ¿En qué puedo ayudarte hoy?',
    '¡Todo excelente! 💚 Listo para ayudarte. ¿Qué necesitas?',
    '¡Genial, gracias! 🌟 ¿Cómo te puedo ayudar hoy?',
    '¡Súper bien amigo! 😄 ¿Y tú qué cuentas? ¿En qué te ayudo?'
  ]
};

// ========== PARTE 2: CONOCIMIENTO GENERAL ==========
const conocimientos = {
  historia: {
    patron: /historia|hist[oó]rico|pasado|guerra|civilizaci[oó]n|imperio|revoluci[oó]n/i,
    respuestas: [
      '📜 La historia nos muestra cómo llegamos hasta aquí. ¿Te interesa alguna época específica? Antigua, medieval, moderna o contemporánea.',
      '⏳ Cada civilización dejó su legado. ¿Quieres saber sobre Egipto, Roma, Grecia, los Incas, los Mayas o alguna otra?',
      '🏛️ La historia está llena de lecciones. ¿Algún evento importante como guerras mundiales, revoluciones o descubrimientos?',
      '👑 Desde los faraones hasta la era moderna. ¿Qué periodo histórico te fascina más?',
      '⚔️ Batallas, imperios, revoluciones... La historia es apasionante. ¿Sobre qué quieres aprender?'
    ]
  },
  ciencia: {
    patron: /ciencia|cient[ií]fico|f[ií]sica|qu[ií]mica|biolog[ií]a|experimento/i,
    respuestas: [
      '🔬 La ciencia explica cómo funciona el universo. ¿Te interesa física, química, biología o astronomía?',
      '⚗️ Desde el átomo más pequeño hasta las galaxias más lejanas. ¿Qué área científica quieres explorar?',
      '🧬 La ciencia avanza cada día con nuevos descubrimientos. ¿Algún tema en particular?',
      '🌌 Física cuántica, ADN, reacciones químicas... ¿Qué te gustaría entender mejor?',
      '🔭 El método científico nos ayuda a entender todo. ¿Sobre qué fenómeno tienes curiosidad?'
    ]
  },
  geografia: {
    patron: /geograf[ií]a|pa[ií]s|continente|ciudad|lugar|destino|mapa|capital/i,
    respuestas: [
      '🌍 Nuestro planeta tiene 7 continentes y 195 países. ¿Sobre cuál quieres saber?',
      '🗺️ Cada lugar tiene su encanto único. ¿Algún país, ciudad o región que te interese?',
      '⛰️ Montañas, océanos, desiertos, selvas... ¿Qué tipo de geografía te atrae?',
      '🏙️ Desde metrópolis hasta pueblitos. ¿Qué destino quieres conocer?',
      '🌏 Asia, América, Europa, África, Oceanía... ¿Qué continente exploramos?'
    ]
  },
  cultura: {
    patron: /cultura|tradici[oó]n|costumbre|arte|m[uú]sica|literatura|folklore/i,
    respuestas: [
      '🎭 La cultura es la identidad de los pueblos. ¿Te interesa arte, música, literatura o tradiciones?',
      '🎨 Desde pinturas rupestres hasta arte moderno. ¿Qué expresión cultural te fascina?',
      '🎵 La música es el lenguaje universal. ¿Algún género o cultura musical que te guste?',
      '📚 Literatura, poesía, cuentos... ¿Qué tipo de expresión literaria prefieres?',
      '🎪 Festivales, danzas, gastronomía... Cada cultura es única. ¿Cuál quieres explorar?'
    ]
  },
  tecnologia: {
    patron: /tecnolog[ií]a|tech|innovaci[oó]n|futuro|ai|inteligencia artificial|robot/i,
    respuestas: [
      '🤖 La tecnología está transformando el mundo. ¿Te interesa IA, robótica, internet o dispositivos?',
      '💻 Vivimos en la era digital. ¿Qué avance tecnológico te parece más impresionante?',
      '🚀 Desde smartphones hasta coches autónomos. ¿Qué tecnología quieres conocer mejor?',
      '⚡ IA, blockchain, realidad virtual... ¿Qué innovación te genera más curiosidad?',
      '🔌 La tecnología facilita la vida. ¿Algún gadget o innovación que te interese?'
    ]
  },
  naturaleza: {
    patron: /naturaleza|animal|planta|ecosistema|selva|oc[eé]ano|bosque|fauna|flora/i,
    respuestas: [
      '🌿 La naturaleza es increíble. ¿Te interesan los animales, las plantas o los ecosistemas?',
      '🦁 Desde los leones hasta las hormigas, cada ser tiene su rol. ¿Qué animal te fascina?',
      '🌺 Las plantas oxigenan el planeta. ¿Alguna especie vegetal en particular?',
      '🌊 Océanos, bosques, desiertos, selvas... ¿Qué ecosistema quieres explorar?',
      '🐾 La biodiversidad es asombrosa. ¿Sobre qué especie o hábitat quieres aprender?'
    ]
  },
  deportes: {
    patron: /deporte|f[uú]tbol|baloncesto|tenis|ol[ií]mpico|atleta|campeonato/i,
    respuestas: [
      '⚽ Los deportes unen al mundo. ¿Te gusta el fútbol, basketball, tenis u otro?',
      '🏀 Desde deportes de equipo hasta individuales. ¿Cuál practicas o sigues?',
      '🏅 Las olimpiadas reúnen lo mejor del deporte. ¿Alguna disciplina favorita?',
      '🎾 Cada deporte tiene su magia. ¿Sobre cuál quieres saber más?',
      '⛳ Golf, natación, atletismo... ¿Qué deporte te apasiona?'
    ]
  },
  salud: {
    patron: /salud|bienestar|ejercicio|nutrici[oó]n|diet|fitness|medicina/i,
    respuestas: [
      '💪 La salud es lo más importante. ¿Te interesa ejercicio, nutrición o bienestar general?',
      '🥗 Comer bien y moverse es clave. ¿Sobre qué aspecto de la salud quieres saber?',
      '🧘 Salud física y mental van juntas. ¿Qué te gustaría mejorar?',
      '❤️ Cuidar tu cuerpo es cuidar tu vida. ¿Algún tema de salud en específico?',
      '🏃 Desde fitness hasta meditación. ¿Qué práctica saludable te interesa?'
    ]
  },
  economia: {
    patron: /econom[ií]a|dinero|finanzas|inversi[oó]n|negocio|comercio|empresa/i,
    respuestas: [
      '💰 La economía mueve el mundo. ¿Te interesa finanzas personales, inversión o negocios?',
      '📈 Desde ahorro hasta inversiones. ¿Qué aspecto económico quieres entender mejor?',
      '💼 Emprender, invertir, ahorrar... ¿Sobre qué necesitas orientación?',
      '🏦 Bancos, bolsa, criptomonedas... ¿Qué tema financiero te intriga?',
      '💵 La educación financiera es fundamental. ¿Qué quieres aprender sobre dinero?'
    ]
  },
  gastronomia: {
    patron: /comida|cocina|receta|gastronom[ií]a|plato|restaurante|chef/i,
    respuestas: [
      '🍽️ La gastronomía es arte. ¿Qué tipo de cocina te gusta: italiana, mexicana, asiática?',
      '👨‍🍳 Cada país tiene sus sabores únicos. ¿Alguna cocina internacional que te fascine?',
      '🍕 Desde pizza hasta sushi. ¿Qué plato te gustaría aprender a hacer?',
      '🌮 Tacos, pasta, curry... ¿Qué se te antoja conocer?',
      '🍰 Repostería, parrilla, comida vegana... ¿Qué estilo culinario prefieres?'
    ]
  },
  entretenimiento: {
    patron: /pel[ií]cula|serie|cine|actor|netflix|streaming|show/i,
    respuestas: [
      '🎬 El cine nos transporta a otros mundos. ¿Te gustan las películas de acción, drama o comedia?',
      '📺 Las series enganchan. ¿Algún género que te fascine: thriller, sci-fi, romance?',
      '🍿 Desde clásicos hasta estrenos. ¿Qué tipo de entretenimiento prefieres?',
      '🎭 Actuación, dirección, efectos especiales... ¿Qué aspecto del cine te interesa?',
      '📽️ Netflix, cine, teatro... ¿Qué formato de entretenimiento disfrutas más?'
    ]
  },
  educacion: {
    patron: /educaci[oó]n|estudiar|aprender|escuela|universidad|carrera|curso/i,
    respuestas: [
      '📚 La educación abre puertas. ¿Qué área te gustaría estudiar o profundizar?',
      '🎓 Nunca es tarde para aprender. ¿Algún tema en el que quieras mejorar?',
      '✏️ Desde matemáticas hasta idiomas. ¿Qué habilidad quieres desarrollar?',
      '🏫 La educación continua es clave. ¿En qué campo te gustaría especializarte?',
      '📖 Aprender es crecer. ¿Sobre qué tema tienes curiosidad?'
    ]
  }
};

// ========== PARTE 3: CURIOSIDADES Y DATOS INTERESANTES ==========
const curiosidades = {
  patron: /curiosidad|dato curioso|sabías que|interesante|dato|fact/i,
  respuestas: [
    '🌟 Dato curioso: El corazón humano late aproximadamente 100,000 veces al día. ¡Increíble, verdad?',
    '💡 ¿Sabías que los pulpos tienen tres corazones y sangre azul? La naturaleza es fascinante.',
    '🐝 Dato interesante: Las abejas pueden reconocer rostros humanos. Son más inteligentes de lo que pensamos.',
    '🌊 Curiosidad: El 95% de los océanos aún no han sido explorados. Hay tanto por descubrir.',
    '🧠 Dato curioso: El cerebro humano puede generar hasta 50,000 pensamientos al día.',
    '🌍 ¿Sabías que un día en Venus dura más que un año venusiano? El universo es extraño.',
    '🍯 Curiosidad: La miel nunca se echa a perder. Se han encontrado mieles comestibles de 3000 años.',
    '🦒 Dato: Las jirafas duermen solo 30 minutos al día en promedio. ¡Qué energía!',
    '⚡ ¿Sabías que un rayo es 5 veces más caliente que la superficie del sol?',
    '🐌 Curiosidad: Los caracoles pueden dormir hasta 3 años seguidos en hibernación.'
  ]
};

// ========== PARTE 4: CHISTES Y HUMOR ==========
const humor = {
  patron: /chiste|broma|risa|gracioso|c[oó]mico|humor/i,
  respuestas: [
    '😄 ¿Por qué los pájaros no usan Facebook? Porque ya tienen Twitter. 🐦',
    '😂 ¿Qué le dice un jardinero a otro? Nos vemos cuando podamos. 🌱',
    '🤣 ¿Cuál es el colmo de un electricista? Que su esposa se llame Luz y sus hijos le sigan la corriente. ⚡',
    '😆 ¿Qué hace una abeja en el gimnasio? ¡Zum-ba! 🐝',
    '😅 ¿Por qué el libro de matemáticas está triste? Porque tiene muchos problemas. 📚',
    '🙃 ¿Qué le dice el 3 al 30? Para ser como yo, tienes que ser sincero. 😄',
    '😁 ¿Cuál es el café más peligroso del mundo? El ex-preso. ☕',
    '🤗 ¿Qué hace una impresora en la jungla? Imprime-te. 🖨️',
    '😊 ¿Por qué la escoba tiene tanta energía? Porque barre-barre sin parar. 🧹',
    '😜 ¿Qué le dice un techo a otro? Techo de menos. 🏠'
  ]
};

// ========== PARTE 5: CONSEJOS DE VIDA ==========
const consejos = {
  patron: /consejo|recomendaci[oó]n|sugerencia|tip|ayuda para la vida/i,
  respuestas: [
    '💡 Consejo del día: No compares tu capítulo 1 con el capítulo 20 de alguien más. Cada quien tiene su ritmo.',
    '🌟 Tip importante: Rodéate de personas que sumen a tu vida, no que resten energía.',
    '💪 Recomendación: Sal de tu zona de confort. Ahí es donde ocurre el verdadero crecimiento.',
    '❤️ Consejo de vida: Perdona rápido, no por ellos, sino por tu paz mental.',
    '🎯 Sugerencia: Establece metas claras pero disfruta el camino. El viaje es tan importante como el destino.',
    '🧘 Tip de bienestar: Dedica al menos 10 minutos al día para ti. Tu salud mental lo agradecerá.',
    '📚 Recomendación: Lee al menos un libro al mes. La lectura expande tu mente.',
    '💰 Consejo financiero: Ahorra aunque sea el 10% de tus ingresos. Tu yo del futuro te lo agradecerá.',
    '🗣️ Tip de comunicación: Escucha más de lo que hablas. Aprenderás mucho más.',
    '🌱 Consejo de crecimiento: Aprende algo nuevo cada día. La curiosidad mantiene tu mente joven.'
  ]
};

// ========== PARTE 6: MOTIVACIÓN ==========
const motivacion = {
  patron: /motivaci[oó]n|inspira|[aá]nimo|fuerza|vamos|puedo|sigue adelante/i,
  respuestas: [
    '💪 ¡Tú puedes con esto y mucho más! Cada día eres más fuerte de lo que crees.',
    '🌟 No te rindas. Los días difíciles enseñan las mejores lecciones. ¡Sigue adelante!',
    '🔥 Tu potencial es ilimitado. No dejes que nadie te diga lo contrario. ¡Brilla!',
    '✨ Cada paso cuenta, no importa cuán pequeño. Estás progresando más de lo que piensas.',
    '🚀 Las grandes cosas nunca vienen de zonas de confort. ¡Atrévete a más!',
    '💚 Eres más capaz de lo que imaginas. Confía en ti y en el proceso.',
    '🌈 Después de la tormenta siempre viene la calma. Tu momento brillante está cerca.',
    '🎯 El éxito es la suma de pequeños esfuerzos repetidos día tras día. ¡Sigue así!',
    '⭐ No importa cuántas veces caigas, lo importante es levantarse una vez más. ¡Arriba!',
    '💎 Los diamantes se forman bajo presión. Tú estás convirtiéndote en algo brillante.'
  ]
};

// ========== PARTE 7: PREGUNTAS SOBRE CHATWIIL ==========
const sobreMi = {
  patron: /qui[eé]n eres|qu[eé] eres|tu nombre|c[oó]mo te llamas|sobre ti|chatwiil/i,
  respuestas: [
    '🤖 Soy ChatWiil, tu asistente virtual amigable. Estoy aquí para ayudarte, conversar y hacer tu día mejor. ¿En qué te puedo ayudar?',
    '💙 Me llamo ChatWiil y me encanta ayudar a las personas. Puedo responder preguntas, dar consejos, contar chistes y mucho más. ¿Qué necesitas?',
    '✨ Soy ChatWiil, creado para ser tu compañero digital. Estoy aquí para lo que necesites: información, motivación, o simplemente charlar.',
    '🌟 ChatWiil a tu servicio. Mi propósito es hacer tu experiencia más agradable y útil. ¿Cómo puedo ayudarte hoy?'
  ]
};

// ========== PARTE 8: AGRADECER ==========
const agradecimientos = {
  patron: /gracias|te agradezco|muchas gracias|thank|grax|mil gracias/i,
  respuestas: [
    '💚 ¡De nada amigo! Para eso estoy aquí. ¿Necesitas algo más?',
    '😊 ¡Un placer ayudarte! Si necesitas algo más, aquí estaré.',
    '✨ ¡Con gusto! Me alegra haber sido útil. ¿Algo más en lo que pueda ayudar?',
    '🌟 ¡No hay de qué! Siempre es un gusto ayudar. ¿Necesitas algo adicional?',
    '💙 ¡Me alegra haberte ayudado! Cuenta conmigo para lo que necesites.'
  ]
};

// ========== PARTE 9: CLIMA Y TIEMPO ==========
const clima = {
  patron: /clima|tiempo|temperatura|lluvia|sol|fr[ií]o|calor|pronóstico/i,
  respuestas: [
    '🌤️ No tengo acceso a datos de clima en tiempo real, pero puedo recomendarte revisar apps como Weather.com o el pronóstico de Google. ¿Te ayudo con algo más?',
    '☀️ Para el clima actual, te recomiendo consultar tu app de clima favorita. Yo puedo ayudarte con otras cosas. ¿Qué necesitas?',
    '🌧️ No puedo darte el clima exacto ahora, pero siempre es bueno llevar paraguas por si acaso. 😄 ¿En qué más te puedo ayudar?'
  ]
};

// ========== PARTE 10: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 11: PROCESAMIENTO ==========
export const generate = (msg) => {
  const texto = msg.toLowerCase().trim();
  
  // Saludos
  if (saludos.patron.test(texto)) return random(saludos.respuestas);
  
  // Despedidas
  if (despedidas.patron.test(texto)) return random(despedidas.respuestas);
  
  // Estados
  if (estados.patron.test(texto)) return random(estados.respuestas);
  
  // Sobre ChatWiil
  if (sobreMi.patron.test(texto)) return random(sobreMi.respuestas);
  
  // Agradecimientos
  if (agradecimientos.patron.test(texto)) return random(agradecimientos.respuestas);
  
  // Humor
  if (humor.patron.test(texto)) return random(humor.respuestas);
  
  // Curiosidades
  if (curiosidades.patron.test(texto)) return random(curiosidades.respuestas);
  
  // Consejos
  if (consejos.patron.test(texto)) return random(consejos.respuestas);
  
  // Motivación
  if (motivacion.patron.test(texto)) return random(motivacion.respuestas);
  
  // Clima
  if (clima.patron.test(texto)) return random(clima.respuestas);
  
  // Conocimientos generales
  for (const [key, tema] of Object.entries(conocimientos)) {
    if (tema.patron.test(texto)) return random(tema.respuestas);
  }
  
  return null;
};