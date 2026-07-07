import estilosInicio from './inicio.css?inline';
import { app } from '@wii';
import { Saludar } from '@core/widev/widev.js';

export const render = () => {
  return `
    <style>${estilosInicio}</style>
    <div class="splash_container">
      <div class="splash_glow_orb_1"></div>
      <div class="splash_glow_orb_2"></div>
      
      <div class="splash_card">
        <div class="splash_mascot_wrap">
          <div class="splash_avatar_ring"></div>
          <img src="/smile.avif" alt="${app}" class="splash_avatar_img">
        </div>
        
        <div class="splash_saludo">
          <span>${Saludar()}</span>
        </div>
        
        <h1 class="splash_title">Bienvenido a <span class="splash_grad">ChatWii</span></h1>
        
        <p class="splash_desc">
          Tu asistente inteligente integrado con Gemini. Un espacio limpio y rápido para aumentar tu productividad diaria con fe, empatía y positivismo.
        </p>
        
        <div class="splash_btns">
          <button class="splash_btn_primary bt_auth login">
            <i class="fas fa-rocket"></i> Iniciar Sesión
          </button>
          <button class="splash_btn_secondary bt_auth registrar">
            <i class="fas fa-user-plus"></i> Registrarse
          </button>
        </div>
      </div>
    </div>
  `;
};

export const init = () => {};

export const cleanup = () => {};