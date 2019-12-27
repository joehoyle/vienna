import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create( {
	container: {
		padding: 10,
		backgroundColor: 'red',
	},
	text: {
		lineHeight: 16,
		color: 'white',
		textAlign: 'center',
	},
} );

export default class ListError extends Component {
	static propTypes = {
		error: PropTypes.object.isRequired,
	};
	render() {
		return (
			<View style={ styles.container }>
				<Text style={ styles.text }>{ this.props.error.message }</Text>
			</View>
		);
	}
}
