//
//  Editor.swift
//  Vienna
//
//  Created by Ryan McCue on 2017-05-16.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Aztec
import Foundation

/**
* Editor view.
*
* Includes additional properties for React props.
*/
class Editor: Aztec.TextView {
	var onChange: RCTBubblingEventBlock?
	var _isUpdatingFromReact: Bool = false
}
