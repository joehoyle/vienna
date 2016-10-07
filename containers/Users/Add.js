import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { createUser } from '../../actions'
import Form from '../../components/Users/Form'

export default class Add extends Component {
	static navigatorButtons = {
		rightButtons: [{
			title: 'Save',
			id: 'save'
		}]
	}
	constructor(props) {
		super(props)
		this.state = {
			user: {}
		}
		props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent() {
		this.onSave()
	}
	onChangePropertyValue( property, value ) {
		var user = this.state.user
		user[ property ] = value
		this.setState({user})
	}
	onSave() {
		this.props.dispatch( createUser( this.state.user ) )
		this.props.navigator.pop()
	}
	render() {
		return <Form
			user={this.state.user}
			schema={this.props.users.schema}
			onChangePropertyValue={(p, v) => this.onChangePropertyValue( p, v )}
		/>
	}
}
