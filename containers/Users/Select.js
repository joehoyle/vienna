import React, { Component } from 'react';
import {
	ScrollView,
	RefreshControl,
	TouchableOpacity,
	View,
} from 'react-native';
import { isEmpty } from 'lodash';
import { fetchUsers } from '../../actions';
import ListItem from '../../components/Users/ListItem';
import ListError from '../../components/General/ListError';

export default class List extends Component {
	static navigatorStyle = {
		navBarNoBorder: true,
	};
	componentWillMount() {
		if ( isEmpty( this.props.users.users ) ) {
			this.props.dispatch( fetchUsers( { per_page: 100 } ) );
		}
	}
	onSelectUser( user ) {
		this.props.onSelect( user );
		this.props.navigator.pop();
	}
	onRefresh() {
		this.props.dispatch( fetchUsers( { per_page: 100 } ) );
	}
	render() {
		return (
			<View style={ { flex: 1 } }>
				{ this.props.users.list.lastError ? (
					<ListError error={ this.props.users.list.lastError } />
				) : null }
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={ this.props.users.list.loading }
							style={ { backgroundColor: 'transparent' } }
							onRefresh={ this.onRefresh.bind( this ) }
							tintColor="#666666"
							title={
								this.props.users.list.loading
									? 'Loading Users...'
									: 'Pull to Refresh...'
							}
							titleColor="#000000"
						/>
					}
				>
					{ Object.values( this.props.users.users ).map( user => {
						return (
							<TouchableOpacity
								key={ user.id }
								onPress={ this.onSelectUser.bind( this, user ) }
							>
								<ListItem
									user={ user }
									onEdit={ () => this.onSelectUser( user ) }
									onTrash={ () => {} }
									icon=""
								/>
							</TouchableOpacity>
						);
					} ) }
				</ScrollView>
			</View>
		);
	}
}
