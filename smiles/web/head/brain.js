import * as math from './math.js';
import * as memoria from './memoria.js';
import * as etica from './etica.js';
import * as life from './life.js';
import * as lenguaje from './lenguaje.js';
import * as razonamiento from './razonamiento.js';
import * as general from './general.js';
import * as creatividad from './creatividad.js';
import * as devs from './devs.js';
import * as fe from './fe.js';
import * as wiil from './wiil.js'; // 🎭 PERSONALIDAD

// 🧠 CEREBRO: Detecta qué módulos usar
export const analyze = (userMessage) => {
  const msg = userMessage.toLowerCase();
  const modules = [];

  // ========== DETECCIÓN DE MÓDULOS (Prioridad por peso) ==========
  
  // 🎭 PERSONALIDAD (Prioridad MÁXIMA - incluye más patrones)
  if (/gracias|motivación|motívame|eres genial|eres increíble|eres el mejor|eres lo máximo|eres cool|eres un crack|eres top|eres pro|eres god|eres bacán|eres chévere|cómo estás|qué tal|adiós|chao|bye|feliz|te amo|me caes bien|hola|hey|buenas|qué onda|jaja|jeje|lol|xd/i.test(msg)) {
    modules.push({ name: 'wiil', weight: 0.99, module: wiil }); // Peso máximo
  }
  
  // 🙏 FE Y ESPIRITUALIDAD
  if (/dios|jesús|biblia|verso|oración|fe|espiritual|cristo|señor|padre nuestro|amén/i.test(msg)) {
    modules.push({ name: 'fe', weight: 0.95, module: fe });
  }
  
  // 📐 MATEMÁTICAS
  if (/\d+|ecuación|resolver|calcular|matemática|geometría|álgebra|raíz|fracción|porcentaje/.test(msg)) {
    modules.push({ name: 'math', weight: 0.9, module: math });
  }

  // 💻 PROGRAMACIÓN
  if (/código|programar|javascript|python|html|css|función|variable|bug|error|develop/.test(msg)) {
    modules.push({ name: 'devs', weight: 0.9, module: devs });
  }

  // 🌱 VIDA PRÁCTICA
  if (/consejo|ayuda|cómo hacer|práctica|cotidiano|sentido común|realista|triste|solo|deprimido/.test(msg)) {
    modules.push({ name: 'life', weight: 0.8, module: life });
  }

  // 🎨 CREATIVIDAD
  if (/historia|cuento|idea|inventa|creativo|metáfora|poema|canción|original/.test(msg)) {
    modules.push({ name: 'creatividad', weight: 0.8, module: creatividad });
  }

  // 🧩 RAZONAMIENTO LÓGICO
  if (/por qué|cómo funciona|explicar|razón|lógica|deducir|inferir|conclusión/.test(msg)) {
    modules.push({ name: 'razonamiento', weight: 0.7, module: razonamiento });
  }

  // 📚 CONOCIMIENTO GENERAL
  if (/historia|ciencia|cultura|quién|qué es|cuándo|dónde|país|planeta|guerra/.test(msg)) {
    modules.push({ name: 'general', weight: 0.7, module: general });
  }

  // 💬 LENGUAJE (Peso MUY BAJO - solo como último recurso)
  modules.push({ name: 'lenguaje', weight: 0.1, module: lenguaje });

  // 🛡️ ÉTICA (Siempre verifica)
  modules.push({ name: 'etica', weight: 0.3, module: etica });

  // 🧠 MEMORIA (Contexto conversacional)
  if (memoria.hasContext()) {
    modules.push({ name: 'memoria', weight: 0.6, module: memoria });
  }

  // Ordenar por peso (mayor a menor)
  modules.sort((a, b) => b.weight - a.weight);

  return modules;
};

// 🎯 PROCESAR RESPUESTA
export const process = async (userMessage) => {
  try {
    // 1. Guardar en memoria
    memoria.save({ role: 'user', content: userMessage });

    // 2. Detectar módulos necesarios
    const modules = analyze(userMessage);

    console.log('🧠 Módulos detectados:', modules.map(m => `${m.name} (${m.weight})`));

    // 3. Verificar ética primero
    const ethicsCheck = etica.validate(userMessage);
    if (!ethicsCheck.safe) {
      memoria.save({ role: 'assistant', content: ethicsCheck.response });
      return ethicsCheck.response;
    }

    // 4. Detectar emoción del usuario (para respuesta empática)
    const emotion = wiil.detectEmotion(userMessage);

    // 5. Combinar respuestas de módulos activos (máximo 3)
    let response = null;
    
    for (const { name, module } of modules.slice(0, 3)) {
      try {
        const moduleResponse = await module.generate(userMessage);
        if (moduleResponse) {
          response = moduleResponse;
          console.log(`✅ Respuesta generada por: ${name}`);
          break; // Usar la primera respuesta válida
        }
      } catch (error) {
        console.warn(`⚠️ Error en módulo ${name}:`, error);
      }
    }

    // 6. Si ningún módulo generó respuesta, usar lenguaje por defecto
    if (!response) {
      response = lenguaje.generate(userMessage);
    }

    // 7. Agregar emoción empática si fue detectada (solo si no es respuesta de personalidad)
    if (emotion && !modules[0]?.name.includes('wiil')) {
      response = `${emotion}<br><br>${response}`;
    }

    // 8. Agregar toque de personalidad aleatorio (SOLO si no es respuesta de wiil)
    if (!modules[0]?.name.includes('wiil')) {
      response = wiil.addPersonality(response);
    }

    // 9. Guardar respuesta en memoria
    memoria.save({ role: 'assistant', content: response });

    return response;
  } catch (error) {
    console.error('❌ Error en Brain.process:', error);
    return '😔 Disculpa, tuve un problema procesando tu mensaje. Pero estoy aquí para ti, intenta de nuevo. 💚';
  }
};

// 📊 Exportar memoria para uso externo
export { memoria };