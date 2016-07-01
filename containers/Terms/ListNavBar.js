import React, { Component, View, Text, TouchableOpacity } from 'react-native'
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ListNavBar extends Component {
	constructor(props){
		super(props)
		this.handleCreateTerm = this.handleCreateTerm.bind(this)
	}

	handleCreateTerm() {
		this.props.dispatch( {
			type: 'ROUTER_PUSH',
			payload: {
				name: 'terms-create',
				data: {
					taxonomy: this.props.route.passProps.routerData.taxonomy
				}
			},
		} )
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
				rightButton={<TouchableOpacity onPress={this.handleCreateTerm}><Icon name="pencil-square-o" style={{marginRight:15}} size={22} color="white" /></TouchableOpacity>}
				tintColor={this.props.navTint}
				title={<Text style={{color: '#fff',fontWeight: 'bold',fontSize:16}}>{taxonomy.name}</Text>}
			/>
		)
	}
}
