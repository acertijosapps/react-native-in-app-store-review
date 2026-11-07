# Probar la librería en local

Este archivo es solo para desarrollo; no se incluye en el paquete publicado.

## Prueba rápida: la app de ejemplo

Para probar un cambio en `src/`, `ios/` o `android/`, usa la app de
[`example/`](example/README.md). Enlaza la librería desde la raíz del repo, así
que no hace falta compilar ni empaquetar nada.

## Prueba antes de publicar: Insumia

Para validar el paquete tal como se publicará, instálalo en Insumia desde un
tarball.

Rutas asumidas:

- Librería: `~/Documents/Libs/react-native-in-app-store-review`
- App: `~/Documents/ReacProjectsNew/Insumia`

> Hazlo en una rama de Insumia para poder revertirlo.

### 1. Empaquetar la librería

`npm pack` corre `prepare` (`bob build`) y deja el `.tgz` en la raíz:

```bash
cd ~/Documents/Libs/react-native-in-app-store-review && npm pack
```

### 2. Instalar el tarball en Insumia

Cambia la versión del nombre del archivo por la de `package.json`:

```bash
cd ~/Documents/ReacProjectsNew/Insumia && yarn add ../../Libs/react-native-in-app-store-review/acertijosapps-react-native-in-app-store-review-2.0.0.tgz
```

Repite los pasos 1 y 2 tras cada cambio en la librería.

### 3. Reconstruir la app

Cambió código nativo, así que no basta con recargar Metro:

```bash
cd ~/Documents/ReacProjectsNew/Insumia/ios && pod install
```

```bash
cd ~/Documents/ReacProjectsNew/Insumia && yarn ios --device
```

```bash
cd ~/Documents/ReacProjectsNew/Insumia && yarn android
```

### 4. Verificar

- **iOS:** en builds de desarrollo el prompt aparece siempre, con Enviar
  desactivado. En TestFlight no aparece nunca.
- **Android:** el diálogo solo aparece si la app se instaló desde Google Play
  (internal app sharing o un track de prueba). La promesa resuelve igual.
- **Fallback:** `openStoreReview` abre la ficha de la tienda; en Android sin
  Play Store abre la ficha en play.google.com.

### 5. Al terminar

Insumia ya depende de la versión publicada. Descarta los cambios de la rama de
prueba (`package.json`, `yarn.lock` y `Podfile.lock`) y reinstala:

```bash
cd ~/Documents/ReacProjectsNew/Insumia && git restore package.json yarn.lock ios/Podfile.lock && yarn install
```
