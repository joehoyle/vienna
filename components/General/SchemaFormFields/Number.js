import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		height: 32,
		textAlign: 'right',
		color: '#666666',
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
		let placeholder = this.props.schema.required ? 'Required' : '';
		placeholder = this.props.schema.default
			? String( this.props.schema.default )
			: placeholder;
		return (
			<TextInput
				value={ String( this.props.value ) }
				style={ styles.container }
				keyboardType="numeric"
				placeholder={ placeholder }
				onChangeText={ value => {
					this.props.onChange( value ? parseFloat( value ) : 0 );
				} }
				onSubmitEditing={ this.props.onSave }
			/>
		);
	}
}
