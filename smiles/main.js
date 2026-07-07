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
