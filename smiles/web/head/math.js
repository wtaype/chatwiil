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

    return `📊 **Resolución paso a paso:**\n\n` +
           `**Ecuación:** ${a}x ${op} ${b} = ${result}\n\n` +
           `**Paso 1:** Despejar x moviendo ${b}:\n` +
           `${a}x = ${result} ${op === '+' ? '-' : '+'} ${Math.abs(num_b)}\n` +
           `${a}x = ${step1}\n\n` +
           `**Paso 2:** Dividir entre ${a}:\n` +
           `x = ${step1} ÷ ${a}\n` +
           `**x = ${x}** ✅\n\n` +
           `🔍 *Verificación:* ${a}(${x}) ${op} ${b} = ${num_a * x + num_b} = ${result} ✓`;
  }

  // ========== PORCENTAJES ==========
  if (/porcentaje|%/.test(msg)) {
    const percentMatch = msg.match(/(\d+)%\s*de\s*(\d+)/);
    if (percentMatch) {
      const [_, percent, number] = percentMatch;
      const result = (parseInt(percent) * parseInt(number)) / 100;
      return `📊 **Cálculo de porcentaje:**\n\n` +
             `${percent}% de ${number} = (${percent} × ${number}) ÷ 100\n` +
             `= ${parseInt(percent) * parseInt(number)} ÷ 100\n` +
             `= **${result}** ✅`;
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

    switch(op) {
      case '+': result = num_a + num_b; symbol = '+'; break;
      case '-': result = num_a - num_b; symbol = '-'; break;
      case '*': result = num_a * num_b; symbol = '×'; break;
      case '/': result = num_a / num_b; symbol = '÷'; break;
    }

    return `🔢 **Resultado:**\n\n${a} ${symbol} ${b} = **${result}** ✅`;
  }

  // ========== ÁREA Y PERÍMETRO ==========
  if (/área|perímetro|cuadrado|rectángulo|círculo/.test(msg)) {
    const squareMatch = msg.match(/cuadrado.*?(\d+)/);
    if (squareMatch) {
      const lado = parseInt(squareMatch[1]);
      return `📐 **Cuadrado de lado ${lado}:**\n\n` +
             `• Área = lado² = ${lado}² = **${lado * lado}** unidades²\n` +
             `• Perímetro = 4 × lado = 4 × ${lado} = **${4 * lado}** unidades`;
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
    porcentaje: 'Fracción de 100 (x/100)'
  }
};