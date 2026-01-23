// 🌱 BASE DE CONSEJOS DE VIDA
const consejos = {
  tristeza: [
    '💚 **Es completamente normal sentirse triste.** Permítete sentir, no reprimas tus emociones. Llorar puede ser sanador.',
    '🌟 Recuerda: **Los días oscuros no duran para siempre.** Como dice Salmo 30:5, "El llanto puede durar toda la noche, pero con la mañana llegará el grito de alegría."',
    '🤗 **Habla con alguien de confianza.** Compartir tu carga la hace más liviana. No estás solo en esto.',
    '🚶‍♂️ **Sal a caminar al aire libre.** La naturaleza tiene un poder sanador increíble. Incluso 10 minutos pueden cambiar tu ánimo.'
  ],
  soledad: [
    '🫂 **La soledad es temporal, no permanente.** Empieza con pequeños pasos: saluda a un vecino, únete a un grupo de interés.',
    '📚 **Aprovecha este tiempo para conocerte mejor.** Lee, aprende algo nuevo, descubre qué te apasiona.',
    '🙏 Recuerda: **Nunca estás verdaderamente solo.** Dios está contigo siempre. Mateo 28:20 dice "Estaré con ustedes todos los días".',
    '💻 **Conéctate en línea positivamente.** Únete a comunidades de tus intereses, grupos de estudio, voluntariado.'
  ],
  motivacion: [
    '🔥 **"El éxito es la suma de pequeños esfuerzos repetidos día tras día."** No subestimes el poder de la constancia.',
    '💪 **Empieza pequeño, pero empieza.** No esperes el momento perfecto. El momento es ahora.',
    '🌱 **El crecimiento duele, pero vale la pena.** Cada desafío es una oportunidad de fortalecerte.',
    '⭐ Filipenses 4:13: **"Todo lo puedo en Cristo que me fortalece."** Tienes más fuerza de la que crees.'
  ],
  mejora: [
    '📖 **Lee 10 minutos al día.** Tu mente es como un músculo, ejercítala.',
    '💧 **Bebe más agua.** La hidratación afecta tu energía y claridad mental.',
    '😴 **Duerme 7-8 horas.** El descanso es esencial para tu bienestar físico y mental.',
    '🙏 **Practica la gratitud.** Anota 3 cosas por las que estás agradecido cada noche.',
    '🚶‍♀️ **Muévete 30 minutos al día.** No tiene que ser gym, puede ser bailar, caminar, limpiar.'
  ]
};

const versiculos = [
  '📖 Jeremías 29:11: "Yo sé los planes que tengo para ustedes, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza."',
  '📖 Filipenses 4:6-7: "No se preocupen por nada; en cambio, oren por todo. Díganle a Dios lo que necesitan y denle gracias por todo lo que él ha hecho."',
  '📖 Isaías 41:10: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te fortalezco."',
  '📖 Salmo 34:18: "El Señor está cerca de los quebrantados de corazón, y salva a los de espíritu abatido."'
];

// 🎯 GENERAR RESPUESTA
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // ========== TRISTEZA / DEPRESIÓN ==========
  if (/triste|deprimido|mal|infeliz|llorar/.test(msg)) {
    const consejo = consejos.tristeza[Math.floor(Math.random() * consejos.tristeza.length)];
    const versiculo = versiculos[Math.floor(Math.random() * versiculos.length)];
    
    return `${consejo}\n\n${versiculo}\n\n` +
           `💡 **Algunas cosas que puedes hacer ahora:**\n` +
           `• Escribe en un diario lo que sientes\n` +
           `• Escucha música que te reconforte\n` +
           `• Llama a alguien que te quiera\n` +
           `• Haz algo que solías disfrutar\n\n` +
           `Estoy aquí si necesitas hablar más. 💚`;
  }

  // ========== SOLEDAD ==========
  if (/solo|soledad|nadie|aislado/.test(msg)) {
    const consejo = consejos.soledad[Math.floor(Math.random() * consejos.soledad.length)];
    
    return `${consejo}\n\n` +
           `🌟 **Pasos prácticos para conectar:**\n` +
           `1. Únete a una iglesia o grupo comunitario\n` +
           `2. Toma una clase o curso (cocina, arte, deportes)\n` +
           `3. Ofrécete como voluntario\n` +
           `4. Adopta una mascota si puedes\n` +
           `5. Asiste a eventos locales\n\n` +
           `Recuerda: **La soledad es temporal. Las conexiones empiezan con un paso.** 🫂`;
  }

  // ========== MOTIVACIÓN ==========
  if (/motivación|motivado|ganas|ánimo|energía/.test(msg)) {
    const consejo = consejos.motivacion[Math.floor(Math.random() * consejos.motivacion.length)];
    
    return `${consejo}\n\n` +
           `🔥 **Tu plan de acción hoy:**\n` +
           `1. Define UNA meta pequeña para hoy\n` +
           `2. Elimina una distracción (redes sociales, TV)\n` +
           `3. Haz algo que te acerque a tu meta\n` +
           `4. Celebra tu progreso, por pequeño que sea\n\n` +
           `**"El viaje de mil millas comienza con un paso."** - Lao Tzu 🚀`;
  }

  // ========== CÓMO MEJORAR MI VIDA ==========
  if (/mejorar|mejor|cambiar|vida|hábitos/.test(msg)) {
    const items = consejos.mejora.slice(0, 3);
    
    return `🌟 **Aquí van 3 cambios simples pero poderosos:**\n\n` +
           items.map((c, i) => `${i + 1}. ${c}`).join('\n\n') +
           `\n\n📖 Proverbios 16:3: "Encomienda al Señor tus obras, y tus planes tendrán éxito."\n\n` +
           `💡 **Regla de oro:** Empieza con UN hábito a la vez. La constancia vence a la intensidad. 💪`;
  }

  // ========== CONSEJOS GENERALES ==========
  if (/consejo|ayuda|qué hago/.test(msg)) {
    return `💚 **Estoy aquí para ayudarte.** Cuéntame:\n\n` +
           `• ¿Te sientes triste o solo?\n` +
           `• ¿Necesitas motivación?\n` +
           `• ¿Quieres mejorar algo en tu vida?\n` +
           `• ¿Buscas consejo para una situación específica?\n\n` +
           `Háblame con confianza, te escucho. 🕊️`;
  }

  return null; // No es tema de vida
};