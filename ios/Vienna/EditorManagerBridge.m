//
//  EditorManagerBridge.m
//  Vienna
//
//  Created by Ryan McCue on 2017-05-16.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

#import "Vienna-Swift.h"

/**
 * See VNN_EXTERN_REMAP_MODULE
 */
#define VNN_EXTERN_MODULE(objc_name) \
	VNN_EXTERN_REMAP_MODULE(, objc_name)

/**
 * Similar to RCT_EXTERN_REMAP_MODULE, but does not include the base interface
 * definition. This allows us to import the Swift headers and call out directly.
 */
#define VNN_EXTERN_REMAP_MODULE(js_name, objc_name) \
	objc_name (RCTExternModule) <RCTBridgeModule> \
	@end \
	@implementation objc_name (RCTExternModule) \
	RCT_EXPORT_MODULE(js_name)

@interface VNN_EXTERN_MODULE(EditorManager)
	RCT_CUSTOM_VIEW_PROPERTY(content, NSString, TextView) {
		[self setContentWithJson:json view:view defaultView:defaultView];
	}
@end
