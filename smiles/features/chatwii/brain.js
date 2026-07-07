// brain.js - Motor lógico de ChatWii para Gemini REST API (Entorno Web)
import { coachPersona } from './personalidad.js';
import { prepararPromptConContexto } from './lib/procesarver.js';

const STORAGE_HISTORIAL_KEY = 'chatwii_historial';
const STORAGE_ARCHIVOS_KEY = 'chatwii_archivos';
let _historial = [];

/**
 * Inicializa el motor de chat cargando el historial desde localStorage
 */
export function initCoach() {
  try {
    const raw = localStorage.getItem(STORAGE_HISTORIAL_KEY);
    _historial = raw ? JSON.parse(raw) : [];
  } catch (e) {
    _historial = [];
  }
  return Promise.resolve(_historial);
}

/**
 * Obtiene el historial actual
 */
export const obtenerHistorial = () => _historial;

/**
 * Archiva la conversación activa actual
 */
export function archivarConversacionActiva() {
  if (_historial.length === 0) return Promise.resolve();

  let archivos = [];
  try {
    const raw = localStorage.getItem(STORAGE_ARCHIVOS_KEY);
    archivos = raw ? JSON.parse(raw) : [];
  } catch (e) {}

  let primerTexto = "Conversación ChatWii";
  for (const turn of _historial) {
    if (turn.role === 'user' && Array.isArray(turn.parts)) {
      const textPart = turn.parts.find(p => p.text);
      if (textPart && textPart.text.trim()) {
        primerTexto = textPart.text.trim().substring(0, 40) + "...";
        break;
      }
    } else if (turn.role === 'user' && typeof turn.parts === 'string') {
      primerTexto = turn.parts.trim().substring(0, 40) + "...";
      break;
    }
  }

  const nuevaSesion = {
    id: `chatwii_${Date.now()}`,
    fecha: new Date().toLocaleString('es-ES', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    }),
    titulo: primerTexto,
    messages: _historial
  };

  archivos.unshift(nuevaSesion);
  localStorage.setItem(STORAGE_ARCHIVOS_KEY, JSON.stringify(archivos));
  return Promise.resolve();
}

/**
 * Obtiene la lista de todas las conversaciones archivadas
 */
export function obtenerArchivos() {
  let archivos = [];
  try {
    const raw = localStorage.getItem(STORAGE_ARCHIVOS_KEY);
    archivos = raw ? JSON.parse(raw) : [];
  } catch (e) {}
  return Promise.resolve(archivos);
}

/**
 * Elimina una conversación archivada por su ID
 */
export function eliminarArchivo(id) {
  let archivos = [];
  try {
    const raw = localStorage.getItem(STORAGE_ARCHIVOS_KEY);
    archivos = raw ? JSON.parse(raw) : [];
  } catch (e) {}

  const filtrados = archivos.filter(a => a.id !== id);
  localStorage.setItem(STORAGE_ARCHIVOS_KEY, JSON.stringify(filtrados));
  return Promise.resolve(filtrados);
}

/**
 * Borra el historial local, archivando la conversación antes
 */
export async function limpiarHistorial() {
  await archivarConversacionActiva();
  _historial = [];
  localStorage.removeItem(STORAGE_HISTORIAL_KEY);
  return Promise.resolve();
}

/**
 * Guarda el historial en el almacenamiento
 */
function persistirHistorial() {
  localStorage.setItem(STORAGE_HISTORIAL_KEY, JSON.stringify(_historial));
}

/**
 * Envía el mensaje del usuario a Gemini por HTTP Fetch Stream
 */
export async function enviarMensaje(textoUsuario, contextoPagina, imagenes, onChunk) {
  const apiKey = import.meta.env.VITE_GEMINI_KEY || localStorage.wiGeminiKey || '';
  if (!apiKey) {
    throw new Error('Por favor, configura tu API Key de Gemini en la pestaña de Ajustes de tu cuenta o en el archivo .env.');
  }

  const promptConContexto = prepararPromptConContexto(textoUsuario, contextoPagina);
  const parts = [];

  // Agregar imágenes si existen
  if (imagenes && imagenes.length > 0) {
    imagenes.forEach(img => {
      const cleanBase64 = img.base64.split(',')[1] || img.base64;
      parts.push({
        inlineData: {
          mimeType: img.mime,
          data: cleanBase64
        }
      });
    });
  }

  // Agregar texto
  parts.push({ text: promptConContexto });

  // Limpiar el contexto de mensajes anteriores del historial
  _historial.forEach(msg => {
    if (msg.role === 'user') {
      msg.parts.forEach(part => {
        if (part.text && part.text.startsWith('CONTEXTO DE LA PÁGINA WEB')) {
          const splitParts = part.text.split('\n\nPREGUNTA U ORDEN DEL USUARIO:\n');
          if (splitParts.length > 1) {
            part.text = splitParts[1];
          }
        }
      });
    }
  });

  // Agregar el mensaje del usuario al historial
  _historial.push({ role: 'user', parts: parts });
  persistirHistorial();

  const maxMensajes = 20;
  if (_historial.length > maxMensajes) {
    _historial = _historial.slice(_historial.length - maxMensajes);
  }

  const payload = {
    contents: _historial,
    systemInstruction: {
      parts: [{ text: coachPersona.actitud }]
    }
  };

  // Modelos ordenados por prioridad
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ];

  let lastError = null;
  let success = false;
  let respuestaCompleta = '';
  const errorsLog = [];

  for (const model of modelsToTry) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `HTTP ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const cleanLine = line.trim();
            if (!cleanLine) continue;

            if (cleanLine.startsWith('data: ')) {
              const dataStr = cleanLine.slice(6).trim();
              if (dataStr === '[DONE]') continue;

              try {
                const parsed = JSON.parse(dataStr);
                const textChunk = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                if (textChunk) {
                  respuestaCompleta += textChunk;
                  onChunk(textChunk);
                }
              } catch (e) {}
            }
          }
        }
      } finally {
        reader.releaseLock();
      }

      success = true;
      break;
    } catch (error) {
      console.warn(`Error con modelo ${model}:`, error.message);
      errorsLog.push(`${model} -> ${error.message}`);
      lastError = error;
    }
  }

  if (!success) {
    _historial.pop();
    persistirHistorial();
    throw new Error(errorsLog.join(' | '));
  }

  _historial.push({ role: 'model', parts: [{ text: respuestaCompleta }] });
  persistirHistorial();

  return respuestaCompleta;
}

/**
 * Retorna el saludo inicial dinámico personalizado
 */
export function obtenerSaludo() {
  const ahora = new Date();
  const hora = ahora.getHours();
  let saludoHora = '¡Hola!';

  if (hora >= 6 && hora < 12) {
    saludoHora = '¡Buenos días!';
  } else if (hora >= 12 && hora < 19) {
    saludoHora = '¡Buenas tardes!';
  } else {
    saludoHora = '¡Buenas noches!';
  }

  let nombre = '';
  try {
    const raw = localStorage.getItem('wiSmile');
    if (raw) {
      const data = JSON.parse(raw);
      nombre = data.nombre || '';
      if (nombre) {
        nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      }
    }
  } catch (e) {}

  const saludoNombre = nombre ? `, ${nombre}` : '';
  return `${saludoHora}${saludoNombre} 👋 Soy **ChatWii**, tu asistente inteligente.\n\nEstoy listo para ayudarte a analizar, resumir o responder tus preguntas. ¿Por dónde empezamos hoy? 🚀`;
}
