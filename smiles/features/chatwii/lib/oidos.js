// oidos.js - Oídos de ChatWii para grabación en la Web usando micrófono
let _activeRecorder = null;
let _activeStream = null;

/**
 * Graba audio del micrófono del usuario durante el tiempo especificado.
 * @param {number} ms - Tiempo de grabación en milisegundos
 */
export function escucharPestana(ms = 5000) {
  return new Promise(async (resolve, reject) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      _activeStream = stream;

      const chunks = [];
      const mimeType = 'audio/webm;codecs=opus';
      let recorder;

      try {
        recorder = new MediaRecorder(stream, { mimeType });
      } catch (_) {
        recorder = new MediaRecorder(stream);
      }

      _activeRecorder = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onerror = (e) => {
        _detenerCaptura();
        reject(e.error || new Error('Ocurrió un error al grabar el audio.'));
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType || 'audio/webm' });
        _detenerCaptura();

        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          const parts = result.split(',');
          const mime = parts[0].match(/:(.*?);/)[1];
          const base64 = parts[1];
          resolve({ base64, mime });
        };
        reader.onerror = () => reject(new Error('No se pudo codificar el audio a Base64.'));
        reader.readAsDataURL(blob);
      };

      recorder.start();

      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }, ms);
    } catch (err) {
      console.warn('[Oídos] Microphone access failed:', err);
      reject(new Error('Permiso de micrófono denegado o no disponible en este navegador.'));
    }
  });
}

function _detenerCaptura() {
  if (_activeStream) {
    _activeStream.getTracks().forEach(track => track.stop());
    _activeStream = null;
  }
  _activeRecorder = null;
}
