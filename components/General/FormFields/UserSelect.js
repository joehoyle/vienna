import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
	container: {
		color: '#8D8E92',
		fontSize: 16.5,
		textAlign: 'right',
	},
} );

export default class UserSelect extends Component {
	static propTypes = {
		value: PropTypes.number,
		onChange: PropTypes.func.isRequired,
	};
	onPressValue() {
		// Navigation.showModal({
		// 	screen: 'UsersSelect',
		// 	title: 'Select User',
		// 	passProps: {
		// 		test: true,
		// 		onSelect: user => this.onChange( user.id ),
		// 	},
		// })
	}
	render() {
		return (
			<TouchableOpacity onPress={ () => this.onPressValue() } style={ { marginLeft: 'auto' } }>
				<Text style={ styles.container }>{ this.props.value }</Text>
			</TouchableOpacity>
		);
	}
}
