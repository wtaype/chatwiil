// 🎉 FRASES MOTIVADORAS MATEMÁTICAS
const frasesMotivadoras = [
  '¡Genial! 🎯 Las matemáticas son divertidas',
  '¡Excelente pregunta! 🌟 Aquí va la respuesta',
  '¡Me encanta resolver esto! 🚀 Vamos allá',
  '¡Qué emoción! 💡 Resolvamos esto juntos',
  '¡Perfecto! 🎨 Las mates son arte',
  '¡Súper! ⭐ Te va a encantar esto'
];

// 🎊 CELEBRACIONES DE RESULTADOS
const celebraciones = [
  '¡Boom! 💥 Ahí está la respuesta',
  '¡Tachán! ✨ Resuelto',
  '¡Voilà! 🎭 Problema solucionado',
  '¡Eureka! 🎉 Lo logramos',
  '¡Bingo! 🎯 Ahí lo tienes',
  '¡Fantástico! 🌟 Resultado final'
];

const getRandomPhrase = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // ========== ECUACIONES LINEALES ==========
  const eqMatch = msg.match(/(\d+)x\s*([+-])\s*(\d+)\s*=\s*(\d+)/);
  if (eqMatch) {
    const [_, a, op, b, result] = eqMatch;
    const num_a = parseInt(a);
    const num_b = op === '+' ? parseInt(b) : -parseInt(b);
    const num_result = parseInt(result);
    const step1 = num_result - num_b;
    const x = step1 / num_a;

    return `${getRandomPhrase(frasesMotivadoras)} 😊<br><br>` +
           `📊 <strong>Resolución paso a paso:</strong><br><br>` +
           `<strong>Ecuación:</strong> ${a}x ${op} ${b} = ${result}<br><br>` +
           `<strong>Paso 1:</strong> Despejar x moviendo el ${Math.abs(num_b)} 🔄<br>` +
           `${a}x = ${result} ${op === '+' ? '-' : '+'} ${Math.abs(num_b)}<br>` +
           `${a}x = ${step1}<br><br>` +
           `<strong>Paso 2:</strong> Dividir ambos lados entre ${a} ➗<br>` +
           `x = ${step1} ÷ ${a}<br><br>` +
           `${getRandomPhrase(celebraciones)} 🎊<br>` +
           `<span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">✅ x = ${x}</span><br><br>` +
           `<em>🔍 Verificación: ${a}(${x}) ${op} ${b} = ${num_a * x + num_b} = ${result} ✓</em> 😄`;
  }

  // ========== PORCENTAJES ==========
  if (/porcentaje|%/.test(msg)) {
    const percentMatch = msg.match(/(\d+)%\s*de\s*(\d+)/);
    if (percentMatch) {
      const [_, percent, number] = percentMatch;
      const result = (parseInt(percent) * parseInt(number)) / 100;
      return `${getRandomPhrase(frasesMotivadoras)} 📈<br><br>` +
             `📊 <strong>Cálculo de porcentaje:</strong><br><br>` +
             `${percent}% de ${number} = (${percent} × ${number}) ÷ 100 🧮<br>` +
             `= ${parseInt(percent) * parseInt(number)} ÷ 100<br><br>` +
             `${getRandomPhrase(celebraciones)} 🎉<br>` +
             `<span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">✅ Resultado: ${result}</span> 😊`;
    }
  }

  // ========== OPERACIONES BÁSICAS ==========
  const opMatch = msg.match(/(\d+)\s*([+\-*/])\s*(\d+)/);
  if (opMatch) {
    const [_, a, op, b] = opMatch;
    const num_a = parseFloat(a);
    const num_b = parseFloat(b);
    let result;
    let symbol;
    let emoji;

    switch(op) {
      case '+': result = num_a + num_b; symbol = '+'; emoji = '➕'; break;
      case '-': result = num_a - num_b; symbol = '-'; emoji = '➖'; break;
      case '*': result = num_a * num_b; symbol = '×'; emoji = '✖️'; break;
      case '/': result = num_a / num_b; symbol = '÷'; emoji = '➗'; break;
    }

    return `${getRandomPhrase(frasesMotivadoras)} ${emoji}<br><br>` +
           `🔢 <strong>Operación:</strong><br><br>` +
           `${a} ${symbol} ${b} = <span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">${result}</span> ✅ 😄`;
  }

  // ========== ÁREA Y PERÍMETRO ==========
  if (/área|perímetro|cuadrado|rectángulo|círculo/.test(msg)) {
    const squareMatch = msg.match(/cuadrado.*?(\d+)/);
    if (squareMatch) {
      const lado = parseInt(squareMatch[1]);
      return `¡Me encantan las figuras geométricas! 📐😊<br><br>` +
             `<strong>Cuadrado de lado ${lado}:</strong><br><br>` +
             `• <strong>Área</strong> = lado² = ${lado}² = <span style="color: #2196f3; font-weight: bold;">${lado * lado}</span> unidades² 🟦<br>` +
             `• <strong>Perímetro</strong> = 4 × lado = 4 × ${lado} = <span style="color: #2196f3; font-weight: bold;">${4 * lado}</span> unidades 📏<br><br>` +
             `¡Facilísimo! 🎉😄`;
    }
  }

  // ========== RAÍZ CUADRADA ==========
  if (/raíz cuadrada|√/.test(msg)) {
    const sqrtMatch = msg.match(/raíz cuadrada de (\d+)|√(\d+)/);
    if (sqrtMatch) {
      const num = parseInt(sqrtMatch[1] || sqrtMatch[2]);
      const result = Math.sqrt(num);
      const isExact = Number.isInteger(result);
      
      return `${getRandomPhrase(frasesMotivadoras)} 🌱<br><br>` +
             `🔢 <strong>Raíz cuadrada:</strong><br><br>` +
             `√${num} = <span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">${result.toFixed(2)}</span> ${isExact ? '✅ ¡Exacto!' : '<em>(aproximado)</em>'} 😊`;
    }
  }

  // ========== POTENCIAS ==========
  if (/elevado|potencia|\^/.test(msg)) {
    const powerMatch = msg.match(/(\d+)\s*(?:elevado a|potencia|\^)\s*(\d+)/);
    if (powerMatch) {
      const [_, base, exp] = powerMatch;
      const result = Math.pow(parseInt(base), parseInt(exp));
      
      return `¡Las potencias son poderosas! 💪⚡<br><br>` +
             `🔢 <strong>Potencia:</strong><br><br>` +
             `${base}<sup>${exp}</sup> = <span style="color: #4caf50; font-size: 1.3em; font-weight: bold;">${result}</span> ✅<br><br>` +
             `${getRandomPhrase(celebraciones)} 🎊😄`;
    }
  }

  // ========== TABLAS DE MULTIPLICAR ==========
  if (/tabla de multiplicar|tabla del/i.test(msg)) {
    const tableMatch = msg.match(/tabla del? (\d+)/i);
    if (tableMatch) {
      const num = parseInt(tableMatch[1]);
      let tabla = `¡La tabla del ${num}! 📚 ¡Vamos a aprenderla! 😊<br><br>`;
      tabla += `🔢 <strong>Tabla de multiplicar del ${num}:</strong><br><br>`;
      
      for (let i = 1; i <= 10; i++) {
        tabla += `${num} × ${i} = <strong style="color: #2196f3;">${num * i}</strong> ${i === 5 ? '🌟' : ''}<br>`;
      }
      
      tabla += `<br>¡Practica y serás un experto! 🚀😄`;
      return tabla;
    }
  }

  // ========== NÚMEROS PRIMOS ==========
  if (/primo|primos/.test(msg)) {
    const numMatch = msg.match(/(\d+)\s+es primo/);
    if (numMatch) {
      const num = parseInt(numMatch[1]);
      const isPrime = (n) => {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
        for (let i = 5; i * i <= n; i += 6) {
          if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
      };
      
      const resultado = isPrime(num);
      return `🔍 Analizando si ${num} es primo...<br><br>` +
             `${resultado 
               ? `¡Sí! 🎉 <strong style="color: #4caf50;">${num} ES un número primo</strong> 😊<br><br>Solo es divisible por 1 y por sí mismo 🌟` 
               : `No 😔 <strong style="color: #f44336;">${num} NO es primo</strong><br><br>Es divisible por otros números además de 1 y ${num} 🔢`}`;
    }
  }

  return null; // No es problema matemático
};

// 🎓 Base de conocimiento matemático
export const knowledge = {
  formulas: {
    cuadrado: { area: 'lado²', perimetro: '4 × lado' },
    rectangulo: { area: 'base × altura', perimetro: '2(base + altura)' },
    circulo: { area: 'π × radio²', perimetro: '2π × radio' },
    triangulo: { area: '(base × altura) / 2' }
  },
  conceptos: {
    ecuacion: 'Igualdad matemática con incógnitas',
    fraccion: 'Parte de un todo (numerador/denominador)',
    porcentaje: 'Fracción de 100 (x/100)',
    primo: 'Número solo divisible por 1 y por sí mismo'
  }
};