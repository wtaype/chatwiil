let conversationHistory = [];
const MAX_MEMORY = 20; // Últimas 20 interacciones

export const save = (message) => {
  conversationHistory.push({
    ...message,
    timestamp: Date.now()
  });

  // Mantener solo las últimas MAX_MEMORY
  if (conversationHistory.length > MAX_MEMORY) {
    conversationHistory = conversationHistory.slice(-MAX_MEMORY);
  }
};

export const get = (limit = 5) => {
  return conversationHistory.slice(-limit);
};

export const hasContext = () => {
  return conversationHistory.length > 0;
};

export const findRelated = (keyword) => {
  return conversationHistory.filter(msg => 
    msg.content.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const clear = () => {
  conversationHistory = [];
};

export const generate = (userMessage) => {
  const recent = get(3);
  
  // Detectar referencias al contexto
  if (/anterior|antes|dijiste|mencionaste|lo que|eso/.test(userMessage.toLowerCase())) {
    const lastAssistant = recent.reverse().find(m => m.role === 'assistant');
    if (lastAssistant) {
      return `🧠 *Recordando...* Hace un momento te mencioné: "${lastAssistant.content.substring(0, 100)}..."`;
    }
  }

  return null;
};