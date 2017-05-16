import React from 'react'
import { View, TouchableHighlight, Text, requireNativeComponent, NativeModules } from 'react-native'

// From EditorManagerBridge.m for EditorManager.swift
const EditorManager = NativeModules.EditorManager;
const EditorComponent = requireNativeComponent( 'Editor', null )

class Editor extends React.Component {
	render() {
		return <View>
			<TouchableHighlight onPress={() => { EditorManager.test() }}>
				<Text>Test it!</Text>
			</TouchableHighlight>

			<EditorComponent ref={ref => this.editor = ref} {...this.props} />
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
