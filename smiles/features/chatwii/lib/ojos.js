// ojos.js - Ojos de ChatWii para captura en la Web
/**
 * Captura la pantalla del usuario usando la API nativa de pantalla del navegador
 */
export async function tomarCaptura() {
  try {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const video = document.createElement('video');
    video.srcObject = stream;
    video.autoplay = true;
    
    return new Promise((resolve, reject) => {
      video.onloadedmetadata = () => {
        setTimeout(() => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
          
          stream.getTracks().forEach(track => track.stop());
          
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          const parts = dataUrl.split(',');
          const mime = parts[0].match(/:(.*?);/)[1];
          const base64 = parts[1];
          resolve({ base64, mime });
        }, 500);
      };
      video.onerror = (e) => {
        stream.getTracks().forEach(track => track.stop());
        reject(e);
      };
    });
  } catch (err) {
    console.warn('[Ojos] getDisplayMedia falló, usando captura simulada:', err);
    // Retorna una imagen vacía de 1x1 pixel blanco en base64
    const mockBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    return { base64: mockBase64, mime: 'image/png' };
  }
}
