// ========== PARTE 1: DATOS BASE ==========
const personajes = ['un joven valiente', 'una niña curiosa', 'un anciano sabio', 'un viajero solitario'];
const lugares = ['un bosque encantado', 'una ciudad perdida', 'una montaña sagrada', 'un valle oculto'];
const problemas = ['encontrar un tesoro perdido', 'salvar a su pueblo', 'descubrir un secreto antiguo', 'superar su mayor miedo'];
const soluciones = ['con coraje y determinación', 'gracias a la ayuda de un amigo', 'siguiendo su corazón', 'confiando en Dios'];

const ideas = [
  '💡 App de gratitud: Una app donde escribes 3 cosas por las que estás agradecido cada día.',
  '💡 Jardín comunitario: Organizar un espacio donde vecinos cultiven juntos.',
  '💡 Podcast de historias reales: Entrevistar a personas mayores sobre sus vidas.',
  '💡 Club de lectura virtual: Reunirse online para discutir libros inspiradores.',
  '💡 Arte con reciclaje: Crear esculturas con materiales reciclados.'
];

const metaforas = [
  '🌱 La vida es como una semilla: necesita tiempo, cuidado y paciencia para crecer.',
  '🌊 Los problemas son como olas: vienen y van, pero la playa siempre permanece.',
  '🕯️ Tu luz interior es como una vela: puede iluminar incluso la oscuridad más profunda.',
  '🦋 El cambio es como una mariposa: primero eres oruga, luego capullo, finalmente vuelas.'
];

// ========== PARTE 2: GENERADORES ==========
const generarHistoria = () => {
  const p = personajes[Math.floor(Math.random() * personajes.length)];
  const l = lugares[Math.floor(Math.random() * lugares.length)];
  const pr = problemas[Math.floor(Math.random() * problemas.length)];
  const s = soluciones[Math.floor(Math.random() * soluciones.length)];
  return `📖 Historia Generada: Había una vez ${p} que vivía cerca de ${l}. Un día, se enfrentó al desafío de ${pr}. Después de muchas pruebas, lo logró ${s}. 🌟 Moraleja: Cada desafío es una oportunidad para crecer.`;
};

const generarPoema = () => {
  return `✨ Pequeño Poema: En cada amanecer hay esperanza, en cada paso, una nueva danza. La vida es un lienzo por pintar, con colores de amor y fe sin par. 🕊️ - Mediawii`;
};

// ========== PARTE 3: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (/historia|cuento|relato|narra/i.test(msg)) return generarHistoria();
  if (/idea|inventa|crea|original|innovador/i.test(msg)) return `${ideas[Math.floor(Math.random() * ideas.length)]} 🎨 ¿Te gusta esta idea?`;
  if (/metáfora|como si|parecido a/i.test(msg)) return metaforas[Math.floor(Math.random() * metaforas.length)];
  if (/poema|verso|rima/i.test(msg)) return generarPoema();
  
  return null;
};