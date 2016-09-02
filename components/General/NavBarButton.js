import React, { Component, PropTypes } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class NavbarButton extends Component {

	static propTypes = {
		children: PropTypes.string,
		onPress: PropTypes.func,
	}

	static defaultProps = {
		onPress: () => ({}),
	}

	render() {
		const { tintColor, margin, onPress } = this.props;
		return (
			<TouchableOpacity onPress={onPress}>
				<View style={styles.container}>
					<Icon size={22} name="chevron-left" color="#333333" />
					<Text numberOfLines={1} style={[styles.text]}>{this.props.children}</Text>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingLeft: 10,
	},
	text: {
		color: '#333333',
		lineHeight: 18,
		marginLeft: 5,
		width: 80,
	}
})
