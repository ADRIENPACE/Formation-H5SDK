# Formation H5 SDK
Projet de **formation** pour créer des applications **H5 SDK Angular** avec le framework **ODIN Infor M3**.

Ce dépôt sert de support d’apprentissage pour développer des mashups et applications web intégrées au client M3 H5 (Infor M3), en utilisant :

- **Angular** pour l’interface et la logique applicative
- **M3 Odin SDK** pour les appels MI, le contexte utilisateur M3 et l’intégration avec H5

Documentation et dépôt officiel du SDK : **[M3 H5 SDK (infor-cloud/m3-h5-sdk)](https://github.com/infor-cloud/m3-h5-sdk)**

---

## Installation et Informations

### Server Node.js

Utiliser **Node.js** ou **NVM** (pour gérer plusieurs versions de Node.js) :

- [Node.js — téléchargements](https://nodejs.org/en/download/current)
- [NVM — guide d’installation](https://www.nvmnode.com/guide/download.html)
- [NVM Windows — releases](https://github.com/coreybutler/nvm-windows/releases)

### Framework Odin Infor H5 SDK

Installation du CLI Odin :

```bash
npm install -g @infor-up/m3-odin-cli
```

- Dépôt Git Odin Infor : [m3-h5-sdk](https://github.com/infor-cloud/m3-h5-sdk)

### Commandes Odin

| Commande | Description |
|----------|-------------|
| `odin serve` | Démarrer le serveur de développement local pour tester l’application dans le contexte Odin. |
| `odin build` | Générer le fichier d’installation (bundle) prêt à être déployé sur M3 H5. |

Exemples :

```bash
# Lancer le serveur de développement
odin serve

# Générer le fichier d’installation pour le déploiement
odin build
```

### Installation des modules

- **Tous les dépendances du projet** (depuis la racine du projet) :
  `npm i` ou `npm install`

- **Option `-g` (global)** : installe le package **globalement** sur la machine, et non dans le dossier `node_modules` du projet. Utile pour les **outils en ligne de commande** (ex. `@infor-up/m3-odin-cli`, `@angular/cli`) que vous voulez utiliser dans n’importe quel projet. Sans `-g`, le package est installé **localement** au projet et enregistré dans `package.json`.

- **Installation d’un module précis** :
  - En global (ex. outil CLI) :
    `npm i -g @infor-up/m3-odin-cli`
  - En local (ex. librairies pour le projet) :
    `npm i @ngx-translate/core`
    `npm i @ngx-translate/http-loader`

### Framework CSS Infor (IDS)

- [Infor Design System](https://design.infor.com/)
- [Enterprise NG — exemples sources](https://github.com/anhallbe/enterprise-ng/tree/master/src/app)
- [Enterprise NG — DataGrid editors](https://anhallbe.github.io/enterprise-ng/datagrid-editors)

---

## Concepts Angular : Observables, Signals et contrôle de flux (template)

### Observables (RxJS)

Les **Observables** permettent de gérer des flux de données asynchrones (événements, requêtes HTTP, etc.). Un Observable émet des valeurs dans le temps ; on s'y abonne avec `subscribe()` pour réagir à ces émissions.

- **Documentation officielle** : [RxJS — Introduction aux Observables](https://rxjs.dev/guide/observable)
- Dans Angular, les services comme `HttpClient` retournent des Observables. On utilise souvent les opérateurs RxJS (`map`, `catchError`, `switchMap`, etc.) pour transformer ou combiner ces flux.
- Pour éviter les fuites mémoire, il faut se désabonner (ou utiliser `async` dans le template, ou `takeUntilDestroyed()`).

### Signals (`signal()`)

Les **Signals** sont un mécanisme de réactivité introduit dans Angular 16+. Un signal est une valeur réactive : quand elle change, Angular met à jour uniquement les parties du template qui en dépendent.

- **Création** : `count = signal(0);`
- **Lecture** : dans la classe avec `this.count()` ; dans le template avec `{{ count() }}`
- **Modification** : `count.set(1)` ou `count.update(v => v + 1)`
- Les signals évitent le besoin de détection de changements sur tout le composant et simplifient l'état réactif.

### Contrôle de flux dans le template : `@if`, `@else`, `@switch`

Angular 17+ propose une **nouvelle syntaxe de contrôle de flux** dans les templates HTML, plus lisible que `*ngIf` / `*ngSwitch`.

| Syntaxe | Rôle |
|--------|------|
| `@if (condition)` | Affiche le bloc si la condition est vraie. |
| `@else` | Bloc exécuté quand le `@if` associé est faux. |
| `@switch (expression)` | Choisit un bloc selon la valeur de l'expression. |
| `@case (valeur)` | Un cas possible dans un `@switch`. |
| `@default` | Cas par défaut dans un `@switch`. |

**Exemple avec `@if` / `@else` :**

```html
@if (user(); as u) {
  <p>Bonjour, {{ u.name }}</p>
} @else {
  <p>Chargement…</p>
}
```

**Exemple avec `@switch` :**

```html
@switch (status()) {
  @case ('loading') {
    <span>Chargement…</span>
  }
  @case ('success') {
    <span>Succès</span>
  }
  @default {
    <span>État inconnu</span>
  }
}
```

Cette syntaxe remplace progressivement `*ngIf`, `*ngFor` et `*ngSwitch` dans les templates Angular.

### Exemples d’utilisation du framework Odin

- [Samples Odin (soho-app)](https://github.com/infor-cloud/m3-h5-sdk/tree/master/m3-odin/src/app/soho-app/samples)

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.
