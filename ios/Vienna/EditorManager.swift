//
//  EditorManager.swift
//  Vienna
//
//  Created by Ryan McCue on 2017-05-16.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Aztec
import Foundation
import Gridicons
import UIKit

@objc(EditorManager)
class EditorManager: RCTViewManager {
	override func view() -> UIView {
		let font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.body)
		let missingImage = Gridicon.iconOfType(.image)
		let textView = Aztec.TextView(defaultFont: font, defaultMissingImage: missingImage)
		return textView;
	}
	
	@objc func setContent(json: NSString, view: Aztec.TextView, defaultView: Aztec.TextView) {
		let content = RCTConvert.nsString(json)
		view.setHTML(content!)
	}

}
