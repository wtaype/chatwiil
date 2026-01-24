// ========== PARTE 1: DATOS BASE ==========
const decisiones = {
  patron: /decidir|elección|opción|cual elegir|que hago|debo elegir/i,
  respuestas: [
    '¡Decisiones importantes! 🤔 Lista pros y contras de cada opción. ¿Cuál te da más paz? Esa es tu respuesta ✅',
    '⚖️ Para decidir bien: piensa a largo plazo, no solo en el ahora. ¿Qué opción te acerca más a tus metas? 🎯',
    '💡 Pregúntate: ¿Qué haría mi mejor versión? ¿Qué me aconsejo a mí mismo dentro de 10 años? 🌟',
    '🧠 Decisiones difíciles: consulta con alguien de confianza, pero al final tú decides. Confía en ti 💪',
    '🔥 No decidir también es decidir. Analiza, elige y actúa. No hay decisiones perfectas, solo las que tomas 🚀'
  ]
};

const problemas = {
  patron: /problema|conflicto|dilema|como resolver|tengo un problema|estoy en aprietos/i,
  respuestas: [
    '🧩 Todo problema tiene solución amigo. Define claramente el problema, busca 3 soluciones posibles, elige la mejor 💯',
    '🔧 Divide el problema grande en partes pequeñas. Resuelve una por una. Verás que es más fácil 😎',
    '💪 Frente a un problema: calma, claridad y acción. Pánico no ayuda. Piensa con la cabeza fría 🧊',
    '🌟 Pregunta clave: ¿Qué puedo controlar? Enfócate en eso. Lo demás déjalo ir 🕊️',
    '🚀 Los problemas son oportunidades disfrazadas. ¿Qué puedes aprender de esto? Crece con cada reto 📈'
  ]
};

const causaEfecto = {
  patron: /por qué|porque|razón|causa|motivo|origen/i,
  respuestas: [
    '🔍 Todo tiene una razón. ¿Sobre qué quieres entender el "por qué"? Analicemos juntos 🧠',
    '📊 Para entender causas: observa patrones, busca conexiones, pregunta "¿por qué?" 5 veces. Llegarás a la raíz 🌱',
    '🧠 El "por qué" es clave para aprender. Cuéntame más y razonemos la causa juntos 💡',
    '🔬 Analiza causa-efecto: ¿Qué pasó antes? ¿Qué cambió? ¿Qué patrones ves? Ahí está la respuesta 🎯',
    '💭 A veces la causa no es obvia. Piensa más allá de lo superficial. ¿Qué hay detrás? 🕵️'
  ]
};

const comparaciones = {
  patron: /mejor|peor|diferencia|comparar|vs|versus|o esto o aquello|cual es mejor/i,
  respuestas: [
    '⚡ Para comparar: define criterios (precio, calidad, tiempo), evalúa cada opción según tus prioridades 📊',
    '📈 Comparar ayuda a decidir mejor. ¿Qué opciones estás evaluando? Te ayudo a analizarlas amigo 🤝',
    '🔄 No hay "mejor absoluto", solo "mejor para ti". ¿Qué es más importante para tu situación? 🎯',
    '💡 Compara ventajas y desventajas. Luego pregunta: ¿con cuál me siento más tranquilo? Esa es la clave 🔑',
    '🌟 Diferencias clave: costo vs beneficio, corto vs largo plazo, riesgo vs recompensa. ¿Qué priorizas? 🧭'
  ]
};

const logica = {
  patron: /lógica|razonamiento|pensar|analizar|lógico|coherente/i,
  respuestas: [
    '🧠 Pensamiento lógico: 1) Identifica hechos, 2) Separa emociones de razón, 3) Concluye basado en evidencia 📚',
    '🔍 Para razonar bien: cuestiona todo (incluso tus creencias), busca evidencia, evita sesgos cognitivos 🎓',
    '💡 Lógica es tu mejor amiga. Pregunta: ¿Esto tiene sentido? ¿Es consistente? ¿Dónde está la prueba? 🔬',
    '🎯 Razonamiento efectivo: premises claras + argumentos válidos = conclusiones sólidas. Así se piensa 💪',
    '🧩 Evita falacias: no generalices, no ataques a la persona, no saltes a conclusiones sin datos 🚫'
  ]
};

const prioridades = {
  patron: /prioridad|importante|urgente|primero|qué hacer primero|orden/i,
  respuestas: [
    '⏰ Matriz de Eisenhower: 1) Urgente e importante → hazlo ya, 2) Importante no urgente → planifica, 3) Resto → delega o elimina 📋',
    '🎯 Pregunta clave: ¿Qué tarea me acerca más a mis metas? Esa es tu prioridad #1 🔥',
    '💡 Prioriza por impacto. ¿Qué tarea, si la haces, hará que las demás sean más fáciles? Empieza por ahí 🚀',
    '⚖️ No todo es urgente. Separa lo importante de lo urgente. A veces lo urgente no es lo importante 🧠',
    '🌟 Regla 80/20: El 20% de tus acciones genera el 80% de resultados. Identifica ese 20% y enfócate ahí 💯'
  ]
};

const pensamiento_critico = {
  patron: /pensamiento crítico|analizar|evaluar|juzgar|criterio/i,
  respuestas: [
    '🔬 Pensamiento crítico: cuestiona la fuente, busca evidencia, considera perspectivas alternativas 🧐',
    '🧠 No creas todo lo que escuchas. Pregunta: ¿Quién lo dice? ¿Por qué? ¿Hay pruebas? 🔍',
    '💡 Para analizar bien: separa hechos de opiniones, identifica sesgos, busca datos verificables 📊',
    '🎓 Piensa como científico: observa, pregunta, investiga, concluye. No asumas sin evidencia 🔬',
    '🌟 Pensamiento crítico es dudar inteligentemente. No seas escéptico de todo, pero sí cauteloso 🛡️'
  ]
};

const creatividad = {
  patron: /creatividad|crear|idear|innovar|pensar diferente|solución creativa/i,
  respuestas: [
    '🎨 Para ser creativo: combina ideas que nunca se han juntado. Pregunta "¿Y si...?" 💡',
    '🚀 Creatividad = conexiones nuevas. Lee mucho, vive experiencias, observa el mundo con curiosidad 🌍',
    '💭 Técnica: piensa en 10 soluciones, las primeras 3 serán obvias, las últimas 3 serán geniales 🧠',
    '🌟 No hay ideas malas en brainstorming. Primero genera, luego filtra. Suelta el juicio inicial 🔓',
    '🔥 Inspírate en otras áreas. ¿Cómo lo resuelven en biología? ¿En arte? ¿En ingeniería? Transfiere ideas 🎯'
  ]
};

const sesgos = {
  patron: /sesgo|prejuicio|error de pensamiento|falacia|bias/i,
  respuestas: [
    '🧠 Sesgo de confirmación: buscamos info que confirma lo que ya creemos. Solución: busca info que contradiga tus ideas 🔍',
    '⚠️ Efecto halo: si alguien es bueno en algo, asumimos que es bueno en todo. Evalúa habilidad por habilidad 📊',
    '🎲 Falacia del jugador: creer que eventos pasados afectan probabilidades futuras. Cada evento es independiente 🎰',
    '💡 Falsa dicotomía: pensar que solo hay dos opciones. Siempre hay más alternativas. Busca la opción C 🔄',
    '🧩 Generalización apresurada: concluir de pocos casos. Necesitas más datos antes de generalizar 📈'
  ]
};

const estrategia = {
  patron: /estrategia|planear|planificar|plan|táctica|cómo hacerlo/i,
  respuestas: [
    '🎯 Estrategia efectiva: 1) Define meta clara, 2) Identifica recursos, 3) Diseña pasos, 4) Ejecuta y ajusta 📋',
    '🗺️ Planificación inteligente: trabaja desde el final hacia el inicio. ¿Dónde quieres estar? Ahora traza el camino 🚶',
    '💡 SMART goals: Específico, Medible, Alcanzable, Relevante, con Tiempo. Así se planea bien 📅',
    '🔥 Estrategia vs táctica: estrategia es el QUÉ y POR QUÉ, táctica es el CÓMO. Necesitas ambos 🎖️',
    '🌟 Planea, pero sé flexible. Las cosas cambian. Adapta tu estrategia según lo que aprendas en el camino 🧭'
  ]
};

const metacognicion = {
  patron: /pensar sobre pensar|aprender a aprender|metacognición|cómo pienso/i,
  respuestas: [
    '🧠 Metacognición: pensar sobre cómo piensas. Pregúntate: ¿Por qué llegué a esta conclusión? ¿Cómo lo sé? 🤔',
    '💡 Para aprender mejor: identifica cómo aprendes tú. ¿Visual? ¿Auditivo? ¿Práctico? Usa tu estilo 🎓',
    '🔍 Reflexiona sobre tus errores. No es fallar, es aprender. ¿Qué haría diferente la próxima vez? 📝',
    '🌟 Monitorea tu comprensión: mientras aprendes, pregúntate "¿Entendí esto?" Si no, repasa 🔄',
    '🚀 Enseñar es la mejor forma de aprender. Si puedes explicarlo simple, lo entendiste bien 👨‍🏫'
  ]
};

const dilemas = {
  patron: /dilema|disyuntiva|encrucijada|dos caminos|no sé qué hacer/i,
  respuestas: [
    '⚖️ Dilemas difíciles: ninguna opción es perfecta. Elige la que tenga mejores consecuencias a largo plazo 🎯',
    '💡 Cuando ambas opciones son buenas: elige la que te haga crecer más como persona 🌱',
    '🧠 Cuando ambas opciones son malas: elige la menos mala, aprende de la experiencia y sigue adelante 💪',
    '🔥 Test del arrepentimiento: ¿Cuál decisión lamentarías más NO haber tomado? Ahí está tu respuesta 🎲',
    '🌟 A veces necesitas más información antes de decidir. Está bien pedir tiempo para pensar 🕐'
  ]
};

const paradojas = {
  patron: /paradoja|contradicción|no tiene sentido|ilógico/i,
  respuestas: [
    '🧩 Las paradojas son fascinantes. Muchas veces revelan límites de nuestro pensamiento o lenguaje 🤯',
    '💡 Paradoja ≠ error. A veces dos cosas contradictorias pueden ser ciertas en contextos diferentes 🔄',
    '🧠 Paradoja del mentiroso: "Esta frase es falsa". ¿Es verdadera o falsa? Rompe la lógica clásica 🤔',
    '🌟 Algunas paradojas tienen solución, otras nos enseñan humildad: no todo es comprensible 🕊️',
    '🔬 Paradojas en física, matemáticas, filosofía. Son motores del conocimiento. Exploran límites 🚀'
  ]
};

const argumentacion = {
  patron: /argumentar|debatir|convencer|defender idea|punto de vista/i,
  respuestas: [
    '🗣️ Para argumentar bien: 1) Presenta evidencia sólida, 2) Usa lógica clara, 3) Anticipa contraargumentos 💪',
    '🎯 Debate efectivo: escucha primero, comprende la posición del otro, luego responde con respeto 🤝',
    '💡 No ataques a la persona, ataca el argumento. Ad hominem es falacia, no argumento 🚫',
    '🧠 Estructura: Tesis → Argumentos → Evidencia → Conclusión. Así se construye un caso sólido 📚',
    '🌟 Cambiar de opinión con nueva evidencia es inteligencia, no debilidad. Crece siempre 🌱'
  ]
};

// ========== PARTE 2: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const buscarRespuesta = (obj, texto) => {
  if (obj.patron && obj.patron.test(texto)) {
    return random(obj.respuestas);
  }
  return null;
};

// ========== PARTE 3: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Categorías de razonamiento
  let respuesta = buscarRespuesta(decisiones, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(problemas, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(causaEfecto, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(comparaciones, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(logica, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(prioridades, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(pensamiento_critico, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(creatividad, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(sesgos, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(estrategia, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(metacognicion, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(dilemas, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(paradojas, msg);
  if (respuesta) return respuesta;
  
  respuesta = buscarRespuesta(argumentacion, msg);
  if (respuesta) return respuesta;
  
  return null;
};