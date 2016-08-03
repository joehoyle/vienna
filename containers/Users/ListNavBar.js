import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import FilterListDropdownButton from '../../components/FilterListDropdownButton'

export default class ListNavBar extends Component {

	onPressTitle() {
		this.props.dispatch({
			type:'USERS_LIST_TOGGLE_FILTER'
		})
	}
	handleCreateUser() {

	}
	render() {
		return (
			<NavigationBar
				leftButton={{
					title: 'Back',
					tintColor: '#ffffff',
					handler: this.props.actions.pop,
				}}
				rightButton={<TouchableOpacity onPress={this.handleCreateUser.bind(this)}><Icon name="user-plus" style={{marginRight:15}} size={22} color="white" /></TouchableOpacity>}
				statusBar={{
					hidden: this.props.statusHidden || false,
					style: this.props.statusStyle || 'default',
				}}
				tintColor={this.props.navTint}
				title={<FilterListDropdownButton onPress={this.onPressTitle.bind(this)}>Users</FilterListDropdownButton>}
			/>
		)
	}
}
