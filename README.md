# Kiabi Performance Cockpit

Ce dossier contient une version autonome du cockpit Kiabi, prête à être publiée sur GitHub Pages.

## Contenu

- `App.jsx` : source React complète du cockpit.
- `index.html` : point d'entrée autonome avec React, Lucide et Babel chargés depuis des CDN.

## Lancer en local

Un petit serveur HTTP est nécessaire, car le navigateur ne charge pas correctement les modules ES depuis une URL `file://`.

Depuis ce dossier :

```bash
python3 -m http.server 8000
```

Puis ouvrir `http://localhost:8000`.

## Publier sur GitHub Pages

1. Créer un dépôt GitHub.
2. Déposer `App.jsx`, `index.html` et `README.md` à la racine du dépôt.
3. Dans **Settings > Pages**, choisir **Deploy from a branch**.
4. Sélectionner la branche `main` et le dossier `/ (root)`.
5. Enregistrer, puis attendre la publication de l'URL GitHub Pages.

## Dépendances

Aucune installation ni compilation n'est nécessaire. Le navigateur charge React, ReactDOM, Lucide React et Babel depuis leurs CDN. Une connexion Internet est donc requise.
