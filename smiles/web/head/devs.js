// 💻 GENERAR RESPUESTA DE PROGRAMACIÓN
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();

  // ========== JAVASCRIPT ==========
  if (/javascript|js|función|arrow function|const|let|var/i.test(msg)) {
    if (/función|function/i.test(msg)) {
      return `💻 **Funciones en JavaScript:**\n\n` +
             `\`\`\`javascript\n` +
             `// Función tradicional\n` +
             `function saludar(nombre) {\n` +
             `  return \`Hola \${nombre}\`;\n` +
             `}\n\n` +
             `// Arrow function (moderna)\n` +
             `const saludar = (nombre) => \`Hola \${nombre}\`;\n` +
             `\`\`\`\n\n` +
             `💡 Las arrow functions son más concisas y no tienen su propio \`this\`.`;
    }

    if (/array|map|filter|reduce/i.test(msg)) {
      return `💻 **Métodos de Array en JavaScript:**\n\n` +
             `\`\`\`javascript\n` +
             `const numeros = [1, 2, 3, 4, 5];\n\n` +
             `// map: transforma cada elemento\n` +
             `const dobles = numeros.map(n => n * 2); // [2,4,6,8,10]\n\n` +
             `// filter: filtra elementos\n` +
             `const pares = numeros.filter(n => n % 2 === 0); // [2,4]\n\n` +
             `// reduce: reduce a un valor\n` +
             `const suma = numeros.reduce((acc, n) => acc + n, 0); // 15\n` +
             `\`\`\`\n\n` +
             `💡 Estos métodos son fundamentales para programación funcional.`;
    }
  }

  // ========== HTML/CSS ==========
  if (/html|css|div|flex|grid/i.test(msg)) {
    if (/flexbox|flex/i.test(msg)) {
      return `💻 **Flexbox en CSS:**\n\n` +
             `\`\`\`css\n` +
             `.container {\n` +
             `  display: flex;\n` +
             `  justify-content: center; /* horizontal */\n` +
             `  align-items: center;     /* vertical */\n` +
             `  gap: 1rem;               /* espacio entre items */\n` +
             `}\n` +
             `\`\`\`\n\n` +
             `💡 Flexbox es perfecto para layouts en una dimensión (fila o columna).`;
    }
  }

  // ========== PYTHON ==========
  if (/python|py|def|print|import/i.test(msg)) {
    return `💻 **Python Básico:**\n\n` +
           `\`\`\`python\n` +
           `# Función\n` +
           `def saludar(nombre):\n` +
           `    return f"Hola {nombre}"\n\n` +
           `# Lista comprehension\n` +
           `numeros = [1, 2, 3, 4, 5]\n` +
           `cuadrados = [n**2 for n in numeros]\n` +
           `print(cuadrados)  # [1, 4, 9, 16, 25]\n` +
           `\`\`\`\n\n` +
           `💡 Python es conocido por su sintaxis clara y legible.`;
  }

  // ========== DEBUGGING ==========
  if (/error|bug|no funciona|fallo/i.test(msg)) {
    return `🐛 **Tips para Debugging:**\n\n` +
           `1️⃣ **Lee el mensaje de error** completo\n` +
           `2️⃣ **Usa console.log()** para ver valores\n` +
           `3️⃣ **Revisa la sintaxis** (paréntesis, comas, puntos)\n` +
           `4️⃣ **Busca en Google** el error exacto\n` +
           `5️⃣ **Toma un descanso** y vuelve con mente fresca\n\n` +
           `💡 "El debugging es como ser detective en una película donde tú eres el asesino."`;
  }

  // ========== CONSEJOS GENERALES ==========
  if (/programar|código|desarrollador|developer/i.test(msg)) {
    return `💻 **Consejos para programadores:**\n\n` +
           `🎯 **Aprende los fundamentos** antes de frameworks\n` +
           `📖 **Lee código de otros** en GitHub\n` +
           `🏗️ **Construye proyectos** personales\n` +
           `🐛 **Los errores son tus maestros**, no tus enemigos\n` +
           `🤝 **Colabora** en proyectos open source\n\n` +
           `💡 "El código es poesía escrita para máquinas, pero leída por humanos."`;
  }

  return null;
};