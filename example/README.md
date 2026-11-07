# App de ejemplo

App React Native 0.86 para probar la librería a mano y compilarla en CI. No se
publica en npm.

La app no instala la librería desde npm:

- `react-native.config.js` enlaza el módulo nativo (`android/` e `ios/`) desde la
  raíz del repo.
- `metro.config.js` resuelve `@acertijosapps/react-native-in-app-store-review`
  a `../src` y toma `react` y `react-native` solo de `example/node_modules`.

## Correr la app

```bash
cd example && npm install
```

iOS:

```bash
cd example/ios && bundle install && bundle exec pod install
```

```bash
cd example && npm run ios
```

Android:

```bash
cd example && npm run android
```

Si `pod install` falla con `Unicode Normalization not appropriate for
ASCII-8BIT`, exporta `LANG=en_US.UTF-8` antes de correrlo.

## Qué se puede probar

| | iOS | Android |
|---|---|---|
| `isReviewSupported()` es `true` (módulo enlazado) | ✅ | ✅ |
| `requestReview()` resuelve | ✅ | ✅ |
| Se ve el prompt nativo | ✅ en debug desde Xcode, también en el simulador; Enviar sale desactivado | ❌ solo si la app se instaló desde Google Play (internal app sharing o un track de prueba) |
| `openStoreReview()` abre la tienda | ✅ en dispositivo (el simulador no tiene App Store) | ✅ si el emulador tiene Play Store |

El fallback a la tienda abre la ficha de Insumia (`6792440101` /
`com.acertijos.insumia`).

## CI

- **Compilar Android** corre en cada PR y push a `beta` y `main`: typecheck de
  esta app y `compileDebugKotlin` del módulo de la librería.
- **Compilar iOS** corre solo en los PRs hacia `main`: `pod install` y
  `xcodebuild` para el simulador, sin firma.
