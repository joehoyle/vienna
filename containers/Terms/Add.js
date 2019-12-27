import React, { Component } from 'react';
import { createTerm } from '../../actions';
import Form from '../../components/Terms/Form';
import { connect } from 'react-redux';
import NavigationButton from '../../components/Navigation/Button';

class Add extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			term: {},
		};
	}

	componentDidMount() {
		this.props.navigation.setOptions( {
			title: `Add ${ this.props.route.params.taxonomy.labels.singular_name }`,
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
		let term = this.state.term;
		term[property] = value;
		this.setState( { term } );
	}

	onSave = () => {
		this.props.dispatch(
			createTerm(
				this.state.term,
				this.props.navigation.state.params.taxonomy.slug,
			),
		);
		this.props.navigation.goBack();
	}

	render() {
		const taxonomy = this.props.navigation.state.params.taxonomy;
		const slug = taxonomy._links['wp:items'][0].href.split( '/' ).slice( -1 )[0];
		let schema = this.props.sites[this.props.activeSite.id].routes[
			'/wp/v2/' + slug
		].schema;

		return (
			<Form
				term={ this.state.term }
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
