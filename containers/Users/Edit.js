import React, { Component } from 'react';
import { updateUser } from '../../actions';
import Form from '../../components/Users/Form';

export default class Edit extends Component {
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
		this.state = {
			user: { ...props.users.users[this.props.user] },
		};
		//this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent() {
		this.onSave();
	}
	onChangePropertyValue( property, value ) {
		let user = this.state.user;
		user[property] = value;
		this.setState( { user: user } );
	}
	onSave() {
		this.props.dispatch( updateUser( this.state.user ) );
		this.props.navigator.pop();
	}
	render() {
		let schema = this.props.sites[this.props.activeSite.id].routes[
			'/wp/v2/users'
		].schema;
		return (
			<Form
				user={ this.state.user }
				schema={ schema }
				onChangePropertyValue={ ( p, v ) => this.onChangePropertyValue( p, v ) }
			/>
		);
	}
}
