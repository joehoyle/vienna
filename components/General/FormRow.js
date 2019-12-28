import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { getSemanticColor } from '../../theme';

const styles = StyleSheet.create( {
	field: {
		backgroundColor: getSemanticColor( 'systemBackground' ),
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: getSemanticColor( 'separator' ),
	},
	label: {
		width: 130,
		marginLeft: 10,
	},
	labelText: {
		color: getSemanticColor( 'label' ),
		fontSize: 15,
		lineHeight: 16,
	},
	inputField: {
		flex: 1,
		justifyContent: 'flex-end',
		flexDirection: 'row',
		marginRight: 10,
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
			</View>
		);
	}
}
