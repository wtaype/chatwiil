// ========== PARTE 1: DATOS BASE ==========
const saludosMath = [
  '¡Vamos a resolverlo! 😎',
  '¡Excelente pregunta! 🌟',
  '¡Hagamos magia matemática! 🔥',
  '¡Perfecto! Analicemos esto 💯',
  '¡Me encanta! Vamos 💚',
  '¡Interesante! Lo resuelvo 😊',
  '¡Súper! Calculemos 🥳',
  '¡Genial! Aquí vamos 🔥',
  '¡Ey! Te ayudo con eso 😎',
  '¡Claro! Lo resuelvo ya 💯'
];

const celebraciones = [
  '¡Correcto! 🌟',
  '¡Resuelto! 🔥',
  '¡Exacto! 💯',
  '¡Perfecto! 😎',
  '¡Genial! 🥳',
  '¡Listo! 💚',
  '¡Boom! 😊',
  '¡Ahí está! 🔥',
  '¡Ya está! 🌟',
  '¡Facilito! 💯'
];

const footers = [
  '¡Eres un crack! 🔥',
  '¡Sigue así! 💯',
  '¡Excelente! 🌟',
  '¡Bien hecho! 😎',
  '¡Aprobado! 🥳',
  '¡Dominado! 💚',
  '¡Pro total! 😊',
  '¡Imparable! 🔥',
  '¡Eres genial! 💯',
  '¡Matemático! 🌟'
];

const frasesDivertidas = [
  '¡Más fácil que pelar una banana! 🍌',
  '¡Pan comido! 🍞',
  '¡Súper sencillo! 🚀',
  '¡Pieza de pastel! 🍰',
  '¡Matemáticas nivel pro! 💪',
  '¡Así se hace! 👏',
  '¡Calculadora mental activada! 🧠',
  '¡Eres una máquina! 🤖',
  '¡Einstein estaría orgulloso! 🎓',
  '¡Mataste ese problema! 💥'
];

const simbolos = {
  '+': { texto: 'sumamos', emoji: '➕' },
  '-': { texto: 'restamos', emoji: '➖' },
  '*': { texto: 'multiplicamos', emoji: '✖️' },
  '/': { texto: 'dividimos', emoji: '➗' },
  '^': { texto: 'elevamos', emoji: '⚡' },
  '%': { texto: 'sacamos el', emoji: '📊' }
};

// ========== PARTE 2: DETECTORES ==========

const detectarOperacionMultiple = (msg) => {
  const patron = /(?:cuanto es |resuelve |calcula )?(-?\d+(?:\.\d+)?(?:\s*[+\-*/]\s*-?\d+(?:\.\d+)?)+)/i;
  const match = msg.match(patron);
  if (match) {
    const expresion = match[1].replace(/\s/g, '');
    return { expresion, tipo: 'multiple' };
  }
  return null;
};

const detectarSumaLista = (msg) => {
  const patron = /suma\s+(?:los\s+siguientes:?\s*)?(\d+(?:\s*[+]\s*\d+)+)/i;
  const match = msg.match(patron);
  if (match) {
    const numeros = match[1].match(/\d+/g).map(n => parseFloat(n));
    return { numeros, tipo: 'suma_lista' };
  }
  return null;
};

const detectarPromedio = (msg) => {
  const patron = /(?:promedio|media)\s+(?:de\s+)?(\d+(?:\s*,\s*\d+)+)/i;
  const match = msg.match(patron);
  if (match) {
    const numeros = match[1].match(/\d+/g).map(n => parseFloat(n));
    return { numeros, tipo: 'promedio' };
  }
  return null;
};

const detectarOperacionSimple = (msg) => {
  const patrones = [
    /(-?\d+(?:\.\d+)?)\s*([\+\-\*x\/])\s*(-?\d+(?:\.\d+)?)/i,
    /cuanto\s+es\s+(-?\d+(?:\.\d+)?)\s*([\+\-\*x\/])\s*(-?\d+(?:\.\d+)?)/i,
    /(-?\d+(?:\.\d+)?)\s*(más|mas|menos|por|entre|dividido)\s+(-?\d+(?:\.\d+)?)/i
  ];
  
  for (const patron of patrones) {
    const match = msg.match(patron);
    if (match) {
      let [, a, op, b] = match;
      const opMap = { 
        'más': '+', 'mas': '+', 'menos': '-', 
        'por': '*', 'x': '*', 'X': '*',
        'entre': '/', 'dividido': '/' 
      };
      op = opMap[op.toLowerCase()] || op;
      return { num1: parseFloat(a), op, num2: parseFloat(b), tipo: 'simple' };
    }
  }
  return null;
};

const detectarEcuacion = (msg) => {
  const patron = /(-?\d+)x\s*([+-])\s*(\d+)\s*=\s*(-?\d+)/;
  const match = msg.match(patron);
  if (match) {
    const [, a, op, b, result] = match;
    return { 
      coef: parseFloat(a), 
      op, 
      constante: parseFloat(b), 
      resultado: parseFloat(result),
      tipo: 'ecuacion'
    };
  }
  return null;
};

const detectarEcuacionCuadratica = (msg) => {
  const patron = /(-?\d+)x²\s*([+-])\s*(\d+)x\s*([+-])\s*(\d+)\s*=\s*0/;
  const match = msg.match(patron);
  if (match) {
    const [, a, op1, b, op2, c] = match;
    return {
      a: parseFloat(a),
      b: (op1 === '+' ? 1 : -1) * parseFloat(b),
      c: (op2 === '+' ? 1 : -1) * parseFloat(c),
      tipo: 'cuadratica'
    };
  }
  return null;
};

const detectarPorcentaje = (msg) => {
  const patron = /(\d+(?:\.\d+)?)%?\s*de\s*(\d+(?:\.\d+)?)/i;
  const match = msg.match(patron);
  if (match) {
    const [, percent, numero] = match;
    return { porcentaje: parseFloat(percent), numero: parseFloat(numero), tipo: 'porcentaje' };
  }
  return null;
};

const detectarPotencia = (msg) => {
  const patron = /(-?\d+(?:\.\d+)?)\s*(?:elevado\s+a|potencia|\^|²|³)\s*(-?\d+(?:\.\d+)?)?/i;
  const match = msg.match(patron);
  if (match) {
    const base = parseFloat(match[1]);
    let exponente;
    if (msg.includes('²')) exponente = 2;
    else if (msg.includes('³')) exponente = 3;
    else exponente = parseFloat(match[2]);
    return { base, exponente, tipo: 'potencia' };
  }
  return null;
};

const detectarRaiz = (msg) => {
  const patron = /(?:raíz|raiz)\s+(?:cuadrada\s+de\s+)?(\d+(?:\.\d+)?)|√(\d+(?:\.\d+)?)/i;
  const match = msg.match(patron);
  if (match) {
    return { numero: parseFloat(match[1] || match[2]), tipo: 'raiz' };
  }
  return null;
};

const detectarFactorial = (msg) => {
  const patron = /factorial\s+de\s+(\d+)|(\d+)!/i;
  const match = msg.match(patron);
  if (match) {
    return { numero: parseInt(match[1] || match[2]), tipo: 'factorial' };
  }
  return null;
};

// ========== PARTE 3: PROCESADORES ==========

const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

const calcularOperacionSimple = (num1, op, num2) => {
  let resultado;
  
  switch (op) {
    case '+': resultado = num1 + num2; break;
    case '-': resultado = num1 - num2; break;
    case '*': resultado = num1 * num2; break;
    case '/': 
      if (num2 === 0) return 'No puedo dividir entre cero 😅 Es como dividir pizza que no existe 🍕';
      resultado = num1 / num2;
      break;
    default: return null;
  }
  
  const esEntero = Number.isInteger(resultado);
  resultado = esEntero ? resultado : Math.round(resultado * 100) / 100;
  
  const { texto } = simbolos[op];
  const saludo = random(saludosMath);
  const celebra = random(celebraciones);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  return `${saludo} Si ${texto} ${num1} ${op} ${num2}, el resultado es ${resultado} ✅💯 ${celebra} ${footer} ${frase}`;
};

const calcularOperacionMultiple = (expresion) => {
  const saludo = random(saludosMath);
  
  try {
    const resultado = Function('"use strict"; return (' + expresion + ')')();
    const esEntero = Number.isInteger(resultado);
    const resultadoFinal = esEntero ? resultado : Math.round(resultado * 100) / 100;
    
    const celebra = random(celebraciones);
    const footer = random(footers);
    const frase = random(frasesDivertidas);
    
    return `${saludo} El resultado de ${expresion} = ${resultadoFinal} ✅💯 ${celebra} ${footer} ${frase}`;
    
  } catch (error) {
    return 'Ups, revisa la expresión 😅 Algo no cuadra ahí amigo 🔢';
  }
};

const calcularSumaLista = (numeros) => {
  const saludo = random(saludosMath);
  const suma = numeros.reduce((acc, n) => acc + n, 0);
  
  const celebra = random(celebraciones);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  return `${saludo} Si sumo todos (${numeros.join(' + ')}), el resultado es ${suma} ✅💯 ${celebra} ${footer} ${frase}`;
};

const calcularPromedio = (numeros) => {
  const saludo = random(saludosMath);
  const suma = numeros.reduce((acc, n) => acc + n, 0);
  const cantidad = numeros.length;
  const promedio = suma / cantidad;
  const esEntero = Number.isInteger(promedio);
  const promedioFinal = esEntero ? promedio : Math.round(promedio * 100) / 100;
  
  const celebra = random(celebraciones);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  return `${saludo} El promedio de (${numeros.join(', ')}) es ${promedioFinal} ✅💯 ${celebra} ${footer} ${frase}`;
};

const resolverEcuacion = (eq) => {
  const { coef, op, constante, resultado } = eq;
  const constanteReal = op === '+' ? constante : -constante;
  const paso1 = resultado - constanteReal;
  const x = paso1 / coef;
  
  const esEntero = Number.isInteger(x);
  const xFinal = esEntero ? x : Math.round(x * 100) / 100;
  
  const saludo = random(saludosMath);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  return `${saludo} Para ${coef}x ${op} ${constante} = ${resultado}, despejamos y x = ${xFinal} ✅💯 ${footer} ${frase}`;
};

const resolverEcuacionCuadratica = (eq) => {
  const { a, b, c } = eq;
  const saludo = random(saludosMath);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  const discriminante = b * b - 4 * a * c;
  
  if (discriminante < 0) {
    return `${saludo} Esta ecuación no tiene solución real 😅 El discriminante salió negativo amigo 🔢`;
  }
  
  const raizDiscriminante = Math.sqrt(discriminante);
  const x1 = (-b + raizDiscriminante) / (2 * a);
  const x2 = (-b - raizDiscriminante) / (2 * a);
  
  const x1Final = Number.isInteger(x1) ? x1 : Math.round(x1 * 100) / 100;
  const x2Final = Number.isInteger(x2) ? x2 : Math.round(x2 * 100) / 100;
  
  return `${saludo} Para ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0, las soluciones son x₁ = ${x1Final} y x₂ = ${x2Final} ✅💯 ${footer} ${frase}`;
};

const calcularPorcentaje = (datos) => {
  const { porcentaje, numero } = datos;
  const resultado = (porcentaje * numero) / 100;
  const esEntero = Number.isInteger(resultado);
  const resultadoFinal = esEntero ? resultado : Math.round(resultado * 100) / 100;
  
  const saludo = random(saludosMath);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  return `${saludo} El ${porcentaje}% de ${numero} es ${resultadoFinal} ✅💯 ${footer} ${frase}`;
};

const calcularPotencia = (datos) => {
  const { base, exponente } = datos;
  const resultado = Math.pow(base, exponente);
  
  const saludo = random(saludosMath);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  return `${saludo} Si elevamos ${base} a la ${exponente}, el resultado es ${resultado} ✅💯 ${footer} ${frase}`;
};

const calcularRaiz = (datos) => {
  const { numero } = datos;
  const resultado = Math.sqrt(numero);
  const esExacta = Number.isInteger(resultado);
  const resultadoFinal = esExacta ? resultado : Math.round(resultado * 100) / 100;
  
  const saludo = random(saludosMath);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  return `${saludo} La raíz cuadrada de ${numero} es ${resultadoFinal}${esExacta ? '' : ' (aprox)'} ✅💯 ${footer} ${frase}`;
};

const calcularFactorial = (datos) => {
  const { numero } = datos;
  const saludo = random(saludosMath);
  const footer = random(footers);
  const frase = random(frasesDivertidas);
  
  if (numero < 0) return 'Los factoriales no existen para negativos amigo 😅';
  if (numero > 20) return 'Número muy grande 😎 Intenta con algo menor a 20 porfa';
  
  let resultado = 1;
  for (let i = numero; i > 1; i--) {
    resultado *= i;
  }
  
  return `${saludo} El factorial de ${numero}! es ${resultado} ✅💯 ${footer} ${frase}`;
};

// ========== PARTE 4: GENERADOR PRINCIPAL ==========
export const generate = (userMessage) => {
  const msg = userMessage.trim();
  
  if (!/\d/.test(msg)) return null;
  
  const cuadratica = detectarEcuacionCuadratica(msg);
  if (cuadratica) return resolverEcuacionCuadratica(cuadratica);
  
  const ecuacion = detectarEcuacion(msg);
  if (ecuacion) return resolverEcuacion(ecuacion);
  
  const factorial = detectarFactorial(msg);
  if (factorial) return calcularFactorial(factorial);
  
  const porcentaje = detectarPorcentaje(msg);
  if (porcentaje) return calcularPorcentaje(porcentaje);
  
  const potencia = detectarPotencia(msg);
  if (potencia) return calcularPotencia(potencia);
  
  const raiz = detectarRaiz(msg);
  if (raiz) return calcularRaiz(raiz);
  
  const promedio = detectarPromedio(msg);
  if (promedio) return calcularPromedio(promedio);
  
  const sumaLista = detectarSumaLista(msg);
  if (sumaLista) return calcularSumaLista(sumaLista);
  
  const multiple = detectarOperacionMultiple(msg);
  if (multiple) return calcularOperacionMultiple(multiple.expresion);
  
  const simple = detectarOperacionSimple(msg);
  if (simple) return calcularOperacionSimple(simple.num1, simple.op, simple.num2);
  
  return null;
};