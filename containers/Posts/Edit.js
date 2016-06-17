import React, {
	Component,
} from 'react-native'
import PropTypes from '../../PropTypes'
import EditPost from '../../components/Posts/Edit'

export default class Edit extends Component {
	render() {
		var post = this.props.posts[ this.props.routerData.postId ]

		return (
			<EditPost post={post} dispatch={this.props.dispatch} media={this.props.media} />
		)
	}
}
