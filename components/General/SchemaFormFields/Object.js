import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { TextInput, StyleSheet, Text } from 'react-native';
import SchemaFormField from '../SchemaFormField';

import FormRow from '../FormRow';

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		height: 32,
		color: '#8D8E92',
		fontSize: 16.5,
		textAlign: 'right',
	},
	title: {
		color: '#999',
		marginLeft: 16,
		marginTop: 15,
		fontSize: 10,
	},
} );

export default class ObjectField extends Component {
	static propTypes = {
		value: PropTypes.object,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
	};
	render() {
		if ( ! this.props.schema.properties || this.props.schema.properties.length < 1 ) {
			console.log( 'schema for type object does not have properties', this.props );
			return null;
		}

		return (
			<>
				<Text style={ styles.title }>{ this.props.name.toUpperCase() }</Text>
				{ Object.entries( this.props.schema.properties ).map( ( [ property, schema ] ) => (
					<SchemaFormField name={ property } schema={ schema } value={ this.props.value && this.props.value[property] } onChange={ () => {} } />
				) ) }
			</>
		);
	}
}
