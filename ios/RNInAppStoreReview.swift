import Foundation
import React
import StoreKit
import UIKit

@objc(RNInAppStoreReview)
class RNInAppStoreReview: NSObject {
  // No constants are exported, so the module does not need to be set up on
  // the main thread at startup.
  @objc static func requiresMainQueueSetup() -> Bool {
    return false
  }

  @objc func requestReview(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      if let scene = Self.reviewScene() {
        if #available(iOS 16.0, *) {
          AppStore.requestReview(in: scene)
        } else {
          SKStoreReviewController.requestReview(in: scene)
        }
      }
      // No window scene to attach the prompt to — resolve as a no-op.
      resolve(nil)
    }
  }

  /// The foreground-active window scene, or any connected window scene when
  /// none is active (e.g. right after launch).
  private static func reviewScene() -> UIWindowScene? {
    let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
    return scenes.first { $0.activationState == .foregroundActive } ?? scenes.first
  }
}
