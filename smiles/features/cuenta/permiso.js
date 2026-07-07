import { wiAuth } from '@core/widev/widev.js';

const SEGURIDAD = {
  smile:  { desc: 'Acceso Estándar', apps: ['ChatWii Web', 'Extensión Chrome', 'Consola de Envío'] },
  gestor: { desc: 'Gestión y Soporte', apps: ['ChatWii Web', 'Extensión Chrome', 'Consola de Envío', 'Laboratorio', 'Panel de Emojis'] },
  admin:  { desc: 'Super Administrador', apps: ['ChatWii Web', 'Extensión Chrome', 'Consola de Envío', 'Laboratorio', 'Panel de Emojis', 'Panel de Control', 'Consola Firebase'] }
};

export const render = () => {
  const user = wiAuth.user;
  if (!user) return '';

  const level = SEGURIDAD[user.rol] || { desc: 'Invitado', apps: [] };

  const appsHtml = level.apps.map(a => `
    <div class="app_permission_item">
      <i class="fas fa-circle-check auth_success_ico"></i>
      <span>${a}</span>
    </div>
  `).join('');

  return `
    <div class="tab_pane_content wi_fadeUp">
      <h2>Permisos & Autorización</h2>
      <p class="tab_pane_subtitle">Verifica los permisos asociados a tu nivel de cuenta actual en la red ChatWii.</p>

      <section class="tab_section">
        <div class="role_badge_container">
          <div class="role_banner">
            <span class="role_label">Rol de Cuenta</span>
            <h3 class="role_title">${user.rol.toUpperCase()}</h3>
            <p class="role_desc">${level.desc}</p>
          </div>
        </div>
      </section>

      <section class="tab_section">
        <h3>Módulos Autorizados</h3>
        <p class="section_desc">Tienes acceso de lectura y escritura a las siguientes características:</p>
        
        <div class="apps_permissions_grid">
          ${appsHtml}
        </div>
      </section>

      <section class="tab_section">
        <h3>Políticas de Seguridad</h3>
        <div class="security_policies_note">
          <i class="fas fa-shield-halved security_ico"></i>
          <div>
            <h4>Sesión Cifrada Localmente</h4>
            <p>Tus credenciales y datos de chat de Local Storage nunca se transfieren a terceros sin tu consentimiento. Las llaves de API se procesan a nivel de cliente.</p>
          </div>
        </div>
      </section>

    </div>
  `;
};

export const init = () => {
  document.querySelectorAll('.wi_fadeUp').forEach(el => el.classList.add('visible', 'wi_visible'));
};
