import React, { Component } from 'react';
import { createPost } from '../../actions';
import { connect } from 'react-redux';
import Form from '../../components/Posts/Form';
import NavigationButton from '../../components/Navigation/Button';

class Add extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			post: {},
		};
	}

	componentDidMount() {
		this.props.navigation.setOptions( {
			title: `Add ${ this.props.route.params.type.labels.singular_name}`,
			headerRight: () => (
				<NavigationButton
					onPress={ this.onSave }
				>
					Save
				</NavigationButton>
			),
		} );
	}

	onChangePropertyValue( property, value ) {
		let post = this.state.post;
		post[property] = value;
		this.setState( { post } );
	}

	onSave = () => {
		this.props.dispatch(
			createPost( this.state.post, this.props.navigation.state.params.type.slug ),
		);
		this.props.navigation.goBack();
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
