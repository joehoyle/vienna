import React, { Component } from 'react';
import { createUser } from '../../actions';
import { connect } from 'react-redux';
import Form from '../../components/Users/Form';
import NavigationButton from '../../components/Navigation/Button';

class Add extends Component {
	static navigationOptions = ( { navigationOptions, navigation } ) => ( {
		title: 'Add User',
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
			user: {},
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
		let user = this.state.user;
		user[property] = value;
		this.setState( { user } );
	}

	onSave = () => {
		this.props.dispatch( createUser( this.state.user ) );
		this.props.navigation.toBack();
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
