import React, {Component} from 'react';
import {ScrollView, Image, RefreshControl, TouchableOpacity} from 'react-native';
import { values, isEmpty } from 'lodash'
import { fetchUsers } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Users/ListItem'

export default class List extends Component {

	componentWillMount() {
		if ( isEmpty( this.props.users.users ) ) {
			this.props.dispatch( fetchUsers( {per_page: 100}) )
		}
	}

	onSelectUser( user ) {
		this.props.dispatch({
			type: 'ROUTER_PUSH',
			payload: {
				name: 'user-edit',
				data: {
					userId: user.id
				},
			},
		})
	}

	onRefresh() {

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
			</ScrollView>
		)
	}
}
