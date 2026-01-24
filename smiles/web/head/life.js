// ========== PARTE 1: MOTIVACIÓN ==========
const motivacion = {
  patron: /motivaci[oó]n|[aá]nimo|fuerzas|inspiraci[oó]n|me rindo|no puedo/i,
  respuestas: [
    '💪 Cada día es una nueva oportunidad para ser mejor. ¡Tú puedes! 🔥',
    '🌟 No te rindas. Los mejores logros requieren tiempo y esfuerzo. 💯',
    '🚀 Cree en ti mismo. Eres más fuerte de lo que piensas. 💪',
    '⭐ El éxito no es el final, el fracaso no es fatal: lo que cuenta es el coraje de continuar. 🦁',
    '🔥 Cada experto fue una vez un principiante. Sigue adelante.',
    '💎 Los diamantes se forman bajo presión. Tú estás en proceso de brillar.',
    '🌈 Después de cada tormenta viene el arcoíris. Tu momento llegará.',
    '🏆 No importa cuán lento vayas, siempre y cuando no te detengas.',
    '✨ Tu única limitación eres tú mismo. ¡Rompe tus propios límites!',
    '🎯 Las grandes cosas nunca vienen de las zonas de confort. ¡Atrévete!'
  ]
};

// ========== PARTE 2: TRISTEZA Y DEPRESIÓN ==========
const tristeza = {
  patron: /triste|deprimido|deprimida|mal|solo|sola|vac[ií]o|sin ganas/i,
  respuestas: [
    '💙 Es normal sentirse triste a veces. Permítete sentir, pero no te quedes ahí. 🌈',
    '🫂 No estás solo. Habla con alguien de confianza. 💚',
    '🌻 Después de la tormenta siempre sale el sol. Ten paciencia. ☀️',
    '🕊️ Está bien no estar bien. Lo importante es buscar ayuda cuando la necesites.',
    '💚 Tu dolor es válido, pero no define quién eres. Eres más fuerte de lo que crees.',
    '🌙 Los días oscuros son temporales. La luz siempre regresa.',
    '🤗 Llora si lo necesitas. Las lágrimas limpian el alma.',
    '📞 Considera hablar con un profesional. Pedir ayuda es de valientes.',
    '🌸 Eres valioso, eres importante, eres amado. Nunca lo olvides.',
    '💪 Este momento pasará. Has superado el 100% de tus peores días hasta ahora.'
  ]
};

// ========== PARTE 3: ESTRÉS Y ANSIEDAD ==========
const estres = {
  patron: /estr[eé]s|ansiedad|preocupado|preocupada|nervioso|nerviosa|agobiado|abrumado/i,
  respuestas: [
    '😌 Respira profundo. Cuenta hasta 10. Todo va a estar bien. 🌿',
    '🧘 Toma un descanso. Tu salud mental es importante. 💚',
    '☕ Date un momento para ti. El estrés pasa, tú permaneces. 🕊️',
    '🌊 Técnica 4-7-8: Inhala 4 seg, retén 7 seg, exhala 8 seg. Repite 3 veces.',
    '📝 Escribe lo que te preocupa. Sacarlo de tu mente ayuda a organizarlo.',
    '🚶 Sal a caminar 10 minutos. El movimiento calma la mente.',
    '🎵 Escucha música relajante. Los sonidos pueden cambiar tu estado de ánimo.',
    '💧 Bebe agua. A veces la deshidratación aumenta la ansiedad.',
    '🛁 Un baño tibio relaja el cuerpo y la mente.',
    '📱 Desconéctate de las redes sociales por un rato. Tu paz es primero.'
  ]
};

// ========== PARTE 4: MEJORA PERSONAL ==========
const mejora = {
  patron: /mejorar|mejor|cambiar|superarme|crecer|desarrollar|h[aá]bitos/i,
  respuestas: [
    '📈 Lee 10 minutos al día. El conocimiento es poder. 📚',
    '💧 Bebe más agua, duerme 8 horas, haz ejercicio. Lo básico funciona. 💪',
    '🙏 Practica la gratitud. Agradece 3 cosas cada día. ✨',
    '🌅 Levántate temprano. Las mañanas productivas cambian vidas.',
    '🎯 Establece metas SMART: Específicas, Medibles, Alcanzables, Relevantes, con Tiempo.',
    '📱 Limita redes sociales a 1 hora diaria. Tu tiempo es oro.',
    '🧘 Medita 5 minutos al día. La claridad mental es clave.',
    '📖 Aprende algo nuevo cada semana. Mantén tu mente activa.',
    '🤝 Rodéate de personas que te inspiren y te impulsen a crecer.',
    '🔄 La constancia vence al talento. Pequeños pasos diarios = grandes resultados.'
  ]
};

// ========== PARTE 5: RELACIONES Y AMOR ==========
const relaciones = {
  patron: /relaci[oó]n|amor|pareja|noviazgo|matrimonio|ruptura|ex|coraz[oó]n roto/i,
  respuestas: [
    '❤️ El amor verdadero se basa en respeto, comunicación y crecimiento mutuo.',
    '💔 Una ruptura duele, pero también es una oportunidad para redescubrirte.',
    '🌹 Mereces a alguien que te valore, te respete y te haga crecer.',
    '🗣️ La comunicación es la base de toda relación saludable. Habla con honestidad.',
    '🚫 Las relaciones tóxicas drenan tu energía. Está bien alejarte.',
    '💍 El matrimonio requiere trabajo diario: paciencia, comprensión y compromiso.',
    '🕊️ Primero ámate a ti mismo. No puedes dar lo que no tienes.',
    '🔥 La pasión es importante, pero la amistad dentro de la pareja es fundamental.',
    '⏰ Dale tiempo al tiempo. Las heridas del corazón sanan, aunque duela ahora.',
    '💚 Una relación sana te hace mejor persona, no te limita ni controla.'
  ]
};

// ========== PARTE 6: TRABAJO Y CARRERA ==========
const trabajo = {
  patron: /trabajo|carrera|empleo|jefe|oficina|despido|desempleo|profesional/i,
  respuestas: [
    '💼 Tu trabajo no define tu valor como persona. Eres más que tu profesión.',
    '📊 Busca un equilibrio trabajo-vida. El burnout es real.',
    '🎯 Establece límites claros. Decir "no" es autocuidado.',
    '🚀 Nunca dejes de aprender. La capacitación continua abre puertas.',
    '🤝 Networking es clave. Las conexiones construyen oportunidades.',
    '💡 Un mal día no significa un mal trabajo. Evalúa a largo plazo.',
    '🔄 Si te despidieron, recuerda: es redirección, no rechazo.',
    '👔 La actitud importa más que la aptitud. Mantén profesionalismo siempre.',
    '📈 Invierte en ti: cursos, libros, mentoría. Tú eres tu mejor inversión.',
    '🌟 Haz lo que amas o ama lo que haces. La pasión se nota.'
  ]
};

// ========== PARTE 7: SALUD FÍSICA ==========
const salud = {
  patron: /salud|ejercicio|gym|dieta|peso|cuerpo|enfermedad|dolor/i,
  respuestas: [
    '🏃 El ejercicio libera endorfinas. 30 minutos al día cambian todo.',
    '🥗 Come real food: frutas, verduras, proteínas. Tu cuerpo lo agradecerá.',
    '💧 2 litros de agua al día. La hidratación es clave.',
    '😴 Duerme 7-8 horas. El descanso es cuando tu cuerpo se repara.',
    '🚫 Evita compararte con otros. Tu único rival eres tú mismo de ayer.',
    '🧘 El yoga y estiramientos previenen lesiones y dan flexibilidad.',
    '🍎 No hagas dietas extremas. Los cambios sostenibles son los que funcionan.',
    '🏋️ La fuerza no es solo física, también es mental. Entrena ambas.',
    '🩺 Visita al médico regularmente. La prevención salva vidas.',
    '💚 Tu cuerpo es tu templo. Cuídalo, respétalo, ámalo.'
  ]
};

// ========== PARTE 8: DINERO Y FINANZAS ==========
const finanzas = {
  patron: /dinero|finanzas|ahorro|deuda|inversi[oó]n|plata|econ[oó]mico/i,
  respuestas: [
    '💰 Regla 50/30/20: 50% necesidades, 30% gustos, 20% ahorro.',
    '📊 Invierte en ti primero: educación, salud, habilidades.',
    '🏦 Ahorra aunque sea el 10% de tus ingresos. Tu yo futuro lo agradecerá.',
    '📉 Evita deudas de consumo. Usa crédito solo para inversiones.',
    '📈 Diversifica tus ingresos. No dependas de una sola fuente.',
    '💳 Si no puedes comprarlo dos veces, no puedes comprarlo.',
    '📚 Educación financiera es poder. Lee sobre inversiones y ahorro.',
    '🎯 Establece metas financieras claras: corto, mediano y largo plazo.',
    '🚫 No gastes para impresionar. La verdadera riqueza es libertad.',
    '⏰ El interés compuesto es mágico. Comienza a invertir hoy.'
  ]
};

// ========== PARTE 9: FAMILIA ==========
const familia = {
  patron: /familia|padres|mam[aá]|pap[aá]|hermanos|hijos|familiares/i,
  respuestas: [
    '👨‍👩‍👧‍👦 La familia es el pilar fundamental. Valórala y cuídala.',
    '💚 No todas las familias son perfectas, pero el amor puede sanar heridas.',
    '🗣️ Habla con tus padres. Ellos también fueron jóvenes una vez.',
    '🤗 Abraza a tu familia. El tiempo juntos no se recupera.',
    '📞 Llama a tus padres. Un simple "¿cómo estás?" significa mucho.',
    '🎁 El mejor regalo para tu familia es tu tiempo y atención.',
    '🧩 Cada familia tiene problemas. Lo importante es enfrentarlos juntos.',
    '👶 Si tienes hijos, dale tiempo de calidad, no solo cosas materiales.',
    '🕊️ Perdona a tu familia. El rencor solo te daña a ti.',
    '💙 La familia no siempre es sangre. Son quienes están en las buenas y malas.'
  ]
};

// ========== PARTE 10: AMISTADES ==========
const amistad = {
  patron: /amigos|amistad|amigo|amiga|mejor amigo|compa[ñn]eros/i,
  respuestas: [
    '🤝 Los verdaderos amigos están en las buenas y en las malas.',
    '👥 Calidad sobre cantidad. Pocos pero buenos amigos valen oro.',
    '🎭 Si un amigo solo aparece cuando necesita algo, no es amigo.',
    '💬 La amistad se nutre de comunicación, respeto y lealtad.',
    '🚫 Aléjate de amistades tóxicas. Tu paz mental es primero.',
    '🎉 Celebra los éxitos de tus amigos como si fueran tuyos.',
    '🆘 Un verdadero amigo te dice la verdad, aunque duela.',
    '🕰️ Las amistades de años se valoran más con el tiempo.',
    '💚 Sé el amigo que te gustaría tener. Da lo que esperas recibir.',
    '📱 No dejes que la distancia rompa amistades verdaderas. Llama, escribe.'
  ]
};

// ========== PARTE 11: PROPÓSITO DE VIDA ==========
const proposito = {
  patron: /prop[oó]sito|sentido|para qu[eé]|mi vida|existencia|vocaci[oó]n/i,
  respuestas: [
    '🌟 Tu propósito es único. Explora, experimenta, descúbrelo.',
    '🎯 El propósito no siempre es grandioso. Puede ser ayudar, crear, amar.',
    '💡 Pregúntate: ¿Qué haría si el dinero no fuera problema?',
    '🔍 Tu propósito está donde tu pasión se encuentra con las necesidades del mundo.',
    '📖 No tengas prisa. Descubrir tu propósito es un viaje, no un destino.',
    '🎨 Haz lo que te haga sentir vivo. Esa es una gran pista.',
    '🤔 ¿Qué problema quieres resolver? Ahí puede estar tu vocación.',
    '🌱 Tu propósito puede cambiar con los años. Y está bien.',
    '💪 El propósito se construye con acciones diarias, no solo con pensamientos.',
    '✨ Deja huella positiva en otros. Ese es un propósito universal.'
  ]
};

// ========== PARTE 12: FRACASO Y RESILIENCIA ==========
const fracaso = {
  patron: /fracaso|fracas[eé]|error|equivoqu[eé]|fall[eé]|perdi|perd[ií]/i,
  respuestas: [
    '💪 El fracaso es el mejor maestro. Aprende y sigue adelante.',
    '🔄 Cada error te acerca al éxito si aprendes de él.',
    '🚀 Los más exitosos han fracasado más veces que tú lo has intentado.',
    '🌱 El fracaso no es caer, es quedarse en el suelo.',
    '📈 Análisis post-fracaso: ¿Qué aprendí? ¿Qué haré diferente?',
    '🎯 Edison falló 1000 veces antes de inventar la bombilla. Sigue intentando.',
    '💎 La resiliencia se construye superando fracasos.',
    '🦸 Los héroes no son quienes nunca caen, sino quienes siempre se levantan.',
    '✨ Tu mayor fracaso puede ser la puerta a tu mayor éxito.',
    '🔥 Levántate una vez más de las que caíste. Eso es resiliencia.'
  ]
};

// ========== PARTE 13: SOLEDAD ==========
const soledad = {
  patron: /solo|sola|soledad|nadie|abandonado|abandonada|aislado/i,
  respuestas: [
    '🤗 La soledad es temporal. Reconecta con amigos, familia o nuevos grupos.',
    '💚 Estar solo no significa estar solo. Aprende a disfrutar tu compañía.',
    '📱 Únete a comunidades con tus intereses: clubs, grupos online, voluntariado.',
    '🎨 La creatividad florece en soledad. Úsala para crear algo.',
    '🧘 La soledad puede ser un regalo para conocerte mejor.',
    '🤝 Da el primer paso. Invita a alguien a café, habla con un vecino.',
    '📞 Si te sientes muy solo, busca ayuda profesional. No hay vergüenza en eso.',
    '🌍 El mundo está lleno de gente buscando conexión. Tú no eres la excepción.',
    '💬 Habla con alguien hoy. Un simple "hola" puede cambiar tu día.',
    '🕊️ La soledad física es diferente a la emocional. Identifica cuál sientes.'
  ]
};

// ========== PARTE 14: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const buscarRespuesta = (obj, texto) => {
  if (obj.patron && obj.patron.test(texto)) {
    return random(obj.respuestas);
  }
  return null;
};

// ========== PARTE 15: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Categorías principales
  let respuesta = buscarRespuesta(motivacion, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(tristeza, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(estres, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(mejora, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(relaciones, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(trabajo, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(salud, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(finanzas, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(familia, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(amistad, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(proposito, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(fracaso, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(soledad, msg);
  if (respuesta) return respuesta;
  
  return null;
};