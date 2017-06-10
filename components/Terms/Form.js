import React, { Component } from 'react';
import {
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import SchemaFormField from '../General/SchemaFormField';

export default class Form extends Component {
	static propTypes = {
		term: React.PropTypes.object.isRequired,
		schema: React.PropTypes.object.isRequired,
		onChangePropertyValue: React.PropTypes.func.isRequired,
	};
	render() {
		const schema = this.props.schema;
		const object = this.props.term;
		const namesMap = {
			name: 'Name',
			slug: 'Slug',
			description: 'Description',
		};

		return (
			<ScrollView>
				<View style={styles.list}>
					{Object.entries(schema.properties).map(properties => {
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
});
