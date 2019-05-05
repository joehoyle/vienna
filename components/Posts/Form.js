import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	ScrollView,
	View,
	Text,
	StyleSheet,
} from 'react-native';

import FormRow from '../General/FormRow';
import SchemaFormField from '../General/SchemaFormField';
import MultilineTextFormField from '../General/FormFields/MultilineText';
import UserSelectFormField from '../General/FormFields/UserSelect';
import DateField from '../General/SchemaFormFields/Date';

const styles = StyleSheet.create({
	list: {
		paddingTop: 15,
	},
	contentField: {
		margin: 10,
	},
});

const ignoreProperties = [
	'date',
	'date_gmt',
	'author',
	'content',
	'title',
	'featured_media',
];

export default class Form extends Component {
	static propTypes = {
		post: PropTypes.object.isRequired,
		schema: PropTypes.object.isRequired,
		onChangePropertyValue: PropTypes.func.isRequired,
	};

	state = {
		focussed: null,
	}

	onBlur = () => {
		this.setState( { focussed: null } )
	}

	render() {
		const { focussed } = this.state;

		const schema = this.props.schema;
		const object = this.props.post;
		const namesMap = {
			title: 'Title',
			slug: 'Slug',
			status: 'Status',
			date: 'Date',
			comment_status: 'Comment Status',
			ping_status: 'Ping Status',
			format: 'Format',
			sticky: 'Stick to Front',
			password: 'Post Password',
			description: 'Description',
		};

		const buildOnChange = prop => value => this.props.onChangePropertyValue( prop, value );
		const buildOnFocus = prop => () => this.setState( { focussed: prop } );

		return (
			<ScrollView>
				<View style={styles.contentField}>
					<MultilineTextFormField
						value={object.title ? object.title.raw : null}
						onChange={value => this.props.onChangePropertyValue('title', value)}
						onSave={() => {}}
					/>
					<MultilineTextFormField
						value={object.content ? object.content.raw : null}
						onChange={value =>
							this.props.onChangePropertyValue('content', value)}
						onSave={() => {}}
					/>
				</View>
				<FormRow label="Author">
					<UserSelectFormField
						value={object.author}
						onChange={value =>
							this.props.onChangePropertyValue('author', value)}
					/>
				</FormRow>

				<DateField
					focussed={ focussed === 'date_gmt' }
					name={ object.status === 'publish' ? 'Published on' : 'Publish on' }
					schema={ schema.properties.date_gmt }
					value={ object.date_gmt }
					onBlur={ this.onBlur }
					onChange={ buildOnChange( 'date_gmt' ) }
					onFocus={ buildOnFocus( 'date_gmt' ) }
					onSave={ () => {} }
				/>

				<View style={styles.list}>
					{Object.entries(schema.properties)
						.filter(
							properties => ignoreProperties.indexOf(properties[0]) === -1
						)
						.map(properties => {
							const propertySchema = properties[1];
							const property = properties[0];
							const value = object[property];
							if (propertySchema.readonly) {
								return null;
							}

							return (
								<View style={styles.listItem} key={property}>
									<SchemaFormField
										name={namesMap[property] ? namesMap[property] : property}
										schema={propertySchema}
										focussed={ focussed === property }
										value={value}
										onBlur={ this.onBlur }
										onChange={ buildOnChange( property ) }
										onFocus={ buildOnFocus( property ) }
										onSave={() => {}}
									/>
								</View>
							);
						})}
				</View>
			</ScrollView>
		);
	}
}
