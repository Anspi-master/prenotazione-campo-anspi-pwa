# PWA shell per GitHub Pages

Questa cartella contiene una shell PWA (manifest + service worker) che incapsula l'app Google Apps Script tramite iframe.

## Requisiti
- URL pubblico dell'app Apps Script in produzione (termina con `/exec`).
- Un repository GitHub con GitHub Pages attivato (branch `main` o `gh-pages`).

## Setup rapido
1. Apri `pwa-github/index.html` e sostituisci:
   - `REPLACE_WITH_APPS_SCRIPT_EXEC_URL` con il tuo URL Apps Script `/exec`.
2. Conferma che le icone esistano in `../assets/`:
   - `icon-192.png`
   - `icon-512.png`
3. Committa e push su GitHub.
4. Attiva GitHub Pages nelle impostazioni del repo:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` (consigliato) o `main` configurando la cartella corretta.

Consigliato: pubblica direttamente la cartella `pwa-github` come contenuto di Pages.

## Struttura
- `index.html`: shell che registra il service worker e incorpora l'Apps Script tramite iframe
- `manifest.webmanifest`: manifest PWA con icone
- `service-worker.js`: cache minima per la shell (l'iframe resta online-only)

## Limitazioni
L'iframe carica un dominio differente (Apps Script): il service worker non può intercettare le richieste dell'app interna (CORS/origin). La shell resta installabile e cache-abile, ma la parte dinamica richiede rete.

## Deploy automatico con GitHub Actions (opzionale)
Puoi usare un workflow per pubblicare la cartella `pwa-github` su `gh-pages` ad ogni push su `main`.

1. Crea il file `.github/workflows/deploy-gh-pages.yml` nel repo GitHub con il seguente contenuto.
2. Abilita Pages dal branch `gh-pages` nelle impostazioni del repo.

### Workflow di esempio
```yaml
name: Deploy PWA shell to gh-pages
on:
  push:
    branches: [ main ]
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: pwa-github
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

## Test
- Apri l'URL di GitHub Pages e verifica in DevTools > Application:
  - Manifest caricato
  - Service worker attivo
- Prova l'installazione da browser/mobile.

## Personalizzazioni
- Cambia colori (theme/background) in `manifest.webmanifest` e `index.html`.
- Aggiungi file statici alla cache in `service-worker.js` se necessario.


