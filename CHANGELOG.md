# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4] - 2026-08-18

### Changed

- Ampliados los `keywords` de npm para mejorar la búsqueda/descubribilidad.

## [1.0.3] - 2026-08-17

### Fixed

- README: la ilustración usa la URL absoluta del raw de GitLab para que se
  muestre en npmjs.com (las rutas relativas no se reescriben bien para GitLab).

## [1.0.2] - 2026-08-17

### Changed

- Rutas del repositorio (`repository`, `homepage`, `bugs` y `s.source` del
  podspec) apuntando al repo público `acertijoslibs/rninappstorereview`.

## [1.0.1] - 2026-08-16

### Added

- README: ilustración del prompt nativo de reseña en iOS
  (`SKStoreReviewController`) y Android (Play In-App Review), en
  `assets/demo.png` / `assets/demo.svg`.

## [1.0.0] - 2026-08-12

Primera versión pública.

### Added

- API JS `requestReview(options?)`, `openStoreReview(options)` e
  `isReviewSupported()` con tipos TypeScript.
- Bridge nativo iOS con `SKStoreReviewController`
  (`RNInAppStoreReview.swift` / `.m`), expuesto como promesa.
- Bridge nativo Android con Play In-App Review
  (`com.google.android.play:review-ktx`), expuesto como promesa.
- Fallback automático a la ficha de la tienda (App Store / Play Store) cuando el
  módulo nativo no está enlazado.
- Empaquetado con `react-native-builder-bob` (salidas CommonJS, ESM y tipos) y
  autolinking para iOS (podspec) y Android (Gradle).

[1.0.4]: https://gitlab.com/acertijoslibs/rninappstorereview/-/tags/v1.0.4
[1.0.3]: https://gitlab.com/acertijoslibs/rninappstorereview/-/tags/v1.0.3
[1.0.2]: https://gitlab.com/acertijoslibs/rninappstorereview/-/tags/v1.0.2
[1.0.1]: https://gitlab.com/acertijoslibs/rninappstorereview/-/tags/v1.0.1
[1.0.0]: https://gitlab.com/acertijoslibs/rninappstorereview/-/tags/v1.0.0
