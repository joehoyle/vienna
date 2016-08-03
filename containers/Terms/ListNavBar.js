import React, {Component} from 'react';
import {View, Text} from 'react-native';
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ListNavBar extends Component {
	handleCreateTerm() {
		// this.props.dispatch( {
		// 	type: 'ROUTER_PUSH',
		// 	payload: {
		// 		name: 'posts-create',
		// 		type: this.props.route.passProps.routerData.type,
		// 	},
		// } )
	}
	render() {
		var taxonomy = this.props.taxonomies[ this.props.route.passProps.routerData.taxonomy ]
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
				//rightButton={<TouchableOpacity onPress={this.handleCreatePost.bind(this)}><Icon name="pencil-square-o" style={{marginRight:15}} size={22} color="white" /></TouchableOpacity>}
				tintColor={this.props.navTint}
				title={<Text style={{color: '#fff',fontWeight: 'bold',fontSize:16}}>{taxonomy.name}</Text>}
			/>
		)
	}
}
