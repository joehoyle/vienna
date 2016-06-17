import React, { Component, ScrollView, Image } from 'react-native'
import { values } from 'lodash'
import { fetchMedia } from '../../actions'
import PropTypes from '../../PropTypes'
import MediaList from '../../components/Media/List'

export default class List extends Component {

	static propTypes = {
		media: React.PropTypes.objectOf( PropTypes.Media ).isRequired,
	}
	componentWillMount() {
		this.props.dispatch( fetchMedia() )
	}

	onSelectImage( attachment ) {
		this.props.dispatch({
			type: 'ROUTER_PUSH',
			payload: {
				name: 'media-edit',
				data: {
					mediaId: attachment.id,
				},
			},
		})
	}

	render() {
		return (
			<MediaList
				media={values(this.props.media)}
				onSelect={this.onSelectImage.bind(this)}
				/>
		)
	}
}
