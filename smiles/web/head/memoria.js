let conversationHistory = [];
const MAX_MEMORY = 20; // Últimas 20 interacciones

const toSafeString = (val) => {
  if (typeof val === 'string') return val;
  if (val === null || val === undefined) return '';
  try { return String(val); } catch { return ''; }
};

// 💾 GUARDAR MENSAJE EN MEMORIA
export const save = (message) => {
  const safeMessage = {
    ...message,
    content: toSafeString(message.content),
    timestamp: Date.now()
  };

  conversationHistory.push(safeMessage);

  // Mantener solo las últimas MAX_MEMORY
  if (conversationHistory.length > MAX_MEMORY) {
    conversationHistory = conversationHistory.slice(-MAX_MEMORY);
  }
};

// 📖 OBTENER HISTORIAL
export const get = (limit = 5) => {
  return conversationHistory.slice(-limit);
};

// ❓ HAY CONTEXTO PREVIO
export const hasContext = () => {
  return conversationHistory.length > 0;
};

// 🔍 BUSCAR MENSAJES RELACIONADOS
export const findRelated = (keyword) => {
  return conversationHistory.filter(msg => 
    msg.content.toLowerCase().includes(keyword.toLowerCase())
  );
};

// 🧹 LIMPIAR MEMORIA
export const clear = () => {
  conversationHistory = [];
};

// 🎯 GENERAR RESPUESTA CON CONTEXTO
export const generate = (userMessage) => {
  const msg = toSafeString(userMessage).toLowerCase();
  const recent = get(5);
  
  // Detectar referencias al contexto previo
  if (/anterior|antes|dijiste|mencionaste|lo que|eso|aquello/.test(msg)) {
    const lastAssistant = [...recent].reverse().find(m => m.role === 'assistant');
    if (lastAssistant) {
      const preview = lastAssistant.content.substring(0, 150);
      return `🧠 **Recordando la conversación...**\n\n` +
             `Hace un momento te mencioné:\n` +
             `"${preview}${lastAssistant.content.length > 150 ? '...' : ''}"\n\n` +
             `¿Quieres que profundice en algo específico?`;
    }
  }

  // Detectar preguntas sobre conversaciones anteriores
  if (/qué hablamos|de qué hablamos|qué dijimos/.test(msg)) {
    if (recent.length > 0) {
      const topics = recent
        .filter(m => m.role === 'user')
        .slice(-3)
        .map(m => m.content.substring(0, 50))
        .join('\n• ');
      
      return `🧠 **Temas de nuestra conversación reciente:**\n\n• ${topics}\n\n` +
             `¿Quieres retomar alguno de estos temas?`;
    }
  }

  return null; // No es consulta de memoria
};