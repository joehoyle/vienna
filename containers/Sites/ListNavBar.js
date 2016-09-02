import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import NavigationBar from 'react-native-navbar'
import NavBarButton from '../../components/General/NavBarButton'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ListNavBar extends Component {
	onCreateSite() {
		this.props.dispatch( {
			type: 'ROUTER_PUSH',
			payload: {
				name: 'add-site',
			},
		} )
	}

	render() {
		return (
			<NavigationBar
				rightButton={<TouchableOpacity onPress={this.onCreateSite.bind(this)}><Text style={styles.rightButton}>+</Text></TouchableOpacity>}
				title={<Text style={[{color: this.props.navTitleColor},styles.text]}>Sites</Text>}
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
