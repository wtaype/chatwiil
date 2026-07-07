import { getls, wiSmart } from '@core/widev/widev.js';
import { rutas } from './rutas.js';

// Inicialización de Rutas dinámicas según el Rol del usuario logueado
rutas.registerAll(() => getls('wiSmile')?.rol);
rutas.init();

// Importar Layout global (Encabezado y Pie de página)
import('./header.js');
import('./footer.js');

// Cargar Fuentes Tipográficas Premium en segundo plano
wiSmart({ css: ['https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap'] });

// Manejador global del modal de cuenta vía Hash (#cuenta/...)
const checkCuentaHash = () => {
  const hash = window.location.hash;
  if (hash.startsWith('#cuenta')) {
    import('./features/cuenta/cuenta.js').then(m => m.abrirCuenta(hash));
  } else {
    import('./features/cuenta/cuenta.js').then(m => m.cerrarCuenta());
  }
};
window.addEventListener('hashchange', checkCuentaHash);
window.addEventListener('DOMContentLoaded', checkCuentaHash);
window.addEventListener('winavigate', () => {
  if (!window.location.hash.startsWith('#cuenta')) {
    import('./features/cuenta/cuenta.js').then(m => m.cerrarCuenta());
  }
});
checkCuentaHash();
