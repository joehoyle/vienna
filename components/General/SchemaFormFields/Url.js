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
			<FormRow label={ this.props.name }>
				<TextInput
					value={ this.props.value }
					style={ styles.container }
					keyboardType="url"
					placeholder={ placeholder }
					onChangeText={ this.props.onChange }
					onSubmitEditing={ this.props.onSave }
				/>
			</FormRow>
		);
	}
}
