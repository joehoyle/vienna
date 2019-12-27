import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

import { getSemanticColor } from '../../theme';

const styles = StyleSheet.create( {
	container: {
		paddingRight: 10,
	},
	text: {
		lineHeight: 16,
		fontSize: 16,
		color: getSemanticColor( 'link' ),
	},
} );

export default class Button extends Component {
	static propTypes = {
		onPress: PropTypes.func.isRequired,
	};
	render() {
		return (
			<TouchableOpacity onPress={ this.props.onPress } style={ styles.container }>
				<Text style={ styles.text }>{ this.props.children }</Text>
			</TouchableOpacity>
		);
	}
}
