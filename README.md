# Ledger

Personal income/expense tracker. React + Vite frontend, Firebase (Auth + Firestore) backend, deployed on Firebase Hosting.

## Local development

```
npm install
npm run dev
```

## Build

```
npm run build
```

Outputs to `dist/`, which is what Firebase Hosting serves (see `firebase.json`).

## Deploy

Manual deploy:

```
npm run build
firebase deploy --only hosting
```

Auto-deploy from GitHub: after pushing this repo to GitHub, run `firebase init hosting:github` from this folder and follow the prompts (pick this repo, deploy on push to `main`). That sets up a GitHub Actions workflow and a repo secret automatically — after that, every `git push` builds and deploys on its own.

## Firestore security rules

`firestore.rules` in this repo mirrors what's configured in the Firebase console (Firestore → Rules). To push a change from here instead of the console:

```
firebase deploy --only firestore:rules
```

## Project structure

- `src/LedgerApp.jsx` — the app: categories, entry/bank logic, and the UI.
- `src/AuthGate.jsx` — email/password sign-in screen; renders `LedgerApp` once signed in.
- `src/firebase.js` — Firebase config + Auth/Firestore helpers.
- `src/styles.css` — design system (Nocturne) styles.
