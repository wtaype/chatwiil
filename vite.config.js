import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inlineWitemaPlugin = {
  name: 'inline-witema-css',
  transformIndexHtml(html) {
    const cssPath = path.resolve(__dirname, './smiles/core/witema.css');
    if (fs.existsSync(cssPath)) {
      let css = fs.readFileSync(cssPath, 'utf-8');
      // Minificación básica de CSS
      css = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').trim();
      return html.replace('<!--WITEMA_CSS_PLACEHOLDER-->', `<style id="witema-global-css">${css}</style>`);
    }
    return html;
  }
};

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './smiles/core'),
      '@features': path.resolve(__dirname, './smiles/features'),
      '@wii': path.resolve(__dirname, './smiles/wii.js'),
      '@rutas': path.resolve(__dirname, './smiles/rutas.js')
    }
  },
  plugins: [
    inlineWitemaPlugin
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    modulePreload: false,
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) return id.includes('firebase') ? 'firebase' : 'vendor';
        }
      },
      plugins: [{
        name: 'minify-html',
        generateBundle(_, b) {
          for (let f in b) if (f.endsWith('.html') && b[f].type === 'asset') 
            b[f].source = b[f].source.replace(/\n\s*/g, '').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').replace(/<!--.*?-->/g, '').trim();
        }
      }]
    }
  },
  publicDir: 'public'
});