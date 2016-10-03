import React, {Component} from 'react';
import {ScrollView, Image, RefreshControl, TouchableOpacity, Modal, View, Text } from 'react-native';
import { values, isEmpty } from 'lodash'
import { fetchUsers } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Users/ListItem'
import EditItem from './Edit'

export default class List extends Component {
	constructor() {
		super()
		this.state = {
			editingUser: null,
		}
	}
	componentWillMount() {
		if ( isEmpty( this.props.users.users ) ) {
			this.props.dispatch( fetchUsers( {per_page: 100}) )
		}
	}
	onSelectUser( user ) {
		this.props.navigator.push({
			screen: 'UsersEdit',
			passProps: {
				user: user.id,
			},
			title: user.name,
		})
	}
	onRefresh() {
		this.props.dispatch( fetchUsers( {per_page: 100}) )
	}
	render() {
		return (
			<ScrollView
				refreshControl={<RefreshControl
					refreshing={this.props.users.list.loading}
					style={{backgroundColor: 'transparent'}}
					onRefresh={this.onRefresh.bind(this)}
					tintColor="#666666"
					title={this.props.users.list.loading ? 'Loading Users...' : 'Pull to Refresh...'}
					titleColor="#000000"
				/>}
				>
				{values(this.props.users.users).map( user => {
					return (
						<TouchableOpacity key={user.id} onPress={this.onSelectUser.bind(this, user)}>
							<ListItem
								user={user}
								onEdit={this.onSelectUser.bind(this,user)}
								onTrash={()=>{}}
							/>
						</TouchableOpacity>
					)
				})}
				{this.state.editingUser ?
					<Modal
						animationType={"slide"}
						transparent={false}
						visible={!!this.state.editingUser}
					>
						<EditItem
							user={this.state.editingUser}
							schema={this.props.users.schema}
							onChangePropertyValue={( property, value ) => this.onChangePropertyValue( property, value )}
						/>
					</Modal>
				: null}
			</ScrollView>
		)
	}
}
