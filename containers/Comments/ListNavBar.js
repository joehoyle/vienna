import React, { Component } from 'react'
import NavBar from '../../components/General/NavBar'

export default class ViewNavBar extends Component {
	onBack() {
		this.props.dispatch( {
			type: 'ROUTER_POP',
		} )
	}
	render() {
		var site = this.props.sites[ this.props.activeSite.id ]
		return <NavBar
			title="Comments"
			backText={site.name}
			onBack={() => this.onBack()}
		/>
	}
}
