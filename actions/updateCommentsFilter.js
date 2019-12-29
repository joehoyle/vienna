import fetchComments from './fetchComments';

export default function updateCommentsFilter( filter = {} ) {
	return dispatch => {
		dispatch( {
			type: 'COMMENTS_LIST_FILTER_UPDATED',
			payload: {
				filter,
			},
		} );
		dispatch( fetchComments( filter ) );
	};
}
