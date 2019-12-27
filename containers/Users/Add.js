import React, { Component } from 'react';
import { createUser } from '../../actions';
import { connect } from 'react-redux';
import Form from '../../components/Users/Form';
import NavigationButton from '../../components/Navigation/Button';

class Add extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			user: {},
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
		let user = this.state.user;
		user[property] = value;
		this.setState( { user } );
	}

	onSave = () => {
		this.props.dispatch( createUser( this.state.user ) );
		this.props.navigation.goBack();
	}

	render() {
		return (
			<Form
				user={ this.state.user }
				schema={
					this.props.sites[this.props.activeSite.id].routes['/wp/v2/users']
						.schema
				}
				onChangePropertyValue={ ( p, v ) => this.onChangePropertyValue( p, v ) }
			/>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( Add );
