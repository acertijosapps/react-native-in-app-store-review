# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

[1.0.0]: https://gitlab.com/bgoswaldo-group/rninappstorereview/-/tags/v1.0.0
