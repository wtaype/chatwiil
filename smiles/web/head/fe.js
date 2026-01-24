// ========== PARTE 1: DATOS BASE ==========
const versiculos = {
  esperanza: [
    { text: 'Porque yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad.', ref: 'Jeremías 29:11' },
    { text: 'El Señor es mi luz y mi salvación, ¿a quién temeré?', ref: 'Salmos 27:1' }
  ],
  amor: [
    { text: 'Porque de tal manera amó Dios al mundo, que dio a su Hijo unigénito.', ref: 'Juan 3:16' },
    { text: 'El amor es paciente, es bondadoso.', ref: '1 Corintios 13:4' }
  ],
  fortaleza: [
    { text: 'Todo lo puedo en Cristo que me fortalece.', ref: 'Filipenses 4:13' },
    { text: 'Dios es nuestro refugio y fortaleza.', ref: 'Salmos 46:1' }
  ],
  paz: [
    { text: 'La paz les dejo, mi paz les doy.', ref: 'Juan 14:27' },
    { text: 'El Señor es mi pastor, nada me faltará.', ref: 'Salmos 23:1' }
  ]
};

const oraciones = [
  'Señor, dame sabiduría para enfrentar este día. 🙏',
  'Dios, llena mi corazón de paz y amor. 💙',
  'Padre celestial, guía mis pasos hoy. 🕊️'
];

// ========== PARTE 2: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getVersiculo = (categoria) => {
  const lista = versiculos[categoria] || versiculos.esperanza;
  const v = random(lista);
  return `✨ "${v.text}" (${v.ref})`;
};

// ========== PARTE 3: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (/biblia|verso|versiculo/i.test(msg)) {
    if (/amor/i.test(msg)) return getVersiculo('amor');
    if (/fuerza|fortaleza/i.test(msg)) return getVersiculo('fortaleza');
    if (/paz|tranquil/i.test(msg)) return getVersiculo('paz');
    return getVersiculo('esperanza');
  }
  
  if (/oración|ora|reza/i.test(msg)) return `🙏 ${random(oraciones)} ¿Quieres que oremos juntos?`;
  if (/dios|jesús|fe|espiritual/i.test(msg)) return `🕊️ La fe es un camino personal. ${getVersiculo('esperanza')} ¿Te gustaría explorar alguna enseñanza en particular?`;
  
  return null;
};