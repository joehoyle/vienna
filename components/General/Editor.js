import React from 'react'
import { View, TouchableHighlight, Text, requireNativeComponent, NativeModules } from 'react-native'

// From EditorManagerBridge.m for EditorManager.swift
const EditorManager = NativeModules.EditorManager;
const EditorComponent = requireNativeComponent( 'Editor', null )

class Editor extends React.Component {
	onChange( event ) {
		if ( ! this.props.onChange ) {
			return;
		}

		this.props.onChange( event.nativeEvent.content );
	}

	render() {
		const { onChange, ...otherProps } = this.props;

		return <View>
			<TouchableHighlight onPress={() => { EditorManager.test() }}>
				<Text>Test it!</Text>
			</TouchableHighlight>

			<EditorComponent
				ref={ref => this.editor = ref}
				onChange={ event => this.onChange( event ) }
				{...otherProps}
			/>
		</View>
	}
}
Editor.propTypes = {
	/**
	 * HTML content of the editor
	 */
	value: React.PropTypes.string,

	/**
	 * Change event for the editor.
	 */
	onChange: React.PropTypes.func,
}

export default Editor;
