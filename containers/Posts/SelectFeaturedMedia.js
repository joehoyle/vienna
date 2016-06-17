import React, { Component } from 'react-native'
import MediaList from '../../components/Media/List'
import { values } from 'lodash'
import { fetchMedia, updatePost } from '../../actions'

export default class SelectFeaturedMedia extends Component {

	componentWillMount() {
		this.props.dispatch( fetchMedia() )
	}

	handleSelectImage( attachment ) {
		this.props.dispatch( updatePost( this.props.routerData.postId, {
			featured_image: attachment.id,
		}))
		this.props.dispatch( {
			type: 'ROUTER_POP',
		})
	}

	render() {
		return (
			<MediaList
				media={values(this.props.media)}
				onSelect={this.handleSelectImage.bind(this)}
				/>
		)
	}
}
