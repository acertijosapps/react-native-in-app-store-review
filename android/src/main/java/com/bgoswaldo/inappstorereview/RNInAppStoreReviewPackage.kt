package com.bgoswaldo.inappstorereview

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider

class RNInAppStoreReviewPackage : BaseReactPackage() {
  override fun getModule(
    name: String,
    reactContext: ReactApplicationContext,
  ): NativeModule? =
    if (name == RNInAppStoreReviewModule.NAME) RNInAppStoreReviewModule(reactContext) else null

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
    mapOf(
      RNInAppStoreReviewModule.NAME to ReactModuleInfo(
        RNInAppStoreReviewModule.NAME,
        RNInAppStoreReviewModule::class.java.name,
        false, // canOverrideExistingModule
        false, // needsEagerInit
        false, // isCxxModule
        false, // isTurboModule: legacy bridge module, loaded through the interop layer
      ),
    )
  }
}
