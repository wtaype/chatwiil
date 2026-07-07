import { wiAuth } from '@core/widev/widev.js';

export const render = () => {
  const user = wiAuth.user;
  if (!user) return '';

  const logs = [
    { time: 'Hace un momento', action: 'Acceso a ajustes de cuenta', desc: 'El usuario visualizó las políticas de seguridad y de red.' },
    { time: 'Hoy, 12:45 AM', action: 'Actualización de Perfil', desc: 'Se modificó el avatar y los datos personales en la base de datos.' },
    { time: 'Hoy, 12:30 AM', action: 'Inicio de Sesión', desc: `Sesión iniciada con éxito en ChatWii Web con rol ${user.rol.toUpperCase()}.` },
    { time: 'Ayer, 09:15 PM', action: 'Sincronización de Laboratorio', desc: 'Se cargaron las configuraciones del tema witema del servidor principal.' }
  ];

  const logsHtml = logs.map(l => `
    <div class="log_timeline_item">
      <div class="log_marker"></div>
      <div class="log_body">
        <span class="log_time">${l.time}</span>
        <h4>${l.action}</h4>
        <p>${l.desc}</p>
      </div>
    </div>
  `).join('');

  return `
    <div class="tab_pane_content wi_fadeUp">
      <h2>Historial de Actividad</h2>
      <p class="tab_pane_subtitle">Log de eventos de seguridad y acciones administrativas realizadas en esta sesión.</p>

      <section class="tab_section">
        <div class="log_timeline">
          ${logsHtml}
        </div>
      </section>

    </div>
  `;
};

export const init = () => {
  document.querySelectorAll('.wi_fadeUp').forEach(el => el.classList.add('visible', 'wi_visible'));
};
