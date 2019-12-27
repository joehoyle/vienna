import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import Form from '../../components/Users/Form';

export class Edit extends Component {
	static navigatorButtons = {
		rightButtons: [
			{
				title: 'Save',
				id: 'save',
			},
		],
	};

	constructor( props ) {
		super( props );

		const users = props.site && props.site.data ? props.site.data.users.users : {};
		this.state = {
			user: users[ props.route.params.user ],
		};
	}

	componentDidMount() {
		this.props.navigation.setOptions( {
			title: this.state.user.name,
		} );
	}

	onChangePropertyValue( property, value ) {
		let user = this.state.user;
		user[property] = value;
		this.setState( { user: user } );
	}

	onSave() {
		this.props.dispatch( updateUser( this.state.user ) );
		this.props.navigation.pop();
	}

	render() {
		const schema = this.props.site.routes['/wp/v2/users'].schema;

		return (
			<Form
				user={ this.state.user }
				schema={ schema }
				onChangePropertyValue={ ( p, v ) => this.onChangePropertyValue( p, v ) }
			/>
		);
	}
}

const mapStateToProps = state => ( {
	site: state.activeSite.id ? state.sites[ state.activeSite.id ] : null,
} );

export default connect( mapStateToProps )( Edit );
