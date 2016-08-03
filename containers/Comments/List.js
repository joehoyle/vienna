import React, {Component} from 'react';
import {ScrollView, Image, RefreshControl} from 'react-native';
import { values, isEmpty } from 'lodash'
import { fetchComments } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Comments/ListItem'

export default class List extends Component {

	componentWillMount() {
		if ( isEmpty( this.props.comments.comments ) ) {
			this.props.dispatch( fetchComments() )
		}
	}

	onSelectComment( comment ) {
		this.props.dispatch({
			type: 'ROUTER_PUSH',
			payload: {
				name: 'comment-edit',
				data: {
					commentId: comment.id
				},
			},
		})
	}

	onRefresh() {

	}

	render() {
		return (
			<ScrollView
				refreshControl={<RefreshControl
						refreshing={this.props.comments.list.loading}
						onRefresh={this.onRefresh.bind(this)}
						tintColor="#666666"
						title={this.props.comments.list.loading ? 'Loading Comments...' : 'Pull to Refresh...'}
						titleColor="#000000"
					/>}>
				{values(this.props.comments.comments).map( comment => {
					return (
						<ListItem
							key={comment.id}
							comment={comment}
							onEdit={this.onSelectComment.bind(this,comment)}
							onTrash={()=>{}}
						/>
					)
				})}
			</ScrollView>
		)
	}
}
