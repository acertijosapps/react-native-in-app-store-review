#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(RNInAppStoreReview, NSObject)

RCT_EXTERN_METHOD(requestReview:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
