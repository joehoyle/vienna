import React, { Component } from 'react'
import NavBar from '../../components/General/NavBar'

export default class ViewNavBar extends Component {
	onBack() {
		this.props.dispatch( {
			type: 'ROUTER_POP',
		} )
	}
	onPressTitle() {
		this.props.dispatch({
			type:'POSTS_LIST_TOGGLE_FILTER',
			payload: {
				type: this.props.route.passProps.routerData.type,
			}
		})
	}
	onCreatePost() {
		// todo: abstract this
		if ( this.props.route.passProps.routerData.type === 'attachment' ) {
			return this.props.dispatch( uploadImage() )
		}
		this.props.dispatch( {
			type: 'ROUTER_PUSH',
			payload: {
				name: 'posts-create',
				type: this.props.route.passProps.routerData.type,
			},
		} )
	}
	render() {
		var type = this.props.types[ this.props.route.passProps.routerData.type ]
		var iconMap = {
			attachment: 'upload'
		}
		var icon = iconMap[ type.slug ] || 'pencil-square-o'
		var site = this.props.sites[ this.props.activeSite.id ]

		return <NavBar
			title={type.name}
			backText={site.name}
			onBack={() => this.onBack()}
			rightIcon={icon}
		/>
	}
}
