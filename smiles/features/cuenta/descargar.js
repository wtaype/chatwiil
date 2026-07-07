import { getls, savels, Mensaje } from '@core/widev/widev.js';

export const render = () => {
  return `
    <div class="tab_pane_content wi_fadeUp">
      <h2>Descargas & Respaldos</h2>
      <p class="tab_pane_subtitle">Administra tus datos locales de conversación, realiza copias de seguridad o limpia tu almacenamiento.</p>

      <!-- Descarga de Copia de Seguridad -->
      <section class="tab_section">
        <h3>Descargar Copia de Seguridad</h3>
        <p class="section_desc">Exporta todo el historial de chats locales de Local Storage en formato de archivo JSON.</p>
        
        <button type="button" id="btnDownloadBackup" class="btn_action_cta">
          <i class="fas fa-file-arrow-down"></i> Descargar Historial (.json)
        </button>
      </section>

      <!-- Zona de Peligro / Limpieza -->
      <section class="tab_section danger_section">
        <h3>Zona de Peligro</h3>
        <p class="section_desc">Borra de forma permanente todas las conversaciones locales del navegador. Esta acción es irreversible.</p>
        
        <div class="danger_box">
          <div class="danger_box_text">
            <h4>Eliminar Historial Local</h4>
            <p>Se borrarán todos tus chats y archivos adjuntos temporales de la memoria Local Storage.</p>
          </div>
          <button type="button" id="btnClearStorage" class="btn_action_danger">
            <i class="fas fa-trash-can"></i> Limpiar Todo
          </button>
        </div>
      </section>

    </div>
  `;
};

export const init = () => {
  const btnDownload = document.getElementById('btnDownloadBackup');
  const btnClear = document.getElementById('btnClearStorage');

  // Animación de entrada
  document.querySelectorAll('.wi_fadeUp').forEach(el => el.classList.add('visible', 'wi_visible'));

  // 1. Descargar Backup JSON
  btnDownload?.addEventListener('click', () => {
    const chats = getls('wiChats') || [];
    if (chats.length === 0) {
      Mensaje('No tienes chats registrados para respaldar', 'warning');
      return;
    }

    try {
      const dataStr = JSON.stringify(chats, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `chatwii_backup_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      Mensaje('Respaldo descargado con éxito', 'success');
    } catch (err) {
      console.warn('[Descargar] Error:', err);
      Mensaje('Error al generar el respaldo', 'error');
    }
  });

  // 2. Limpiar Almacenamiento Local
  btnClear?.addEventListener('click', () => {
    if (!confirm('¿Estás seguro de que deseas eliminar todas las conversaciones locales de forma permanente?')) return;
    if (!confirm('¿Confirmas que deseas proceder? Esta acción no se puede deshacer.')) return;

    localStorage.removeItem('wiChats');
    localStorage.removeItem('wiActiveChatId');

    Mensaje('Historial local eliminado con éxito', 'success');

    // Notificar al chat activo para que limpie la UI en vivo
    window.dispatchEvent(new Event('wichats_cleared'));
  });
};
