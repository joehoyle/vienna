import httpapi from '../api'

export default function trashPost( postId ) {
	return ( dispatch, getStore ) => {
		const store = getStore()
		const api = new httpapi( store.sites[ store.activeSite.id ] )

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
