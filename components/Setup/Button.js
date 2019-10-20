import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create( {
	button: {
		borderColor: 'rgba( 0, 0, 0, .3 )',
		borderWidth: 1,
		// alignItems: 'center',
		padding: 8,
		borderRadius: 4,
	},
	disabled: {
		borderColor: 'rgba( 0, 0, 0, .1 )',
	},
	text: {
		color: '#666666',
	},
	textDisabled: {
		color: 'rgba( 0, 0, 0, 0.2 )',
	},
} );

export default class Button extends Component {
	static defaultProps = {
		disabled: false,
	}

	static propTypes = {
		children: PropTypes.string.isRequired,
		disabled: PropTypes.bool,
		onPress: PropTypes.func.isRequired,
	}

	render() {
		const { children, disabled, style, onPress } = this.props;
		const baseStyle = disabled ? StyleSheet.compose( styles.button, styles.disabled ) : styles.button;
		const textStyle = disabled ? StyleSheet.compose( styles.text, styles.textDisabled ) : styles.text;
		const rootStyle = StyleSheet.compose( baseStyle, style );

		return (
			<TouchableOpacity
				onPress={ disabled ? null : onPress }
				style={ rootStyle }
			>
				<Text style={ textStyle }>
					{ children }
				</Text>
			</TouchableOpacity>
		);
	}
}
