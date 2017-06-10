import React, { Component } from 'react';
import {
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import SchemaFormField from '../General/SchemaFormField';
import MultilineTextFormField
	from '../../components/General/FormFields/MultilineText';
import UserSelectFormField
	from '../../components/General/FormFields/UserSelect';

export default class Form extends Component {
	static propTypes = {
		post: React.PropTypes.object.isRequired,
		schema: React.PropTypes.object.isRequired,
		onChangePropertyValue: React.PropTypes.func.isRequired,
	};
	render() {
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
		const ignoreProperties = [
			'date_gmt',
			'author',
			'content',
			'title',
			'featured_media',
		];

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
				<View style={styles.authorField}>
					<Text>Author</Text>
					<UserSelectFormField
						value={object.author}
						onChange={value =>
							this.props.onChangePropertyValue('author', value)}
					/>
				</View>
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
										value={value}
										onChange={value =>
											this.props.onChangePropertyValue(property, value)}
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

const styles = StyleSheet.create({
	list: {
		paddingTop: 15,
	},
	contentField: {
		margin: 10,
	},
	authorField: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
	},
});
