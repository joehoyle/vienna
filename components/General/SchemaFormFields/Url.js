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

export default class Url extends Component {
	static propTypes = {
		value: PropTypes.string,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};
	render() {
		let placeholder = this.props.schema.required ? 'Required' : '';
		placeholder = this.props.schema.default
			? this.props.schema.default
			: placeholder;
		return (
			<TextInput
				value={ this.props.value }
				style={ styles.container }
				keyboardType="url"
				placeholder={ placeholder }
				onChangeText={ this.props.onChange }
				onSubmitEditing={ this.props.onSave }
			/>
		);
	}
}
