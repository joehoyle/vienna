import React, { Component } from 'react';
import { createPost } from '../../actions';
import { connect } from 'react-redux';
import Form from '../../components/Posts/Form';
import NavigationButton from '../../components/Navigation/Button';

class Add extends Component {
	static navigationOptions = ( { navigationOptions, navigation } ) => ( {
		title: `Add ${navigation.state.params.type.labels.singular_name}`,
		headerRight: () => (
			<NavigationButton onPress={ () => _this.onSave() }>Save</NavigationButton>
		),
	} );
	constructor( props ) {
		super( props );
		this.state = {
			post: {},
		};
		_this = this; // Big hack, see https://github.com/react-community/react-navigation/issues/145
	}
	onChangePropertyValue( property, value ) {
		let post = this.state.post;
		post[property] = value;
		this.setState( { post } );
	}
	onSave() {
		this.props.dispatch(
			createPost( this.state.post, this.props.navigation.state.params.type.slug ),
		);
		this.props.navigation.toBack();
	}
	render() {
		const type = this.props.navigation.state.params.type;
		const slug = type._links['wp:items'][0].href.split( '/' ).slice( -1 )[0];
		let schema = this.props.sites[this.props.activeSite.id].routes[
			'/wp/v2/' + slug
		].schema;

		return (
			<Form
				post={ this.state.post }
				schema={ schema }
				onChangePropertyValue={ ( p, v ) => this.onChangePropertyValue( p, v ) }
			/>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( Add );
