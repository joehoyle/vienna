import React, { Text, Component, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class FilterListDropdownButton extends Component {
	propTypes: {
		size: React.PropTypes.number.isRequired,
		onPress: React.PropTypes.func.isRequired,
	}

	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.onPress}>
				<Text style={styles.text}>{this.props.children}</Text>
				<Icon name="sort-desc" color="white" size={20} style={styles.icon} />
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		margin: -10,
		padding: 10,
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
	icon: {
		marginTop: -5,
		marginLeft: 5
	},
})
