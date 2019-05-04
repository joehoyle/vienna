import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BooleanField from './SchemaFormFields/Boolean';
import EmailField from './SchemaFormFields/Email';
import NumberField from './SchemaFormFields/Number';
import TextField from './SchemaFormFields/Text';
import UrlField from './SchemaFormFields/Url';
import EnumField from './SchemaFormFields/Enum';
import DateField from './SchemaFormFields/Date';
import ArrayEnumField from './SchemaFormFields/ArrayEnum';

const styles = StyleSheet.create({
	field: {
		backgroundColor: '#FFFFFF',
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#f9f9f9',
	},
	label: {
		width: 130,
		marginLeft: 10,
	},
	labelText: {
		fontSize: 15,
		lineHeight: 16,
	},
	inputField: {
		flex: 1,
		justifyContent: 'flex-end',
		flexDirection: 'row',
		marginRight: 10,
	},
	descriptionText: {
		fontSize: 11,
		color: '#999999',
		margin: 8,
		marginBottom: 15,
	},
});

export default class SchemaFormField extends Component {
	static propTypes = {
		value: PropTypes.any,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};

	render() {
		var Field = null;
		if (this.props.schema.enum) {
			Field = EnumField;
		} else {
			switch (this.props.schema.type) {
				case 'boolean':
					Field = BooleanField;
					break;
				case 'string':
					switch (this.props.schema.format) {
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
					if (!this.props.schema.items) {
						console.log(
							'schema for type array foes not have an items prop',
							this.props.schema
						);
					} else {
						if (this.props.schema.items.enum) {
							Field = ArrayEnumField;
						}
					}
					break;
				case 'integer':
					Field = NumberField;
					break;
			}
		}

		if (!Field) {
			console.log('no field found for schema', this.props.schema);
			return null;
		}
		return (
			<View>
				<View style={styles.field}>
					<View style={styles.label}>
						<Text style={styles.labelText}>{this.props.name}</Text>
					</View>
					<View style={styles.inputField}>
						<Field
							value={this.props.value}
							schema={this.props.schema}
							name={this.props.name}
							onChange={this.props.onChange}
							onSave={this.props.onSave}
						/>
					</View>
				</View>
			</View>
		);
	}
}
