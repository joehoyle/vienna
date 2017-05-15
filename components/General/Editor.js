import React from 'react'
import { View, TouchableHighlight, Text, requireNativeComponent, NativeModules } from 'react-native'

// From VNEditorManager.m
const VNEditorManager = NativeModules.VNEditorManager;
const VNEditor = requireNativeComponent( 'VNEditor', null )

class Editor extends React.Component {
	render() {
		return <View>
			<TouchableHighlight onPress={() => { VNEditorManager.test() }}>
				<Text>Test it!</Text>
			</TouchableHighlight>
			<VNEditor ref={ref => this.editor = ref} {...this.props} />
		</View>
	}
}
Editor.propTypes = {
	/**
	 * HTML content of the editor
	 */
	value: React.PropTypes.string,
}

export default Editor;
