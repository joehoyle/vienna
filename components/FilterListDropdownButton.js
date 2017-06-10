import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FilterListDropdownButton extends Component {
	propTypes: {
		size: React.PropTypes.number.isRequired,
		onPress: React.PropTypes.func.isRequired,
	};

	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.onPress}>
				<Text style={styles.text}>{this.props.children}</Text>
				<Icon name="sort-desc" color="#333333" size={18} style={styles.icon} />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	text: {
		color: '#333333',
		fontSize: 15,
	},
	icon: {
		marginTop: -4,
		marginLeft: 8,
	},
});
