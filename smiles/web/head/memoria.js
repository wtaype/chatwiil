const MAX_HISTORY = 20;
const STORAGE_KEY = 'chatwiil_history';
let conversationHistory = [];

// ========== AGREGAR MENSAJE ==========
export const add = (role, content) => {
  conversationHistory.push({ role, content, timestamp: Date.now() });
  
  // Limitar historial
  if (conversationHistory.length > MAX_HISTORY) {
    conversationHistory = conversationHistory.slice(-MAX_HISTORY);
  }
  
  save();
};

// ========== OBTENER HISTORIAL ==========
export const get = () => conversationHistory;

// ========== LIMPIAR HISTORIAL ==========
export const clear = () => {
  conversationHistory = [];
  localStorage.removeItem(STORAGE_KEY);
};

// ========== GUARDAR EN LOCALSTORAGE ==========
const save = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
  } catch (err) {
    console.warn('⚠️ Error guardando historial:', err);
  }
};

// ========== CARGAR DESDE LOCALSTORAGE ==========
export const loadHistory = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      conversationHistory = JSON.parse(saved);
      console.log(`📚 Historial cargado: ${conversationHistory.length} mensajes`);
    }
  } catch (err) {
    console.warn('⚠️ Error cargando historial:', err);
    conversationHistory = [];
  }
};

// ========== OBTENER CONTEXTO RECIENTE ==========
export const getContext = (limit = 6) => {
  return conversationHistory.slice(-limit);
};