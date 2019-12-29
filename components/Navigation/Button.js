import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create( {
	container: {
		paddingRight: 16,
	},
	text: {
		fontSize: 16.6,
		color: '#007CFF',
		fontWeight: '600',
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
