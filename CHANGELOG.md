# Changelog

Toutes les modifications notables du projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), et le projet suit [Semantic Versioning](https://semver.org/lang/fr/).

---

## [Unreleased]

### Added
- (À venir : nouvelles fonctionnalités)

### Changed
- (Modifications en cours)

### Fixed
- (Corrections en cours)

---

## [0.0.1] - 2025-02-05

### Added
- Structure du projet : `app`, `core`, `features` (customers, edit-customer).
- Intégration Odin M3 : `MIService`, `UserService`, appels CRS610MI.
- Internationalisation (ngx-translate) : fr-FR, en-US, fr-CA.
- Affichage de la version de l’application depuis `package.json` (footer).
- README : installation, structure, exemples (Observables, API M3, UserContext, translate).

### Changed
- (Aucune)

### Fixed
- (Aucune)

---

## [0.0.0] - 2025-01-01

### Added
- Projet initial (Angular + Odin H5 SDK).
- Configuration Odin (`odin serve`, `odin build`).
- Composant racine et routing de base.

---

## Exemple de format

Pour chaque version, utiliser les sections suivantes :

| Section   | Usage |
|----------|--------|
| **Added**   | Nouvelles fonctionnalités. |
| **Changed** | Modifications de fonctionnalités existantes. |
| **Deprecated** | Fonctionnalités bientôt supprimées. |
| **Removed** | Fonctionnalités supprimées. |
| **Fixed**   | Corrections de bugs. |
| **Security** | Correctifs de sécurité. |

**Exemple d’entrée :**

```markdown
## [1.2.0] - 2025-03-15

### Added
- Écran de détail client avec onglets.
- Export CSV de la liste clients.

### Changed
- Mise à jour de la dépendance @infor-up/m3-odin-angular vers 7.3.0.

### Fixed
- Correction de l’affichage des erreurs MI dans le formulaire d’édition.
```

[Unreleased]: https://github.com/.../compare/v0.0.1...HEAD
[0.0.1]: https://github.com/.../compare/v0.0.0...v0.0.1
[0.0.0]: https://github.com/.../releases/tag/v0.0.0
