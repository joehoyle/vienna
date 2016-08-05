import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/FontAwesome'
import FilterListDropdownButton from '../../components/FilterListDropdownButton'
import { uploadImage } from '../../actions'

export default class ViewNavBar extends Component {
	render() {
		return (
			<NavigationBar
				leftButton={{
					title: 'Switch Site',
					tintColor: '#ffffff',
					handler: this.props.actions.pop,
				}}
				statusBar={{
					hidden: this.props.statusHidden || false,
					style: this.props.statusStyle || 'default',
				}}
				tintColor={this.props.navTint}
				title={<Text style={styles.text}>{this.props.sites[ this.props.activeSite.id ].name}</Text>}
			/>
		)
	}
}

const styles = StyleSheet.create({
	text: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
})
