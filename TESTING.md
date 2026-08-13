# Probar la librería en local (con Insumia)

Guía para validar el paquete dentro de `Insumia/` **antes de publicarlo a npm**.
Este archivo es solo para desarrollo — no se incluye en el paquete publicado.

Rutas asumidas:

- Librería: `~/Documents/Libs/react-native-in-app-store-review`
- App: `~/Documents/ReacProjectsNew/Insumia`

---

## 1. Compilar la librería

Desde la carpeta de la librería, genera `lib/`:

```bash
cd ~/Documents/Libs/react-native-in-app-store-review && npm run prepare
```

## 2. Enlazar en Insumia

Hay dos formas. La opción B imita mejor la publicación real (evita problemas de
symlink/Metro que a veces da `file:`), pero requieres repetir el pack en cada cambio.

### Opción A — `file:` link (rápida para iterar)

Desde Insumia:

```bash
cd ~/Documents/ReacProjectsNew/Insumia && yarn add file:../../Libs/react-native-in-app-store-review
```

Si Metro se queja de resolución con symlinks, añade la ruta a `watchFolders` en
`metro.config.js` de Insumia, apuntando a `../../Libs/react-native-in-app-store-review`.

### Opción B — tarball (más fiel a producción)

```bash
cd ~/Documents/Libs/react-native-in-app-store-review && npm pack
cd ~/Documents/ReacProjectsNew/Insumia && yarn add ../../Libs/react-native-in-app-store-review/bgoswaldo-react-native-in-app-store-review-1.0.0.tgz
```

Repite ambos comandos tras cada cambio en la librería.

## 3. Quitar el módulo nativo antiguo de Insumia

El módulo actual de Insumia se registra como `AppReview`; la librería usa
`RNInAppStoreReview`. Para probar de verdad la librería, elimina (o comenta) el
módulo embebido para que no haya duplicados:

- **iOS**: borra `ios/Insumia/AppReview.swift` y `ios/Insumia/AppReview.m` del proyecto Xcode.
- **Android**:
  - borra `android/app/src/main/java/com/acertijos/insumia/AppReviewModule.kt` y `AppReviewPackage.kt`
  - quita `add(AppReviewPackage())` en `MainApplication.kt`
  - quita `implementation("com.google.android.play:review-ktx:2.0.2")` de `android/app/build.gradle` (ahora la trae la librería)

> Tip: hazlo en una rama de Insumia para poder revertir fácil.

## 4. Apuntar la capa JS a la librería

En `src/services/review/nativeReview.ts`, reemplaza la llamada al `NativeModules.AppReview`
por la librería, reutilizando las consts que ya tienes:

```ts
import { requestReview } from '@bgoswaldo/react-native-in-app-store-review';

import { REVIEW } from '@/utils/consts';

export const requestNativeReview = async (): Promise<void> => {
  await requestReview({
    iosAppId: REVIEW.IOS_APP_ID,
    androidPackage: REVIEW.ANDROID_PACKAGE,
  });
};
```

El resto de tu servicio (`review.ts`, `ratingPreference.ts`, `shouldAskForReview`,
`openFeedback`) se queda igual: la librería solo sustituye el bridge nativo + fallback.

## 5. Reconstruir e instalar

```bash
cd ~/Documents/ReacProjectsNew/Insumia/ios && pod install
```

Luego reconstruye la app nativa (no basta con recargar Metro, cambió código nativo):

```bash
cd ~/Documents/ReacProjectsNew/Insumia && yarn ios --device      # iOS real
```

```bash
cd ~/Documents/ReacProjectsNew/Insumia && yarn android           # Android
```

## 6. Verificar

- **Android**: llama a `requestAppReview()` desde un botón de prueba. Con una
  build de debug puede no mostrar nada por cuota de Play — pruébalo también en un
  track de testing interno / cuenta license-tester. La promesa resuelve igual.
- **iOS**: el prompt **no** aparece en debug ni TestFlight; solo en build de
  producción de App Store. Para humo, confirma que no crashea y que la promesa
  resuelve.
- **Fallback**: temporalmente renombra el módulo en JS o prueba en un entorno sin
  el nativo enlazado para ver que `openStoreReview` abre la ficha de la tienda.

## 7. Al terminar la prueba

Para volver a dejar Insumia limpio antes de decidir:

```bash
cd ~/Documents/ReacProjectsNew/Insumia && yarn remove @bgoswaldo/react-native-in-app-store-review
```

Y descarta los cambios de la rama de prueba (`git restore` / borra la rama), o
consolida la migración si decides adoptar la librería de forma definitiva.
