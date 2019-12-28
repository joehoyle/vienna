import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateUser } from '../../actions';
import Form from '../../components/Users/Form';
import NavigationButton from '../../components/Navigation/Button';
import ModalHeader from '../../components/General/ModalHeader';

export class Edit extends Component {
	constructor( props ) {
		super( props );

		const users =
			props.site && props.site.data ? props.site.data.users.users : {};
		this.state = {
			user: users[props.route.params.user],
			updating: false,
		};
	}

	onChangePropertyValue( property, value ) {
		let user = this.state.user;
		user[property] = value;
		this.setState( { user: user } );
	}

	onSave() {
		this.setState( { updating: true } );
		this.props.dispatch( updateUser( this.state.user ) ).then( () => {
			this.props.navigation.pop();
		} ).finally( () => {
			this.setState( { updating: false } );
		});
	}

	render() {
		const schema = this.props.site.routes['/wp/v2/users'].schema;

		return (
			<>
				<ModalHeader
					title={ `Edit User ${this.state.user.name}` }
					headerRight={ () => (
						<NavigationButton onPress={ () => this.onSave() }>
							{ this.state.updating ? 'Saving...' : 'Save' }
						</NavigationButton>
					) }
				/>
				<Form
					user={ this.state.user }
					schema={ schema }
					onChangePropertyValue={ ( p, v ) =>
						this.onChangePropertyValue( p, v )
					}
				/>
			</>
		);
	}
}

const mapStateToProps = state => ( {
	site: state.activeSite.id ? state.sites[state.activeSite.id] : null,
} );

export default connect( mapStateToProps )( Edit );
