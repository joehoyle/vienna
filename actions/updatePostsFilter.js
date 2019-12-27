export default function updatePostsFilter( type, filter = {} ) {
	return dispatch => {
		dispatch( {
			type: 'POSTS_LIST_FILTER_UPDATED',
			payload: {
				filter,
				type,
			},
		} );
	}
}
