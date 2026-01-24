// ========== PARTE 1: GENERACIÓN DE HISTORIAS ==========
const personajes = {
  heroes: ['un joven valiente', 'una guerrera intrépida', 'un héroe caído', 'una líder nata', 'un rebelde con causa'],
  curiosos: ['una niña curiosa', 'un inventor excéntrico', 'una exploradora audaz', 'un científico visionario', 'una detective astuta'],
  sabios: ['un anciano sabio', 'una maestra espiritual', 'un filósofo errante', 'una sanadora ancestral', 'un monje iluminado'],
  viajeros: ['un viajero solitario', 'una nómada del desierto', 'un peregrino devoto', 'una aventurera del mar', 'un caminante de senderos'],
  artistas: ['un músico callejero', 'una pintora soñadora', 'un poeta romántico', 'una bailarina apasionada', 'un escultor visionario']
};

const lugares = {
  magicos: ['un bosque encantado', 'un castillo flotante', 'una cueva de cristales', 'un jardín de luz eterna', 'una isla que cambia de forma'],
  misteriosos: ['una ciudad perdida', 'un templo olvidado', 'unas ruinas antiguas', 'un laberinto subterráneo', 'una biblioteca prohibida'],
  naturales: ['una montaña sagrada', 'un valle oculto', 'una cascada de arcoíris', 'un desierto infinito', 'un océano de nubes'],
  urbanos: ['una metrópolis futurista', 'un pueblo fantasma', 'una estación espacial', 'un mercado nocturno', 'una torre abandonada'],
  espirituales: ['un santuario celestial', 'un portal dimensional', 'un árbol de la vida', 'un templo de luz', 'una fuente de sabiduría']
};

const problemas = {
  epicos: ['derrotar a un tirano', 'salvar dos mundos', 'detener una guerra', 'restaurar el equilibrio', 'cerrar un portal oscuro'],
  personales: ['superar su mayor miedo', 'perdonar a quien lo traicionó', 'encontrar su verdadero yo', 'aceptar su destino', 'sanar su corazón roto'],
  misiones: ['encontrar un tesoro perdido', 'rescatar a alguien querido', 'descubrir un secreto antiguo', 'completar una profecía', 'recuperar un artefacto'],
  comunitarios: ['salvar a su pueblo', 'unir clanes enemigos', 'proteger a los inocentes', 'restaurar la esperanza', 'construir un nuevo futuro'],
  espirituales: ['encontrar la iluminación', 'romper una maldición', 'conectar con lo divino', 'purificar su alma', 'cumplir una promesa sagrada']
};

const soluciones = {
  valentia: ['con coraje y determinación', 'enfrentando sus miedos', 'sin rendirse jamás', 'arriesgando todo', 'con valentía inquebrantable'],
  amistad: ['gracias a la ayuda de un amigo', 'uniendo fuerzas con aliados', 'confiando en su equipo', 'con el poder de la amistad', 'junto a quien menos esperaba'],
  sabiduria: ['siguiendo su corazón', 'escuchando su intuición', 'aprendiendo de sus errores', 'con sabiduría ancestral', 'reflexionando profundamente'],
  fe: ['confiando en Dios', 'con fe inquebrantable', 'orando sin cesar', 'guiado por lo divino', 'mediante un milagro'],
  creatividad: ['pensando fuera de lo común', 'con una solución inesperada', 'usando su ingenio', 'improvisando brillantemente', 'con arte y creatividad']
};

// ========== PARTE 2: IDEAS CREATIVAS ==========
const ideas = {
  tecnologia: [
    '💡 App de gratitud: Escribe 3 cosas por las que estás agradecido cada día y visualiza tu progreso emocional.',
    '💡 Red social positiva: Una plataforma donde solo se comparten buenas noticias y actos de bondad.',
    '💡 Bot de meditación: IA que crea meditaciones guiadas personalizadas según tu estado emocional.',
    '💡 Diario de sueños AI: App que analiza patrones en tus sueños y te ayuda a interpretarlos.',
    '💡 Música generativa: App que crea música relajante según tu ritmo cardíaco en tiempo real.'
  ],
  comunidad: [
    '💡 Jardín comunitario: Espacio donde vecinos cultivan juntos y comparten la cosecha.',
    '💡 Biblioteca humana: Personas comparten sus historias de vida como "libros vivientes".',
    '💡 Banco de tiempo: Intercambiar habilidades sin dinero (enseñas algo, aprendes algo).',
    '💡 Muro de bondad: Pared pública donde la gente deja mensajes positivos anónimos.',
    '💡 Cine comunitario: Proyectar películas al aire libre y crear espacios de encuentro.'
  ],
  contenido: [
    '💡 Podcast de historias reales: Entrevista a personas mayores sobre sus vidas y lecciones.',
    '💡 Club de lectura virtual: Reunirse online para discutir libros inspiradores cada mes.',
    '💡 Canal de microhistorias: Videos de 60 segundos con historias que cambian perspectivas.',
    '💡 Blog de gratitud colectiva: Plataforma donde usuarios comparten momentos de agradecimiento.',
    '💡 Serie documental personal: Graba la historia de tu familia para futuras generaciones.'
  ],
  arte: [
    '💡 Arte con reciclaje: Crear esculturas hermosas con materiales que otros desecharon.',
    '💡 Murales colaborativos: Invitar a la comunidad a pintar juntos un mural con mensaje.',
    '💡 Música con objetos cotidianos: Crear instrumentos con cosas del día a día.',
    '💡 Poesía en lugares inesperados: Dejar poemas en estaciones, buses, parques.',
    '💡 Fotografía de lo invisible: Capturar momentos de bondad que pasan desapercibidos.'
  ],
  negocio: [
    '💡 Café de conversaciones: Café donde extraños se sientan juntos a charlar profundamente.',
    '💡 Tienda de segunda oportunidad: Vender cosas reparadas con la historia de su restauración.',
    '💡 Servicio de cartas escritas a mano: Negocio de escribir cartas personalizadas para ocasiones especiales.',
    '💡 Experiencias sobre cosas: Ofrecer vivencias memorables en lugar de productos físicos.',
    '💡 Consultoría de simplicidad: Ayudar a personas a simplificar y organizar sus vidas.'
  ]
};

// ========== PARTE 3: METÁFORAS PROFUNDAS ==========
const metaforas = {
  vida: [
    '🌱 La vida es como una semilla: necesita tiempo, tierra fértil y paciencia para florecer en todo su esplendor.',
    '🌊 La vida es como el océano: tiene mareas altas y bajas, pero siempre sigue su curso natural.',
    '🎨 La vida es como un lienzo en blanco: cada día pintas una nueva pincelada de tu obra maestra.',
    '🧩 La vida es como un rompecabezas: cada pieza tiene su lugar, aunque a veces no lo veas de inmediato.',
    '🎭 La vida es como una obra de teatro: tú eres el protagonista de tu propia historia.'
  ],
  problemas: [
    '🌊 Los problemas son como olas: vienen y van, pero la playa siempre permanece firme.',
    '⛰️ Los obstáculos son como montañas: parecen imposibles desde abajo, pero la vista desde arriba vale la pena.',
    '🌧️ Las dificultades son como la lluvia: mojan, incomodan, pero hacen crecer las flores.',
    '🔥 Los desafíos son como el fuego: purifican y fortalecen lo que es verdaderamente valioso.',
    '🌑 Los momentos oscuros son como la noche: necesarios para apreciar el amanecer.'
  ],
  crecimiento: [
    '🦋 El cambio es como una mariposa: primero eres oruga, luego capullo en la oscuridad, finalmente vuelas libre.',
    '🌳 El crecimiento es como un árbol: las raíces crecen profundo en lo oculto antes de que el tronco se eleve.',
    '💎 La presión es como el carbón transformándose en diamante: lo difícil te hace brillar.',
    '🔨 Los golpes de la vida son como el martillo del escultor: revelan la obra maestra que llevas dentro.',
    '🌅 La superación es como el amanecer: después de la noche más oscura, siempre llega la luz.'
  ],
  amor: [
    '🕯️ El amor es como una vela: mientras más se comparte, más se multiplica sin disminuir.',
    '💧 El amor es como el agua: toma la forma del recipiente, se adapta sin perder su esencia.',
    '🌈 El amor es como el arcoíris: surge después de la tormenta y conecta cielo y tierra.',
    '🎵 El amor es como una melodía: invisible pero capaz de mover el corazón más duro.',
    '🌟 El amor es como una estrella: brilla en la oscuridad y guía a los perdidos.'
  ],
  luz: [
    '🕯️ Tu luz interior es como una vela: puede iluminar incluso la oscuridad más profunda sin apagarse.',
    '☀️ Tu esencia es como el sol: aunque se oculte tras las nubes, siempre está ahí brillando.',
    '💡 Tu potencial es como la electricidad: invisible pero con poder para iluminar ciudades enteras.',
    '✨ Tu espíritu es como una chispa: pequeña pero capaz de encender grandes fuegos.',
    '🌟 Tu alma es como una estrella: única, brillante y parte de algo infinitamente mayor.'
  ]
};

// ========== PARTE 4: POEMAS ORIGINALES ==========
const poemas = {
  esperanza: [
    '✨ Poema de Esperanza:\n\nEn cada amanecer hay esperanza,\nen cada paso, una nueva danza.\nLa vida es un lienzo por pintar,\ncon colores de amor y fe sin par.\n\nAunque la noche sea larga y fría,\nel sol siempre vuelve con el día.\nNo pierdas nunca tu ilusión,\npues en ti habita un gran corazón.\n\n🕊️ - ChatWiil',
    
    '✨ Luz en la Oscuridad:\n\nCuando todo parezca oscuro y frío,\nrecuerda que en ti hay un gran brío.\nEres más fuerte de lo que crees,\ntu luz interior jamás se ve.\n\nCada tropiezo es una lección,\ncada lágrima riega tu corazón.\nSigue adelante, no mires atrás,\ntu mejor versión está por llegar más.\n\n🌟 - ChatWiil'
  ],
  amor: [
    '💚 Poema del Amor:\n\nEl amor no se ve, se siente,\ncomo el viento que abraza tu frente.\nNo tiene forma, color ni nombre,\npero es lo único que nos hace hombre.\n\nAma sin esperar recompensa,\nda sin medir, ama sin prensa.\nPues el amor que das, regresa,\nmultiplicado en tu alma traviesa.\n\n🕊️ - ChatWiil'
  ],
  vida: [
    '🌱 Poema de la Vida:\n\nLa vida es un jardín que cultivar,\ncon paciencia, amor y sin parar.\nCada día es una semilla nueva,\nque con fe y esfuerzo se eleva.\n\nNo temas al viento ni a la lluvia,\nson parte del ciclo, no son desdicha ni ruina.\nConfía en el proceso, en el tiempo,\nque todo florece en su momento.\n\n🌻 - ChatWiil'
  ],
  superacion: [
    '💪 Poema de Fuerza:\n\nLevántate cada vez que caigas,\npues en ti hay fuego que no se apaga.\nEres guerrero, no eres débil,\ntu espíritu es fuerte, es móvil.\n\nCada cicatriz cuenta una historia,\nde batallas ganadas, de tu gloria.\nNo eres tus errores del pasado,\neres todo lo que has superado.\n\n🔥 - ChatWiil'
  ]
};

// ========== PARTE 5: FRASES CREATIVAS ==========
const frases = {
  inspiradoras: [
    '✨ "La creatividad no se agota, cuanto más la usas, más crece." - Maya Angelou',
    '🎨 "Todo niño es un artista. El problema es cómo seguir siendo artista al crecer." - Pablo Picasso',
    '💡 "La creatividad es la inteligencia divirtiéndose." - Albert Einstein',
    '🌟 "No esperes inspiración, sal a buscarla con un palo." - Jack London',
    '🚀 "La mejor manera de predecir el futuro es inventarlo." - Alan Kay'
  ],
  sabias: [
    '📖 "Imagina todo lo que podrías ser, luego sé un poco más." - Anónimo',
    '🌈 "La creatividad requiere coraje." - Henri Matisse',
    '💫 "Las ideas son como conejos, si tienes un par pronto tendrás una docena." - John Steinbeck',
    '🎭 "Todo acto de creación es primero un acto de destrucción." - Pablo Picasso',
    '🌺 "La creatividad es contagiosa, pásala." - Albert Einstein'
  ]
};

// ========== PARTE 6: EJERCICIOS CREATIVOS ==========
const ejercicios = [
  '🎯 Ejercicio: Escribe 10 usos creativos para un clip de papel. Sin juzgar, solo genera ideas.',
  '🎯 Ejercicio: Dibuja tu vida en 6 viñetas como si fuera un cómic. ¿Cuál es tu superpoder?',
  '🎯 Ejercicio: Escribe una carta a tu yo de hace 5 años. ¿Qué le dirías?',
  '🎯 Ejercicio: Inventa una palabra nueva y su definición. ¿Qué vacío llena en el lenguaje?',
  '🎯 Ejercicio: Toma 3 objetos aleatorios y crea una historia que los conecte.',
  '🎯 Ejercicio: Escribe un poema usando solo palabras de 5 letras o menos.',
  '🎯 Ejercicio: Diseña tu isla perfecta. ¿Qué tendría? ¿Quién viviría ahí?',
  '🎯 Ejercicio: Reescribe el final de tu cuento de hadas favorito. Cambia todo.',
  '🎯 Ejercicio: Crea un menú para un restaurante de emociones. ¿Qué se serviría?',
  '🎯 Ejercicio: Escribe una canción usando títulos de tus libros favoritos.'
];

// ========== PARTE 7: GENERADORES AVANZADOS ==========
const generarHistoria = () => {
  const categorias = ['heroes', 'curiosos', 'sabios', 'viajeros', 'artistas'];
  const catPersonaje = categorias[Math.floor(Math.random() * categorias.length)];
  const catLugar = Object.keys(lugares)[Math.floor(Math.random() * Object.keys(lugares).length)];
  const catProblema = Object.keys(problemas)[Math.floor(Math.random() * Object.keys(problemas).length)];
  const catSolucion = Object.keys(soluciones)[Math.floor(Math.random() * Object.keys(soluciones).length)];
  
  const p = personajes[catPersonaje][Math.floor(Math.random() * personajes[catPersonaje].length)];
  const l = lugares[catLugar][Math.floor(Math.random() * lugares[catLugar].length)];
  const pr = problemas[catProblema][Math.floor(Math.random() * problemas[catProblema].length)];
  const s = soluciones[catSolucion][Math.floor(Math.random() * soluciones[catSolucion].length)];
  
  return `📖 Historia Generada:\n\nHabía una vez ${p} que vivía cerca de ${l}. Un día, se enfrentó al desafío de ${pr}. \n\nDespués de muchas pruebas, tribulaciones y momentos de duda, finalmente lo logró ${s}. Su victoria no solo cambió su vida, sino que inspiró a todos a su alrededor.\n\n🌟 Moraleja: Cada desafío es una oportunidad disfrazada para crecer y brillar. El héroe no es quien nunca cae, sino quien siempre se levanta.`;
};

const generarPoema = (tipo = 'random') => {
  if (tipo === 'random') {
    const tipos = Object.keys(poemas);
    tipo = tipos[Math.floor(Math.random() * tipos.length)];
  }
  return poemas[tipo]?.[Math.floor(Math.random() * poemas[tipo].length)] || poemas.esperanza[0];
};

const generarIdea = (categoria = 'random') => {
  if (categoria === 'random') {
    const cats = Object.keys(ideas);
    categoria = cats[Math.floor(Math.random() * cats.length)];
  }
  const idea = ideas[categoria]?.[Math.floor(Math.random() * ideas[categoria].length)];
  return `${idea}\n\n💭 Categoría: ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}\n🎨 ¿Te inspira esta idea? Podemos desarrollarla juntos.`;
};

const generarMetafora = (tema = 'random') => {
  if (tema === 'random') {
    const temas = Object.keys(metaforas);
    tema = temas[Math.floor(Math.random() * temas.length)];
  }
  return metaforas[tema]?.[Math.floor(Math.random() * metaforas[tema].length)] || metaforas.vida[0];
};

// ========== PARTE 8: PROCESAMIENTO ==========
export const generate = (msg) => {
  const texto = msg.toLowerCase();
  
  // Historias
  if (/historia|cuento|relato|narra|f[aá]bula/i.test(texto)) return generarHistoria();
  
  // Ideas creativas
  if (/idea|inventa|crea|original|innovador|proyecto/i.test(texto)) {
    if (/tecnolog[ií]a|app|software/i.test(texto)) return generarIdea('tecnologia');
    if (/comunidad|social|vecin/i.test(texto)) return generarIdea('comunidad');
    if (/contenido|blog|video/i.test(texto)) return generarIdea('contenido');
    if (/arte|pintura|m[uú]sica/i.test(texto)) return generarIdea('arte');
    if (/negocio|empresa|ganar/i.test(texto)) return generarIdea('negocio');
    return generarIdea();
  }
  
  // Metáforas
  if (/met[aá]fora|como si|parecido a|comparaci[oó]n/i.test(texto)) {
    if (/vida/i.test(texto)) return generarMetafora('vida');
    if (/problema|dificultad/i.test(texto)) return generarMetafora('problemas');
    if (/crecimiento|superaci[oó]n/i.test(texto)) return generarMetafora('crecimiento');
    if (/amor/i.test(texto)) return generarMetafora('amor');
    if (/luz|esperanza/i.test(texto)) return generarMetafora('luz');
    return generarMetafora();
  }
  
  // Poemas
  if (/poema|verso|rima|poes[ií]a/i.test(texto)) {
    if (/esperanza/i.test(texto)) return generarPoema('esperanza');
    if (/amor/i.test(texto)) return generarPoema('amor');
    if (/vida/i.test(texto)) return generarPoema('vida');
    if (/fuerza|superaci[oó]n/i.test(texto)) return generarPoema('superacion');
    return generarPoema();
  }
  
  // Frases
  if (/frase|cita|quote/i.test(texto)) {
    const tipo = /sabia|profunda/i.test(texto) ? 'sabias' : 'inspiradoras';
    return frases[tipo][Math.floor(Math.random() * frases[tipo].length)];
  }
  
  // Ejercicios
  if (/ejercicio|pr[aá]ctica|actividad|reto creativo/i.test(texto)) {
    return ejercicios[Math.floor(Math.random() * ejercicios.length)];
  }
  
  return null;
};