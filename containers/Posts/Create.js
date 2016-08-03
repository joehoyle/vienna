import React, {Component} from 'react';
import PropTypes from '../../PropTypes'
import EditPost from '../../components/Posts/Edit'

export default class Create extends Component {
	render() {
		return (
			<EditPost post={this.props.newPost} dispatch={this.props.dispatch} media={this.props.media} />
		)
	}
}
