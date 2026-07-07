import { getls, savels, Mensaje } from '@core/widev/widev.js';

const TEMAS = [
  { id: 'cielo', name: 'Celeste Cielo' },
  { id: 'dulce', name: 'Rojo Dulce' },
  { id: 'paz', name: 'Verde Paz' },
  { id: 'oro', name: 'Oro Brillante' },
  { id: 'mora', name: 'Morado Mora' },
  { id: 'futuro', name: 'Futuro Oscuro' }
];

export const render = () => {
  const currentTheme = document.documentElement.dataset.theme || 'paz';
  const geminiKey = localStorage.wiGeminiKey || '';

  const themesHtml = TEMAS.map(t => {
    const isAct = t.id === currentTheme;
    return `
      <div class="theme_card ${t.id} ${isAct ? 'active' : ''}" data-theme="${t.id}">
        <div class="theme_swatch"></div>
        <div class="theme_info">
          <h4>${t.name}</h4>
          <span>Estilo Glassmorphic</span>
        </div>
        <i class="fas fa-circle-check theme_check_ico"></i>
      </div>
    `;
  }).join('');

  return `
    <div class="tab_pane_content wi_fadeUp">
      <h2>Ajustes Visuales & API</h2>
      <p class="tab_pane_subtitle">Personaliza tu espacio de trabajo y configura tus credenciales de inteligencia artificial.</p>

      <!-- Sección de Temas -->
      <section class="tab_section">
        <h3>Tema de Interfaz</h3>
        <div class="theme_grid">
          ${themesHtml}
        </div>
      </section>

      <!-- Sección de API Keys -->
      <section class="tab_section">
        <h3>Llave de API de Gemini</h3>
        <p class="section_desc">Configura tu propia clave para procesar consultas locales de IA. Se guarda de forma local en tu navegador.</p>
        
        <div class="api_key_form">
          <div class="api_input_group">
            <input 
              type="password" 
              id="geminiKeyInput" 
              class="api_key_input" 
              placeholder="AIzaSy..." 
              value="${geminiKey}" 
              autocomplete="off"
            >
            <button type="button" id="btnToggleKey" class="btn_toggle_key" title="Mostrar/Ocultar">
              <i class="fas fa-eye"></i>
            </button>
          </div>
          <button type="button" id="btnSaveKey" class="btn_save_key">
            <i class="fas fa-floppy-disk"></i> Guardar Llave
          </button>
        </div>
      </section>

    </div>
  `;
};

export const init = () => {
  const cards = document.querySelectorAll('.theme_card');
  const input = document.getElementById('geminiKeyInput');
  const btnToggle = document.getElementById('btnToggleKey');
  const btnSave = document.getElementById('btnSaveKey');

  // Animación de entrada
  document.querySelectorAll('.wi_fadeUp').forEach(el => el.classList.add('visible', 'wi_visible'));

  // 1. Selector de Temas
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const theme = card.dataset.theme;
      document.documentElement.dataset.theme = theme;
      savels('wiTema', theme);

      Mensaje(`Tema ${theme.toUpperCase()} aplicado con éxito`, 'success');
    });
  });

  // 2. Mostrar/Ocultar API Key
  btnToggle?.addEventListener('click', () => {
    if (!input) return;
    const isPass = input.type === 'password';
    input.type = isPass ? 'text' : 'password';
    btnToggle.innerHTML = isPass ? '<i class="fas fa-eye-slash"></i>' : '<i class="fas fa-eye"></i>';
  });

  // 3. Guardar API Key
  btnSave?.addEventListener('click', () => {
    if (!input) return;
    const key = input.value.trim();
    localStorage.wiGeminiKey = key;
    Mensaje('Clave de API guardada localmente', 'success');
  });
};
