import React, { Component, View, Text, TouchableOpacity } from 'react-native'
import NavigationBar from 'react-native-navbar'
import FilterListDropdownButton from '../../components/FilterListDropdownButton'

export default class ListNavBar extends Component {

	onPressTitle() {
		this.props.dispatch({
			type:'COMMENTS_LIST_TOGGLE_FILTER'
		})
	}
	render() {
		return (
			<NavigationBar
				leftButton={{
					title: 'Back',
					tintColor: '#ffffff',
					handler: this.props.actions.pop,
				}}
				statusBar={{
					hidden: this.props.statusHidden || false,
					style: this.props.statusStyle || 'default',
				}}
				tintColor={this.props.navTint}
				title={<FilterListDropdownButton onPress={this.onPressTitle.bind(this)}>Comments</FilterListDropdownButton>}
			/>
		)
	}
}
