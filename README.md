# @bgoswaldo/react-native-in-app-store-review

Ask users to rate your app **without leaving it**, using each platform's native
in-app review flow:

- **iOS** → [`SKStoreReviewController`](https://developer.apple.com/documentation/storekit/skstorereviewcontroller)
- **Android** → [Play In-App Review](https://developer.android.com/guide/playcore/in-app-review) (`com.google.android.play:review-ktx`)

If the native module isn't available (e.g. Expo Go, or before you rebuild), it
falls back to opening the store listing.

![In-app review prompt on iOS and Android](https://gitlab.com/acertijoslibs/rninappstorereview/-/raw/main/assets/demo.png)

> Illustration of the native review prompt: iOS `SKStoreReviewController` (left)
> and Android Play In-App Review (right).

## Install

```bash
npm install @bgoswaldo/react-native-in-app-store-review
# or
yarn add @bgoswaldo/react-native-in-app-store-review
```

### iOS

```bash
cd ios && pod install
```

### Android

No manual steps — the module is autolinked.

> Minimum: iOS 13+, `minSdkVersion` 21+. Uses a legacy bridge module, which works
> under both the old and the New Architecture (via the interop layer).

## Usage

```ts
import { requestReview } from '@bgoswaldo/react-native-in-app-store-review';

// Call it after a positive moment in your app (task completed, level cleared…),
// never on app launch, and don't gate a feature behind it.
await requestReview({
  iosAppId: '1234567890',      // used only by the store fallback
  androidPackage: 'com.acme.app', // used only by the store fallback
});
```

### API

```ts
function requestReview(options?: RequestReviewOptions): Promise<void>;
function openStoreReview(options: RequestReviewOptions): Promise<void>;
function isReviewSupported(): boolean;

interface RequestReviewOptions {
  iosAppId?: string;       // numeric App Store id
  androidPackage?: string; // Android application id / package name
}
```

- **`requestReview(options?)`** — Shows the native in-app prompt. If the native
  module is not linked, falls back to `openStoreReview(options)`.
- **`openStoreReview(options)`** — Explicitly opens the store listing
  (App Store "write review" sheet on iOS, Play Store listing on Android).
- **`isReviewSupported()`** — `true` when the native module is linked.

## Important notes

The OS controls whether the prompt actually appears — you can call it, but there
is no guarantee it shows:

- **iOS**: the prompt **never** appears in debug builds or via TestFlight. Test
  it in a production/App Store build. Apple also rate-limits it (a few times per
  365 days per device).
- **Android**: Play rate-limits and may show nothing (quota). Test with an
  internal testing track / a license-tester account. The call resolves either
  way — treat a resolved promise as "attempted", not "shown".

Because the flow can silently do nothing, don't rely on a callback to know the
user reviewed, and don't block UI on it.

## License

MIT
