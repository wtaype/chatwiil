// 💬 RESPUESTAS GENERALES (SOLO BÁSICAS)
const respuestasGenerales = {
  desconocido: [
    '🤔 Hmm, no estoy seguro de cómo responder a eso. ¿Podrías reformular tu pregunta?',
    '💭 Interesante pregunta. ¿Podrías darme más detalles para ayudarte mejor?',
    '🕊️ No tengo una respuesta clara para eso, pero intentaré ayudarte. ¿Puedes ser más específico?'
  ]
};

// 📖 VERSÍCULOS BÍBLICOS (Solo si piden específicamente)
const versiculos = {
  esperanza: [
    '📖 Jeremías 29:11: "Yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza."',
    '📖 Romanos 15:13: "Que el Dios de la esperanza los llene de toda alegría y paz en la fe, para que rebosen de esperanza por el poder del Espíritu Santo."',
    '📖 Salmo 33:18: "Los ojos del Señor están sobre los que le temen, sobre los que esperan en su gran amor."'
  ],
  fortaleza: [
    '📖 Isaías 41:10: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te fortalezco."',
    '📖 Filipenses 4:13: "Todo lo puedo en Cristo que me fortalece."',
    '📖 Josué 1:9: "Sé fuerte y valiente. No temas ni desmayes, porque el Señor tu Dios estará contigo dondequiera que vayas."'
  ],
  paz: [
    '📖 Juan 14:27: "La paz les dejo, mi paz les doy. No se la doy como la da el mundo. No se turbe su corazón ni tenga miedo."',
    '📖 Filipenses 4:6-7: "No se preocupen por nada; en cambio, oren por todo. Díganle a Dios lo que necesitan."',
    '📖 Isaías 26:3: "Tú guardarás en completa paz a aquel cuyo pensamiento en ti persevera."'
  ],
  amor: [
    '📖 1 Juan 4:8: "El que no ama no ha conocido a Dios, porque Dios es amor."',
    '📖 Juan 3:16: "Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito."',
    '📖 Romanos 8:38-39: "Nada nos podrá separar del amor de Dios que es en Cristo Jesús."'
  ]
};

// 🎯 GENERAR RESPUESTA (SOLO COSAS MUY ESPECÍFICAS)
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // ========== VERSÍCULOS BÍBLICOS (Solo si piden explícitamente) ==========
  if (/verso|versículo|biblia|pasaje|cita bíblica|escritura bíblica/i.test(msg)) {
    let categoria = 'esperanza'; // Default
    
    if (/esperanza|futuro|fe/i.test(msg)) categoria = 'esperanza';
    else if (/fuerza|fuerte|fortaleza|valor/i.test(msg)) categoria = 'fortaleza';
    else if (/paz|tranquil|calm/i.test(msg)) categoria = 'paz';
    else if (/amor|amo|quiero/i.test(msg)) categoria = 'amor';

    const versos = versiculos[categoria];
    return versos[Math.floor(Math.random() * versos.length)] + '<br><br>💚 Que este verso ilumine tu día.';
  }

  // ========== ORACIONES (Solo padre nuestro específico) ==========
  if (/padre nuestro/i.test(msg)) {
    return `🙏 <strong>El Padre Nuestro:</strong><br><br>` +
           `Padre nuestro que estás en el cielo,<br>` +
           `santificado sea tu nombre.<br>` +
           `Venga tu reino,<br>` +
           `hágase tu voluntad en la tierra como en el cielo.<br>` +
           `Danos hoy nuestro pan de cada día,<br>` +
           `perdona nuestras ofensas,<br>` +
           `como también nosotros perdonamos a los que nos ofenden.<br>` +
           `No nos dejes caer en tentación,<br>` +
           `y líbranos del mal.<br>` +
           `Amén. 🙏`;
  }

  // ========== RESPUESTA DESCONOCIDA (ÚLTIMA OPCIÓN) ==========
  return respuestasGenerales.desconocido[Math.floor(Math.random() * respuestasGenerales.desconocido.length)];
};

// 🔗 FUSIONAR RESPUESTAS DE MÚLTIPLES MÓDULOS
export const merge = (responses, userMessage) => {
  if (responses.length === 0) {
    return generate(userMessage);
  }

  // Si hay una respuesta, usarla directamente
  if (responses.length === 1) {
    return responses[0].text;
  }

  // Si hay múltiples respuestas, combinarlas inteligentemente
  const combined = responses.map(r => `<strong>[${r.module}]</strong><br>${r.text}`).join('<br><br>---<br><br>');
  return combined;
};