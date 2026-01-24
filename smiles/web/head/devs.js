// ========== PARTE 1: LENGUAJES DE PROGRAMACIÓN ==========
const lenguajes = {
  javascript: {
    patron: /javascript|js|ecmascript|node|nodejs/i,
    info: '💻 JavaScript es el lenguaje de la web. Usado en frontend (React, Vue, Angular) y backend (Node.js).',
    ejemplos: [
      'Ejemplo de variables:\n```javascript\nlet nombre = "Juan";\nconst edad = 25;\nvar ciudad = "Lima";\n```',
      'Ejemplo de funciones:\n```javascript\nfunction saludar(nombre) {\n  return `Hola ${nombre}!`;\n}\n```',
      'Ejemplo de arrow functions:\n```javascript\nconst sumar = (a, b) => a + b;\nconsole.log(sumar(5, 3));\n```'
    ]
  },
  python: {
    patron: /python|py|django|flask|fastapi/i,
    info: '🐍 Python es perfecto para IA, ciencia de datos, backend y automatización.',
    ejemplos: [
      'Ejemplo de variables:\n```python\nnombre = "Juan"\nedad = 25\nciudad = "Lima"\n```',
      'Ejemplo de funciones:\n```python\ndef saludar(nombre):\n    return f"Hola {nombre}!"\n```',
      'Ejemplo de listas:\n```python\nfrutas = ["manzana", "pera", "uva"]\nfor fruta in frutas:\n    print(fruta)\n```'
    ]
  },
  css: {
    patron: /css|estilos?|dise[ñn]o web|flexbox|grid/i,
    info: '🎨 CSS hace que tu web se vea increíble con colores, layouts y animaciones.',
    ejemplos: [
      'Flexbox para centrar:\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n```',
      'Grid layout:\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n```',
      'Animación simple:\n```css\n.box {\n  animation: fadeIn 1s ease-in;\n}\n@keyframes fadeIn {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n```'
    ]
  },
  html: {
    patron: /html|etiquetas?|estructura|markup/i,
    info: '📄 HTML es la estructura base de cualquier página web.',
    ejemplos: [
      'Estructura básica:\n```html\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Mi Página</title>\n</head>\n<body>\n  <h1>Hola Mundo</h1>\n</body>\n</html>\n```',
      'Formulario:\n```html\n<form>\n  <input type="text" placeholder="Nombre">\n  <button type="submit">Enviar</button>\n</form>\n```'
    ]
  },
  java: {
    patron: /java(?!script)|spring|android/i,
    info: '☕ Java es robusto, usado en empresas grandes y desarrollo Android.',
    ejemplos: [
      'Clase básica:\n```java\npublic class Persona {\n  private String nombre;\n  public Persona(String nombre) {\n    this.nombre = nombre;\n  }\n}\n```'
    ]
  },
  csharp: {
    patron: /c#|csharp|\.net|unity/i,
    info: '🎮 C# es usado en desarrollo de juegos (Unity) y aplicaciones empresariales (.NET).',
    ejemplos: [
      'Clase básica:\n```csharp\npublic class Persona {\n  public string Nombre { get; set; }\n  public int Edad { get; set; }\n}\n```'
    ]
  },
  php: {
    patron: /php|laravel|wordpress/i,
    info: '🐘 PHP domina el backend web, usado en WordPress, Laravel y muchos CMS.',
    ejemplos: [
      'Variables y funciones:\n```php\n<?php\n$nombre = "Juan";\nfunction saludar($nombre) {\n  return "Hola $nombre!";\n}\necho saludar($nombre);\n?>\n```'
    ]
  },
  sql: {
    patron: /sql|mysql|postgres|base de datos/i,
    info: '🗄️ SQL es el lenguaje para manejar bases de datos relacionales.',
    ejemplos: [
      'Consultas básicas:\n```sql\nSELECT * FROM usuarios WHERE edad > 18;\nINSERT INTO usuarios (nombre, edad) VALUES (\'Juan\', 25);\n```'
    ]
  },
  typescript: {
    patron: /typescript|ts/i,
    info: '📘 TypeScript es JavaScript con tipos estáticos. Detecta errores antes de ejecutar.',
    ejemplos: [
      'Tipos básicos:\n```typescript\nlet nombre: string = "Ana";\nlet edad: number = 25;\nlet activo: boolean = true;\n```',
      'Interfaces:\n```typescript\ninterface Persona {\n  nombre: string;\n  edad: number;\n}\nconst usuario: Persona = { nombre: "Juan", edad: 30 };\n```'
    ]
  },
  go: {
    patron: /golang|go lang/i,
    info: '🔷 Go es rápido, simple y perfecto para microservicios y sistemas concurrentes.',
    ejemplos: [
      'Función básica:\n```go\npackage main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hola Mundo")\n}\n```'
    ]
  },
  rust: {
    patron: /rust/i,
    info: '🦀 Rust es ultra rápido y seguro. Ideal para sistemas de bajo nivel sin garbage collector.',
    ejemplos: [
      'Variables y tipos:\n```rust\nfn main() {\n  let nombre = "Ana";\n  let edad: i32 = 25;\n  println!("Hola {}", nombre);\n}\n```'
    ]
  }
};

// ========== PARTE 2: CONCEPTOS DE PROGRAMACIÓN ==========
const conceptos = {
  variable: {
    patron: /variables?|var|let|const/i,
    explicacion: '📦 Variable: Contenedor que almacena datos.',
    ejemplo: '```javascript\nlet nombre = "Ana";\nconst PI = 3.1416;\nvar edad = 25;\n```',
    tips: '💡 Usa const por defecto, let solo si necesitas cambiar el valor. Evita var.'
  },
  funcion: {
    patron: /funci[oó]n|function|arrow|m[eé]todo/i,
    explicacion: '⚙️ Función: Bloque de código reutilizable que realiza una tarea específica.',
    ejemplo: '```javascript\nfunction sumar(a, b) {\n  return a + b;\n}\nconst restar = (a, b) => a - b;\n```',
    tips: '💡 Las funciones evitan repetir código. Usa arrow functions para funciones cortas.'
  },
  array: {
    patron: /array|arreglo|lista|vector/i,
    explicacion: '📚 Array: Lista ordenada de elementos del mismo o diferente tipo.',
    ejemplo: '```javascript\nconst frutas = ["manzana", "pera", "uva"];\nconsole.log(frutas[0]);\nfrutas.push("naranja");\nfrutas.pop();\nfrutas.map(f => f.toUpperCase());\n```',
    tips: '💡 Los arrays empiezan en índice 0. Métodos útiles: push, pop, map, filter, reduce.'
  },
  objeto: {
    patron: /objeto|object|json|diccionario/i,
    explicacion: '🎁 Objeto: Colección de propiedades con pares clave-valor.',
    ejemplo: '```javascript\nconst persona = {\n  nombre: "Ana",\n  edad: 25,\n  saludar() {\n    return `Hola, soy ${this.nombre}`;\n  }\n};\nconsole.log(persona.nombre);\nconsole.log(persona["edad"]);\n```',
    tips: '💡 Los objetos son fundamentales en JavaScript. Usa notación punto o corchetes para acceder.'
  },
  loop: {
    patron: /bucle|loop|ciclo|for|while/i,
    explicacion: '🔄 Bucle: Ejecuta código repetidamente mientras se cumpla una condición.',
    ejemplo: '```javascript\nfor (let i = 0; i < 5; i++) {\n  console.log(i);\n}\nfor (const fruta of frutas) {\n  console.log(fruta);\n}\nlet contador = 0;\nwhile (contador < 5) {\n  console.log(contador);\n  contador++;\n}\n```',
    tips: '💡 Usa for para iteraciones conocidas, while para condiciones dinámicas. Evita bucles infinitos.'
  },
  condicional: {
    patron: /condicional|if|else|switch|ternario/i,
    explicacion: '❓ Condicional: Ejecuta código diferente según se cumpla o no una condición.',
    ejemplo: '```javascript\nif (edad >= 18) {\n  console.log("Mayor de edad");\n} else {\n  console.log("Menor de edad");\n}\nconst mensaje = edad >= 18 ? "Mayor" : "Menor";\nswitch (dia) {\n  case "lunes":\n    console.log("Inicio");\n    break;\n  default:\n    console.log("Otro día");\n}\n```',
    tips: '💡 Usa ternarios para condiciones simples, if-else para complejas, switch para múltiples casos.'
  },
  async: {
    patron: /async|await|promesa|promise|as[ií]ncrono/i,
    explicacion: '⏳ Async Await: Maneja operaciones asíncronas de forma más legible que promesas.',
    ejemplo: '```javascript\nfetch("https://api.com/datos")\n  .then(res => res.json())\n  .then(data => console.log(data))\n  .catch(err => console.error(err));\nasync function obtenerDatos() {\n  try {\n    const res = await fetch("https://api.com/datos");\n    const data = await res.json();\n    console.log(data);\n  } catch (err) {\n    console.error(err);\n  }\n}\n```',
    tips: '💡 Async await hace el código asíncrono más fácil de leer. Siempre usa try-catch.'
  },
  clase: {
    patron: /clase|class|poo|orientado a objetos/i,
    explicacion: '🏗️ Clase: Plantilla para crear objetos con propiedades y métodos compartidos.',
    ejemplo: '```javascript\nclass Persona {\n  constructor(nombre, edad) {\n    this.nombre = nombre;\n    this.edad = edad;\n  }\n  saludar() {\n    return `Hola, soy ${this.nombre}`;\n  }\n}\nconst ana = new Persona("Ana", 25);\nconsole.log(ana.saludar());\n```',
    tips: '💡 Las clases organizan código relacionado. Usa constructor para inicializar propiedades.'
  },
  api: {
    patron: /api|rest|endpoint|fetch/i,
    explicacion: '🌐 API: Interfaz que permite comunicación entre diferentes aplicaciones o servicios.',
    ejemplo: '```javascript\nasync function obtenerUsuarios() {\n  const res = await fetch("https://api.com/usuarios");\n  const usuarios = await res.json();\n  return usuarios;\n}\nasync function crearUsuario(datos) {\n  const res = await fetch("https://api.com/usuarios", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(datos)\n  });\n  return await res.json();\n}\n```',
    tips: '💡 APIs REST: GET para leer, POST para crear, PUT para actualizar, DELETE para eliminar.'
  },
  git: {
    patron: /git|github|control de versiones|commit/i,
    explicacion: '🔀 Git: Sistema de control de versiones para rastrear cambios en el código.',
    ejemplo: '```bash\ngit init\ngit add .\ngit commit -m "Mensaje descriptivo"\ngit push origin main\ngit pull\ngit branch nueva-rama\ngit checkout nueva-rama\ngit merge rama-a-fusionar\n```',
    tips: '💡 Haz commits pequeños y frecuentes. Usa mensajes descriptivos. Crea ramas para nuevas features.'
  },
  scope: {
    patron: /scope|alcance|[aá]mbito/i,
    explicacion: '🎯 Scope: Alcance donde una variable es accesible.',
    ejemplo: '```javascript\nlet global = "accesible en todo el código";\nfunction ejemplo() {\n  let local = "solo accesible aquí";\n  console.log(global);\n  console.log(local);\n}\nconsole.log(global);\nconsole.log(local);\n```',
    tips: '💡 Variables con let y const tienen scope de bloque. Var tiene scope de función (evítalo).'
  },
  callback: {
    patron: /callback|funci[oó]n de retorno/i,
    explicacion: '🔄 Callback: Función que se pasa como argumento a otra función.',
    ejemplo: '```javascript\nfunction procesar(arr, callback) {\n  return arr.map(callback);\n}\nconst numeros = [1, 2, 3];\nconst dobles = procesar(numeros, n => n * 2);\nconsole.log(dobles);\n```',
    tips: '💡 Los callbacks son fundamentales en JavaScript. Se usan en eventos, arrays, promesas.'
  },
  destructuring: {
    patron: /destructur|desestructur/i,
    explicacion: '📦 Destructuring: Extraer valores de arrays u objetos en variables separadas.',
    ejemplo: '```javascript\nconst persona = { nombre: "Ana", edad: 25 };\nconst { nombre, edad } = persona;\nconst frutas = ["manzana", "pera"];\nconst [primera, segunda] = frutas;\n```',
    tips: '💡 Destructuring hace el código más limpio y legible. Muy usado en React y frameworks modernos.'
  },
  spread: {
    patron: /spread|operador de propagaci[oó]n/i,
    explicacion: '📢 Spread: Expande elementos de un array u objeto.',
    ejemplo: '```javascript\nconst arr1 = [1, 2];\nconst arr2 = [...arr1, 3, 4];\nconst obj1 = { a: 1 };\nconst obj2 = { ...obj1, b: 2 };\nfunction sumar(a, b, c) {\n  return a + b + c;\n}\nconst nums = [1, 2, 3];\nsumar(...nums);\n```',
    tips: '💡 Spread copia arrays y objetos sin mutar el original. Muy útil en React.'
  }
};

// ========== PARTE 3: FRAMEWORKS Y HERRAMIENTAS ==========
const herramientas = {
  react: {
    patron: /react|jsx|hooks/i,
    respuesta: '⚛️ React: Biblioteca de JavaScript para construir interfaces de usuario con componentes reutilizables.\nEjemplo de componente:\n```jsx\nfunction Saludo({ nombre }) {\n  return <h1>Hola {nombre}!</h1>;\n}\n```\nEjemplo con hooks:\n```jsx\nimport { useState } from "react";\nfunction Contador() {\n  const [count, setCount] = useState(0);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicks: {count}\n    </button>\n  );\n}\n```\n💡 React usa JSX para mezclar JavaScript y HTML. Los hooks manejan estado y efectos.'
  },
  vue: {
    patron: /vue|vuejs/i,
    respuesta: '💚 Vue: Framework progresivo para construir interfaces de usuario.\nEjemplo:\n```vue\n<template>\n  <div>\n    <h1>{{ mensaje }}</h1>\n    <button @click="contador++">Clicks: {{ contador }}</button>\n  </div>\n</template>\n<script>\nexport default {\n  data() {\n    return {\n      mensaje: "Hola Vue",\n      contador: 0\n    }\n  }\n}\n</script>\n```\n💡 Vue es fácil de aprender, flexible y tiene excelente documentación.'
  },
  node: {
    patron: /node|nodejs|express|backend/i,
    respuesta: '🟢 Node.js: JavaScript en el backend para crear servidores y APIs.\nEjemplo con Express:\n```javascript\nconst express = require("express");\nconst app = express();\napp.get("/", (req, res) => {\n  res.send("Hola desde el servidor!");\n});\napp.listen(3000, () => {\n  console.log("Servidor en puerto 3000");\n});\n```\n💡 Node permite usar JavaScript en frontend y backend. Express simplifica crear APIs.'
  },
  tailwind: {
    patron: /tailwind|utility.*css/i,
    respuesta: '🎨 Tailwind CSS: Framework CSS con clases de utilidad para estilar rápidamente.\nComparación:\n```html\n<style>\n  .btn { padding: 10px 20px; background: blue; color: white; }\n</style>\n<button class="btn">Click</button>\n```\nCon Tailwind:\n```html\n<button class="px-5 py-2 bg-blue-500 text-white rounded">\n  Click\n</button>\n```\n💡 Tailwind acelera el desarrollo. No necesitas escribir CSS personalizado.'
  },
  vite: {
    patron: /vite/i,
    respuesta: '⚡ Vite: Build tool ultra rápido para proyectos frontend modernos.\nCrear proyecto:\n```bash\nnpm create vite@latest mi-proyecto\ncd mi-proyecto\nnpm install\nnpm run dev\n```\n💡 Vite es mucho más rápido que Webpack. Ideal para React, Vue, Svelte.'
  },
  docker: {
    patron: /docker|contenedor/i,
    respuesta: '🐳 Docker: Plataforma para empaquetar aplicaciones en contenedores portables.\nDockerfile básico:\n```dockerfile\nFROM node:18\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]\n```\nComandos:\n```bash\ndocker build -t mi-app .\ndocker run -p 3000:3000 mi-app\n```\n💡 Docker garantiza que tu app funcione igual en cualquier máquina.'
  }
};

// ========== PARTE 4: BUENAS PRÁCTICAS ==========
const practicas = {
  patron: /buenas pr[aá]cticas|clean code|c[oó]digo limpio/i,
  respuestas: [
    '✅ Buenas Prácticas de Programación:\n1. Nombres descriptivos: getUserById() mejor que get()\n2. Funciones pequeñas: Una función hace una sola cosa\n3. DRY: No repitas código (Don\'t Repeat Yourself)\n4. Comentarios útiles: Explica el por qué, no el qué\n5. Manejo de errores: Siempre usa try catch\n6. Consistencia: Usa el mismo estilo en todo el proyecto\n7. Testing: Escribe pruebas para tu código\n8. Refactoriza: Mejora el código sin cambiar funcionalidad',
    
    '✅ Principios SOLID:\nS - Single Responsibility: Una clase, una responsabilidad\nO - Open Closed: Abierto a extensión, cerrado a modificación\nL - Liskov Substitution: Las subclases deben ser sustituibles\nI - Interface Segregation: Interfaces específicas, no generales\nD - Dependency Inversion: Depende de abstracciones, no implementaciones\n💡 SOLID hace tu código más mantenible y escalable.',
    
    '✅ Seguridad en Código:\n1. Valida inputs: Nunca confíes en datos del usuario\n2. Sanitiza datos: Previene inyección SQL y XSS\n3. Usa HTTPS: Siempre en producción\n4. Variables de entorno: No hardcodees claves API\n5. Actualiza dependencias: Mantén paquetes al día\n6. Principio de menor privilegio: Da solo permisos necesarios\n7. Hash passwords: Usa bcrypt, nunca guardes en texto plano\n8. Autenticación JWT: Para APIs usa tokens seguros'
  ]
};

// ========== PARTE 5: DEBUGGING ==========
const debugging = {
  patron: /debug|error|bug|fallo|no funciona/i,
  respuestas: [
    '🐛 Guía de Debugging:\n1. Lee el error completo: Los mensajes dicen mucho\n2. Console.log: Tu mejor amigo para ver valores\n3. Breakpoints: Pausa ejecución y revisa paso a paso\n4. Divide y conquista: Comenta código para aislar\n5. Google el error: Busca el mensaje exacto\n6. Stack Overflow: Alguien ya tuvo tu error\n7. Revisa línea indicada: El error suele estar cerca\n8. Prueba en navegador: DevTools es tu aliado',
    
    '🔍 Errores Comunes JavaScript:\nUndefined no es una función:\n```javascript\nconst obj = {};\nif (obj.metodo) obj.metodo();\n```\nCannot read property of undefined:\n```javascript\nconst usuario = null;\nconsole.log(usuario?.nombre);\n```\nPromise no capturada:\n```javascript\nasync function getData() {\n  try {\n    const res = await fetch(url);\n  } catch (err) {\n    console.error(err);\n  }\n}\n```\n💡 Usa optional chaining (?.) y async/await con try-catch.'
  ]
};

// ========== PARTE 6: RECURSOS DE APRENDIZAJE ==========
const recursos = {
  patron: /aprender|estudiar|curso|recurso|tutorial|donde aprender/i,
  respuestas: [
    '📚 Recursos para aprender programación:\nGratis:\n• freeCodeCamp.org - Cursos completos certificados\n• MDN Web Docs - Documentación oficial web\n• JavaScript.info - Tutorial detallado de JS\n• YouTube - Fazt, MiduDev, Brais Moure, Hola Mundo\nPráctica:\n• LeetCode - Algoritmos y entrevistas\n• HackerRank - Desafíos de código\n• CodeWars - Katas de programación\n• Frontend Mentor - Proyectos reales diseñados\n💡 La práctica constante es clave. Programa todos los días aunque sea 30 min.',
    
    '🎯 Ruta de aprendizaje Web Developer:\nNivel 1 Fundamentos (2-3 meses):\n1. HTML - Estructura de páginas\n2. CSS - Estilos y diseño\n3. JavaScript básico - Variables, funciones, arrays\nNivel 2 Intermedio (3-4 meses):\n4. JavaScript avanzado - Async, APIs, DOM\n5. Git y GitHub - Control de versiones\n6. Responsive design - Mobile first\nNivel 3 Framework (3-4 meses):\n7. React o Vue - Componentes\n8. Node.js y Express - Backend\n9. Base de datos - MongoDB o PostgreSQL\nNivel 4 Profesional (ongoing):\n10. Testing - Jest, Vitest\n11. Deploy - Vercel, Netlify, Railway\n12. CI/CD - GitHub Actions\n💡 No te apures. Domina cada nivel antes de avanzar.'
  ]
};

// ========== PARTE 7: ALGORITMOS ==========
const algoritmos = {
  patron: /algoritmo|complejidad|big o|ordenamiento|b[uú]squeda/i,
  respuestas: [
    '🧮 Algoritmos Básicos:\nBúsqueda Lineal O(n):\n```javascript\nfunction buscar(arr, valor) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === valor) return i;\n  }\n  return -1;\n}\n```\nBúsqueda Binaria O(log n):\n```javascript\nfunction busquedaBinaria(arr, valor) {\n  let inicio = 0, fin = arr.length - 1;\n  while (inicio <= fin) {\n    const medio = Math.floor((inicio + fin) / 2);\n    if (arr[medio] === valor) return medio;\n    if (arr[medio] < valor) inicio = medio + 1;\n    else fin = medio - 1;\n  }\n  return -1;\n}\n```\n💡 Búsqueda binaria requiere array ordenado pero es mucho más rápida.',
    
    '📊 Complejidad Big O:\nO(1) - Constante: Acceso directo\nO(log n) - Logarítmica: Búsqueda binaria\nO(n) - Lineal: Recorrer array\nO(n log n) - Logarítmica lineal: Merge sort\nO(n²) - Cuadrática: Bubble sort\nO(2ⁿ) - Exponencial: Fibonacci recursivo\n💡 Mientras menor la complejidad, más eficiente el algoritmo.'
  ]
};

// ========== PARTE 8: PROYECTOS ==========
const proyectos = {
  patron: /proyecto|qu[eé] hacer|qu[eé] crear|idea de proyecto/i,
  respuestas: [
    '💡 Proyectos para Principiantes:\n1. Calculadora - HTML, CSS, JS básico\n2. Lista de tareas - DOM, localStorage\n3. Reloj digital - Date, setInterval\n4. Conversor de monedas - Fetch API\n5. Juego piedra papel tijera - Lógica\n6. Generador de contraseñas - Math.random\n7. Contador de palabras - String methods\n8. Cronómetro - setInterval, Date\n💡 Empieza con proyectos simples. Súbelos a GitHub.',
    
    '🚀 Proyectos Intermedios:\n1. Blog personal - React, Markdown\n2. App de clima - API, geolocalización\n3. Carrito de compras - Estado, localStorage\n4. Chat en tiempo real - WebSockets\n5. Clon de Twitter - CRUD completo\n6. Portfolio interactivo - Animaciones\n7. Gestor de gastos - Gráficas, filtros\n8. App de recetas - Búsqueda, filtros\n💡 Estos proyectos son perfectos para tu portfolio.',
    
    '🔥 Proyectos Avanzados:\n1. Clon de Netflix - Streaming, auth\n2. E-commerce completo - Pagos, admin\n3. Red social - Posts, likes, comentarios\n4. Plataforma de cursos - Videos, progreso\n5. Dashboard analytics - Gráficas, reportes\n6. App de videollamadas - WebRTC\n7. Sistema de reservas - Calendario, emails\n8. CMS personalizado - Editor, roles\n💡 Estos proyectos demuestran nivel profesional.'
  ]
};

// ========== PARTE 9: ENTREVISTAS ==========
const entrevistas = {
  patron: /entrevista|trabajo|empleo|preguntas t[eé]cnicas/i,
  respuestas: [
    '💼 Preguntas comunes en entrevistas:\n1. Explica closures en JavaScript\n2. Diferencia entre let, const y var\n3. Qué es event delegation\n4. Diferencia entre == y ===\n5. Qué es hoisting\n6. Explica el event loop\n7. Diferencia entre null y undefined\n8. Qué son las promesas\n9. Explica this en JavaScript\n10. Qué es el Virtual DOM\n💡 Practica explicar conceptos en voz alta.',
    
    '🎯 Tips para entrevistas técnicas:\n1. Piensa en voz alta: Explica tu proceso\n2. Haz preguntas: Aclara requisitos\n3. Empieza simple: Luego optimiza\n4. Considera edge cases: Casos extremos\n5. Prueba tu código: Usa ejemplos\n6. Comenta tu código: Explica decisiones\n7. Sé honesto: Si no sabes, dilo\n8. Pregunta feedback: Muestra interés\n💡 La comunicación es tan importante como el código.'
  ]
};

// ========== PARTE 10: HELPERS ==========
const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

// ========== PARTE 11: PROCESAMIENTO ==========
export const generate = (msg) => {
  const texto = msg.toLowerCase();
  
  for (const [key, lang] of Object.entries(lenguajes)) {
    if (lang.patron.test(texto)) {
      const ejemplo = random(lang.ejemplos);
      return `${lang.info}\n${ejemplo}`;
    }
  }
  
  for (const [key, concepto] of Object.entries(conceptos)) {
    if (concepto.patron.test(texto)) {
      return `${concepto.explicacion}\n${concepto.ejemplo}\n${concepto.tips}`;
    }
  }
  
  for (const [key, tool] of Object.entries(herramientas)) {
    if (tool.patron.test(texto)) return tool.respuesta;
  }
  
  if (practicas.patron.test(texto)) return random(practicas.respuestas);
  if (debugging.patron.test(texto)) return random(debugging.respuestas);
  if (recursos.patron.test(texto)) return random(recursos.respuestas);
  if (algoritmos.patron.test(texto)) return random(algoritmos.respuestas);
  if (proyectos.patron.test(texto)) return random(proyectos.respuestas);
  if (entrevistas.patron.test(texto)) return random(entrevistas.respuestas);
  
  return null;
};