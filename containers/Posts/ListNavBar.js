import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import NavigationBar from 'react-native-navbar'
import NavBarButton from '../../components/General/NavBarButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import FilterListDropdownButton from '../../components/FilterListDropdownButton'
import { uploadImage } from '../../actions'

export default class ListNavBar extends Component {
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
		return (
			<NavigationBar
				leftButton={<NavBarButton onPress={()=>this.props.actions.pop()}>{site.name}</NavBarButton>}
				rightButton={<TouchableOpacity onPress={this.onCreatePost.bind(this)}><Icon name={icon} style={{marginRight:10}} size={20} color="#333333" /></TouchableOpacity>}
				title={<Text style={[{color: this.props.navTitleColor},styles.text]}>{type.name}</Text>}
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
