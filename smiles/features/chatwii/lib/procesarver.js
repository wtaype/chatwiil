/**
 * procesarver.js - Los ojos de ChatWii en la Web.
 * Se encarga de procesar, limpiar y optimizar el texto del DOM extraído del body
 * para enviarlo como contexto limpio a la API de Gemini.
 */

/**
 * Limpia y optimiza el texto extraído del DOM de la página activa.
 * Remueve espacios múltiples, saltos de línea excesivos y limita el tamaño máximo.
 * @param {string} textoCrudo - El innerText extraído del body de la pestaña activa.
 * @returns {string} El texto procesado y limpio.
 */
export function limpiarDOM(textoCrudo) {
  if (!textoCrudo || typeof textoCrudo !== 'string') return '';

  // 1. Limpieza de espacios en blanco múltiples y tabulaciones
  let textoLimpio = textoCrudo
    .replace(/[ \t]+/g, ' ') // Reemplazar múltiples espacios/tabs con uno solo
    .replace(/\r\n/g, '\n')  // Normalizar saltos de línea de Windows
    .replace(/\n{3,}/g, '\n\n') // Limitar saltos de línea consecutivos a máximo 2
    .trim();

  // 2. Opcional: Filtrado básico de texto de elementos no deseados comunes
  // (Aunque innerText no suele traer scripts/estilos, en algunos casos se cuelan textos basura)
  
  // 3. Limitar tamaño máximo para optimizar rendimiento y tokens (50,000 caracteres son ~10,000 palabras)
  const limiteMax = 60000;
  if (textoLimpio.length > limiteMax) {
    textoLimpio = textoLimpio.substring(0, limiteMax) + '\n\n[...Texto truncado por tamaño excesivo...]';
  }

  return textoLimpio;
}

/**
 * Prepara el prompt final inyectando el contexto de la página activa si está disponible.
 * @param {string} promptUsuario - La pregunta del usuario.
 * @param {string} contextoPagina - El texto limpio del DOM de la página activa.
 * @returns {string} El prompt listo con contexto.
 */
export function prepararPromptConContexto(promptUsuario, contextoPagina) {
  if (!contextoPagina) return promptUsuario;

  return `CONTEXTO DE LA PÁGINA WEB QUE EL USUARIO ESTÁ VIENDO ACTUAMENTE:
---
${contextoPagina}
---

PREGUNTA U ORDEN DEL USUARIO:
${promptUsuario}`;
}
