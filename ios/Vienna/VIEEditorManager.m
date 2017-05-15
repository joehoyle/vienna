//
//  VNEditorManager.m
//  Vienna
//
//  Created by Ryan McCue on 2017-05-15.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import "VIEEditorManager.h"

#import "Aztec/Aztec-Swift.h"

@implementation VIEEditorManager

RCT_EXPORT_MODULE()

- (UIView *)view {
	
	UIFont *font = [UIFont preferredFontForTextStyle:UIFontTextStyleBody];
	UIImage *defaultImage = [UIImage imageNamed:@"logo-black.png"];
	TextView *view = [[TextView alloc] initWithDefaultFont:font defaultMissingImage:defaultImage];
	[view setHTML:@"<div><h1>Testing!</h1></div>"];
	return view;
}

RCT_CUSTOM_VIEW_PROPERTY(content, NSString, TextView) {
	[view setHTML:json ? [RCTConvert NSString:json] : @""];
}

RCT_EXPORT_METHOD(test) {
	NSLog(@"Called test!");
}

@end
