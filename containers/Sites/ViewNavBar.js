import React, { Component } from 'react'
import NavBar from '../../components/General/NavBar'

export default class ViewNavBar extends Component {
	onBack() {
		this.props.dispatch( {
			type: 'ROUTER_POP',
		} )
	}
	render() {
		return <NavBar
			title={this.props.sites[ this.props.activeSite.id ].name}
			backText="Sites"
			onBack={() => this.onBack()}
		/>
	}
}
