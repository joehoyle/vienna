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
		let textView = Editor(defaultFont: font, defaultMissingImage: missingImage)

		textView.delegate = self
		textView.textAttachmentDelegate = self

		attachProviders(textView)

		return textView;
	}

	func attachProviders(_ textView: Aztec.TextView) {
		let font = UIFont.preferredFont(forTextStyle: UIFontTextStyle.body)
		let providers: [TextViewAttachmentImageProvider] = [
//			MoreAttachmentRenderer(),
			CommentAttachmentRenderer(font: font),
			HTMLAttachmentRenderer(font: font)
		]

		for provider in providers {
			textView.registerAttachmentImageProvider(provider)
		}
	}

	@objc func setContent(json: NSString, view: Editor, defaultView: Editor) {
		let content = RCTConvert.nsString(json)

		// If React is just feeding us back the content we just changed, ignore
		// the change.
		let current = view.getHTML()
		if current != content {
			view.setHTML(content!)
		}
	}
}

extension EditorManager: UITextViewDelegate {
	/**
	 * Handle text change event.
	 *
	 * Pass-through to RN onChange prop, if available.
	 */
	func textViewDidChange(_ textView: UITextView) {
		let editor = textView as! Editor
		if editor.onChange != nil {
			editor.onChange!([
				"content": editor.getHTML(),
			])
		}
	}
}

extension EditorManager: TextViewAttachmentDelegate {
	func textView(_ textView: TextView, imageAt url: URL, onSuccess success: @escaping (UIImage) -> Void, onFailure failure: @escaping (Void) -> Void) -> UIImage {
		// Todo: start task
		return Gridicon.iconOfType(.image)
	}

	func textView(_ textView: TextView, urlFor imageAttachment: ImageAttachment) -> URL {
		// TODO: start upload process
		return URL(string: "placeholder://")!
	}

	func textView(_ textView: TextView, deletedAttachmentWith attachmentID: String) {
		print("Attachment \(attachmentID) removed.\n")
	}

	func textView(_ textView: TextView, selected attachment: NSTextAttachment, atPosition position: CGPoint) {
		print("Selected!")
	}

	func textView(_ textView: TextView, deselected attachment: NSTextAttachment, atPosition position: CGPoint) {
		print("Deselected!")
	}
}
