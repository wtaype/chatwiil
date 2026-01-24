// ========== PARTE 1: DATOS BASE ==========
const decisiones = {
  patron: /decidir|elección|opción|cual elegir|que hago/i,
  respuestas: [
    '🤔 Para decidir bien: 1) Lista pros y contras, 2) Piensa a largo plazo, 3) Confía en tu intuición. ¿Sobre qué necesitas decidir?',
    '⚖️ Decisiones difíciles: Analiza consecuencias, consulta con alguien de confianza, y recuerda que no decidir también es una decisión.',
    '💡 Pregúntate: ¿Qué opción te acerca más a tus valores? ¿Cuál te da más paz? Esa es tu respuesta.'
  ]
};

const problemas = {
  patron: /problema|conflicto|dilema|como resolver/i,
  respuestas: [
    '🧩 Para resolver problemas: 1) Define el problema claramente, 2) Busca varias soluciones, 3) Elige la mejor y actúa.',
    '🔧 Todo problema tiene solución. Divide el problema grande en partes pequeñas y resuélvelas una por una.',
    '💪 Frente a un problema: Mantén la calma, piensa con claridad, y recuerda que esto también pasará.'
  ]
};

const causaEfecto = {
  patron: /por qué|porque|razón|causa|motivo/i,
  respuestas: [
    '🔍 Todo tiene una razón. ¿Sobre qué quieres entender el "por qué"? Puedo ayudarte a analizarlo.',
    '📊 Para entender causas: Observa patrones, busca conexiones, pregunta a expertos. ¿Qué quieres analizar?',
    '🧠 El "por qué" es clave. Cuéntame más sobre tu duda y razonemos juntos.'
  ]
};

const comparaciones = {
  patron: /mejor|peor|diferencia|comparar|vs|versus/i,
  respuestas: [
    '⚡ Para comparar: Define criterios (precio, calidad, tiempo), evalúa cada opción y elige según tus prioridades.',
    '📈 Comparar ayuda a decidir mejor. ¿Qué opciones estás evaluando? Te ayudo a analizarlas.',
    '🔄 Diferencias clave: Busca ventajas, desventajas y contexto. ¿Qué quieres comparar?'
  ]
};

// ========== PARTE 2: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 3: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  if (decisiones.patron.test(msg)) return random(decisiones.respuestas);
  if (problemas.patron.test(msg)) return random(problemas.respuestas);
  if (causaEfecto.patron.test(msg)) return random(causaEfecto.respuestas);
  if (comparaciones.patron.test(msg)) return random(comparaciones.respuestas);
  
  return null;
};