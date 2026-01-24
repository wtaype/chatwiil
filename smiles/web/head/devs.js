// ========== PARTE 1: DATOS BASE ==========
const lenguajes = {
  javascript: {
    patron: /javascript|js|node|react|vue/i,
    respuesta: '💻 JavaScript es genial para web. ¿Necesitas ayuda con variables, funciones, async/await? Dime qué específicamente.'
  },
  python: {
    patron: /python|py|django|flask/i,
    respuesta: '🐍 Python es perfecto para IA y backend. ¿Necesitas ayuda con listas, diccionarios, funciones? Cuéntame más.'
  },
  css: {
    patron: /css|estilo|diseño/i,
    respuesta: '🎨 CSS hace que tu web se vea increíble. ¿Necesitas ayuda con flexbox, grid, animaciones? Dime qué necesitas.'
  },
  html: {
    patron: /html|estructura|etiqueta/i,
    respuesta: '📄 HTML es la base de la web. ¿Necesitas ayuda con formularios, tablas, semántica? Pregúntame.'
  }
};

const conceptos = {
  variable: '📦 Variable: Es como una caja donde guardas datos. Ejemplo: let nombre = "Juan";',
  funcion: '⚙️ Función: Es un bloque de código reutilizable. Ejemplo: function saludar() { console.log("Hola"); }',
  array: '📚 Array: Es una lista de elementos. Ejemplo: let frutas = ["manzana", "pera"];',
  objeto: '🎁 Objeto: Es una colección de propiedades. Ejemplo: let persona = { nombre: "Ana", edad: 25 };'
};

// ========== PARTE 2: PROCESAMIENTO ==========
export const generate = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Detectar lenguaje
  for (const [key, lang] of Object.entries(lenguajes)) {
    if (lang.patron.test(msg)) return lang.respuesta;
  }
  
  // Detectar concepto
  if (/variable|var|let|const/i.test(msg)) return conceptos.variable;
  if (/función|function|arrow/i.test(msg)) return conceptos.funcion;
  if (/array|arreglo|lista/i.test(msg)) return conceptos.array;
  if (/objeto|object|json/i.test(msg)) return conceptos.objeto;
  
  return null;
};