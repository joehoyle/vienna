import fetchPosts from './fetchPosts';

export default function updatePostsFilter( type, filter = {} ) {
	return dispatch => {
		dispatch( {
			type: 'POSTS_LIST_FILTER_UPDATED',
			payload: {
				filter,
				type,
			},
		} );
		dispatch( fetchPosts( {
			type,
			...filter,
		} ) );
	};
}
