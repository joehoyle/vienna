import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { updateComment } from '../../actions';
import SchemaFormField from '../../components/General/SchemaFormField';
import MultilineTextFormField from '../../components/General/FormFields/MultilineText';
import { connect } from 'react-redux';
import NavigationButton from '../../components/Navigation/Button';

const styles = StyleSheet.create( {
	list: {
		paddingTop: 15,
	},
	contentField: {
		margin: 10,
	},
} );

class Edit extends Component {
	static navigationOptions = ( { navigationOptions, navigation } ) => ( {
		title: 'Edit Comment',
		headerRight: (
			<NavigationButton onPress={ () => _this.onSave() }>Save</NavigationButton>
		),
	} );
	constructor( props ) {
		super( props );
		this.state = {
			comment: { ...this.props.navigation.state.params.comment },
		};
		_this = this; // Big hack, see https://github.com/react-community/react-navigation/issues/145
	}
	onChangePropertyValue( property, value ) {
		let comment = this.state.comment;

		if ( property === 'content' ) {
			comment[property].raw = value;
		} else {
			comment[property] = value;
		}
		this.setState( { comment } );
	}
	onSave() {
		this.props.dispatch( updateComment( this.state.comment ) );
		this.props.navigation.goBack();
	}
	render() {
		let schema = this.props.sites[this.props.activeSite.id].routes[
			'/wp/v2/comments'
		].schema;
		let object = this.state.comment;

		let namesMap = {
			author_email: 'Author Email',
			author_ip: 'Author IP Address',
			author_name: 'Author Name',
			author_url: 'Author Website',
			date: 'Date',
			karma: 'Karma',
			status: 'Status',
		};

		return (
			<ScrollView>
				<View style={ styles.contentField }>
					<MultilineTextFormField
						value={ object.content.raw }
						onChange={ value => this.onChangePropertyValue( 'content', value ) }
						onSave={ () => {} }
					/>
				</View>
				<View style={ styles.list }>
					{ Object.entries( schema.properties )
						.filter(
							properties =>
								[ 'author', 'date_gmt', 'parent', 'post', 'type' ].indexOf(
									properties[0],
								) === -1,
						)
						.map( properties => {
							const propertySchema = properties[1];
							const property = properties[0];
							const value = object[property];

							if ( typeof value === 'undefined' ) {
								console.log(
									'Can not find schema property ' + property + ' in object.',
								);
								return null;
							}

							if ( propertySchema.readonly ) {
								return null;
							}

							return (
								<View style={ styles.listItem } key={ property }>
									<SchemaFormField
										name={ namesMap[property] ? namesMap[property] : property }
										schema={ propertySchema }
										value={ value }
										onChange={ value =>
											this.onChangePropertyValue( property, value )
										}
										onSave={ () => {} }
									/>
								</View>
							);
						} ) }
				</View>
			</ScrollView>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( Edit );
