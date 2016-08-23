import React, {Component} from 'react';
import {StyleSheet, ScrollView, View, RefreshControl, ActivityIndicator, Text} from 'react-native';
import { values, isEmpty } from 'lodash'
import { editPost, trashPost, viewPost, fetchPosts } from '../../actions'
import PropTypes from '../../PropTypes'
import PostsList from '../../components/Posts/List'
import MediaList from '../../components/Media/List'
import Filter from '../../components/Posts/Filter'

export default class List extends Component {
	componentDidMount() {
		setTimeout( () => {
			var posts = this.props.types[ this.props.routerData.type ].posts
			if ( isEmpty( posts ) ) {
				this.props.dispatch( fetchPosts({type:this.props.routerData.type}) )
			}
		}, 400 )
	}

	onRefresh() {
		this.props.dispatch( fetchPosts({type:this.props.routerData.type}) )
	}

	onChangeFilter( filter ) {
		this.props.dispatch({
			type: 'POSTS_LIST_FILTER_UPDATED',
			payload: {
				filter: filter,
				type: this.props.routerData.type,
			},
		})
	}

	filterPosts( post ) {

		var type = this.props.types[ this.props.routerData.type ]
		if ( type.list.filter.status === 'all' ) {
			return true
		}

		return type.list.filter.status === post.status
	}

	render() {

		var type = this.props.types[ this.props.routerData.type ]
		var posts = type.posts

		const componentMap = {
			attachment: MediaList,
		}

		var ListComponent = componentMap[this.props.routerData.type] ? componentMap[this.props.routerData.type] : PostsList

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
					media={this.props.types.attachment.posts}
					onEdit={post=>this.props.dispatch( editPost( post ) )}
					onView={post=>this.props.dispatch( viewPost( post ) )}
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
