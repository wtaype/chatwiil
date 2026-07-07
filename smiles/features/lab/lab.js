import estilosLab from './lab.css?inline';
import { getls, savels, Mensaje } from '@core/widev/widev.js';

// Temas soportados
const TEMAS = ['cielo', 'dulce', 'paz', 'oro', 'mora', 'futuro'];

export const render = () => {
  const currentTheme = document.documentElement.dataset.theme || 'paz';

  return `
    <style>${estilosLab}</style>
    <div class="lab_wrap">
      
      <!-- Panel de Control Superior -->
      <header class="lab_topbar">
        <div class="lab_logo">
          <i class="fas fa-flask"></i>
          <h1>Laboratorio de Colores & Glassmorphism</h1>
        </div>
        
        <div class="lab_theme_selector">
          <span>Seleccionar Tema:</span>
          <div class="lab_theme_buttons">
            ${TEMAS.map(t => `
              <button class="lab_theme_btn ${t} ${t === currentTheme ? 'active' : ''}" data-theme="${t}">
                ${t.toUpperCase()}
              </button>
            `).join('')}
          </div>
        </div>

        <a href="/smile" class="lab_back_btn"><i class="fas fa-arrow-left"></i> Volver al Chat</a>
      </header>

      <!-- Grid Principal -->
      <div class="lab_grid">
        
        <!-- Columna Izquierda: Información de Variables -->
        <section class="lab_panel lab_info_panel">
          <h2>Variables de Color Activas</h2>
          <p class="lab_desc">Estos son los códigos de color actuales declarados en <code>witema.css</code>. No alteran las variables originales.</p>
          
          <div class="lab_vars_table" id="varsTable">
            <!-- Se llena dinámicamente en init() -->
          </div>

          <div class="lab_design_notes">
            <h3><i class="fas fa-circle-info"></i> Notas de Diseño Glassmorphic</h3>
            <ul>
              <li><code>--bg9</code> se usa para el fondo esmerilado de las barras laterales (opacidad ~45%).</li>
              <li><code>--bg10</code> es para las burbujas del bot en vidrio esmerilado (opacidad ~65%).</li>
              <li><code>--bg11</code> es para la barra de entrada flotante (opacidad ~75%).</li>
              <li><code>--bg12</code> define el borde fino semi-transparente para contornear el vidrio.</li>
            </ul>
          </div>
        </section>

        <!-- Columna Derecha: Vista Previa Miniatura del Chat -->
        <section class="lab_panel lab_preview_panel">
          <h2>Simulación de Interfaz</h2>
          
          <div class="lab_viewport_sim">
            
            <!-- 1. Mini Sidebar (Left) -->
            <aside class="mini_sidebar">
              <div class="mini_brand">
                <i class="fas fa-message"></i> ChatWii Mini
              </div>
              
              <!-- Buscador en Sidebar -->
              <div class="mini_search_wrap">
                <i class="fas fa-search"></i>
                <input type="text" class="mini_search_input" placeholder="Buscar chats..." readonly>
              </div>

              <button class="mini_btn_new"><i class="fas fa-plus"></i> Nuevo Chat</button>
              
              <div class="mini_chat_list">
                <div class="mini_chat_item active">
                  <div class="mini_avatar">CW</div>
                  <div class="mini_item_text">
                    <strong>ChatWii</strong>
                    <span>El proyecto va excelente...</span>
                  </div>
                </div>
                <div class="mini_chat_item">
                  <div class="mini_avatar">PS</div>
                  <div class="mini_item_text">
                    <strong>Soporte Paz</strong>
                    <span>¿En qué puedo ayudarte hoy?</span>
                  </div>
                </div>
              </div>

              <!-- Bottom tabs mockup con icono de Permisos en lugar de DB -->
              <div class="mini_sidebar_bottom">
                <i class="fas fa-comment-dots active" title="Chats"></i>
                <i class="fas fa-key" title="Permisos"></i>
                <i class="fas fa-download" title="Descargar"></i>
                <i class="fas fa-gear" title="Ajustes"></i>
              </div>
            </aside>

            <!-- 2. Mini Chat Workspace -->
            <main class="mini_chat_workspace">
              
              <!-- Mini Header -->
              <header class="mini_header">
                <div class="mini_header_info">
                  <h3>ChatWii</h3>
                  <span class="mini_status"><i class="fa-solid fa-circle"></i> Activo</span>
                </div>
                
                <div class="mini_header_actions">
                  <!-- Botón Perfil con nv_item y wismile -->
                  <a href="/perfil" class="mini_nv_item active" data-page="perfil">
                    <img src="${import.meta.env.BASE_URL}smile.avif" alt="Avatar">
                    <span>Genio</span>
                  </a>
                  <!-- Botón Salir con nv_item.bt_salir -->
                  <button class="mini_nv_item bt_salir" data-page="inicio">
                    <i class="fa-solid fa-sign-out-alt"></i>
                    <span>Salir</span>
                  </button>
                </div>
              </header>

              <!-- Mini Body con Mensajes -->
              <div class="mini_body">
                <div class="mini_msg user">
                  <div class="mini_bubble">
                    ¡Sí, acabo de revisarlos! Los elementos en Glassmorphism le dan un toque muy limpio al chat.
                  </div>
                </div>
                <div class="mini_msg assistant">
                  <div class="mini_bubble">
                    Totalmente de acuerdo. El contraste y la sutileza de los bordes con desenfoque hacen que se sienta premium.
                  </div>
                </div>
                <div class="mini_msg assistant typing">
                  <div class="mini_bubble">
                    <div class="mini_typing_dots"><span></span><span></span><span></span></div>
                  </div>
                </div>
              </div>

              <!-- Mini Input Flotante -->
              <footer class="mini_footer">
                <div class="mini_input_pill">
                  <i class="fas fa-paperclip"></i>
                  <div class="mini_input_placeholder">Escribe un mensaje aquí...</div>
                  <button class="mini_btn_send"><i class="fas fa-paper-plane"></i></button>
                </div>
              </footer>

            </main>

          </div>

        </section>

      </div>

    </div>
  `;
};

// --- Helper: Leer variables computadas del DOM ---
const getComputedThemeVars = () => {
  const style = getComputedStyle(document.documentElement);
  return {
    '--bg': style.getPropertyValue('--bg').trim(),
    '--bg2': style.getPropertyValue('--bg2').trim(),
    '--mco': style.getPropertyValue('--mco').trim(),
    '--bg9': style.getPropertyValue('--bg9').trim(),
    '--bg10': style.getPropertyValue('--bg10').trim(),
    '--bg11': style.getPropertyValue('--bg11').trim(),
    '--bg12': style.getPropertyValue('--bg12').trim()
  };
};

const renderVarsTable = () => {
  const tableContainer = document.getElementById('varsTable');
  if (!tableContainer) return;

  const vars = getComputedThemeVars();
  tableContainer.innerHTML = `
    <table class="vars_table">
      <thead>
        <tr>
          <th>Variable</th>
          <th>Color / Valor</th>
          <th>Muestra</th>
        </tr>
      </thead>
      <tbody>
        ${Object.entries(vars).map(([key, val]) => `
          <tr>
            <td><code>${key}</code></td>
            <td><code>${val}</code></td>
            <td><div class="color_swatch" style="background: ${val}; border: 1px solid var(--brd);"></div></td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};

export const init = () => {
  const buttons = document.querySelectorAll('.lab_theme_btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar active de botones
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const theme = btn.dataset.theme;
      
      // Aplicar tema en root
      document.documentElement.dataset.theme = theme;
      localStorage.wiTema = theme; // Guardar en preferencias para persistencia

      // Re-renderizar tabla de variables con valores computados
      setTimeout(() => {
        renderVarsTable();
      }, 50);

      Mensaje(`Tema ${theme.toUpperCase()} cargado en el laboratorio`, 'success');
    });
  });

  // Render inicial de tabla
  renderVarsTable();
};
