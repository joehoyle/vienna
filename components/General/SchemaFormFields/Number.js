import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

import FormRow from '../FormRow';

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		height: 32,
		color: '#8D8E92',
		fontSize: 16.5,
		textAlign: 'right',
	},
} );

export default class Number extends Component {
	static propTypes = {
		value: PropTypes.number,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};
	render() {
		let placeholder = this.props.schema.required ? 'Required' : 'None';
		placeholder = this.props.schema.default ? String( this.props.schema.default ) : placeholder;
		return (
			<FormRow label={ this.props.name }>
				<TextInput
					value={ this.props.value && String( this.props.value ) }
					style={ styles.container }
					keyboardType="numeric"
					placeholder={ placeholder }
					onChangeText={ value => {
						this.props.onChange( value ? parseFloat( value ) : 0 );
					} }
					onSubmitEditing={ this.props.onSave }
				/>
			</FormRow>
		);
	}
}
