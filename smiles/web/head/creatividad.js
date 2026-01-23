// 🎨 GENERADOR DE HISTORIAS
const generarHistoria = () => {
  const personajes = ['un joven valiente', 'una niña curiosa', 'un anciano sabio', 'un viajero solitario'];
  const lugares = ['un bosque encantado', 'una ciudad perdida', 'una montaña sagrada', 'un valle oculto'];
  const problemas = ['encontrar un tesoro perdido', 'salvar a su pueblo', 'descubrir un secreto antiguo', 'superar su mayor miedo'];
  const soluciones = ['con coraje y determinación', 'gracias a la ayuda de un amigo', 'siguiendo su corazón', 'confiando en Dios'];

  const p = personajes[Math.floor(Math.random() * personajes.length)];
  const l = lugares[Math.floor(Math.random() * lugares.length)];
  const pr = problemas[Math.floor(Math.random() * problemas.length)];
  const s = soluciones[Math.floor(Math.random() * soluciones.length)];

  return `📖 **Historia Generada:**\n\n` +
         `Había una vez ${p} que vivía cerca de ${l}.\n` +
         `Un día, se enfrentó al desafío de ${pr}.\n` +
         `Después de muchas pruebas, lo logró ${s}.\n\n` +
         `🌟 *Moraleja:* Cada desafío es una oportunidad para crecer.`;
};

// 🎯 GENERAR RESPUESTA
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // ========== HISTORIAS ==========
  if (/historia|cuento|relato|narra/i.test(msg)) {
    return generarHistoria();
  }

  // ========== IDEAS CREATIVAS ==========
  if (/idea|inventa|crea|original|innovador/i.test(msg)) {
    const ideas = [
      '💡 **App de gratitud:** Una app donde escribes 3 cosas por las que estás agradecido cada día.',
      '💡 **Jardín comunitario:** Organizar un espacio donde vecinos cultiven juntos.',
      '💡 **Podcast de historias reales:** Entrevistar a personas mayores sobre sus vidas.',
      '💡 **Club de lectura virtual:** Reunirse online para discutir libros inspiradores.',
      '💡 **Arte con reciclaje:** Crear esculturas con materiales reciclados.'
    ];
    return ideas[Math.floor(Math.random() * ideas.length)] + '\n\n🎨 ¿Te gusta esta idea?';
  }

  // ========== METÁFORAS ==========
  if (/metáfora|como si|parecido a/i.test(msg)) {
    const metaforas = [
      '🌱 **La vida es como una semilla:** necesita tiempo, cuidado y paciencia para crecer.',
      '🌊 **Los problemas son como olas:** vienen y van, pero la playa siempre permanece.',
      '🕯️ **Tu luz interior es como una vela:** puede iluminar incluso la oscuridad más profunda.',
      '🦋 **El cambio es como una mariposa:** primero eres oruga, luego capullo, finalmente vuelas.'
    ];
    return metaforas[Math.floor(Math.random() * metaforas.length)];
  }

  // ========== POEMAS ==========
  if (/poema|verso|rima/i.test(msg)) {
    return `✨ **Pequeño Poema:**\n\n` +
           `En cada amanecer hay esperanza,\n` +
           `en cada paso, una nueva danza.\n` +
           `La vida es un lienzo por pintar,\n` +
           `con colores de amor y fe sin par.\n\n` +
           `🕊️ *- Mediawii*`;
  }

  return null;
};