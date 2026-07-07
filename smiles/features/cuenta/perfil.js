import estilosPerfil from './perfil.css?inline';
import { auth } from '@core/firebase-auth.js';
import { db } from '@core/firebase-db.js';
import { updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getls, savels, Mensaje, wiTip, wiDate, witemas } from '@core/widev/widev.js';
import { app } from '@wii';

// ── TEMPLATE ─────────────────────────────────────────────────────────────────
export const render = () => `
<style>${estilosPerfil}</style>

  <div class="prf_wrap">

    <div class="prf_hero wi_fadeUp">
      <div class="prf_av_wrap">
        <img id="prfHeroAv" src="/smile.avif" alt="Avatar" class="prf_av" onerror="this.src='/smile.avif'">
        <div class="prf_av_ring"></div>
      </div>
      <div class="prf_hero_info">
        <h1 class="prf_fullname" id="prfHeroFullname">Cargando...</h1>
        <p class="prf_username"><i class="fas fa-at"></i> <span id="prfHeroUsername">...</span></p>
        <span class="prf_rol_chip"><i class="fas fa-crown"></i> <span id="prfHeroPlan">...</span></span>
      </div>
    </div>

    <div class="prf_grid wi_fadeUp" style="animation-delay:.1s">

      <!-- Editar datos personales -->
      <div class="prf_card">
        <h2 class="prf_card_tit"><i class="fas fa-user-edit"></i> Editar Perfil</h2>

        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label for="prf_nombre"><i class="fas fa-user"></i> Nombres</label>
            <input id="prf_nombre" placeholder="Tus nombres">
          </div>
          <div class="prf_form_grp">
            <label for="prf_apellidos"><i class="fas fa-user"></i> Apellidos</label>
            <input id="prf_apellidos" placeholder="Tus apellidos">
          </div>
        </div>

        <label for="prf_avatar"><i class="fas fa-image"></i> URL de Avatar</label>
        <input id="prf_avatar" placeholder="https://...">

        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label for="prf_nacimiento"><i class="fas fa-calendar-alt"></i> Nacimiento</label>
            <input type="date" id="prf_nacimiento">
          </div>
          <div class="prf_form_grp">
            <label for="prf_genero"><i class="fas fa-venus-mars"></i> Género</label>
            <select id="prf_genero">
              <option value="" disabled selected>Selecciona...</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
              <option value="Prefiero no decirlo">Prefiero no decirlo</option>
            </select>
          </div>
        </div>

        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label for="prf_pais"><i class="fas fa-globe-americas"></i> País</label>
            <input id="prf_pais" placeholder="ej: Perú">
          </div>
          <div class="prf_form_grp">
            <label for="prf_celular"><i class="fas fa-phone-alt"></i> Celular</label>
            <input id="prf_celular" placeholder="+51 999 999 999">
          </div>
        </div>

        <div class="prf_form_2col">
          <div class="prf_form_grp">
            <label for="prf_instagram"><i class="fab fa-instagram"></i> Instagram</label>
            <input id="prf_instagram" placeholder="@usuario">
          </div>
          <div class="prf_form_grp">
            <label for="prf_tema"><i class="fas fa-palette"></i> Tema Visual</label>
            <select id="prf_tema" style="cursor:pointer;">
              <option value="cielo">🔵 Cielo</option>
              <option value="dulce">🌸 Dulce</option>
              <option value="paz">🟢 Paz</option>
              <option value="oro">🟡 Oro</option>
              <option value="mora">🟣 Mora</option>
              <option value="futuro">🌌 Futuro</option>
            </select>
          </div>
        </div>

        <label for="prf_bio"><i class="fas fa-address-card"></i> Bio</label>
        <input id="prf_bio" placeholder="Algo sobre ti...">

        <button id="prf_guardar" class="prf_btn"><i class="fas fa-save"></i> Guardar Cambios</button>
      </div>

      <div class="prf_col_right">

        <!-- Cambiar contraseña -->
        <div class="prf_card">
          <h2 class="prf_card_tit"><i class="fas fa-lock"></i> Cambiar Contraseña</h2>

          <label for="prf_pass"><i class="fas fa-lock"></i> Nueva contraseña</label>
          <div class="prf_pass_wrap">
            <input type="password" id="prf_pass" placeholder="Mínimo 6 caracteres" autocomplete="new-password">
            <button type="button" class="prf_pass_eye" data-target="prf_pass" tabindex="-1" aria-label="Mostrar contraseña">
              <i class="fas fa-eye-slash"></i>
            </button>
          </div>

          <label for="prf_pass_conf"><i class="fas fa-lock"></i> Confirmar contraseña</label>
          <div class="prf_pass_wrap">
            <input type="password" id="prf_pass_conf" placeholder="Repite la contraseña" autocomplete="new-password">
            <button type="button" class="prf_pass_eye" data-target="prf_pass_conf" tabindex="-1" aria-label="Mostrar confirmación">
              <i class="fas fa-eye-slash"></i>
            </button>
          </div>

          <button id="prf_guardar_pass" class="prf_btn"><i class="fas fa-key"></i> Actualizar Contraseña</button>
        </div>

        <!-- Datos de la cuenta -->
        <div class="prf_card">
          <h2 class="prf_card_tit"><i class="fas fa-info-circle"></i> Datos de la Cuenta</h2>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-envelope"></i> Email</span>
            <span class="prf_val em" id="prfInfoEmail">...</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-crown"></i> Plan</span>
            <span class="prf_val" style="color:var(--mco);text-transform:uppercase;" id="prfInfoPlan">...</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-signal"></i> Estado</span>
            <span class="prf_val" id="prfInfoEstado">...</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-toggle-on"></i> Activo</span>
            <span class="prf_val" id="prfInfoActivo">...</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-calendar-alt"></i> Registro</span>
            <span class="prf_val" id="prfInfoCreado">...</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-history"></i> Actividad</span>
            <span class="prf_val" id="prfInfoActividad">...</span>
          </div>
          <div class="prf_row">
            <span class="prf_lbl"><i class="fas fa-user-tag"></i> Rol</span>
            <span class="prf_val" style="text-transform:capitalize;" id="prfInfoRol">...</span>
          </div>
        </div>

      </div>
    </div>
  </div>
`;

// ── UTILIDADES ────────────────────────────────────────────────────────────────
const _set  = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val ?? '—'; };
const _val  = (id, val) => { const el = document.getElementById(id); if (el) el.value = val ?? ''; };
const _html = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val; };

const ROL_MAP = { admin: 'Administrador', gestor: 'Gestor', smile: 'Colaborador' };

// ── APLICAR TEMA ──────────────────────────────────────────────────────────────
const _aplicarTema = (tema) => {
  if (!tema) return;
  document.documentElement.dataset.theme = tema;
  const color = witemas[tema] || '#FFC107';
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', color);
  document.querySelectorAll('.tema').forEach(x =>
    x.classList.toggle('mtha', x.getAttribute('data-ths') === tema)
  );
  localStorage.wiTema = tema;
};

// ── PREFILL UI desde objeto u ─────────────────────────────────────────────────
const _prefill = (u) => {
  const {
    nombre = '', apellidos = '', usuario = '', email = '',
    rol = 'smile', plan = 'free', estado = 'activo', activo = true,
    avatar = '/smile.avif', bio = '', celular = '', instagram = '',
    pais = '', genero = '', tema = 'cielo',
    fechaNacimiento = '', creado, actualizado
  } = u;

  // Hero
  const avImg = document.getElementById('prfHeroAv');
  if (avImg) { avImg.src = avatar || '/smile.avif'; }
  _set('prfHeroFullname', `${nombre} ${apellidos}`.trim() || usuario);
  _set('prfHeroUsername', usuario);
  _set('prfHeroPlan', `Plan ${plan.toUpperCase()}`);

  // Formulario
  _val('prf_nombre', nombre);
  _val('prf_apellidos', apellidos);
  _val('prf_avatar', avatar);
  _val('prf_pais', pais);
  _val('prf_bio', bio);
  _val('prf_celular', celular);
  _val('prf_instagram', instagram);

  const generoEl = document.getElementById('prf_genero');
  if (generoEl) generoEl.value = genero;
  const temaEl = document.getElementById('prf_tema');
  if (temaEl) temaEl.value = tema;

  // Fecha nacimiento → YYYY-MM-DD para input[type=date]
  let fechaStr = '';
  if (fechaNacimiento) {
    try {
      const d = new Date(fechaNacimiento);
      if (!isNaN(d.getTime()))
        fechaStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    } catch {}
  }
  _val('prf_nacimiento', fechaStr);

  // Info cuenta
  _set('prfInfoEmail', email);
  _set('prfInfoPlan', plan);

  const estadoEl = document.getElementById('prfInfoEstado');
  if (estadoEl) {
    estadoEl.textContent = estado;
    estadoEl.style.color = estado === 'activo' ? 'var(--success)' : 'var(--error)';
  }
  const activoEl = document.getElementById('prfInfoActivo');
  if (activoEl) {
    activoEl.textContent = activo ? 'Sí' : 'No';
    activoEl.style.color  = activo ? 'var(--success)' : 'var(--error)';
    activoEl.style.fontWeight = 'bold';
  }

  const wiD = wiDate(null);
  _set('prfInfoCreado',    creado     ? (wiD.get(creado,     'local') ?? '—') : '—');
  _set('prfInfoActividad', actualizado ? (wiD.get(actualizado,'local') ?? '—') : '—');
  _set('prfInfoRol', ROL_MAP[rol] || rol);
};

// ── LISTENERS (event delegation en el wrapper) ────────────────────────────────
const listeners = [];
const addDocListener = (type, selector, handler) => {
  const wrapper = e => {
    if (!e.target?.closest) return;
    const t = e.target.closest(selector);
    if (t) handler.call(t, e);
  };
  document.addEventListener(type, wrapper);
  listeners.push({ type, wrapper });
};

export const cleanup = () => {
  listeners.forEach(({ type, wrapper }) => document.removeEventListener(type, wrapper));
  listeners.length = 0;
};

// ── INIT ──────────────────────────────────────────────────────────────────────
export const init = async () => {
  cleanup();

  // 1️⃣  CACHE-FIRST: pintar al instante desde localStorage
  const uLocal = getls('wiSmile');
  if (!uLocal?.usuario) return;

  _prefill(uLocal);
  document.querySelectorAll('.wi_fadeUp').forEach(el => el.classList.add('visible', 'wi_visible'));
  window.__WIREADY__ = true;

  // 2️⃣  BACKGROUND: sync silencioso con Firestore (sin bloquear UI)
  getDoc(doc(db, 'smiles', uLocal.usuario)).then(snap => {
    if (!snap.exists()) return;
    const fresh = { ...uLocal, ...snap.data() };
    savels('wiSmile', fresh, 24);
    _prefill(fresh); // re-pinta si hay diferencias
  }).catch(e => console.warn('[perfil] sync:', e));

  // ── GUARDAR PERFIL ────────────────────────────────────────────────────────
  const btnGuardar = document.getElementById('prf_guardar');
  if (btnGuardar) {
    btnGuardar.addEventListener('click', async () => {
      const rawNac = document.getElementById('prf_nacimiento')?.value || '';
      const updates = {
        nombre:     document.getElementById('prf_nombre')?.value.trim()    || '',
        apellidos:  document.getElementById('prf_apellidos')?.value.trim() || '',
        avatar:     document.getElementById('prf_avatar')?.value.trim()    || '/smile.avif',
        bio:        document.getElementById('prf_bio')?.value.trim()       || '',
        celular:    document.getElementById('prf_celular')?.value.trim()   || '',
        instagram:  document.getElementById('prf_instagram')?.value.trim() || '',
        pais:       document.getElementById('prf_pais')?.value.trim()      || '',
        genero:     document.getElementById('prf_genero')?.value           || '',
        tema:       document.getElementById('prf_tema')?.value             || 'cielo',
        actualizado: serverTimestamp()
      };
      if (rawNac) {
        const [yyyy, mm, dd] = rawNac.split('-').map(Number);
        updates.fechaNacimiento = new Date(yyyy, mm - 1, dd, 12).toISOString();
      }
      if (!updates.nombre) {
        wiTip(document.getElementById('prf_nombre'), 'Ingresa tu nombre', 'error');
        return;
      }
      btnGuardar.disabled = true;
      btnGuardar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
      try {
        await updateDoc(doc(db, 'smiles', uLocal.usuario), updates);
        const merged = { ...uLocal, ...updates, ultActividad: Date.now() };
        savels('wiSmile', merged, 24);
        // Actualizar hero con nuevos datos
        const avImgEl = document.getElementById('prfHeroAv');
        if (avImgEl) avImgEl.src = updates.avatar;
        _set('prfHeroFullname', `${updates.nombre} ${updates.apellidos}`.trim());
        _aplicarTema(updates.tema);
        Mensaje('<i class="fas fa-check-circle"></i> Perfil actualizado', 'success');
      } catch (e) {
        console.error(e);
        Mensaje('Error al guardar el perfil', 'error');
      } finally {
        btnGuardar.disabled = false;
        btnGuardar.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';
      }
    });
  }

  // ── CAMBIAR CONTRASEÑA ────────────────────────────────────────────────────
  const btnPass = document.getElementById('prf_guardar_pass');
  if (btnPass) {
    btnPass.addEventListener('click', async () => {
      const p1El = document.getElementById('prf_pass');
      const p2El = document.getElementById('prf_pass_conf');
      const p1   = p1El?.value || '';
      const p2   = p2El?.value || '';
      if (!p1 || p1.length < 6) { wiTip(p1El, 'Mínimo 6 caracteres', 'error'); return; }
      if (p1 !== p2)            { wiTip(p2El, 'Las contraseñas no coinciden', 'error'); return; }

      btnPass.disabled = true;
      btnPass.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualizando...';
      try {
        await updatePassword(auth.currentUser, p1);
        if (p1El) p1El.value = '';
        if (p2El) p2El.value = '';
        Mensaje('<i class="fas fa-key"></i> Contraseña actualizada', 'success');
      } catch (e) {
        console.error(e);
        Mensaje('Error al actualizar la contraseña', 'error');
      } finally {
        btnPass.disabled = false;
        btnPass.innerHTML = '<i class="fas fa-key"></i> Actualizar Contraseña';
      }
    });
  }

  // ── PREVIEW TEMA en tiempo real ───────────────────────────────────────────
  const temaSelectEl = document.getElementById('prf_tema');
  if (temaSelectEl) {
    temaSelectEl.addEventListener('change', function () { _aplicarTema(this.value); });
  }

  // ── TOGGLE OJITOS (delegación — funciona aunque el DOM cambie) ────────────
  addDocListener('click', '.prf_pass_eye', function (e) {
    e.preventDefault();
    const input = document.getElementById(this.getAttribute('data-target') || '');
    const icon  = this.querySelector('i');
    if (!input || !icon) return;
    const isPass    = input.type === 'password';
    input.type      = isPass ? 'text' : 'password';
    icon.className  = isPass ? 'fas fa-eye' : 'fas fa-eye-slash';
  });

  console.log(`${app} Perfil listo`);
};
