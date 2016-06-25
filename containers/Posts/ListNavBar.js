import React, { Component, View, Text, TouchableOpacity } from 'react-native'
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import FilterListDropdownButton from '../../components/FilterListDropdownButton'

export default class ListNavBar extends Component {

	onPressTitle() {
		this.props.dispatch({
			type:'POSTS_LIST_TOGGLE_FILTER',
			payload: {
				type: this.props.route.passProps.routerData.type,
			}
		})
	}
	handleCreatePost() {
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
		return (
			<NavigationBar
				leftButton={{
					title: 'Back',
					tintColor: '#ffffff',
					handler: this.props.actions.pop,
				}}
				rightButton={<TouchableOpacity onPress={this.handleCreatePost.bind(this)}><Icon name="pencil-square-o" style={{marginRight:15}} size={22} color="white" /></TouchableOpacity>}
				statusBar={{
					hidden: this.props.statusHidden || false,
					style: this.props.statusStyle || 'default',
				}}
				tintColor={this.props.navTint}
				title={<FilterListDropdownButton onPress={this.onPressTitle.bind(this)}>{type.name}</FilterListDropdownButton>}
			/>
		)
	}
}
