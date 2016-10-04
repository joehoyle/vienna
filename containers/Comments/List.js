import React, {Component} from 'react';
import { ScrollView, Image, View, RefreshControl, StyleSheet } from 'react-native';
import { values, isEmpty } from 'lodash'
import { fetchComments, createComment, trashComment } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Comments/ListItem'
import Filter from '../../components/Comments/Filter'
import ListError from '../../components/General/ListError'

export default class List extends Component {
	componentWillMount() {
		if ( isEmpty( this.props.comments.comments ) ) {
			this.props.dispatch( fetchComments() )
		}
	}

	onSelectComment( comment ) {
		this.props.navigator.push({
			screen: 'CommentsEdit',
			passProps: {
				comment: comment.id,
			},
			title: 'Edit Comment',
		})
	}

	onReplyToComment( comment, text ) {
		this.props.dispatch( createComment( {
			parent: comment.id,
			content: text,
			post: comment.post,
		}))
	}

	onTrashComment( comment ) {
		this.props.dispatch( trashComment( comment.id ) )
	}

	onRefresh() {
		this.props.dispatch( fetchComments() )
	}

	onChangeFilter(filter) {
		this.props.dispatch({
			type: 'COMMENTS_LIST_FILTER_UPDATED',
			payload: {
				filter: filter,
			},
		})
	}

	filterComments( comment ) {
		if ( this.props.comments.list.filter.status === 'all' ) {
			return true
		}

		return this.props.comments.list.filter.status === comment.status
	}

	render() {
		return (
			<View style={{flex: 1}}>
				{this.props.comments.list.isShowingFilter ?
					<Filter
						filter={this.props.comments.list.filter}
						onChange={this.onChangeFilter.bind(this)}
					/>
				: null }
				{this.props.comments.list.lastError ?
					<ListError error={this.props.comments.list.lastError} />
				: null}
				<ScrollView
					refreshControl={<RefreshControl
						refreshing={this.props.comments.list.loading}
						style={{backgroundColor: 'transparent'}}
						onRefresh={this.onRefresh.bind(this)}
						tintColor="#666666"
						title={this.props.comments.list.loading ? 'Loading Comments...' : 'Pull to Refresh...'}
						titleColor="#000000"
					/>}
					>
					{values(this.props.comments.comments).filter( this.filterComments.bind(this) ).map( comment => {
						return (
							<View style={styles.listItem} key={comment.id}>
								<ListItem
									comment={comment}
									post={comment.post && this.props.types.post.posts[comment.post] ? this.props.types.post.posts[comment.post] : null}
									onEdit={this.onSelectComment.bind(this,comment)}
									onTrash={this.onTrashComment.bind(this,comment)}
									onReply={this.onReplyToComment.bind(this)}
								/>
							</View>
						)
					})}
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	listItem: {
		padding: 15,
		borderBottomColor: '#F7F7F7',
		borderBottomWidth: 1,
	}
})
