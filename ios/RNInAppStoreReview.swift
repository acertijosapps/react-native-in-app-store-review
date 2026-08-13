import Foundation
import React
import StoreKit
import UIKit

@objc(RNInAppStoreReview)
class RNInAppStoreReview: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc func requestReview(
    _ resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    DispatchQueue.main.async {
      if let scene = UIApplication.shared.connectedScenes.first(where: {
        $0.activationState == .foregroundActive
      }) as? UIWindowScene {
        SKStoreReviewController.requestReview(in: scene)
      } else {
        SKStoreReviewController.requestReview()
      }
      resolve(nil)
    }
  }
}
