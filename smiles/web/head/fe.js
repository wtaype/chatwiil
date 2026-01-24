// ========== PARTE 1: VERSÍCULOS POR CATEGORÍA ==========
const versiculos = {
  esperanza: [
    { text: 'Porque yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.', ref: 'Jeremías 29:11' },
    { text: 'El Señor es mi luz y mi salvación, ¿a quién temeré? El Señor es la fortaleza de mi vida, ¿de quién he de atemorizarme?', ref: 'Salmos 27:1' },
    { text: 'Espera en el Señor, esfuérzate y aliéntese tu corazón. Sí, espera en el Señor.', ref: 'Salmos 27:14' },
    { text: 'Pero los que esperan en el Señor renovarán sus fuerzas, levantarán las alas como águilas, correrán y no se cansarán, caminarán y no se fatigarán.', ref: 'Isaías 40:31' },
    { text: 'Ten fe en el Señor de todo corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y Él allanará tus sendas.', ref: 'Proverbios 3:5-6' }
  ],
  amor: [
    { text: 'Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito, para que todo aquel que cree en Él, no se pierda, sino que tenga vida eterna.', ref: 'Juan 3:16' },
    { text: 'El amor es paciente, es bondadoso. El amor no tiene envidia, no es jactancioso, no se envanece. No se porta indecorosamente, no busca lo suyo, no se irrita, no guarda rencor.', ref: '1 Corintios 13:4-5' },
    { text: 'Y nosotros hemos conocido y creído el amor que Dios tiene para con nosotros. Dios es amor, y el que permanece en amor permanece en Dios, y Dios en él.', ref: '1 Juan 4:16' },
    { text: 'Pero Dios demuestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros.', ref: 'Romanos 5:8' },
    { text: 'Amados, amémonos unos a otros, porque el amor es de Dios. Todo aquel que ama ha nacido de Dios y conoce a Dios.', ref: '1 Juan 4:7' }
  ],
  fortaleza: [
    { text: 'Todo lo puedo en Cristo que me fortalece.', ref: 'Filipenses 4:13' },
    { text: 'Dios es nuestro refugio y fortaleza, nuestro pronto auxilio en las tribulaciones.', ref: 'Salmos 46:1' },
    { text: 'No temas, porque yo estoy contigo. No desmayes, porque yo soy tu Dios que te esfuerzo. Siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.', ref: 'Isaías 41:10' },
    { text: 'El Señor es mi fortaleza y mi escudo. En Él confía mi corazón, y soy ayudado. Por tanto, se goza mi corazón y con mi cántico le alabaré.', ref: 'Salmos 28:7' },
    { text: 'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.', ref: '2 Timoteo 1:7' }
  ],
  paz: [
    { text: 'La paz os dejo, mi paz os doy. Yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.', ref: 'Juan 14:27' },
    { text: 'El Señor es mi pastor, nada me faltará. En lugares de delicados pastos me hará descansar. Junto a aguas de reposo me pastoreará.', ref: 'Salmos 23:1-2' },
    { text: 'Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera, porque en ti ha confiado.', ref: 'Isaías 26:3' },
    { text: 'Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.', ref: 'Filipenses 4:7' },
    { text: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.', ref: 'Mateo 11:28' }
  ],
  tristeza: [
    { text: 'Cercano está el Señor a los quebrantados de corazón, y salva a los contritos de espíritu.', ref: 'Salmos 34:18' },
    { text: 'El Señor sana a los quebrantados de corazón y venda sus heridas.', ref: 'Salmos 147:3' },
    { text: 'Bienaventurados los que lloran, porque ellos recibirán consolación.', ref: 'Mateo 5:4' },
    { text: 'Echando toda vuestra ansiedad sobre Él, porque Él tiene cuidado de vosotros.', ref: '1 Pedro 5:7' },
    { text: 'No os ha sobrevenido ninguna tentación que no sea humana. Pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir.', ref: '1 Corintios 10:13' }
  ],
  miedo: [
    { text: 'Porque no nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio.', ref: '2 Timoteo 1:7' },
    { text: 'Cuando siento miedo, pongo en ti mi confianza.', ref: 'Salmos 56:3' },
    { text: 'No temas, porque yo estoy contigo. No desmayes, porque yo soy tu Dios.', ref: 'Isaías 41:10' },
    { text: 'En el amor no hay temor, sino que el perfecto amor echa fuera el temor.', ref: '1 Juan 4:18' },
    { text: 'Jehová es mi luz y mi salvación, ¿de quién temeré? Jehová es la fortaleza de mi vida, ¿de quién he de atemorizarme?', ref: 'Salmos 27:1' }
  ],
  sabiduria: [
    { text: 'Si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.', ref: 'Santiago 1:5' },
    { text: 'El principio de la sabiduría es el temor del Señor, y el conocimiento del Santísimo es la inteligencia.', ref: 'Proverbios 9:10' },
    { text: 'Confía en el Señor de todo corazón, y no te apoyes en tu propia prudencia.', ref: 'Proverbios 3:5' },
    { text: 'Porque el Señor da la sabiduría, de su boca vienen el conocimiento y la inteligencia.', ref: 'Proverbios 2:6' },
    { text: 'La sabiduría ante todo, adquiere sabiduría. Y sobre todas tus posesiones adquiere inteligencia.', ref: 'Proverbios 4:7' }
  ],
  perdon: [
    { text: 'Si confesamos nuestros pecados, Él es fiel y justo para perdonar nuestros pecados y limpiarnos de toda maldad.', ref: '1 Juan 1:9' },
    { text: 'Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.', ref: 'Efesios 4:32' },
    { text: 'Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.', ref: 'Salmos 103:12' },
    { text: 'Porque si perdonáis a los hombres sus ofensas, os perdonará también a vosotros vuestro Padre celestial.', ref: 'Mateo 6:14' },
    { text: 'Yo, yo soy el que borro tus rebeliones por amor de mí mismo, y no me acordaré de tus pecados.', ref: 'Isaías 43:25' }
  ],
  gratitud: [
    { text: 'Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.', ref: '1 Tesalonicenses 5:18' },
    { text: 'Entrad por sus puertas con acción de gracias, por sus atrios con alabanza. Alabadle, bendecid su nombre.', ref: 'Salmos 100:4' },
    { text: 'Y todo lo que hacéis, sea de palabra o de hecho, hacedlo todo en el nombre del Señor Jesús, dando gracias a Dios Padre por medio de Él.', ref: 'Colosenses 3:17' },
    { text: 'Oh Señor, mi Dios, te alabaré con todo mi corazón y glorificaré tu nombre para siempre.', ref: 'Salmos 86:12' },
    { text: 'Alabad al Señor, porque Él es bueno, porque para siempre es su misericordia.', ref: 'Salmos 136:1' }
  ]
};

// ========== PARTE 2: ORACIONES POR SITUACIÓN ==========
const oraciones = {
  manana: [
    'Señor, te entrego este nuevo día. Guía mis pasos y llena mi corazón de tu paz. Que cada palabra que diga y cada acción que haga glorifique tu nombre. Amén. 🙏',
    'Padre celestial, gracias por este día que me regalas. Dame sabiduría para tomar buenas decisiones y amor para compartir con quienes me rodean. Amén. ☀️',
    'Dios todopoderoso, al despertar te doy gracias por la vida. Fortaléceme para enfrentar los desafíos de hoy con fe y esperanza. Amén. 🌅'
  ],
  noche: [
    'Señor, al terminar este día te doy gracias por tu protección. Perdona mis errores y renueva mis fuerzas para mañana. Que tu paz me acompañe al descansar. Amén. 🌙',
    'Padre bueno, gracias por este día que termina. Te entrego mis preocupaciones y confío en que todo está en tus manos. Descansaré en tu amor. Amén. ✨',
    'Dios de amor, cubro con tu sangre a mi familia. Que tu presencia llene nuestro hogar esta noche y nos des un descanso reparador. Amén. 🛌'
  ],
  dificultad: [
    'Señor, estoy pasando por un momento difícil y necesito tu ayuda. Dame fortaleza para seguir adelante y fe para confiar en que todo obrará para bien. Amén. 💪',
    'Padre celestial, me siento débil y necesito tu poder. Recuérdame que tú estás conmigo siempre, que nunca me abandonarás. Renueva mis fuerzas. Amén. 🕊️',
    'Dios todopoderoso, en medio de esta prueba me aferro a ti. Sé que tus planes son perfectos y que usarás esto para mi crecimiento. Confío en ti. Amén. 🙌'
  ],
  agradecimiento: [
    'Señor, hoy mi corazón está lleno de gratitud. Gracias por tu amor incondicional, por tu fidelidad y por todas las bendiciones que me das cada día. Amén. 💚',
    'Padre bueno, te alabo y te bendigo por todo lo que haces en mi vida. Gracias por tu misericordia que se renueva cada mañana. Eres maravilloso. Amén. 🙏',
    'Dios de amor, gracias por ser mi refugio y mi fortaleza. Por estar conmigo en los buenos y malos momentos. Te amo y te honro. Amén. ❤️'
  ],
  familia: [
    'Señor, te pido por mi familia. Cúbrenos con tu sangre preciosa. Que tu paz reine en nuestro hogar y tu amor nos una cada día más. Amén. 🏠',
    'Padre celestial, bendice a cada miembro de mi familia. Guárdalos de todo mal y llénalos de tu Espíritu Santo. Amén. 👨‍👩‍👧‍👦',
    'Dios de amor, te entrego a mi familia. Que tu voluntad se haga en cada uno de nosotros y que siempre caminemos en tus caminos. Amén. 💕'
  ],
  sanacion: [
    'Señor, tú eres el Dios que sana. Te pido por sanidad física, emocional y espiritual. Por tus llagas fuimos curados. Confío en tu poder sanador. Amén. 🩹',
    'Padre celestial, toca con tu mano sanadora este cuerpo. Restaura lo que está enfermo y renueva las fuerzas. En ti está la salud completa. Amén. ✨',
    'Dios todopoderoso, declaro sanidad en el nombre de Jesús. Tu Palabra dice que por sus heridas somos sanados. Creo y recibo tu sanidad ahora. Amén. 🙏'
  ],
  trabajo: [
    'Señor, te pido sabiduría para mi trabajo. Que todo lo que haga sea con excelencia y para tu gloria. Bendice el trabajo de mis manos. Amén. 💼',
    'Padre celestial, abre puertas de bendición laboral. Dame favor con mis superiores y compañeros. Que mi testimonio brille en mi lugar de trabajo. Amén. 🌟',
    'Dios proveedor, confío en que suplirás todas mis necesidades. Bendice mi trabajo y multiplica el fruto de mi esfuerzo. Amén. 🙌'
  ]
};

// ========== PARTE 3: PROMESAS DE DIOS ==========
const promesas = [
  'Dios promete nunca dejarte ni abandonarte. 🕊️ Él está contigo en cada paso que das.',
  'Dios promete darte paz en medio de la tormenta. 🌊 Su paz sobrepasa todo entendimiento.',
  'Dios promete escuchar tus oraciones. 🙏 Antes que clames, Él ya está respondiendo.',
  'Dios promete darte fuerzas cuando estés débil. 💪 En tu debilidad, su poder se perfecciona.',
  'Dios promete un futuro lleno de esperanza. ✨ Sus planes para ti son de bien y no de mal.',
  'Dios promete perdonar tus pecados. 💙 Si los confesamos, Él es fiel para perdonar.',
  'Dios promete suplir todas tus necesidades. 🌾 Él conoce lo que necesitas antes que lo pidas.',
  'Dios promete consolarte en tu tristeza. 💚 Él es cercano a los quebrantados de corazón.',
  'Dios promete guiarte por el camino correcto. 🛤️ Reconócelo en todos tus caminos.',
  'Dios promete transformar tu dolor en gozo. 🌈 El llanto dura una noche, pero el gozo viene en la mañana.'
];

// ========== PARTE 4: ENSEÑANZAS ESPIRITUALES ==========
const ensenanzas = {
  fe: [
    'La fe es creer en lo que no vemos, pero sabiendo que Dios es fiel a sus promesas. Es confiar en Él incluso cuando las circunstancias dicen lo contrario. 🕊️',
    'Tu fe no necesita ser grande como una montaña. Jesús dijo que con fe como un grano de mostaza puedes mover montañas. Lo importante es en quién pones tu fe. 🌱',
    'La fe crece con la práctica. Cada vez que confías en Dios y ves su fidelidad, tu fe se fortalece. Lee su Palabra, ora y verás crecer tu fe. 📖'
  ],
  oracion: [
    'La oración es conversación íntima con Dios. No necesitas palabras elaboradas, solo un corazón sincero. Él escucha hasta el más mínimo suspiro. 💙',
    'Ora sin cesar significa mantener una actitud constante de comunión con Dios. Habla con Él en todo momento, como hablas con tu mejor amigo. 🙏',
    'Cuando ores, ten fe que Dios te escucha. No siempre responde como esperamos ni cuando queremos, pero siempre responde en el tiempo perfecto. ⏰'
  ],
  perdon: [
    'Perdonar no significa que lo que te hicieron estuvo bien. Significa que decides soltar el peso del rencor para vivir en libertad. Dios te ayudará. 🕊️',
    'Cuando perdonas, no cambias el pasado, pero sí liberas tu futuro. El perdón es un regalo que te das a ti mismo. Dios perdona infinitamente, nosotros podemos aprender de Él. 💚',
    'Perdonar es un proceso, no un evento único. Algunos días será fácil, otros difícil. Pero cada paso en esa dirección te acerca más a la paz de Dios. 🌈'
  ],
  proposito: [
    'Fuiste creado con un propósito único. No eres un accidente. Dios te diseñó con amor y tiene planes específicos para tu vida. Búscalo en oración. 🌟',
    'Tu propósito no siempre es algo grandioso a los ojos del mundo. A veces es ser luz en tu hogar, amor en tu trabajo, esperanza para alguien que sufre. Eso es grandioso para Dios. ✨',
    'Descubrir tu propósito es un viaje, no un destino. Dios te va revelando paso a paso. Confía en el proceso y sigue adelante con fe. 🛤️'
  ]
};

// ========== PARTE 5: TESTIMONIOS DE FE ==========
const testimonios = [
  '🌟 Testimonio: Una hermana atravesaba una enfermedad terminal. Los médicos no daban esperanza, pero ella y su iglesia oraron sin cesar. Dios la sanó completamente. Hoy predica sobre su milagro.',
  '💚 Testimonio: Un hermano perdió su trabajo y cayó en depresión. Clamó a Dios día y noche. A las dos semanas, consiguió un trabajo mejor que el anterior. Dios siempre tiene planes mejores.',
  '🙏 Testimonio: Una familia estaba al borde del divorcio. Decidieron buscar a Dios juntos. Hoy su matrimonio es un testimonio de restauración y amor.',
  '✨ Testimonio: Un joven adicto a las drogas entregó su vida a Cristo. Dios lo liberó completamente. Hoy ayuda a otros jóvenes a encontrar esperanza en Jesús.',
  '🕊️ Testimonio: Una mujer cargaba con culpa de su pasado. Al conocer el amor de Dios, experimentó perdón total. Hoy vive en libertad y paz.'
];

// ========== PARTE 6: CONSEJOS ESPIRITUALES ==========
const consejos = {
  crecimiento: [
    'Para crecer espiritualmente: 1. Lee la Biblia diariamente. 2. Ora constantemente. 3. Congrégate con otros creyentes. 4. Sirve a los demás. 5. Comparte tu fe. 📖',
    'El crecimiento espiritual es progresivo. No te compares con otros. Cada uno tiene su propio ritmo con Dios. Lo importante es avanzar, no retroceder. 🌱',
    'Busca a Dios en la mañana antes de revisar tu teléfono. Dale a Él las primicias de tu día. Esa simple práctica transformará tu vida. ☀️'
  ],
  tentacion: [
    'Cuando enfrentes tentación, recuerda que no estás solo. Jesús fue tentado en todo y venció. Él te da poder para vencer también. Huye, ora y resiste. 💪',
    'La tentación no es pecado. Pecar es ceder a ella. Todos somos tentados, pero en Cristo tenemos victoria. Memoriza versículos bíblicos para esos momentos. 🛡️',
    'Si caíste en pecado, levántate y vuelve al Padre. Él no te rechaza, te recibe con amor. Confiesa, arrepiéntete y sigue adelante. La misericordia de Dios es infinita. 🕊️'
  ]
};

// ========== PARTE 7: SALMOS COMPLETOS ==========
const salmos = {
  23: 'Salmo 23: El Señor es mi pastor, nada me faltará. En lugares de delicados pastos me hará descansar. Junto a aguas de reposo me pastoreará. Confortará mi alma. Me guiará por sendas de justicia por amor de su nombre. Aunque ande en valle de sombra de muerte, no temeré mal alguno, porque tú estarás conmigo. Tu vara y tu cayado me infundirán aliento. 🕊️',
  91: 'Salmo 91: El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo al Señor: Esperanza mía, y castillo mío, mi Dios, en quien confiaré. Él te librará del lazo del cazador, de la peste destructora. Con sus plumas te cubrirá, y debajo de sus alas estarás seguro. Escudo y adarga es su verdad. 🛡️',
  121: 'Salmo 121: Alzaré mis ojos a los montes, ¿de dónde vendrá mi socorro? Mi socorro viene del Señor, que hizo los cielos y la tierra. No dará tu pie al resbaladero, ni se dormirá el que te guarda. He aquí, no se adormecerá ni dormirá el que guarda a Israel. El Señor es tu guardador. ⛰️'
};

// ========== PARTE 8: RESPUESTAS CONVERSACIONALES ==========
const conversaciones = {
  bendiciones: [
    '🙏 Amén hermano, que Dios te bendiga abundantemente también. Su gracia y paz sean contigo siempre.',
    '💚 Amén, igualmente hermano. Que el Señor derrame bendiciones sobre tu vida y tu familia.',
    '✨ Gracias hermano, que Dios te bendiga el doble. Él tiene cosas maravillosas preparadas para ti.',
    '🕊️ Amén, recibe también la bendición del Altísimo. Que su favor te acompañe todos los días de tu vida.'
  ],
  amor_dios: [
    '💙 Amén hermano, Dios te ama inmensamente. Su amor es más grande que cualquier cosa que puedas imaginar.',
    '🕊️ Sí hermano, el amor de Dios es infinito e incondicional. Él te ama tal como eres.',
    '💚 Gracias por recordarlo hermano. Dios te ama a ti también con un amor eterno y perfecto.',
    '✨ Amén, ese es el mensaje más hermoso. Dios nos amó primero y su amor nunca falla.'
  ],
  gracias: [
    '🙏 De nada hermano, para eso estamos. Dios me usa para bendecir a otros como tú.',
    '💚 Gracias a ti hermano por tu corazón agradecido. Dios ama al dador alegre.',
    '✨ No hay de qué hermano. Es un honor poder compartir la Palabra contigo.',
    '🕊️ Con mucho gusto hermano. Recuerda que Dios siempre está ahí para ti.'
  ],
  amen: [
    '🙏 Amén y amén hermano. Que así sea según la voluntad de Dios.',
    '✨ Amén hermano. Dios escucha nuestras oraciones y las responde.',
    '💚 Amén. Toda la gloria y honra sea para nuestro Padre celestial.',
    '🕊️ Amén hermano. Que el nombre del Señor sea siempre glorificado.'
  ],
  alabanzas: [
    '🙌 Gloria a Dios hermano. Él es digno de toda alabanza y adoración.',
    '✨ Aleluya hermano. Grande es el Señor y digno de suprema alabanza.',
    '🕊️ Gloria al Altísimo. Su misericordia es para siempre.',
    '💚 Bendito sea el nombre del Señor. De Él, por Él y para Él son todas las cosas.'
  ]
};

// ========== PARTE 9: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getVersiculo = (categoria) => {
  const lista = versiculos[categoria] || versiculos.esperanza;
  const v = random(lista);
  return `✨ "${v.text}"\n(${v.ref})`;
};

const getOracion = (tipo) => {
  const lista = oraciones[tipo] || oraciones.manana;
  return random(lista);
};

const getEnsenanza = (tema) => {
  const lista = ensenanzas[tema] || ensenanzas.fe;
  return random(lista);
};

// ========== PARTE 10: PROCESAMIENTO ==========
export const generate = (msg) => {
  const texto = msg.toLowerCase();
  
  // Respuestas conversacionales
  if (/dios te (bendiga|bendice)|bendiciones|que dios te bendiga/i.test(texto)) {
    return random(conversaciones.bendiciones);
  }
  
  if (/dios te ama|dios me ama|el amor de dios/i.test(texto)) {
    return random(conversaciones.amor_dios);
  }
  
  if (/(muchas )?gracias( hermano)?|te agradezco|mil gracias/i.test(texto) && /dios|se[ñn]or|jes[uú]s/i.test(texto)) {
    return random(conversaciones.gracias);
  }
  
  if (/^am[eé]n$/i.test(texto)) {
    return random(conversaciones.amen);
  }
  
  if (/gloria a dios|aleluya|bendito sea|alabado sea/i.test(texto)) {
    return random(conversaciones.alabanzas);
  }
  
  // Versículos
  if (/vers[ií]culo|biblia|escritura|palabra de dios/i.test(texto)) {
    if (/amor/i.test(texto)) return getVersiculo('amor');
    if (/fuerza|fortaleza/i.test(texto)) return getVersiculo('fortaleza');
    if (/paz|tranquil/i.test(texto)) return getVersiculo('paz');
    if (/triste|tristeza|dolor/i.test(texto)) return getVersiculo('tristeza');
    if (/miedo|temor/i.test(texto)) return getVersiculo('miedo');
    if (/sabidur[ií]a/i.test(texto)) return getVersiculo('sabiduria');
    if (/perd[oó]n|perdonar/i.test(texto)) return getVersiculo('perdon');
    if (/gracias|gratitud|agradecer/i.test(texto)) return getVersiculo('gratitud');
    return getVersiculo('esperanza');
  }
  
  // Oraciones
  if (/oraci[oó]n|ora|reza|ruega/i.test(texto)) {
    if (/ma[ñn]ana/i.test(texto)) return `🙏 ${getOracion('manana')}`;
    if (/noche/i.test(texto)) return `🌙 ${getOracion('noche')}`;
    if (/dif[ií]cil|problema|ayuda/i.test(texto)) return `💪 ${getOracion('dificultad')}`;
    if (/gracias|agradecer/i.test(texto)) return `💚 ${getOracion('agradecimiento')}`;
    if (/familia/i.test(texto)) return `🏠 ${getOracion('familia')}`;
    if (/sanidad|salud|enfermo/i.test(texto)) return `🩹 ${getOracion('sanacion')}`;
    if (/trabajo|empleo/i.test(texto)) return `💼 ${getOracion('trabajo')}`;
    return `🙏 ${random(oraciones.manana)}`;
  }
  
  // Promesas de Dios
  if (/promesa|promete|qu[eé] promete dios/i.test(texto)) {
    return random(promesas);
  }
  
  // Enseñanzas
  if (/ense[ñn]anza|ense[ñn]a|aprende|c[oó]mo/i.test(texto)) {
    if (/fe|creer/i.test(texto)) return getEnsenanza('fe');
    if (/orar|oraci[oó]n/i.test(texto)) return getEnsenanza('oracion');
    if (/perdonar|perd[oó]n/i.test(texto)) return getEnsenanza('perdon');
    if (/prop[oó]sito|para qu[eé]/i.test(texto)) return getEnsenanza('proposito');
    return getEnsenanza('fe');
  }
  
  // Testimonios
  if (/testimonio|milagro|historia de fe/i.test(texto)) {
    return random(testimonios);
  }
  
  // Consejos
  if (/consejo|ayuda espiritual|c[oó]mo crecer/i.test(texto)) {
    if (/crecer|crecimiento/i.test(texto)) return random(consejos.crecimiento);
    if (/tentaci[oó]n|pecado/i.test(texto)) return random(consejos.tentacion);
    return random(consejos.crecimiento);
  }
  
  // Salmos completos
  if (/salmo/i.test(texto)) {
    if (/23/i.test(texto)) return salmos[23];
    if (/91/i.test(texto)) return salmos[91];
    if (/121/i.test(texto)) return salmos[121];
    return `${salmos[23]}\n💡 También puedes pedirme el Salmo 91 o el Salmo 121.`;
  }
  
  // Preguntas sobre Dios
  if (/qui[eé]n es dios|qu[eé] es dios|dios existe/i.test(texto)) {
    return `🕊️ Dios es amor infinito, creador del universo, Padre celestial que te ama incondicionalmente. Él es eterno, todopoderoso, omnisciente y siempre fiel. Jesús vino para mostrarnos su amor y darnos vida eterna.\n${getVersiculo('amor')}`;
  }
  
  if (/c[oó]mo conocer a dios|c[oó]mo tener fe/i.test(texto)) {
    return `🙏 Para conocer a Dios:\n1. Reconoce que lo necesitas\n2. Cree que Jesús murió por tus pecados\n3. Invítalo a tu corazón\n4. Lee la Biblia diariamente\n5. Ora constantemente\n6. Búscalo con todo tu corazón\n${getVersiculo('esperanza')}`;
  }
  
  // General espiritual
  if (/dios|jes[uú]s|fe|espiritual|cristo|se[ñn]or/i.test(texto)) {
    return `🕊️ Hermano, la fe es un camino hermoso de comunión con Dios. Él te ama infinitamente y tiene planes maravillosos para tu vida.\n${getVersiculo('esperanza')}`;
  }
  
  return null;
};