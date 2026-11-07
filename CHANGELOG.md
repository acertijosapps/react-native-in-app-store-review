# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- CI en GitHub Actions para cada PR y push a `beta` y `main`: typecheck y build
  de la librería (`bob build`).
- App de ejemplo en `example/` (React Native 0.86.3) con botones para
  `requestReview()`, `openStoreReview()` e `isReviewSupported()`. No se publica
  en npm.
- CI: job **Compilar Android** (typecheck del example y `compileDebugKotlin` del
  módulo) en cada PR, y job **Compilar iOS** (`pod install` y `xcodebuild` para
  simulador) solo en los PRs hacia `main`.

### Changed

- El repositorio se mudó de GitLab a GitHub:
  [acertijosapps/react-native-in-app-store-review](https://github.com/acertijosapps/react-native-in-app-store-review).
  `repository` y `bugs` de `package.json`, la imagen del README, los enlaces
  de este CHANGELOG y el `source` del podspec apuntan ahí.

### Fixed

- Podspec: `s.source` usaba el tag sin prefijo (`2.0.0`), pero los tags son
  `v2.0.0`; ahora usa `v#{s.version}`.
- README y JSDoc de `requestReview`: en iOS el prompt **sí** aparece en builds
  de desarrollo (con Enviar desactivado); lo que nunca lo muestra es TestFlight.

## [2.0.0] - 2026-10-18

### Changed

- **BREAKING:** versión mínima React Native 0.74
  (`peerDependencies.react-native: >=0.74`). Los proyectos con RN < 0.74 deben
  quedarse en `1.1.1`.
- Android: `RNInAppStoreReviewPackage` migrado de `ReactPackage.createNativeModules`
  (deprecado) a `BaseReactPackage` con `getModule` y `getReactModuleInfoProvider`.
  `BaseReactPackage` existe desde RN 0.74, de ahí el nuevo mínimo.

### Fixed

- Android: el módulo no compilaba con React Native 0.86 (`Unresolved reference
  'currentActivity'`); ahora obtiene la Activity desde `reactApplicationContext`.

## [1.1.1] - 2026-10-12

### Changed

- `author` actualizado a `AcertijosApps <acertijos.contacto@gmail.com>`.
- `homepage` apuntando a
  <https://acertijosapps.com/librerias/react-native-in-app-store-review>.
- `LICENSE`: titular del copyright cambiado a AcertijosApps.

## [1.1.0] - 2026-09-11

### Changed

- **Renombrado el paquete** de `@bgoswaldo/react-native-in-app-store-review` a
  `@acertijosapps/react-native-in-app-store-review`. El paquete anterior queda
  obsoleto (`npm deprecate`); actualiza el import y la dependencia al nuevo
  nombre. El código y la API pública no cambian.

## [1.0.5] - 2026-08-18

### Changed

- Mejorada la `description` de npm con términos de búsqueda (rate/review,
  in-app) y afinados los `keywords` para descubribilidad.

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

[2.0.0]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v2.0.0
[1.1.1]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v1.1.1
[1.1.0]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v1.1.0
[1.0.5]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v1.0.5
[1.0.4]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v1.0.4
[1.0.3]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v1.0.3
[1.0.2]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v1.0.2
[1.0.1]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v1.0.1
[1.0.0]: https://github.com/acertijosapps/react-native-in-app-store-review/releases/tag/v1.0.0
