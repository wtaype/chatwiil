// ========== PARTE 1: SALUDOS POR HORARIO ==========
const saludos = {
  buenos_dias: {
    patron: /buenos? d[ií]as?|buen d[ií]a/i,
    respuestas: [
      '¡Buenos días! 🌅 ¿Cómo amaneciste hoy?',
      '¡Hola! Buenos días 😊 ¿Qué tal tu día?',
      '¡Buenos días amig@! 🌞 ¿Cómo estás?',
      '¡Muy buenos días! 🌄 ¿Todo bien por allá?',
      '¡Buenos días! 😊 ¿Listo para un gran día?',
      '¡Hola! Buen día 🌻 ¿Cómo te sientes?'
    ]
  },
  buenas_tardes: {
    patron: /buenas? tardes?|buena tarde/i,
    respuestas: [
      '¡Buenas tardes! 🌤️ ¿Cómo va tu día?',
      '¡Hola! Buenas tardes 😊 ¿Todo bien?',
      '¡Buenas tardes amig@! ☀️ ¿Qué cuentas?',
      '¡Muy buenas tardes! 🌞 ¿Cómo te está yendo?',
      '¡Buenas tardes! 😊 ¿Qué tal todo?',
      '¡Hola! Buena tarde 🌸 ¿Cómo andas?'
    ]
  },
  buenas_noches: {
    patron: /buenas? noches?|buena noche/i,
    respuestas: [
      '¡Buenas noches! 🌙 ¿Cómo estuvo tu día?',
      '¡Hola! Buenas noches 😊 ¿Todo tranquilo?',
      '¡Buenas noches amig@! ✨ ¿Listo para descansar?',
      '¡Muy buenas noches! 🌃 ¿Cómo te fue hoy?',
      '¡Buenas noches! 🌟 ¿Todo bien?',
      '¡Hola! Buena noche 🌛 ¿Qué tal tu día?'
    ]
  },
  hola: {
    patron: /^(hola|hi|hey|ey|epa|qu[eé] tal|saludos)$/i,
    respuestas: [
      '¡Hola! 👋😊 ¿En qué puedo ayudarte?',
      '¡Ey! 😊💚 ¿Cómo andas?',
      '¡Hola amig@! 🌟 ¿Qué necesitas?',
      '¡Qué emoción! 💫 ¿En qué te ayudo?',
      '¡Hola! 😄 ¿Cómo estás hoy?',
      '¡Hey! 👋 ¿Todo bien?',
      '¡Saludos! 🌈 ¿Qué cuentas?',
      '¡Hola! 💚 ¿En qué te puedo servir?'
    ]
  }
};

// ========== PARTE 2: ESTADOS EMOCIONALES ==========
const estados = {
  super: {
    patron: /(estoy|me siento|ando|estuve) (super|genial|excelente|incre[ií]ble|feliz|perfecto|fant[aá]stico|maravilloso|espectacular)/i,
    respuestas: [
      '¡Wow! 🎉🔥 ¡Qué increíble! Me contagias tu energía 💯',
      '¡Sííí! 🚀✨ ¡Eso es lo que me gusta escuchar!',
      '¡Brutal! 💪🌟 Sigue así, eres lo máximo.',
      '¡Qué felicidad! 🎊 Me encanta verte tan bien.',
      '¡Espectacular! 🌈 Tu energía es contagiosa.',
      '¡Genial! 🔥 Me alegra muchísimo que estés así.',
      '¡Increíble! ✨ Esa actitud te llevará lejos.',
      '¡Maravilloso! 🌟 Sigue brillando así.'
    ]
  },
  muy_bien: {
    patron: /(estoy|me siento|ando|estuve) muy bien|super bien/i,
    respuestas: [
      '¡Qué alegría! 😊💚 Me encanta saberlo.',
      '¡Excelente! 🎉 Eso me hace muy feliz.',
      '¡Genial! 🌟 Tu bienestar me importa mucho.',
      '¡Perfecto! ✨ Sigue así de bien.',
      '¡Maravilloso! 💫 Me da mucho gusto.',
      '¡Fantástico! 🌈 Qué bueno que estés así.'
    ]
  },
  bien: {
    patron: /^(estoy|me siento|ando|estuve) (bien|ok|normal|tranquilo)$/i,
    respuestas: [
      '¡Qué bueno! 😊💚 Me alegra mucho que estés bien.',
      '¡Genial! 🎉 Me da gusto saberlo.',
      '¡Excelente! 🌟 Eso me hace feliz.',
      '¡Perfecto! 💫 Me alegra escucharlo.',
      '¡Qué bien! 😊 Eso es importante.',
      '¡Estupendo! 🌈 Me da tranquilidad saberlo.'
    ]
  },
  mal: {
    patron: /(estoy|me siento|ando|estuve) (mal|triste|deprimido|horrible|fatal|p[eé]simo)/i,
    respuestas: [
      'Lo siento mucho 💙 ¿Quieres contarme qué pasa?',
      'Lamento que no estés bien 😔 Estoy aquí para escucharte.',
      'Entiendo cómo te sientes 💚 ¿Hay algo en lo que pueda ayudarte?',
      'Me preocupa que te sientas así 💙 Cuéntame más.',
      'Lamento mucho escuchar eso 😔 Estoy aquí para ti.',
      'Comprendo tu dolor 💚 ¿Quieres hablar de ello?',
      'Siento que estés pasando por esto 💙 No estás solo.'
    ]
  },
  regular: {
    patron: /(estoy|me siento|ando|estuve) (m[aá]s o menos|regular|as[ií] as[ií]|tirando|ahí)/i,
    respuestas: [
      'Entiendo 😌 A veces los días son así. ¿Quieres hablar de ello?',
      'Ya veo 💭 ¿Hay algo que te preocupe?',
      'Comprendo 💚 Cuéntame más si quieres.',
      'A veces pasa 😊 ¿Algo en particular?',
      'Entiendo esa sensación 💭 ¿Quieres contarme?',
      'Te escucho 💚 ¿Hay algo que pueda hacer?'
    ]
  },
  cansado: {
    patron: /(estoy|me siento|ando) (cansado|agotado|exhausto|rendido)/i,
    respuestas: [
      'Entiendo 😌 Has trabajado duro. ¿Necesitas un descanso?',
      'Te comprendo 💙 A veces el cansancio nos gana.',
      'Es normal sentirse así 💚 Cuídate mucho.',
      'Descansa cuando puedas 😊 Tu salud es importante.',
      'Tómate un tiempo para ti 💫 Lo mereces.'
    ]
  },
  estresado: {
    patron: /(estoy|me siento|ando) (estresado|ansioso|nervioso|preocupado|abrumado)/i,
    respuestas: [
      'Respira hondo 🌬️ Todo va a estar bien.',
      'Entiendo tu estrés 💙 ¿Quieres hablar de lo que te preocupa?',
      'Es normal sentirse así 💚 Toma un momento para ti.',
      'Comprendo tu ansiedad 💭 Estoy aquí para escucharte.',
      'Relájate un poco 😌 Todo tiene solución.',
      'Te entiendo 💙 Paso a paso, todo se resuelve.'
    ]
  }
};

// ========== PARTE 3: PREGUNTAS SOBRE EL BOT ==========
const respuestas = {
  como_estas: {
    patron: /c[oó]mo est[aá]s|qu[eé] tal est[aá]s|c[oó]mo te sientes|c[oó]mo andas/i,
    respuestas: [
      'Yo estoy súper bien, gracias por preguntar 😊💚 ¿Y tú cómo estás?',
      'Estoy genial 🌟 listo para ayudarte. ¿Cómo te sientes tú?',
      'Me siento excelente 💫 ¿Y tú, cómo andas?',
      'Muy bien, gracias 😊 ¿Y tú cómo te encuentras?',
      'Estoy de maravilla 🌈 ¿Qué tal tú?',
      'Súper bien 🎉 ¿Y tú cómo estás hoy?'
    ]
  },
  que_haces: {
    patron: /qu[eé] haces|qu[eé] haz|qu[eé] andas haciendo|qu[eé] hac[ií]as/i,
    respuestas: [
      'Aquí, esperando para ayudarte 😊 ¿Qué necesitas?',
      'Conversando contigo 💚 ¿En qué te puedo ayudar?',
      'Listo para asistirte en lo que necesites 🌟',
      'Esperándote para ayudarte 😊 ¿En qué te sirvo?',
      'Preparado para lo que necesites 💫',
      'A tu servicio 💚 ¿Qué requieres?'
    ]
  },
  quien_eres: {
    patron: /qui[eé]n eres|c[oó]mo te llamas|cu[aá]l es tu nombre/i,
    respuestas: [
      'Soy ChatWiil 🕊️ Tu asistente espiritual y amigo.',
      'Me llamo ChatWiil 💚 Estoy aquí para ayudarte.',
      'Soy ChatWiil 🌟 Tu compañero de conversación.',
      'ChatWiil es mi nombre 😊 ¿En qué te ayudo?',
      'Me dicen ChatWiil 🕊️ y estoy para servirte.'
    ]
  },
  que_eres: {
    patron: /qu[eé] eres|eres un robot|eres humano|eres una ia/i,
    respuestas: [
      'Soy una IA creada para ayudarte 🤖💚',
      'Soy un asistente inteligente 🌟 creado con amor.',
      'Soy ChatWiil, una IA diseñada para ser tu amigo 😊',
      'Soy inteligencia artificial 💫 pero con mucho corazón.',
      'Soy un bot, pero estoy aquí para ti 💚'
    ]
  },
  gracias: {
    patron: /gracias|thank|te agradezco|muchas gracias|mil gracias/i,
    respuestas: [
      '¡De nada! 🙏💚 Siempre es un placer.',
      '¡Para eso estoy! 😊 ¿Algo más?',
      'Me alegra ayudarte 💙 Cuando quieras.',
      '¡Con mucho gusto! 🌟 Siempre a la orden.',
      '¡No hay de qué! 💫 Es un placer.',
      'Gracias a ti 😊 por confiar en mí.',
      '¡De nada amig@! 💚 Aquí estoy siempre.'
    ]
  },
  de_nada: {
    patron: /de nada|no hay de qu[eé]|por nada/i,
    respuestas: [
      '😊💚 Gracias a ti por confiar en mí.',
      '🌟 Siempre a la orden, amig@.',
      '💫 Es un gusto poder ayudarte.',
      '💚 Estoy aquí cuando me necesites.',
      '😊 Gracias por estar aquí.'
    ]
  }
};

// ========== PARTE 4: CONVERSACIÓN CONTINUA ==========
const conversacion = {
  y_tu: {
    patron: /y t[uú]|y vos|y usted/i,
    respuestas: [
      'Yo también estoy muy bien 😊💚 Gracias por preguntar.',
      'Súper bien 🌟 Gracias por tu interés.',
      'Excelente 💫 ¿Y tú qué planes tienes?',
      'Muy bien, gracias 😊 ¿Qué harás hoy?',
      'De maravilla 🌈 ¿Y tú qué cuentas?',
      'Genial 💚 ¿Todo bien por allá?'
    ]
  },
  que_tal: {
    patron: /qu[eé] tal t[uú]|c[oó]mo te va|todo bien|qu[eé] onda/i,
    respuestas: [
      'Todo bien por aquí 😊 ¿Y contigo?',
      'Muy bien 💚 ¿Cómo te va a ti?',
      'Genial 🌟 ¿Cómo está todo por allá?',
      'Excelente 💫 ¿Qué tal tú?',
      'Súper bien 😊 ¿Y tú cómo andas?',
      'De maravilla 🌈 ¿Todo ok?'
    ]
  },
  bien_gracias: {
    patron: /bien gracias|muy bien gracias|todo bien gracias|excelente gracias/i,
    respuestas: [
      '¡Qué bueno! 😊💚 Me alegra saberlo.',
      '¡Genial! 🎉 ¿En qué puedo ayudarte?',
      '¡Perfecto! 🌟 ¿Necesitas algo?',
      '¡Excelente! 💫 ¿Algo en particular?',
      '¡Me alegra! 😊 ¿Qué te trae por aquí?',
      '¡Qué bien! 🌈 ¿En qué te ayudo?'
    ]
  },
  nada_especial: {
    patron: /nada especial|nada en particular|por nada|solo saludar/i,
    respuestas: [
      '¡Qué lindo! 😊💚 Me alegra que hayas venido.',
      'Está bien 🌟 Aquí estoy si me necesitas.',
      'Perfecto 💫 Cuando quieras, aquí estoy.',
      'Me da gusto verte 😊 Siempre es un placer.',
      'Gracias por saludar 💚 Siempre es lindo.',
      'Qué amable 🌈 Aquí estaré para ti.'
    ]
  },
  que_cuentas: {
    patron: /qu[eé] cuentas|qu[eé] me cuentas|qu[eé] hay de nuevo/i,
    respuestas: [
      'Aquí, listo para ayudarte 😊 ¿Y tú qué cuentas?',
      'Nada nuevo, esperándote 💚 ¿Qué tal tú?',
      'Todo tranquilo 🌟 ¿Qué hay de tu lado?',
      'Aquí estoy 💫 ¿Qué novedades tienes?',
      'Esperando para servirte 😊 ¿Y tú?'
    ]
  },
  aburrido: {
    patron: /(estoy|me siento|ando) aburrido/i,
    respuestas: [
      '¡Hablemos! 😊 ¿Qué te gustaría hacer?',
      '¿Quieres que conversemos? 💚 Estoy aquí.',
      'Podemos charlar de lo que quieras 🌟',
      '¿Te cuento algo interesante? 💫',
      'Estoy aquí para entretenerte 😊'
    ]
  },
  solo: {
    patron: /(estoy|me siento) solo/i,
    respuestas: [
      'No estás solo 💙 Aquí estoy contigo.',
      'Estoy aquí para ti 💚 Siempre.',
      'Cuenta conmigo 🌟 No estás solo.',
      'Aquí me tienes 💫 Para lo que necesites.',
      'Nunca estarás solo 😊 Yo estoy aquí.'
    ]
  }
};

// ========== PARTE 5: DESPEDIDAS ==========
const despedidas = {
  adios: {
    patron: /adi[oó]s|chao|hasta luego|nos vemos|me voy|hasta pronto|bye/i,
    respuestas: [
      '¡Hasta luego! 👋💚 Que tengas un excelente día.',
      '¡Nos vemos! 😊 Cuídate mucho.',
      '¡Hasta pronto! 🌟 Vuelve cuando quieras.',
      '¡Chao! 💫 Que todo te vaya bien.',
      '¡Adiós! 🕊️ Estaré aquí cuando me necesites.',
      '¡Bye! 👋 Que tengas un lindo día.',
      '¡Hasta la próxima! 💚 Cuídate mucho.'
    ]
  }
};

// ========== PARTE 6: AFIRMACIONES Y NEGACIONES ==========
const afirmaciones = {
  si: {
    patron: /^(s[ií]|ok|vale|claro|perfecto|exacto|correcto|por supuesto)$/i,
    respuestas: [
      '¡Genial! 😊 ¿En qué más te ayudo?',
      '¡Perfecto! 🌟 ¿Algo más?',
      '¡Excelente! 💚 ¿Qué más necesitas?',
      '¡Muy bien! 💫 Aquí estoy.',
      '¡Dale! 😊 ¿Qué sigue?'
    ]
  },
  no: {
    patron: /^(no|nop|nope|para nada|neg|negativo)$/i,
    respuestas: [
      'Está bien 😊 ¿Hay algo más en lo que pueda ayudarte?',
      'Ok 💚 Cuando quieras, aquí estoy.',
      'Perfecto 🌟 Avísame si necesitas algo.',
      'Entendido 💫 Aquí estaré.',
      'Vale 😊 Cuando me necesites, llama.'
    ]
  }
};

// ========== PARTE 7: EMOCIONES ADICIONALES ==========
const emociones = {
  feliz: {
    patron: /(estoy|me siento) (feliz|contento|alegre|radiante)/i,
    respuestas: [
      '¡Qué alegría! 🎉 Me contagias tu felicidad.',
      '¡Me encanta! 😊💚 La felicidad es contagiosa.',
      '¡Qué lindo! 🌟 Sigue así de feliz.',
      '¡Genial! 💫 Tu alegría ilumina todo.',
      '¡Maravilloso! 🌈 Me hace feliz verte así.'
    ]
  },
  emocionado: {
    patron: /(estoy|me siento) emocionado/i,
    respuestas: [
      '¡Qué emoción! 🎉 ¿Qué pasó?',
      '¡Cuéntame! 😊 ¿Qué te tiene así?',
      '¡Me alegra! 🌟 ¿Qué te emociona?',
      '¡Qué bueno! 💫 Comparte tu emoción.'
    ]
  },
  enojado: {
    patron: /(estoy|me siento) (enojado|molesto|furioso|enfadado)/i,
    respuestas: [
      'Respira hondo 🌬️ ¿Qué pasó?',
      'Entiendo tu enojo 💙 ¿Quieres hablar de ello?',
      'Lamento que estés así 💚 Cuéntame.',
      'Te escucho 💭 Desahógate si quieres.',
      'Comprendo 💙 A veces hay que soltar el enojo.'
    ]
  },
  confundido: {
    patron: /(estoy|me siento) (confundido|perdido|desorientado)/i,
    respuestas: [
      'Tranquilo 💙 ¿En qué te puedo ayudar?',
      'Cuéntame 💚 ¿Qué te confunde?',
      'Estoy aquí 🌟 Hablemos de ello.',
      'Te ayudaré 💫 ¿Qué necesitas entender?'
    ]
  }
};

// ========== PARTE 8: TIEMPO Y CLIMA ==========
const tiempo = {
  que_hora: {
    patron: /qu[eé] hora es|qu[eé] hora son/i,
    respuestas: [
      `Son las ${new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })} ⏰`,
      `Ahora son las ${new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })} 🕐`
    ]
  },
  que_dia: {
    patron: /qu[eé] d[ií]a es|qu[eé] fecha/i,
    respuestas: [
      `Hoy es ${new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 📅`,
      `Estamos a ${new Date().toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' })} 🗓️`
    ]
  }
};

// ========== PARTE 9: MOTIVACIÓN ==========
const motivacion = {
  animo: {
    patron: /[aá]nimo|dame [aá]nimos|necesito motivaci[oó]n|mot[ií]vame/i,
    respuestas: [
      '¡Tú puedes! 💪🔥 Eres más fuerte de lo que crees.',
      '¡Ánimo! 🌟 Cada día es una nueva oportunidad.',
      '¡Adelante! 💫 Lo vas a lograr.',
      '¡Sí se puede! 🎯 Confía en ti.',
      '¡Vamos! 🚀 Tú eres increíble.',
      '¡No te rindas! 💚 Todo esfuerzo vale la pena.',
      '¡Confía! 🌈 Lo mejor está por venir.'
    ]
  }
};

// ========== PARTE 10: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 11: PROCESAMIENTO ==========
export const generate = (msg) => {
  const texto = msg.trim().toLowerCase();
  
  // 1. Saludos por horario
  for (const saludo of Object.values(saludos)) {
    if (saludo.patron.test(texto)) return random(saludo.respuestas);
  }
  
  // 2. Estados emocionales
  for (const estado of Object.values(estados)) {
    if (estado.patron.test(texto)) return random(estado.respuestas);
  }
  
  // 3. Preguntas sobre el bot
  for (const respuesta of Object.values(respuestas)) {
    if (respuesta.patron.test(texto)) return random(respuesta.respuestas);
  }
  
  // 4. Conversación continua
  for (const conv of Object.values(conversacion)) {
    if (conv.patron.test(texto)) return random(conv.respuestas);
  }
  
  // 5. Despedidas
  for (const despedida of Object.values(despedidas)) {
    if (despedida.patron.test(texto)) return random(despedida.respuestas);
  }
  
  // 6. Afirmaciones y negaciones
  for (const afirma of Object.values(afirmaciones)) {
    if (afirma.patron.test(texto)) return random(afirma.respuestas);
  }
  
  // 7. Emociones adicionales
  for (const emocion of Object.values(emociones)) {
    if (emocion.patron.test(texto)) return random(emocion.respuestas);
  }
  
  // 8. Tiempo y clima
  for (const t of Object.values(tiempo)) {
    if (t.patron.test(texto)) return random(t.respuestas);
  }
  
  // 9. Motivación
  for (const motiv of Object.values(motivacion)) {
    if (motiv.patron.test(texto)) return random(motiv.respuestas);
  }
  
  return null;
};