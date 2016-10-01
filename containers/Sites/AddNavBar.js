import React, { Component } from 'react'
import NavBar from '../../components/General/NavBar'

export default class ListNavBar extends Component {
	onBack() {
		this.props.dispatch( {
			type: 'ROUTER_POP',
		} )
	}
	render() {
		return <NavBar title="Add New Site" backText="Back" onBack={() => this.onBack()} />
	}
}
