import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PropTypes from '../../PropTypes';
import { FontAwesome as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 44,
		padding: 10,
	},
	title: {
		fontSize: 16,
		marginLeft: 5,
	},
});

export default class ListItem extends Component {
	static propTypes = {
		term: PropTypes.Term.isRequired,
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.term.name}</Text>
				<Icon
					name="chevron-right"
					style={styles.chevron}
					size={22}
					color="#BBBBBB"
				/>
			</View>
		);
	}
}
