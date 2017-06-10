import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ConfirmButton extends Component {
	static propTypes: {
		icon: React.PropTypes.string,
		text: React.PropTypes.string,
		confirmIcon: React.PropTypes.string,
		confirmText: React.PropTypes.string,
	};
	componentWillMount() {
		this.state = { requiresConfirm: false };
	}
	onPress() {
		if (this.state.requiresConfirm) {
			this.props.onPress();
		} else {
			this.setState({ requiresConfirm: true });
		}
	}
	render() {
		return !this.state.requiresConfirm
			? <TouchableOpacity
					style={[styles.container, this.props.style]}
					onPress={this.onPress.bind(this)}
				>
					{this.props.icon
						? <Icon name={this.props.icon} size={14} color="#888888" />
						: null}
					<Text style={[styles.text, this.props.textStyle]}>
						{this.props.text}
					</Text>
				</TouchableOpacity>
			: <TouchableOpacity
					style={[styles.container, this.props.style]}
					onPress={this.onPress.bind(this)}
				>
					{this.props.icon
						? <Icon name={this.props.confirmIcon} size={14} color="#888888" />
						: null}
					<Text style={[styles.text, this.props.textStyle]}>
						{this.props.confirmText}
					</Text>
				</TouchableOpacity>;
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	icon: {},
	text: {},
});
