import React, { Component } from 'react';
import { createTerm } from '../../actions';
import Form from '../../components/Terms/Form';
import { connect } from 'react-redux';
import NavigationButton from '../../components/Navigation/Button';

class Add extends Component {
	static navigationOptions = ( { navigationOptions, navigation } ) => ( {
		title: `Add ${navigation.state.params.taxonomy.labels.singular_name}`,
		headerRight: () => (
			<NavigationButton
				onPress={ navigation.state.params.onSave || null }
			>
				Save
			</NavigationButton>
		),
	} );

	constructor( props ) {
		super( props );
		this.state = {
			term: {},
		};
	}

	componentDidMount() {
		this.props.navigation.setParams( {
			onSave: this.onSave,
		} );
	}

	componentWillUnmount() {
		this.props.navigation.setParams( {
			onSave: null,
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
		this.props.navigation.toBack();
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
