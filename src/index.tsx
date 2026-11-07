import { Linking, NativeModules, Platform } from 'react-native';

interface NativeReviewModule {
  requestReview: () => Promise<void>;
}

const nativeModule = (
  NativeModules as { RNInAppStoreReview?: NativeReviewModule }
).RNInAppStoreReview;

export interface RequestReviewOptions {
  /**
   * Numeric App Store app id (e.g. "1234567890"). Used only by the store
   * fallback on iOS when the native module is unavailable.
   */
  iosAppId?: string;
  /**
   * Android application id / package name (e.g. "com.acme.app"). Used only by
   * the store fallback on Android when the native module is unavailable.
   */
  androidPackage?: string;
}

/**
 * Returns `true` when the native in-app review module is linked and available.
 * When `false`, {@link requestReview} falls back to opening the store listing.
 */
export function isReviewSupported(): boolean {
  return nativeModule != null;
}

/**
 * Opens the platform store page as a fallback when the native in-app prompt is
 * unavailable. On iOS it opens the App Store "write review" sheet; on Android it
 * opens the Play Store listing, or the listing on play.google.com in the browser
 * when the Play Store app is not installed. Requires the matching id in
 * `options`; otherwise it resolves without doing anything.
 */
export async function openStoreReview(
  options: RequestReviewOptions,
): Promise<void> {
  const urls =
    Platform.select<string[]>({
      ios: options.iosAppId
        ? [`https://apps.apple.com/app/id${options.iosAppId}?action=write-review`]
        : [],
      android: options.androidPackage
        ? [
            `market://details?id=${options.androidPackage}`,
            `https://play.google.com/store/apps/details?id=${options.androidPackage}`,
          ]
        : [],
    }) ?? [];

  for (const url of urls) {
    try {
      await Linking.openURL(url);
      return;
    } catch {
      // No app can open this URL — try the next one.
    }
  }
}

/**
 * Requests the native in-app review prompt (iOS StoreKit /
 * Android Play In-App Review). If the native module is not linked, it falls back
 * to opening the store listing using the ids provided in `options`.
 *
 * Note: both platforms decide whether the prompt actually appears and rate-limit
 * it. On iOS the prompt always shows in development builds (with Submit
 * disabled), never via TestFlight, and is rate-limited in App Store builds.
 */
export async function requestReview(
  options: RequestReviewOptions = {},
): Promise<void> {
  if (nativeModule?.requestReview != null) {
    await nativeModule.requestReview();
    return;
  }

  await openStoreReview(options);
}
