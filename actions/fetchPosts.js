import api from '../mockApi'

export default function fetchPosts( args ) {
	return dispatch => {
		dispatch({
			type: 'POSTS_UPDATING',
		})
		api.get( '/wp/v2/posts', args, function( data, err ) {
			dispatch({
				type: 'POSTS_UPDATED',
				data: data
			})
		})
	}
}
