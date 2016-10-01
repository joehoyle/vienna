import React, { Component } from 'react'
import NavBar from '../../components/General/NavBar'

export default class ViewNavBar extends Component {
	onBack() {
		this.props.dispatch( {
			type: 'ROUTER_POP',
		} )
	}
	render() {
		var taxonomy = this.props.taxonomies[ this.props.route.passProps.routerData.taxonomy ]
		var site = this.props.sites[ this.props.activeSite.id ]
		return <NavBar
			title={taxonomy.name}
			backText={site.name}
			onBack={() => this.onBack()}
		/>
	}
}
