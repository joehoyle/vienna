import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
	field: {
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
	},
	line: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#DBDCDE',
		marginLeft: 16,
	},
	label: {
		width: 130,
		marginLeft: 16,
	},
	labelText: {
		fontSize: 16.5,
	},
	inputField: {
		flex: 1,
		flexDirection: 'row',
		marginRight: 16,
	},
	descriptionText: {
		fontSize: 11,
		color: '#999999',
		margin: 8,
		marginBottom: 15,
	},
} );

export default class FormRow extends Component {
	static propTypes = {
		label: PropTypes.string.isRequired,
	};

	render() {
		return (
			<View>
				<View style={ styles.field }>
					<View style={ styles.label }>
						<Text style={ styles.labelText }>
							{ this.props.label }
						</Text>
					</View>
					<View style={ styles.inputField }>
						{ this.props.children }
					</View>
				</View>
				<View style={ styles.line } />
			</View>
		);
	}
}
