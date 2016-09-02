import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import NavigationBar from 'react-native-navbar'
import NavBarButton from '../../components/General/NavBarButton'

export default class ViewNavBar extends Component {
	render() {
		return (
			<NavigationBar
				leftButton={<NavBarButton onPress={()=>this.props.actions.pop()}>Sites</NavBarButton>}
				tintColor="rgba(255,255,255,.05)"
				title={<Text style={[{color: this.props.navTitleColor},styles.text]}>{this.props.sites[ this.props.activeSite.id ].name}</Text>}
			/>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		fontSize: 15,
	},
})
