import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import NavigationButton from '../../components/Navigation/Button';

export default class Button extends Component {
	static propTypes = {
		onPress: React.PropTypes.func.isRequired,
	};
	render() {
		return (
			<TouchableOpacity onPress={this.props.onPress} style={styles.container}>
				<Text style={styles.text}>{this.props.children}</Text>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		paddingRight: 10,
	},
	text: {
		lineHeight: 16,
		fontSize: 16,
		color: '#3578F6',
	},
});
