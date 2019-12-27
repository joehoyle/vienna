import React, { Component } from 'react';
import { updateTerm } from '../../actions';
import Form from '../../components/Terms/Form';
import { connect } from 'react-redux';
import NavigationButton from '../../components/Navigation/Button';

class Edit extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			term: { ...this.props.route.params.term },
		};
	}

	componentDidMount() {
		this.props.navigation.setOptions( {
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
		this.props.dispatch( updateTerm( this.state.term ) );
		this.props.navigation.goBack();
	}

	render() {
		const taxonomy = this.props.route.params.taxonomy;
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
} ) )( Edit );
