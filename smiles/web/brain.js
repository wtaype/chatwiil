import * as memoria from './memoria.js';
import * as mate from './head/math.js';
import * as fe from './head/fe.js';
import * as devs from './head/devs.js';
import * as general from './head/general.js';
import * as creatividad from './head/creatividad.js';
import * as vida from './head/life.js';
import * as razonamiento from './head/razonamiento.js';
import * as wiil from './head/wiil.js';
import * as lenguaje from './head/lenguaje.js';
import * as etica from './head/etica.js';
import * as saludos from './head/saludos.js';

// ========== MÓDULOS POR PRIORIDAD ==========
const modulos = [saludos, wiil, mate, fe, vida, devs, general, creatividad, razonamiento, lenguaje];

// ========== PROCESAMIENTO ==========
export const procesar = async (msg) => {
  memoria.add('user', msg);
  const validacion = etica.validate(msg);
  let res = validacion.safe ? '' : validacion.response;
  if (!res) for (const mod of modulos) if (mod.generate && (res = mod.generate(msg))) break;
  if (res && validacion.safe && wiil.addPersonality) res = wiil.addPersonality(res);
  memoria.add('assistant', res);
  return res;
};