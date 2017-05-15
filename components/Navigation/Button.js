import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

export default Button ListError extends Component {
	static propTypes = {
		error: React.PropTypes.object.isRequired,
	}
	render() {
		return <View style={styles.container}>
			{props.children}
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: 'red',
	},
	text: {
		lineHeight: 16,
		color: 'white',
		flex: 1,
		textAlign: 'center',
	},
})
