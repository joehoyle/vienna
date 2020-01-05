import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create( {
	container: {
		paddingRight: 16,
	},
	back: {
		paddingLeft: 16,
		paddingRight: 0,
	},
	text: {
		fontSize: 16.6,
		color: '#007CFF',
		fontWeight: '600',
	},
} );

export default class Button extends Component {
	static propTypes = {
		back: PropTypes.bool,
		onPress: PropTypes.func.isRequired,
	};
	render() {
		return (
			<TouchableOpacity
				style={ [ styles.container, this.props.back && styles.back ] }
				onPress={ this.props.onPress }
			>
				<Text style={ styles.text }>{ this.props.children }</Text>
			</TouchableOpacity>
		);
	}
}
