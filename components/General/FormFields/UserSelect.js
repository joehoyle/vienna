import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

export default class UserSelect extends Component {
	static propTypes = {
		value: PropTypes.number,
		onChange: PropTypes.func.isRequired,
	}
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
		return <TouchableOpacity onPress={() => this.onPressValue()}>
			<Text>{this.props.value}</Text>
		</TouchableOpacity>
	}
}


const styles = StyleSheet.create({
	container: {
		color: '#666666',
		fontSize: 16,
	}
})
