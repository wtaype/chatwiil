// ========== PARTE 1: DATOS BASE ==========
const conocimientos = {
  historia: {
    patron: /historia|histórico|pasado|guerra|antiguo/i,
    respuestas: [
      '📜 La historia nos enseña de dónde venimos. ¿Qué época te interesa: antigua, medieval, moderna?',
      '⏳ Cada civilización dejó su huella. ¿Quieres saber sobre Egipto, Roma, Incas, o alguna otra?',
      '🏛️ La historia está llena de lecciones. ¿Algún evento o personaje en particular?'
    ]
  },
  ciencia: {
    patron: /ciencia|científico|física|química|biología/i,
    respuestas: [
      '🔬 La ciencia explica el mundo. ¿Te interesa física, química, biología o astronomía?',
      '⚗️ Desde el átomo hasta las galaxias. ¿Qué tema científico quieres explorar?',
      '🧬 La ciencia avanza cada día. ¿Algún descubrimiento reciente que te intrigue?'
    ]
  },
  geografia: {
    patron: /geografía|país|continente|ciudad|lugar/i,
    respuestas: [
      '🌍 Nuestro planeta es fascinante. ¿Quieres saber sobre países, continentes o lugares específicos?',
      '🗺️ Cada lugar tiene su historia. ¿Algún destino en particular que te interese?',
      '⛰️ Montañas, océanos, desiertos... ¿Qué quieres conocer?'
    ]
  },
  cultura: {
    patron: /cultura|tradición|costumbre|arte|música/i,
    respuestas: [
      '🎭 La cultura nos define. ¿Te interesa arte, música, literatura o tradiciones?',
      '🎨 Cada cultura tiene su belleza. ¿Alguna cultura en particular que quieras explorar?',
      '🎵 Desde el arte hasta la música. ¿Qué aspecto cultural te atrae más?'
    ]
  },
  tecnologia: {
    patron: /tecnología|tech|innovación|futuro|ai/i,
    respuestas: [
      '🤖 La tecnología cambia el mundo. ¿Te interesa IA, robótica, internet o gadgets?',
      '💻 Desde smartphones hasta IA. ¿Qué tecnología quieres conocer mejor?',
      '🚀 El futuro es ahora. ¿Alguna innovación tecnológica que te fascine?'
    ]
  }
};

// ========== PARTE 2: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 3: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  for (const [key, tema] of Object.entries(conocimientos)) {
    if (tema.patron.test(msg)) return random(tema.respuestas);
  }
  
  return null;
};