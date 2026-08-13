package com.bgoswaldo.inappstorereview

import android.app.Activity
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.play.core.review.ReviewManagerFactory

class RNInAppStoreReviewModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = NAME

  @ReactMethod
  fun requestReview(promise: Promise) {
    val activity: Activity? = currentActivity
    if (activity == null) {
      // No foreground activity to attach the flow to — resolve as a no-op.
      promise.resolve(null)
      return
    }

    val manager = ReviewManagerFactory.create(reactApplicationContext)
    manager.requestReviewFlow().addOnCompleteListener { request ->
      if (request.isSuccessful) {
        manager.launchReviewFlow(activity, request.result)
          .addOnCompleteListener { promise.resolve(null) }
      } else {
        // Play may throttle or fail to fetch the flow — treat as a no-op.
        promise.resolve(null)
      }
    }
  }

  companion object {
    const val NAME = "RNInAppStoreReview"
  }
}
