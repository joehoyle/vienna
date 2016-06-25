import React, { Component, ScrollView, View, RefreshControl } from 'react-native'
import { values, isEmpty } from 'lodash'
import PropTypes from '../../PropTypes'
import ListItem from './ListItem'

export default class List extends Component {

	static propTypes = {
		posts: React.PropTypes.arrayOf( PropTypes.Post ).isRequired,
		onEdit: React.PropTypes.func,
		onView: React.PropTypes.func,
		onTrash: React.PropTypes.func,
	}
	render() {
		var posts = this.props.posts
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						{...this.props.refreshControl}
					/>
				}>
				{posts.map( post => {
					return (
						<ListItem
							key={post.id}
							post={post}
							onEdit={this.props.onEdit.bind(this,post)}
							onView={this.props.onView.bind(this,post)}
							onTrash={this.props.onTrash.bind(this,post)}
							//featuredMedia={this.props.media[post.featured_image]}
							/>
					)
				} ) }
			</ScrollView>
		)
	}
}
