// 📖 BASE DE VERSÍCULOS POR CATEGORÍA
const versiculos = {
  esperanza: [
    {
      cita: 'Jeremías 29:11',
      texto: 'Porque yo sé los planes que tengo para ustedes —declara el Señor—, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.',
      reflexion: 'Dios tiene un plan perfecto para tu vida. Aunque no lo veas ahora, Él está trabajando en tu favor.'
    },
    {
      cita: 'Romanos 15:13',
      texto: 'Que el Dios de la esperanza los llene de toda alegría y paz en la fe, para que rebosen de esperanza por el poder del Espíritu Santo.',
      reflexion: 'La esperanza no viene de las circunstancias, viene de confiar en Dios.'
    },
    {
      cita: 'Salmo 33:18',
      texto: 'Los ojos del Señor están sobre los que le temen, sobre los que esperan en su gran amor.',
      reflexion: 'Dios está atento a ti. Tu esperanza en Él nunca será en vano.'
    },
    {
      cita: 'Lamentaciones 3:22-23',
      texto: 'Por la misericordia del Señor no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
      reflexion: 'Cada día es una nueva oportunidad. Las misericordias de Dios se renuevan con el amanecer.'
    }
  ],
  
  fortaleza: [
    {
      cita: 'Isaías 41:10',
      texto: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.',
      reflexion: 'Cuando sientas que no puedes más, recuerda: Dios es tu fortaleza. Él te sostiene.'
    },
    {
      cita: 'Filipenses 4:13',
      texto: 'Todo lo puedo en Cristo que me fortalece.',
      reflexion: 'Tu fuerza no viene de ti mismo, viene de Cristo en ti. Con Él, nada es imposible.'
    },
    {
      cita: 'Josué 1:9',
      texto: 'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.',
      reflexion: 'El valor no es ausencia de miedo, es confiar en que Dios está contigo a pesar del miedo.'
    },
    {
      cita: 'Salmo 46:1',
      texto: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.',
      reflexion: 'En los momentos más difíciles, Dios es tu refugio seguro.'
    },
    {
      cita: '2 Corintios 12:9',
      texto: 'Y me ha dicho: Bástate mi gracia; porque mi poder se perfecciona en la debilidad.',
      reflexion: 'Tu debilidad es una oportunidad para que el poder de Dios brille en ti.'
    }
  ],
  
  paz: [
    {
      cita: 'Juan 14:27',
      texto: 'La paz les dejo, mi paz les doy; yo no la doy como el mundo la da. No se turbe su corazón, ni tenga miedo.',
      reflexion: 'La paz de Dios no depende de las circunstancias. Es una paz sobrenatural que calma tu alma.'
    },
    {
      cita: 'Filipenses 4:6-7',
      texto: 'Por nada estén afanosos, sino sean conocidas sus peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará sus corazones y sus pensamientos en Cristo Jesús.',
      reflexion: 'La preocupación se vence con oración. Cuando oras, la paz de Dios guarda tu corazón.'
    },
    {
      cita: 'Isaías 26:3',
      texto: 'Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera; porque en ti ha confiado.',
      reflexion: 'Mantén tu mente en Dios, y Él te dará paz perfecta.'
    },
    {
      cita: 'Salmo 4:8',
      texto: 'En paz me acostaré y así también dormiré, porque solo tú, Señor, me haces vivir confiado.',
      reflexion: 'Cuando confías en Dios, puedes descansar en paz, sabiendo que Él cuida de ti.'
    }
  ],
  
  amor: [
    {
      cita: '1 Juan 4:8',
      texto: 'El que no ama, no ha conocido a Dios; porque Dios es amor.',
      reflexion: 'El amor no es solo algo que Dios hace, es lo que Dios ES. Él te ama incondicionalmente.'
    },
    {
      cita: 'Juan 3:16',
      texto: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
      reflexion: 'El amor de Dios es tan grande que entregó lo más valioso por ti. Eres amado profundamente.'
    },
    {
      cita: 'Romanos 8:38-39',
      texto: 'Por lo cual estoy seguro de que ni la muerte, ni la vida, ni ángeles, ni principados, ni potestades, ni lo presente, ni lo por venir, ni lo alto, ni lo profundo, ni ninguna otra cosa creada nos podrá separar del amor de Dios, que es en Cristo Jesús Señor nuestro.',
      reflexion: 'NADA puede separarte del amor de Dios. Su amor es eterno e inquebrantable.'
    },
    {
      cita: '1 Corintios 13:4-7',
      texto: 'El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece; no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor.',
      reflexion: 'Este es el estándar del amor verdadero. Dios nos ama así, y nos llama a amar así.'
    }
  ],
  
  fe: [
    {
      cita: 'Hebreos 11:1',
      texto: 'Es, pues, la fe la certeza de lo que se espera, la convicción de lo que no se ve.',
      reflexion: 'La fe no necesita ver para creer. Es confiar en Dios incluso cuando no entiendes.'
    },
    {
      cita: 'Mateo 17:20',
      texto: 'Si tuviereis fe como un grano de mostaza, diréis a este monte: Pásate de aquí allá, y se pasará; y nada os será imposible.',
      reflexion: 'No necesitas fe perfecta, solo fe genuina. Incluso una pequeña fe mueve montañas.'
    },
    {
      cita: 'Romanos 10:17',
      texto: 'Así que la fe es por el oír, y el oír, por la palabra de Dios.',
      reflexion: 'Tu fe crece cuando escuchas y lees la Palabra de Dios. Aliméntala diariamente.'
    },
    {
      cita: 'Santiago 2:17',
      texto: 'Así también la fe, si no tiene obras, es muerta en sí misma.',
      reflexion: 'La fe verdadera se demuestra con acciones. Vive lo que crees.'
    }
  ],
  
  sabiduria: [
    {
      cita: 'Proverbios 3:5-6',
      texto: 'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.',
      reflexion: 'Cuando no sepas qué hacer, confía en Dios. Él te guiará por el camino correcto.'
    },
    {
      cita: 'Santiago 1:5',
      texto: 'Y si alguno de vosotros tiene falta de sabiduría, pídala a Dios, el cual da a todos abundantemente y sin reproche, y le será dada.',
      reflexion: 'Dios promete darte sabiduría si la pides. Él no te juzga por necesitarla, te la da generosamente.'
    },
    {
      cita: 'Proverbios 9:10',
      texto: 'El temor de Jehová es el principio de la sabiduría, y el conocimiento del Santísimo es la inteligencia.',
      reflexion: 'La verdadera sabiduría comienza con reverenciar a Dios y conocerlo.'
    }
  ],
  
  perdon: [
    {
      cita: '1 Juan 1:9',
      texto: 'Si confesamos nuestros pecados, él es fiel y justo para perdonar nuestros pecados, y limpiarnos de toda maldad.',
      reflexion: 'Dios está listo para perdonarte. Solo necesitas confesar con un corazón sincero.'
    },
    {
      cita: 'Efesios 4:32',
      texto: 'Antes sed benignos unos con otros, misericordiosos, perdonándoos unos a otros, como Dios también os perdonó a vosotros en Cristo.',
      reflexion: 'Así como Dios te perdonó, tú también puedes perdonar a otros. El perdón libera.'
    },
    {
      cita: 'Salmo 103:12',
      texto: 'Cuanto está lejos el oriente del occidente, hizo alejar de nosotros nuestras rebeliones.',
      reflexion: 'Cuando Dios perdona, tu pecado es borrado completamente. No lo recuerda más.'
    }
  ],
  
  proteccion: [
    {
      cita: 'Salmo 91:11',
      texto: 'Pues a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos.',
      reflexion: 'Dios envía ángeles para protegerte. No estás solo, estás rodeado de protección divina.'
    },
    {
      cita: 'Salmo 121:7-8',
      texto: 'Jehová te guardará de todo mal; él guardará tu alma. Jehová guardará tu salida y tu entrada desde ahora y para siempre.',
      reflexion: 'Dios es tu guardián personal. Él cuida de ti en todo momento y lugar.'
    },
    {
      cita: 'Proverbios 18:10',
      texto: 'Torre fuerte es el nombre de Jehová; a él correrá el justo, y será levantado.',
      reflexion: 'Cuando sientas peligro, corre hacia Dios. Él es tu refugio seguro.'
    }
  ],
  
  provision: [
    {
      cita: 'Filipenses 4:19',
      texto: 'Mi Dios, pues, suplirá todo lo que os falta conforme a sus riquezas en gloria en Cristo Jesús.',
      reflexion: 'Dios conoce tus necesidades y promete suplirlas. Confía en Su provisión.'
    },
    {
      cita: 'Mateo 6:33',
      texto: 'Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.',
      reflexion: 'Cuando priorizas a Dios, Él se encarga de tus necesidades.'
    },
    {
      cita: 'Salmo 23:1',
      texto: 'Jehová es mi pastor; nada me faltará.',
      reflexion: 'Con Dios como tu pastor, siempre tendrás lo que necesitas.'
    }
  ]
};

// 🙏 ORACIONES PODEROSAS
const oraciones = {
  manana: `🌅 **Oración de la Mañana:**

Señor, gracias por este nuevo día que me has regalado.
Guía mis pasos, mis palabras y mis pensamientos.
Que tu luz brille a través de mí para bendecir a otros.
Dame sabiduría para las decisiones de hoy,
fortaleza para los desafíos que enfrentaré,
y amor para compartir con quienes me rodean.
En el nombre de Jesús, Amén. 🙏`,

  noche: `🌙 **Oración de la Noche:**

Padre Celestial, gracias por tu fidelidad durante este día.
Perdona mis errores y ayúdame a aprender de ellos.
Bendice a mi familia y seres queridos mientras descansamos.
Guarda mi sueño y renueva mis fuerzas para mañana.
Que tu paz llene mi corazón y mi hogar.
En el nombre de Jesús, Amén. 🙏`,

  dificil: `💪 **Oración en Tiempos Difíciles:**

Señor, siento que la carga es muy pesada.
Pero tú dijiste que nunca me abandonarías.
Dame fuerzas para seguir adelante,
fe para creer que esto pasará,
y esperanza para ver la luz al final del túnel.
Llena mi corazón de tu paz que sobrepasa todo entendimiento.
Confío en ti, Señor. En el nombre de Jesús, Amén. 🙏`,

  agradecimiento: `🙌 **Oración de Agradecimiento:**

Gracias, Señor, por tu amor incondicional.
Gracias por las bendiciones visibles e invisibles.
Gracias por tu protección, tu provisión y tu perdón.
Gracias por la familia, los amigos y la vida misma.
Que mi corazón siempre rebose de gratitud hacia ti.
En el nombre de Jesús, Amén. 🙏`,

  padrenuestro: `✝️ **El Padre Nuestro:**

Padre nuestro que estás en el cielo,
santificado sea tu nombre.
Venga tu reino,
hágase tu voluntad en la tierra como en el cielo.
Danos hoy nuestro pan de cada día,
perdona nuestras ofensas,
como también nosotros perdonamos a los que nos ofenden.
No nos dejes caer en tentación,
y líbranos del mal.
Porque tuyo es el reino, el poder y la gloria,
por siempre jamás. Amén. 🙏`
};

// 🎯 GENERAR RESPUESTA
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // ========== VERSÍCULOS POR CATEGORÍA ==========
  if (/verso|versículo|cita|biblia|pasaje|escritura/i.test(msg)) {
    let categoria = 'esperanza'; // Default
    
    if (/esperanza|futuro|planes/i.test(msg)) categoria = 'esperanza';
    else if (/fuerza|fuerte|fortaleza|valor|valiente/i.test(msg)) categoria = 'fortaleza';
    else if (/paz|tranquil|calm|ansiedad|preocup/i.test(msg)) categoria = 'paz';
    else if (/amor|amo|quiero|amado/i.test(msg)) categoria = 'amor';
    else if (/fe|creer|cree|confiar/i.test(msg)) categoria = 'fe';
    else if (/sabio|sabiduría|consejo|decisión/i.test(msg)) categoria = 'sabiduria';
    else if (/perdón|perdonar|arrepent/i.test(msg)) categoria = 'perdon';
    else if (/protección|proteger|cuidar|segur/i.test(msg)) categoria = 'proteccion';
    else if (/provisión|proveer|necesidad|dinero|trabajo/i.test(msg)) categoria = 'provision';

    const versosList = versiculos[categoria];
    const verso = versosList[Math.floor(Math.random() * versosList.length)];
    
    return `📖 **${verso.cita}**\n\n` +
           `*"${verso.texto}"*\n\n` +
           `💭 **Reflexión:**\n${verso.reflexion}\n\n` +
           `🙏 Que este verso ilumine tu corazón hoy. Amén.`;
  }

  // ========== ORACIONES ==========
  if (/oración|ora|recemos|reza/i.test(msg)) {
    if (/padre nuestro/i.test(msg)) {
      return oraciones.padrenuestro;
    }
    
    if (/mañana|despertar|día/i.test(msg)) {
      return oraciones.manana;
    }
    
    if (/noche|dormir|descansar/i.test(msg)) {
      return oraciones.noche;
    }
    
    if (/difícil|problema|ayuda|crisis/i.test(msg)) {
      return oraciones.dificil;
    }
    
    if (/gracias|agradec/i.test(msg)) {
      return oraciones.agradecimiento;
    }

    // Oración general
    return `🙏 **Oremos juntos:**\n\n` +
           `Padre Celestial,\n` +
           `Te presento a esta persona que busca tu rostro.\n` +
           `Escucha su corazón, atiende sus necesidades,\n` +
           `y responde según tu perfecta voluntad.\n` +
           `Llénala de tu paz, amor y esperanza.\n` +
           `En el nombre de Jesús, Amén. 💚\n\n` +
           `¿Hay algo específico por lo que quieras que oremos?`;
  }

  // ========== CONSEJO BÍBLICO ==========
  if (/consejo|ayuda|qué hago|no sé qué hacer/i.test(msg)) {
    const versoSabiduria = versiculos.sabiduria[Math.floor(Math.random() * versiculos.sabiduria.length)];
    
    return `💡 **Consejo Bíblico:**\n\n` +
           `📖 ${versoSabiduria.cita}: *"${versoSabiduria.texto}"*\n\n` +
           `${versoSabiduria.reflexion}\n\n` +
           `🙏 **Pasos prácticos:**\n` +
           `1. Ora a Dios pidiendo dirección\n` +
           `2. Lee Su Palabra para recibir sabiduría\n` +
           `3. Busca consejo de personas piadosas\n` +
           `4. Escucha a tu corazón (el Espíritu Santo habla)\n` +
           `5. Da el paso con fe, confiando en Dios\n\n` +
           `Cuéntame más sobre tu situación para ayudarte mejor. 💚`;
  }

  // ========== FE Y DUDA ==========
  if (/fe|creer|duda|no creo|existe dios/i.test(msg)) {
    return `🕊️ **Sobre la Fe:**\n\n` +
           `Es normal tener dudas. Incluso personas en la Biblia las tuvieron.\n\n` +
           `📖 Marcos 9:24: *"Creo, ayuda mi incredulidad"*\n\n` +
           `La fe no es ausencia de dudas, es confiar en Dios A PESAR de las dudas.\n\n` +
           `💡 **Para fortalecer tu fe:**\n` +
           `• Lee historias de la Biblia (empieza con los Evangelios)\n` +
           `• Habla con Dios honestamente sobre tus dudas\n` +
           `• Busca evidencias históricas de Jesús\n` +
           `• Observa cómo Dios obra en la vida de otros\n` +
           `• Dale una oportunidad a Dios para mostrarse\n\n` +
           `🙏 Dios no teme tus preguntas. Acércate a Él con sinceridad.`;
  }

  // ========== DIOS TE AMA ==========
  if (/dios me ama|me ama dios|por qué dios/i.test(msg)) {
    const versoAmor = versiculos.amor[Math.floor(Math.random() * versiculos.amor.length)];
    
    return `💚 **Dios te ama más de lo que imaginas:**\n\n` +
           `📖 ${versoAmor.cita}: *"${versoAmor.texto}"*\n\n` +
           `${versoAmor.reflexion}\n\n` +
           `🌟 **Verdades sobre el amor de Dios:**\n` +
           `• Te amó ANTES de que hicieras algo bueno\n` +
           `• Te ama A PESAR de tus errores\n` +
           `• Te ama SIEMPRE, incondicionalmente\n` +
           `• Te ama tanto que dio a Su Hijo por ti\n\n` +
           `No importa lo que hayas hecho o dónde estés,\n` +
           `el amor de Dios por ti NUNCA cambia. 🕊️`;
  }

  return null;
};