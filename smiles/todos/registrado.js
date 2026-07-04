import './registrado.css';
import { rutas } from '../rutas.js';

const HTML = /* html */`
  <div class="reg_wrap">
    <div class="reg_card">
      <div class="reg_icon_wrap">
        <div class="reg_icon_pulse"></div>
        <i class="fas fa-user-clock reg_icon"></i>
      </div>
      
      <h1 class="reg_title">¡Registro Exitoso!</h1>
      <p class="reg_subtitle">Gracias por querer ser parte de nuestra plataforma.</p>
      
      <div class="reg_body">
        <p>Tu cuenta ha sido creada y actualmente se encuentra en <strong>estado de revisión</strong>.</p>
        <p>Nuestro equipo de gestores está verificando tus datos para brindarte el acceso oficial muy pronto.</p>
      </div>

      <div class="reg_actions">
        <a href="https://wa.me/51914297099?text=Hola,%20acabo%20de%20registrarme%20y%20quisiera%20agilizar%20la%20activación%20de%20mi%20cuenta" target="_blank" class="reg_btn_wa">
          <i class="fab fa-whatsapp"></i>
          Agilizar vía WhatsApp
        </a>
        <button class="reg_btn_back" id="reg_btn_back">Volver al inicio</button>
      </div>
    </div>
  </div>
`;

let backBtnListener = null;

export const render = () => HTML;

export const init = () => {
  const btn = document.getElementById('reg_btn_back');
  if (btn) {
    backBtnListener = () => rutas.navigate('/');
    btn.addEventListener('click', backBtnListener);
  }
};

export const cleanup = () => {
  const btn = document.getElementById('reg_btn_back');
  if (btn && backBtnListener) {
    btn.removeEventListener('click', backBtnListener);
  }
};
