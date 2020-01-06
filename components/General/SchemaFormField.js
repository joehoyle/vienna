import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BooleanField from './SchemaFormFields/Boolean';
import EmailField from './SchemaFormFields/Email';
import NumberField from './SchemaFormFields/Number';
import TextField from './SchemaFormFields/Text';
import UrlField from './SchemaFormFields/Url';
import EnumField from './SchemaFormFields/Enum';
import DateField from './SchemaFormFields/Date';
import ArrayEnumField from './SchemaFormFields/ArrayEnum';
import ObjectField from './SchemaFormFields/Object';

export default class SchemaFormField extends Component {
	static propTypes = {
		value: PropTypes.any,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};

	render() {
		let Field = null;
		if ( this.props.schema.enum ) {
			Field = EnumField;
		} else {
			switch ( this.props.schema.type ) {
				case 'boolean':
					Field = BooleanField;
					break;
				case 'string':
					switch ( this.props.schema.format ) {
						case 'email':
							Field = EmailField;
							break;
						case 'uri':
							Field = UrlField;
							break;
						case 'date-time':
							Field = DateField;
							break;
						default:
							Field = TextField;
					}
					break;
				case 'array':
					if ( ! this.props.schema.items ) {
						// eslint-disable-next-line no-console
						console.log(
							'schema for type array foes not have an items prop',
							this.props.schema,
						);
					} else {
						if ( this.props.schema.items.enum ) {
							Field = ArrayEnumField;
						}
					}
					break;
				case 'integer':
					Field = NumberField;
					break;
				case 'object':
					Field = ObjectField;
					break;

				default:
					// No-op, detected below.
					break;
			}
		}

		if ( ! Field ) {
			// eslint-disable-next-line no-console
			console.log( `no type found for ${ this.props.name }`, this.props.schema );
			return null;
		}

		return (
			<Field { ...this.props } />
		);
	}
}
