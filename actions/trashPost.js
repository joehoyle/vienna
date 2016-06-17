import api from '../mockApi'

export default function trashPost( postId ) {
	return dispatch => {
		dispatch({
			type: 'POSTS_POST_TRASHING',
		})
		api._delete( '/wp/v2/posts/' + postId, {}, function( data, err ) {
			dispatch({
				type: 'POSTS_POST_TRASHED',
				postId: postId
			})
		})
	}
}
