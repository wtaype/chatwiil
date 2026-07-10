// smiles/core/widev/wimd.js
// wiMd v2.0: Procesador ligero de Markdown a HTML para respuestas de Chatwii
// Soporta: headers, listas, bloques de código, inline code, bold, italic,
//          enlaces, blockquotes, separadores y párrafos. Sin dependencias.

export const wiMd = (txt = '') => {
  if (typeof txt !== 'string') return '';

  // ── 1. Bloques de código (``` ... ```) — procesar antes de escapar ────────
  const codeBlocks = [];
  txt = txt.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push({ lang: lang || '', code });
    return `\x00CODE${idx}\x00`;
  });

  // ── 2. Escapar HTML para prevenir XSS ────────────────────────────────────
  let html = txt
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // ── 3. Separar en líneas para procesar bloques ───────────────────────────
  const lines = html.split('\n');
  const out = [];
  let inUl = false;
  let inOl = false;

  const closeList = () => {
    if (inUl) { out.push('</ul>'); inUl = false; }
    if (inOl) { out.push('</ol>'); inOl = false; }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Placeholder de bloque de código
    if (/^\x00CODE\d+\x00$/.test(line.trim())) {
      closeList();
      out.push(line); // se restaurará luego
      continue;
    }

    // Separador horizontal ---
    if (/^---+$/.test(line.trim())) {
      closeList();
      out.push('<hr class="wimd_hr">');
      continue;
    }

    // Headers # ## ###
    const hMatch = line.match(/^(#{1,3})\s+(.+)/);
    if (hMatch) {
      closeList();
      const level = hMatch[1].length;
      out.push(`<h${level} class="wimd_h${level}">${hMatch[2]}</h${level}>`);
      continue;
    }

    // Blockquote >
    if (/^&gt;\s?(.*)/.test(line)) {
      closeList();
      const bqContent = line.replace(/^&gt;\s?/, '');
      out.push(`<blockquote class="wimd_bq">${bqContent}</blockquote>`);
      continue;
    }

    // Lista no ordenada - item
    const ulMatch = line.match(/^[-*]\s+(.+)/);
    if (ulMatch) {
      if (!inUl) { if (inOl) { out.push('</ol>'); inOl = false; } out.push('<ul class="wimd_ul">'); inUl = true; }
      out.push(`<li>${ulMatch[1]}</li>`);
      continue;
    }

    // Lista ordenada 1. item
    const olMatch = line.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      if (!inOl) { if (inUl) { out.push('</ul>'); inUl = false; } out.push('<ol class="wimd_ol">'); inOl = true; }
      out.push(`<li>${olMatch[1]}</li>`);
      continue;
    }

    // Línea vacía = cerrar listas + párrafo
    if (line.trim() === '') {
      closeList();
      out.push('');
      continue;
    }

    // Línea normal
    closeList();
    out.push(line);
  }

  closeList();
  html = out.join('\n');

  // ── 4. Inline: bold, italic, inline-code, enlaces ────────────────────────
  html = html
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="wimd_code">$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="wimd_a">$1</a>');

  // ── 5. Restaurar bloques de código ───────────────────────────────────────
  html = html.replace(/\x00CODE(\d+)\x00/g, (_, idx) => {
    const { lang, code } = codeBlocks[parseInt(idx)];
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<div class="wimd_pre_wrap">${lang ? `<span class="wimd_lang">${lang}</span>` : ''}<pre class="wimd_pre"><code>${escaped}</code></pre></div>`;
  });

  // ── 6. Párrafos: líneas no vacías separadas por blancos ──────────────────
  html = html
    .replace(/\n{2,}/g, '</p><p class="wimd_p">')
    .replace(/\n/g, '<br>');

  return `<p class="wimd_p">${html}</p>`;
};