# Formation H5 SDK
Projet de **formation** pour créer des applications **H5 SDK Angular** avec le framework **ODIN Infor M3**.

Ce dépôt sert de support d’apprentissage pour développer des mashups et applications web intégrées au client M3 H5 (Infor M3), en utilisant :

- **Angular** pour l’interface et la logique applicative
- **M3 Odin SDK** pour les appels MI, le contexte utilisateur M3 et l’intégration avec H5

Documentation et dépôt officiel du SDK : **[M3 H5 SDK (infor-cloud/m3-h5-sdk)](https://github.com/infor-cloud/m3-h5-sdk)**

### À propos du README et du CHANGELOG

- **README.md** (ce fichier) : point d’entrée de la documentation du projet. Il décrit le contexte (formation H5 SDK / Odin M3), la structure du projet, les instructions d’installation et de configuration, ainsi que des exemples de code (Observables, appels API M3, UserContext, traduction, version, etc.). À consulter en premier pour démarrer ou pour retrouver un exemple.
- **CHANGELOG.md** : historique des versions et des modifications notables (nouvelles fonctionnalités, changements, corrections). Chaque release y est datée et classée par catégories (Added, Changed, Fixed, etc.), selon le format [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/). Utile pour savoir ce qui a changé entre deux versions et pour communiquer les évolutions aux utilisateurs ou à l’équipe.

---

## Structure du projet

L’application Angular est organisée selon une structure par **dossiers fonctionnels** (app, core, features, shared) pour séparer la racine, les services globaux, les modules métier et les éléments réutilisables.

```
src/
├── app/
│   ├── app.component.ts | .html | .css     # Composant racine, shell de l’app
│   ├── app-routing.module.ts              # Routes de l’application
│   │
│   ├── core/                              # Singleton services, gardes, intercepteurs
│   │   └── services/
│   │       ├── customers.services.ts      # Logique métier / appels MI clients
│   │       └── idm-data.service.ts
│   │
│   ├── features/                          # Modules métier (par fonctionnalité)
│   │   ├── customers/                     # Liste / écran clients
│   │   │   ├── customers.component.ts | .html | .css
│   │   │   └── ...
│   │   └── edit-customer/                 # Édition d’un client
│   │       ├── edit-customer.component.ts | .html | .css
│   │       └── ...
│   │
│   └── shared/                            # (optionnel) Pipes, directives, composants réutilisables
│       # ex. pipes, directives, boutons, champs communs
│
├── assets/                                # Fichiers statiques
│   └── i18n/                              # Fichiers de traduction (fr-FR.json, en-US.json, …)
├── environments/                           # Config par environnement (dev / prod)
│   ├── environment.ts
│   └── environment.prod.ts
├── index.html
├── main.ts
└── styles.css
```

| Dossier | Rôle |
|--------|------|
| **app** | Racine : `AppComponent`, routing, layout global. |
| **core** | Services injectables au niveau racine (ex. services métier, appels M3), gardes, intercepteurs. Importé une seule fois (ex. dans `AppModule` ou `app.config`). |
| **features** | Un dossier par fonctionnalité (ex. `customers`, `edit-customer`). Chaque feature contient les composants, templates et tests liés à cette partie de l’app. |
| **shared** | Éléments réutilisables dans plusieurs features : pipes, directives, composants UI communs (boutons, champs, etc.). Optionnel ; à créer quand le besoin apparaît. |

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

### Affichage du numéro de version du package

La version de l’application est définie dans **`package.json`** (champ `"version"`, ex. `"0.0.0"`). Pour l’afficher dans l’app (footer, à propos, etc.) sans la dupliquer :

1. **Exposer le `package.json` dans l’environment**
   Dans `src/environments/environment.ts` et `environment.prod.ts` :

```typescript
import { default as version } from '../../package.json';

export const environment = {
   appVersion: version,  // objet package.json (contient .version, .name, etc.)
   // ...
};
```

2. **Dans le composant**
   Lire la version via l’environment (le champ `version` du `package.json`) :

```typescript
import { environment } from '../environments/environment';

// Dans la classe du composant :
version = environment.appVersion?.version ?? '';
```

3. **Dans le template**
   Afficher la version (ex. dans un footer) :

```html
<footer class="app-version">v{{ version }}</footer>
```

- **`environment.appVersion`** : référence l’objet `package.json` (avec `version`, `name`, etc.). En build, `environment.ts` est remplacé par `environment.prod.ts` selon la config Angular.
- Pour que l’import du JSON soit accepté par TypeScript, le `tsconfig` doit autoriser la résolution des modules JSON (souvent déjà le cas avec `"resolveJsonModule": true` dans `tsconfig.json`).

### Framework CSS Infor (IDS)

- [Infor Design System](https://design.infor.com/)
- [Enterprise NG — exemples sources](https://github.com/anhallbe/enterprise-ng/tree/master/src/app)
- [Enterprise NG — DataGrid editors](https://anhallbe.github.io/enterprise-ng/datagrid-editors)

### Exemple d'appel API M3 avec Odin (MIService)

Appel d’une transaction MI (ex. **CRS610MI / GetBasicData**) pour récupérer les données de base d’un client. Le `MIService` d’Odin retourne un `Observable<IMIResponse>` ; on s’abonne avec `subscribe()` pour traiter la réponse ou l’erreur.

```typescript
import { IMIRequest, IMIResponse, MIRecord } from '@infor-up/m3-odin';
import { MIService } from '@infor-up/m3-odin-angular';

// Dans le composant : constructor(private miService: MIService) { }

const inputRecord = new MIRecord();
const customer = "ACME";
inputRecord.setString("CUNO", customer);

const request: IMIRequest = {
  program: "CRS610MI",
  transaction: "GetBasicData",
  record: inputRecord,
  outputFields: ["CUNM", "CUNO", "CUA1", "CUA2", "CUA3", "CUA4", "YREF", "CSCD"]
};

this.setBusy(true);
this.miService.execute(request).subscribe(
  (response: IMIResponse) => {
    this.setBusy(false);
    if (!response.hasError()) {
      this.logInfo("Customer Basic data for " + customer);
      const record: MIRecord = response.item as MIRecord;
      const address1 = record["CUA1"];
      const address2 = record["CUA2"];
      this.logInfo("Address 1 " + address1);
      this.logInfo("Address 2 " + address2);
    } else {
      this.handleError(response, customer);
    }
  },
  (response) => {
    this.setBusy(false);
    this.handleError(response, customer);
  }
);
```

- **`MIRecord`** : enregistrement d’entrée (champs de la transaction MI).
- **`IMIRequest`** : programme, transaction, enregistrement et `outputFields` (champs retournés).
- **`miService.execute(request)`** : retourne un `Observable<IMIResponse>` ; le premier callback du `subscribe` reçoit la réponse, le second les erreurs (ex. échec HTTP).

### Récupération du contexte utilisateur (UserService)

Le **UserService** Odin expose `getUserContext()` pour récupérer les informations du profil M3 de l’utilisateur connecté (MNS150) : société (CONO), division (DIVI), langue, identifiant (USID), etc. Ce contexte est souvent chargé au démarrage de l’application.

```typescript
import { IUserContext } from '@infor-up/m3-odin';
import { UserService } from '@infor-up/m3-odin-angular';

// Dans le composant : constructor(private userService: UserService) { }
// Propriété : userContext: IUserContext;

this.userService.getUserContext().subscribe(
  (userContext: IUserContext) => {
    this.userContext = userContext;
    const lang = userContext.currentLanguage;
    const divi = userContext.currentDivision;
    const cono = userContext.currentCompany;
    const usid = userContext.USID;
    this.logInfo(
      "User context: " +
        usid +
        ", cono: " +
        cono +
        ", divi: " +
        divi +
        ", lang: " +
        lang
    );
  },
  (errorContext: IUserContext) => {
    this.logError(errorContext.errorMessage);
  }
);
```

- **`IUserContext`** : contient notamment `currentCompany` (CONO), `currentDivision` (DIVI), `currentLanguage`, `USID`. Le MIService utilise ce contexte pour les paramètres matrice des appels MI si on ne surcharge pas CONO/DIVI dans la requête.
- En cas d’erreur, le second callback reçoit un objet avec `errorMessage`.

---

## Concepts Angular : Observables, Signals et contrôle de flux (template)

### Observables (RxJS)

Les **Observables** permettent de gérer des flux de données asynchrones (événements, requêtes HTTP, etc.). Un Observable émet des valeurs dans le temps ; on s'y abonne avec `subscribe()` pour réagir à ces émissions.

- **Documentation officielle** : [RxJS — Introduction aux Observables](https://rxjs.dev/guide/observable)
- Dans Angular, les services comme `HttpClient` retournent des Observables. On utilise souvent les opérateurs RxJS (`map`, `catchError`, `switchMap`, etc.) pour transformer ou combiner ces flux.
- Pour éviter les fuites mémoire, il faut se désabonner (ou utiliser `async` dans le template, ou `takeUntilDestroyed()`).

**Exemple : `subscribe` avec `next`, `error` et `complete`**

On peut passer un objet à `subscribe()` avec les callbacks `next`, `error` et `complete` :

```typescript
import { Observable, of } from 'rxjs';

// Exemple : un Observable qui émet une valeur puis se termine
const source$: Observable<string> = of('Hello', 'World');

const subscription = source$.subscribe({
  next: (value) => {
    console.log('Valeur reçue:', value);  // "Hello" puis "World"
  },
  error: (err) => {
    console.error('Erreur:', err);
  },
  complete: () => {
    console.log('Flux terminé');
  }
});

// Penser à se désabonner si l'Observable ne se termine pas (ex. dans ngOnDestroy)
// subscription.unsubscribe();
```

- **`next`** : appelé à chaque valeur émise par l’Observable.
- **`error`** : appelé en cas d’erreur (le flux s’arrête).
- **`complete`** : appelé quand l’Observable se termine sans erreur.

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

### Traduction (ngx-translate) et pipe `translate`

Avec **ngx-translate**, les textes de l’interface sont externalisés dans des fichiers JSON par langue (ex. `fr-FR.json`, `en-US.json`). Dans le template, on affiche la traduction d’une clé avec le **pipe `translate`** :

```html
{{ 'Customer_name' | translate }}
```

- **`'Customer_name'`** : clé de traduction définie dans les fichiers i18n (ex. `assets/i18n/fr-FR.json` : `"Customer_name": "Nom du client"`).
- **`| translate`** : pipe qui prend la clé en entrée et renvoie la chaîne traduite selon la langue courante (définie via `TranslateService.use('fr-FR')` ou la config du module).
- Si la clé n’existe pas, la clé elle-même est souvent affichée (ex. `Customer_name`).

**Avec des paramètres** (interpolation dans la traduction) :

```html
{{ 'Hello_user' | translate:{ name: user.name } }}
```

Dans le JSON : `"Hello_user": "Bonjour, {{name}}"`. Le pipe remplace `{{name}}` par la valeur passée.

### Exemples d’utilisation du framework Odin

- [Samples Odin (soho-app)](https://github.com/infor-cloud/m3-h5-sdk/tree/master/m3-odin/src/app/soho-app/samples)

---

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.21.
