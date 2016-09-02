import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import NavigationBar from 'react-native-navbar'
import NavBarButton from '../../components/General/NavBarButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import FilterListDropdownButton from '../../components/FilterListDropdownButton'

export default class ListNavBar extends Component {
	onPressTitle() {
		this.props.dispatch({
			type:'USERS_LIST_TOGGLE_FILTER'
		})
	}

	onCreateUser() {
	}

	render() {
		var site = this.props.sites[ this.props.activeSite.id ]
		return (
			<NavigationBar
				leftButton={<NavBarButton onPress={()=>this.props.actions.pop()}>{site.name}</NavBarButton>}
				rightButton={<TouchableOpacity onPress={this.onCreateUser.bind(this)}><Icon name="user-plus" style={{marginRight:10}} size={20} color="#333333" /></TouchableOpacity>}
				title={<FilterListDropdownButton onPress={this.onPressTitle.bind(this)}>Users</FilterListDropdownButton>}
			/>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 15,
		color: '#333333',
	},
	rightButton: {
		fontSize: 30,
		lineHeight: 26,
		marginRight: 10,
	}
})
