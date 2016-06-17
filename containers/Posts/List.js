import React, { Component, ScrollView, View } from 'react-native'
import { values } from 'lodash'
import { editPost, trashPost, viewPost } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Posts/ListItem'
import Filter from '../../components/Posts/Filter'

export default class List extends Component {

	static propTypes = {
		posts: React.PropTypes.objectOf( PropTypes.Post ).isRequired,
	}

	onChangeFilter( filter ) {
		this.props.dispatch({
			type: 'POSTS_LIST_FILTER_UPDATED',
			filter: filter,
		})
	}

	filterPosts( post ) {
		if ( this.props.postsList.filter.status === 'all' ) {
			return true
		}

		return this.props.postsList.filter.status === post.status
	}

	render() {
		console.log( this.props.routerData )
		return (
			<View>
				{this.props.postsList.isShowingFilter ?
					<Filter
						filter={this.props.postsList.filter}
						onChange={this.onChangeFilter.bind(this)}
					/>
				: null }
				<ScrollView>
					{values( this.props.posts ).filter( this.filterPosts.bind( this ) ).map( post => {
						return (
							<ListItem
								key={post.id}
								post={post}
								onEdit={()=>this.props.dispatch( editPost( post.id ) )}
								onView={()=>this.props.dispatch( viewPost( post ) )}
								onTrash={()=>this.props.dispatch( trashPost( post.id ) )}
								featuredMedia={this.props.media[post.featured_image]}
								/>
						)
					} ) }
				</ScrollView>
			</View>
		)
	}
}
