import React, {
	Component,
} from 'react-native'
import PropTypes from '../../PropTypes'
import EditPost from '../../components/Posts/Edit'
import EditMedia from '../../components/Media/Edit'

export default class Edit extends Component {
	render() {
		var post = this.props.types[this.props.routerData.type].posts[ this.props.routerData.postId ]

		const componentMap = {
			attachment: EditMedia,
		}

		var PostComponent = componentMap[this.props.routerData.type]
			? componentMap[this.props.routerData.type]
			: EditPost

		return (
			<PostComponent
			post={post}
			routerData={this.props.routerData}
			dispatch={this.props.dispatch}
			media={this.props.types.attachment.posts} />
		)
	}
}
