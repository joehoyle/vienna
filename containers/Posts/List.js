import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, RefreshControl, ActivityIndicator, Text} from 'react-native';
import { values, isEmpty } from 'lodash'
import { trashPost, fetchPosts } from '../../actions'
import PropTypes from '../../PropTypes'
import PostsList from '../../components/Posts/List'
import MediaList from '../../components/Media/List'
import Filter from '../../components/Posts/Filter'
import ListError from '../../components/General/ListError'

export default class List extends Component {
	static navigatorButtons = {
		rightButtons: [{
			title: 'Add',
			id: 'add'
		}]
	}
	constructor(props) {
		super(props)
		//props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent( event ) {
		this.props.navigator.push({
			screen: 'PostsAdd',
			passProps: {
				type: this.props.type,
			}
		})
	}
	componentDidMount() {
		setTimeout( () => {
			var posts = this.props.types[ this.props.type ].posts
			if ( isEmpty( posts ) ) {
				this.props.dispatch( fetchPosts({type:this.props.type}) )
			}
		}, 400 )
	}
	onRefresh() {
		this.props.dispatch( fetchPosts({type:this.props.type}) )
	}
	onSelectPost( post ) {
		this.props.navigator.push({
			screen: 'PostsEdit',
			passProps: {
				post: post.id,
				type: this.props.type,
			},
			title: 'Edit Post',
		})
	}
	onChangeFilter( filter ) {
	}

	filterPosts( post ) {

		var type = this.props.types[ this.props.type ]
		if ( type.list.filter.status === 'all' ) {
			return true
		}

		return type.list.filter.status === post.status
	}

	render() {
		var type = this.props.types[ this.props.type ]
		var posts = type.posts

		const componentMap = {
			attachment: MediaList,
		}

		var ListComponent = componentMap[this.props.type] ? componentMap[this.props.type] : PostsList

		return (
			<View style={{flex: 1}}>
				{type.list.isShowingFilter ?
					<Filter
						filter={type.list.filter}
						onChange={this.onChangeFilter.bind(this)}
					/>
				: null }
				{type.new.loading ?
					<View style={styles.creating}>
						<ActivityIndicator />
						<Text style={styles.creatingText}>Creating {type.name}</Text>
					</View>
				: null }
				{type.list.lastError ?
					<ListError error={type.list.lastError} />
				: null}
				<ListComponent
					refreshControl={<RefreshControl
						refreshing={type.list.loading}
						style={{backgroundColor: 'transparent'}}
						onRefresh={this.onRefresh.bind(this)}
						tintColor="#666666"
						title={type.list.loading ? 'Loading ' + type.name + '...' : 'Pull to Refresh...'}
						titleColor="#000000"
					/>}
					posts={values( posts ).filter( this.filterPosts.bind( this ) )}
					users={this.props.users.users}
					media={this.props.types.attachment.posts}
					onEdit={post => this.onSelectPost( post )}
					onView={post => this.onSelectPost( post )}
					onTrash={post=>this.props.dispatch( trashPost( post ) )}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	creating: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: 5,
		backgroundColor: '#2E73B0',
	},
	creatingText: {
		marginLeft: 5,
		lineHeight: 17,
		color: 'rgba(255,255,255,.3)'
	},
})
