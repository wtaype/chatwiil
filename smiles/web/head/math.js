// ========== PARTE 1: DATOS BASE ==========
const saludosMath = [
  '¡Excelente pregunta matemática! 🎓',
  '¡Me encanta resolver esto contigo! 📐',
  '¡Vamos a resolverlo paso a paso! 🧮',
  '¡Perfecto! Analicemos esto juntos 📊'
];

const celebraciones = [
  '¡Resultado correcto! ✅',
  '¡Problema resuelto! 🎯',
  '¡Ahí está la solución! 💡',
  '¡Exacto! 🌟'
];

const simbolos = {
  '+': { texto: 'suma', emoji: '➕' },
  '-': { texto: 'resta', emoji: '➖' },
  '*': { texto: 'multiplicación', emoji: '✖️' },
  '/': { texto: 'división', emoji: '➗' },
  '^': { texto: 'potencia', emoji: '⚡' }
};

// ========== PARTE 2: DETECTORES Y VALIDADORES ==========
const detectarOperacion = (msg) => {
  const patrones = [
    /(\d+(?:\.\d+)?)\s*([\+\-\*x\/])\s*(\d+(?:\.\d+)?)/i,
    /cuanto\s+es\s+(\d+(?:\.\d+)?)\s*([\+\-\*x\/])\s*(\d+(?:\.\d+)?)/i,
    /(\d+(?:\.\d+)?)\s*(más|mas|menos|por|entre|dividido)\s+(\d+(?:\.\d+)?)/i
  ];
  
  for (const patron of patrones) {
    const match = msg.match(patron);
    if (match) {
      let [, a, op, b] = match;
      
      // Normalizar operadores
      const opMap = { 'más': '+', 'mas': '+', 'menos': '-', 'por': '*', 'x': '*', 'entre': '/', 'dividido': '/' };
      op = opMap[op.toLowerCase()] || op;
      
      return { num1: parseFloat(a), op, num2: parseFloat(b) };
    }
  }
  return null;
};

const detectarEcuacion = (msg) => {
  const match = msg.match(/(\d+)x\s*([+-])\s*(\d+)\s*=\s*(\d+)/);
  if (match) {
    const [, a, op, b, result] = match;
    return { 
      coef: parseInt(a), 
      op, 
      constante: parseInt(b), 
      resultado: parseInt(result) 
    };
  }
  return null;
};

const detectarPorcentaje = (msg) => {
  const match = msg.match(/(\d+)%?\s*de\s*(\d+)/i);
  if (match) {
    const [, percent, numero] = match;
    return { porcentaje: parseFloat(percent), numero: parseFloat(numero) };
  }
  return null;
};

const detectarPotencia = (msg) => {
  const match = msg.match(/(\d+)\s*(?:elevado\s+a|potencia|\^)\s*(\d+)/i);
  if (match) {
    const [, base, exponente] = match;
    return { base: parseFloat(base), exponente: parseFloat(exponente) };
  }
  return null;
};

const detectarRaiz = (msg) => {
  const match = msg.match(/raíz\s+cuadrada\s+de\s+(\d+)|√(\d+)/i);
  if (match) {
    return { numero: parseFloat(match[1] || match[2]) };
  }
  return null;
};

// ========== PARTE 3: PROCESADORES MATEMÁTICOS ==========
const calcularOperacion = (num1, op, num2) => {
  let resultado;
  
  switch (op) {
    case '+': resultado = num1 + num2; break;
    case '-': resultado = num1 - num2; break;
    case '*': resultado = num1 * num2; break;
    case '/': 
      if (num2 === 0) return '⚠️ Error matemático: No se puede dividir entre cero. La división por cero no está definida.';
      resultado = num1 / num2;
      break;
    default: return null;
  }
  
  const esEntero = Number.isInteger(resultado);
  resultado = esEntero ? resultado : Math.round(resultado * 100) / 100;
  
  const { texto, emoji } = simbolos[op];
  const saludo = saludosMath[Math.floor(Math.random() * saludosMath.length)];
  const celebra = celebraciones[Math.floor(Math.random() * celebraciones.length)];
  
  return `${saludo} ${emoji} Operación de ${texto}: ${num1} ${op} ${num2} Procedimiento: • Números dados: ${num1} y ${num2} • Operación: ${texto} ${emoji} • Cálculo: ${num1} ${op} ${num2} = ${resultado} ${celebra} Respuesta final: ${resultado}${esEntero ? '' : ' (redondeado a 2 decimales)'}`;
};

const resolverEcuacion = (eq) => {
  const { coef, op, constante, resultado } = eq;
  const constanteReal = op === '+' ? constante : -constante;
  const paso1 = resultado - constanteReal;
  const x = paso1 / coef;
  
  const esEntero = Number.isInteger(x);
  const xFinal = esEntero ? x : Math.round(x * 100) / 100;
  
  const saludo = saludosMath[Math.floor(Math.random() * saludosMath.length)];
  
  return `${saludo} 📐 Ecuación lineal: ${coef}x ${op} ${constante} = ${resultado} Resolución paso a paso: Paso 1: Despejar la variable x Movemos ${Math.abs(constanteReal)} al otro lado cambiando su signo: ${coef}x = ${resultado} ${op === '+' ? '-' : '+'} ${Math.abs(constante)} ${coef}x = ${paso1} Paso 2: Aislar x Dividimos ambos lados entre ${coef}: x = ${paso1} ÷ ${coef} x = ${xFinal} ✅ Solución: x = ${xFinal} Verificación: ${coef}(${xFinal}) ${op} ${constante} = ${coef * xFinal + constanteReal} = ${resultado} ✓ Correcto`;
};

const calcularPorcentaje = (datos) => {
  const { porcentaje, numero } = datos;
  const resultado = (porcentaje * numero) / 100;
  const esEntero = Number.isInteger(resultado);
  const resultadoFinal = esEntero ? resultado : Math.round(resultado * 100) / 100;
  
  const saludo = saludosMath[Math.floor(Math.random() * saludosMath.length)];
  
  return `${saludo} 📊 Cálculo de porcentaje: ${porcentaje}% de ${numero} Procedimiento: • Fórmula: (porcentaje × número) ÷ 100 • Sustitución: (${porcentaje} × ${numero}) ÷ 100 • Multiplicación: ${porcentaje * numero} ÷ 100 • División: ${resultadoFinal} ✅ Resultado: ${porcentaje}% de ${numero} = ${resultadoFinal} Interpretación: ${porcentaje}% representa ${resultadoFinal} unidades de un total de ${numero}.`;
};

const calcularPotencia = (datos) => {
  const { base, exponente } = datos;
  const resultado = Math.pow(base, exponente);
  
  const saludo = saludosMath[Math.floor(Math.random() * saludosMath.length)];
  
  let pasos = '';
  if (exponente <= 5) {
    const multiplicaciones = Array(exponente).fill(base).join(' × ');
    pasos = `• Desarrollo: ${multiplicaciones} `;
  }
  
  return `${saludo} ⚡ Potenciación: ${base}^${exponente} Concepto: Multiplicar ${base} por sí mismo ${exponente} veces. ${pasos}• Resultado: ${base}^${exponente} = ${resultado} ✅ Respuesta: ${resultado}`;
};

const calcularRaiz = (datos) => {
  const { numero } = datos;
  const resultado = Math.sqrt(numero);
  const esExacta = Number.isInteger(resultado);
  const resultadoFinal = esExacta ? resultado : Math.round(resultado * 100) / 100;
  
  const saludo = saludosMath[Math.floor(Math.random() * saludosMath.length)];
  
  return `${saludo} 🌱 Raíz cuadrada: √${numero} Concepto: Encontrar un número que multiplicado por sí mismo dé ${numero}. • Cálculo: √${numero} = ${resultadoFinal} ${esExacta ? '✅ (exacta)' : '≈ (aproximada a 2 decimales)'} ✅ Respuesta: √${numero} = ${resultadoFinal} Verificación: ${resultadoFinal} × ${resultadoFinal} = ${Math.round(resultadoFinal * resultadoFinal * 100) / 100} ${esExacta ? '= ' + numero + ' ✓' : '≈ ' + numero}`;
};

// ========== PARTE 4: GENERADOR PRINCIPAL ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase().trim();
  
  // Sin números, no es matemática
  if (!/\d/.test(msg)) return null;
  
  // 1. Ecuaciones lineales
  const ecuacion = detectarEcuacion(msg);
  if (ecuacion) return resolverEcuacion(ecuacion);
  
  // 2. Porcentajes
  const porcentaje = detectarPorcentaje(msg);
  if (porcentaje) return calcularPorcentaje(porcentaje);
  
  // 3. Potencias
  const potencia = detectarPotencia(msg);
  if (potencia) return calcularPotencia(potencia);
  
  // 4. Raíces cuadradas
  const raiz = detectarRaiz(msg);
  if (raiz) return calcularRaiz(raiz);
  
  // 5. Operaciones básicas
  const operacion = detectarOperacion(msg);
  if (operacion) {
    return calcularOperacion(operacion.num1, operacion.op, operacion.num2);
  }
  
  return null;
};