import React, { Component } from 'react-native'
import MediaList from '../../components/Media/List'
import { values } from 'lodash'
import { fetchPosts, updatePost } from '../../actions'

export default class SelectFeaturedMedia extends Component {

	componentWillMount() {
		this.props.dispatch( fetchPosts({type:'attachment'}) )
	}

	handleSelectImage( attachment ) {
		this.props.dispatch( updatePost( this.props.routerData.postId, 'attachment', {
			featured_image: attachment.id,
		}))
		this.props.dispatch( {
			type: 'ROUTER_POP',
		})
	}

	render() {
		return (
			<MediaList
				posts={values(this.props.types.attachment.posts)}
				onEdit={this.handleSelectImage.bind(this)}
				/>
		)
	}
}
