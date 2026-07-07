import estilosWin from './win.css?inline';
import { db } from '@core/firebase-db.js';
import { collection, doc, query, where, getDocs, deleteDoc, serverTimestamp, limit, writeBatch } from 'firebase/firestore';
import { Notificacion, getls, wiTip, wiSpin } from '@core/widev/widev.js';

/* ══════════════════════════════════════════════════════════════
   WIN v22.0 — "Right Drawer & Content First"
   🚀 Content top/first · Sidebar Right Drawer · Mobile Optimized
   📝 Colección: wiWin · 100% Pro Industrial Responsive
   ══════════════════════════════════════════════════════════════ */

let docs = [], sel = null, bus = '', _onVis = null, loading = true, isPub = false, savedRange = null;
const COL = 'wiWin', CACHE = 'wi_win_cache', wi = () => getls('wiSmile') || {};

const _save = d => localStorage.setItem(CACHE, JSON.stringify(d));
const _get = () => JSON.parse(localStorage.getItem(CACHE) || '[]');
const _sort = () => docs.sort((a, b) => (b.pin ? 1 : 0) - (a.pin ? 1 : 0) || (b.fechaActualizado?.seconds || 0) - (a.fechaActualizado?.seconds || 0));
const _nowTs = () => ({ seconds: Math.floor(Date.now() / 1000) });

const _cargar = async (u, silent = false) => {
    isPub = !u?.email;
    if (isPub) { loading = false; _auto(); return; }
    if (!silent) {
        document.querySelectorAll('.es_btn_refresh').forEach(el => el.classList.add('syncing'));
    }
    try {
        const q = query(collection(db, COL), where('email', '==', u.email), limit(100));
        const snap = await getDocs(q);
        docs = snap.docs.map(d => ({ _fsId: d.id, ...d.data() }));
        _sort(); _save(docs); loading = false; _auto();
    } catch (e) { 
        loading = false; 
        if (!silent) _render(); 
    } finally { 
        document.querySelectorAll('.es_btn_refresh').forEach(el => el.classList.remove('syncing')); 
    }
};

const _auto = () => { if (!sel) sel = docs.find(d => d.pin) || docs[0] || null; _render(); };

const _guardar = async (manual = false) => {
    if (!sel) return;
    const u = wi();
    const btn = document.getElementById('btnS2');
    const titleInp = document.querySelector('.es_in_title_h');
    const editor = document.querySelector('.es_editor');
    
    const tit = titleInp ? titleInp.value.trim() || 'Untitled' : 'Untitled';
    const cnt = editor ? editor.innerHTML : '';
    
    sel.titulo = tit;
    sel.contenido = cnt;
    if (sel._dirty) sel.fechaActualizado = _nowTs();
    const pendientes = docs.filter(d => d._dirty);
    if (!pendientes.length) {
        if (manual) Notificacion('Sin cambios por guardar', 'info', 800);
        return;
    }
    
    _save(docs);
    if (manual && btn) wiSpin(btn, true, 'Guardando');
    if (isPub) {
        pendientes.forEach(d => d._dirty = false);
        _save(docs);
        _renderList();
        if (manual && btn) {
            setTimeout(() => {
                wiSpin(btn, false, 'Guardado');
                setTimeout(() => {
                    btn.innerHTML = '<i class="fas fa-save"></i> <span id="iconSync">Guardar</span>';
                }, 1500);
            }, 600);
        }
        return;
    }

    try {
        const batch = writeBatch(db);
        for (const d of pendientes) {
            const dataToSave = {
                id: d.id,
                titulo: d.titulo || 'Untitled',
                contenido: d.contenido || '',
                email: u.email,
                usuario: u.usuario || 'Public',
                fecha: d.fecha || serverTimestamp(),
                fechaActualizado: serverTimestamp(),
                pin: !!d.pin
            };
            batch.set(doc(db, COL, d._fsId), dataToSave);
            d._dirty = false;
        }
        await batch.commit();
        _save(docs);
        _renderList();
        if (manual) {
            Notificacion('Sincronización Exitosa ✨', 'success', 800);
            if (btn) wiSpin(btn, false, 'Guardado');
        }
    } catch (e) { 
        if (manual) {
            console.error("Save Error:", e);
            Notificacion('Error al guardar', 'error');
            if (btn) wiSpin(btn, false, 'Reintentar');
        }
    } finally {
        if (manual) {
            setTimeout(() => {
                const s2 = document.getElementById('btnS2');
                if (s2) s2.innerHTML = '<i class="fas fa-save"></i> <span>Guardar</span>';
            }, 2000);
        }
    }
};

const _nuevo = async () => {
    const u = wi(), ts = Date.now(), id = `win${ts}`;
    const localTs = _nowTs();
    const nuevo = { _fsId: id, id: id, titulo: '', contenido: '', pin: false, email: u.email || 'guest', usuario: u.usuario || 'Public', fecha: localTs, fechaActualizado: localTs, _dirty: true };
    docs.unshift(nuevo); sel = nuevo; _save(docs); _render();
    const titleInp = document.querySelector('.es_in_title_h');
    if (titleInp) titleInp.focus();
    const container = document.querySelector('.es_container');
    if (container) container.classList.remove('menu-open');
};

const _borrar = async (id, btn = null) => {
    if (!confirm('¿Eliminar?')) return;
    if (btn) wiSpin(btn, true, '...');
    try {
        docs = docs.filter(d => d._fsId !== id);
        if (sel?._fsId === id) sel = docs[0] || null;
        _save(docs);
        if (!isPub) await deleteDoc(doc(db, COL, id));
        _render();
    } catch (e) {
        if (btn) wiSpin(btn, false, '<i class="fas fa-trash-alt"></i>');
        Notificacion('Error al eliminar', 'error');
    }
};

const _togglePin = async (id) => {
    const d = docs.find(x => x._fsId === id);
    if (d) { 
        d.pin = !d.pin; d._dirty = true; d.fechaActualizado = _nowTs(); _sort(); _save(docs); _render();
    }
};

const _checkTools = () => {
    document.querySelectorAll('.es_tool_btn[data-cmd]').forEach(el => {
        const cmd = el.getAttribute('data-cmd');
        try {
            if (document.queryCommandState(cmd)) el.classList.add('active');
            else el.classList.remove('active');
        } catch(e) {}
    });
    try {
        const selNode = window.getSelection().anchorNode;
        if (selNode) {
            const el = selNode.nodeType === 3 ? selNode.parentNode : selNode;
            if (el.closest('.es_editor')) {
                const css = window.getComputedStyle(el);
                const winFontSize = document.getElementById('winFontSize');
                if (css.fontSize && winFontSize) winFontSize.value = parseInt(css.fontSize, 10);
                
                const winFontFamily = document.getElementById('winFontFamily');
                if (css.fontFamily && winFontFamily) {
                    const fam = css.fontFamily.split(',')[0].replace(/['"]/g, '');
                    for (const opt of winFontFamily.options) {
                        if (opt.text === fam || opt.value.includes(fam)) {
                            winFontFamily.value = opt.value;
                            break;
                        }
                    }
                }
                const block = el.closest('p, div, h1, h2, h3, h4, h5, h6, li');
                if (block) {
                    const inlineLh = block.style.lineHeight;
                    const winLineHeight = document.getElementById('winLineHeight');
                    if (inlineLh && winLineHeight) winLineHeight.value = inlineLh;
                    
                    const btnNoMargin = document.getElementById('btnNoMargin');
                    if (btnNoMargin) {
                        if (block.style.marginBottom === '0px' || css.marginBottom === '0px') {
                            btnNoMargin.classList.add('active');
                        } else {
                            btnNoMargin.classList.remove('active');
                        }
                    }
                }
            }
        }
    } catch(e) {}
};

const _renderList = () => {
    const items = docs.filter(d => (d.titulo||'').toLowerCase().includes(bus.toLowerCase()));
    const container = document.querySelector('.es_list_items_final');
    if (!container) return;
    
    container.innerHTML = items.map(d => {
        let tit = d.titulo || 'Untitled';
        
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = d.contenido || '';
        let plainContent = tempDiv.textContent.trim() || 'Sin contenido...';
        let snippet = plainContent.length > 30 ? plainContent.substring(0, 30) + '...' : plainContent;
        
        const isCloud = !d._dirty;
        const dateStr = new Date((d.fechaActualizado?.seconds || Date.now()/1000) * 1000).toLocaleDateString('es-ES', {day:'2-digit', month:'short'});
        
        return `
        <div class="es_item_final ${sel?._fsId === d._fsId ? 'active' : ''}" data-id="${d._fsId}">
            <div class="it_r1">
                <strong class="it_title">${d.pin ? '<i class="fas fa-thumbtack pin_ico"></i> ' : ''}${tit}</strong>
                <div class="it_icons">
                    <span class="it_status" ${wiTip(isCloud ? 'Guardado' : 'Pendiente')}>
                        ${isCloud ? '<i class="fas fa-cloud"></i>' : '<i class="fas fa-sync-alt fa-spin" style="color:var(--warning)"></i>'}
                    </span>
                    <i class="fas fa-thumbtack it_action btnPin" data-id="${d._fsId}" style="${d.pin ? 'color:var(--mco)' : ''}" ${wiTip(d.pin ? 'Desanclar' : 'Anclar')}></i>
                    <i class="fas fa-trash-alt it_action btnDel" data-id="${d._fsId}" ${wiTip('Borrar')}></i>
                </div>
            </div>
            <div class="it_r2">
                <span class="it_snippet">${snippet}</span>
                <span class="it_date">${dateStr}</span>
            </div>
        </div>`;
    }).join('') || `<div class="txc" style="margin-top:20px; opacity:0.4; font-size:12px;">No hay documentos</div>`;
};

const _renderEditor = () => {
    const leftEl = document.querySelector('.es_left');
    if (!leftEl) return;
    if (loading && !docs.length) {
        leftEl.innerHTML = `<div class="es_skeleton"> <div class="sk_line" style="width:40%"></div> <div class="sk_line"></div> </div>`;
        return;
    }
    if (!sel) {
        leftEl.innerHTML = `<div style="margin:auto; text-align:center;"><button class="es_btn_new_final" id="btnS1" style="width:280px">+ Nuevo Win</button></div>`;
        return;
    }

    leftEl.innerHTML = `
        <div class="es_page">
            <div class="es_page_header">
                <div class="es_header_left">
                    <input type="text" class="es_in_title_h" placeholder="Escribir el título..." value="${sel.titulo || ''}" spellcheck="false">
                </div>
                <div class="es_header_right">
                    <button class="es_btn_pro save" id="btnS2"><i class="fas fa-save" id="iconSync"></i> <span>Guardar</span></button>
                    <button class="es_btn_pro del" id="btnD2" ${wiTip('Eliminar permanentemente')}><i class="fas fa-trash-alt"></i> <span>Eliminar</span></button>
                    <button class="es_btn_menu" id="toggleMenu" ${wiTip('Historial')}><i class="fas fa-history"></i></button>
                </div>
            </div>
            <div class="es_page_content">
                <div class="es_editor" contenteditable="true" data-placeholder="Escriba aquí contenido pro..." spellcheck="false">${sel.contenido || ''}</div>
            </div>
            <div class="es_page_footer">
                <div class="es_page_footer_inner" style="display:flex; flex-wrap:wrap; align-items:center; gap:0.5vh;">
                    <div class="es_footer_group">
                        ${['bold','italic','underline','strikeThrough'].map(c => `
                        <button class="es_tool_btn" data-cmd="${c}" ${wiTip(c)}><i class="fas fa-${c==='bold'?'bold':c==='italic'?'italic':c==='underline'?'underline':'strikethrough'}"></i></button>
                        `).join('')}
                    </div>
                    <div class="es_footer_sep"></div>
                    <div class="es_footer_group">
                        ${['justifyLeft','justifyCenter','justifyRight','justifyFull'].map(c => `
                        <button class="es_tool_btn" data-cmd="${c}" ${wiTip(c)}><i class="fas fa-align-${c==='justifyLeft'?'left':c==='justifyCenter'?'center':c==='justifyRight'?'right':'justify'}"></i></button>
                        `).join('')}
                    </div>
                    <div class="es_footer_sep"></div>
                    <div class="es_footer_group">
                        <button class="es_tool_btn" data-cmd="insertUnorderedList" ${wiTip('Lista')}><i class="fas fa-list-ul"></i></button>
                        <button class="es_tool_btn" data-cmd="insertOrderedList" ${wiTip('Numerada')}><i class="fas fa-list-ol"></i></button>
                    </div>
                    <div class="es_footer_sep"></div>
                    <div class="es_footer_group">
                        <input type="text" id="winFontSize" class="es_font_text" value="16" maxlength="2" title="Tamaño de fuente" autocomplete="off">
                    </div>
                    <div class="es_footer_sep"></div>
                    <div class="es_footer_group">
                        <select id="winFontFamily" class="es_font_sel" title="Familia de fuente">
                            <option value="inherit">Sistema</option>
                            <option value="Arial, sans-serif">Arial</option>
                            <option value="'Poppins', sans-serif">Poppins</option>
                            <option value="'Rubik', sans-serif">Rubik</option>
                            <option value="Georgia, serif">Georgia</option>
                            <option value="'Courier New', monospace">Courier</option>
                            <option value="'Times New Roman', serif">Times</option>
                        </select>
                    </div>
                    <div class="es_footer_sep"></div>
                    <div class="es_footer_group">
                        <select id="winLineHeight" class="es_font_sel" title="Interlineado" style="width: 58px; padding: 0 0.5vh;">
                            <option value="1">1.0</option>
                            <option value="1.15">1.15</option>
                            <option value="1.5">1.5</option>
                            <option value="2">2.0</option>
                        </select>
                        <button class="es_tool_btn" id="btnNoMargin" title="Eliminar espacio de párrafos"><i class="fas fa-compress-alt"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
};

const _render = () => {
    const container = document.querySelector('.es_container');
    if (!container) {
        const wimain = document.getElementById('wimain');
        if (wimain) wimain.innerHTML = render();
    }
    _renderEditor();
    _renderList();
};

export const render = () => {
    return `<style>${estilosWin}</style><div class="es_container">
        <div class="es_overlay"></div>
        <div class="es_left"></div>
        <div class="es_right">
            <div class="es_sidebar_final">
                <div class="es_sidebar_actions">
                    <button class="es_btn_new_final" id="btnN1">+ Nuevo Win</button>
                    <button class="es_btn_refresh" id="btnSync" ${wiTip('Sync Firestore')}><i class="fas fa-sync-alt"></i></button>
                </div>
                <input type="text" class="es_search_final" placeholder="Buscar documentos...">
                <div class="es_list_items_final"></div>
                <div style="margin-top:auto; font-size:10px; opacity:0.5; display:flex; align-items:center; gap:5px;">
                    <div class="wn_dot_final"></div> ${isPub ? 'Offline - Local Mode' : 'Online - wiWin Cloud'}
                </div>
            </div>
        </div>
    </div>`;
};

const listeners = [];
const addDocListener = (type, selector, handler) => {
  const wrapper = e => {
    const target = e.target.closest(selector);
    if (target) handler.call(target, e);
  };
  document.addEventListener(type, wrapper);
  listeners.push({ type, wrapper });
};

export const init = async () => {
    cleanup();
    const u = wi();
    isPub = !u.email;
    docs = _get();
    if (docs.length) { loading = false; _auto(); } else { _render(); _cargar(u, true); }

    addDocListener('click', '.es_tool_btn[data-cmd]', function() {
        document.execCommand(this.getAttribute('data-cmd'));
        const editor = document.querySelector('.es_editor');
        if (editor) editor.focus();
        _checkTools();
    });

    addDocListener('input', '.es_editor, .es_in_title_h', function() { 
        if (sel) {
            const titleInp = document.querySelector('.es_in_title_h');
            const editor = document.querySelector('.es_editor');
            sel.titulo = titleInp ? titleInp.value.trim() : '';
            sel.contenido = editor ? editor.innerHTML : '';
            sel._dirty = true;
            sel.fechaActualizado = _nowTs();
            _save(docs);
            
            const item = document.querySelector(`.es_item_final[data-id="${sel._fsId}"]`);
            if (item) {
                const statusEl = item.querySelector('.it_status');
                if (statusEl) statusEl.innerHTML = '<i class="fas fa-sync-alt fa-spin" style="color:var(--warning)"></i>';
                if (this.classList.contains('es_in_title_h')) {
                    const titleEl = item.querySelector('.it_title');
                    if (titleEl) titleEl.innerHTML = (sel.pin ? '<i class="fas fa-thumbtack pin_ico"></i> ' : '') + (sel.titulo || 'Untitled');
                } else {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = sel.contenido;
                    let plain = tempDiv.textContent.trim() || 'Sin contenido...';
                    let sn = plain.length > 30 ? plain.substring(0, 30) + '...' : plain;
                    const snippetEl = item.querySelector('.it_snippet');
                    if (snippetEl) snippetEl.textContent = sn;
                }
            }
            
            if (editor && this.classList.contains('es_editor')) {
                const selection = window.getSelection();
                if (selection?.rangeCount) {
                    const r = selection.getRangeAt(0).getBoundingClientRect();
                    const cont = editor.closest('.es_page_content');
                    if (cont) {
                        const box = cont.getBoundingClientRect();
                        if (r.bottom > box.bottom - 40) cont.scrollTop += (r.bottom - box.bottom + 60);
                    }
                }
            }
        }
    });

    addDocListener('click', '#btnS2', () => _guardar(true));
    addDocListener('click', '#btnSync', () => _cargar(wi()));
    
    addDocListener('click', '#btnD2, .btnDel', function(e) {
        e.stopPropagation();
        const id = this.getAttribute('data-id') || sel._fsId;
        _borrar(id, this);
    });

    addDocListener('click', '.btnPin', function(e) {
        e.stopPropagation();
        const id = this.getAttribute('data-id');
        _togglePin(id);
    });

    addDocListener('click', '#btnN1, #btnS1', _nuevo);

    addDocListener('click', '#toggleMenu, .es_overlay', () => {
        const container = document.querySelector('.es_container');
        if (container) container.classList.toggle('menu-open');
    });

    addDocListener('click', '.es_item_final', function() { 
        const newId = this.getAttribute('data-id');
        if (sel?._fsId === newId) return;
        sel = docs.find(d => d._fsId === newId);
        _render();
        _checkTools();
        const container = document.querySelector('.es_container');
        if (container) container.classList.remove('menu-open');
    });

    addDocListener('input', '.es_search_final', function() {
        bus = this.value;
        _renderList();
    });

    addDocListener('keyup', '.es_editor', function() {
        _checkTools();
        const s = window.getSelection();
        if (s.rangeCount > 0) savedRange = s.getRangeAt(0);
    });
    addDocListener('mouseup', '.es_editor', function() {
        _checkTools();
        const s = window.getSelection();
        if (s.rangeCount > 0) savedRange = s.getRangeAt(0);
    });
    addDocListener('click', '.es_editor', function() {
        _checkTools();
        const s = window.getSelection();
        if (s.rangeCount > 0) savedRange = s.getRangeAt(0);
    });

    addDocListener('keydown', '.es_in_title_h', function(e) {
        if (e.key === 'Tab') {
            e.preventDefault();
            const editor = document.querySelector('.es_editor');
            if (editor) editor.focus();
        }
    });

    addDocListener('keydown', '#winFontSize', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const v = Math.max(8, Math.min(72, parseInt(this.value, 10) || 16));
            this.value = v;
            
            if (savedRange) {
                const s = window.getSelection();
                s.removeAllRanges();
                s.addRange(savedRange);
            }
            
            document.execCommand('styleWithCSS', false, true);
            document.execCommand('fontSize', false, '7');
            
            const editor = document.querySelector('.es_editor');
            if (editor) {
                editor.querySelectorAll('font[size="7"], span[style*="xxx-large"]').forEach(font => {
                    font.removeAttribute('size');
                    font.style.fontSize = v + 'px';
                });
                editor.focus();
                editor.dispatchEvent(new Event('input', { bubbles: true }));
            }
            _checkTools();
        }
    });

    addDocListener('change', '#winFontFamily', function() {
        if (savedRange) {
            const s = window.getSelection();
            s.removeAllRanges();
            s.addRange(savedRange);
        }
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('fontName', false, this.value);
        
        const editor = document.querySelector('.es_editor');
        if (editor) {
            editor.focus();
            editor.dispatchEvent(new Event('input', { bubbles: true }));
        }
        _checkTools();
    });

    addDocListener('change', '#winLineHeight', function() {
        if (savedRange) {
            const s = window.getSelection();
            s.removeAllRanges();
            s.addRange(savedRange);
        }
        const s = window.getSelection();
        if (s.rangeCount) {
            const r = s.getRangeAt(0);
            const common = r.commonAncestorContainer;
            const node = common.nodeType === 3 ? common.parentNode : common;
            
            let blocks = [];
            if (node.classList.contains('es_editor')) {
                blocks = Array.from(node.children).filter(child => s.containsNode(child, true));
                if (!blocks.length) blocks = [node];
            } else {
                const b = node.closest('p, div, h1, h2, h3, h4, h5, h6, li');
                if (b) blocks = [b];
            }
            
            blocks.forEach(b => b.style.lineHeight = this.value);
        }
        const editor = document.querySelector('.es_editor');
        if (editor) {
            editor.focus();
            editor.dispatchEvent(new Event('input', { bubbles: true }));
        }
        _checkTools();
    });

    addDocListener('click', '#btnNoMargin', function() {
        if (savedRange) {
            const s = window.getSelection();
            s.removeAllRanges();
            s.addRange(savedRange);
        }
        const s = window.getSelection();
        if (s.rangeCount) {
            const r = s.getRangeAt(0);
            const common = r.commonAncestorContainer;
            const node = common.nodeType === 3 ? common.parentNode : common;
            
            let blocks = [];
            if (node.classList.contains('es_editor')) {
                blocks = Array.from(node.children).filter(child => s.containsNode(child, true));
                if (!blocks.length) blocks = [node];
            } else {
                const b = node.closest('p, div, h1, h2, h3, h4, h5, h6, li');
                if (b) blocks = [b];
            }
            
            blocks.forEach(b => {
                const css = window.getComputedStyle(b);
                const current = css.marginBottom;
                if (current === '0px') {
                    b.style.marginTop = '';
                    b.style.marginBottom = '';
                } else {
                    b.style.marginTop = '0px';
                    b.style.marginBottom = '0px';
                    b.style.paddingBottom = '0px';
                }
            });
        }
        const editor = document.querySelector('.es_editor');
        if (editor) {
            editor.focus();
            editor.dispatchEvent(new Event('input', { bubbles: true }));
        }
        _checkTools();
    });
};

export const cleanup = () => {
    listeners.forEach(({ type, wrapper }) => document.removeEventListener(type, wrapper));
    listeners.length = 0;
    if (_onVis) document.removeEventListener('visibilitychange', _onVis);
    docs = [];
    sel = null;
    savedRange = null;
};
