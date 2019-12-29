import httpapi from '../api';

export default function fetchComments( args ) {
	args = {
		context: 'edit',
		...args,
		status: ! args.status ? 'all' : args.status,
	};
	return ( dispatch, getStore ) => {
		dispatch( {
			type: 'COMMENTS_UPDATING',
		} );

		const store = getStore();
		const site = store.sites[store.activeSite.id];
		const api = new httpapi( site );

		api
			.get( '/wp/v2/comments', args )
			.then( function ( data ) {
				dispatch( {
					type: 'COMMENTS_UPDATED',
					payload: {
						comments: data,
					},
				} );
			} )
			.catch( error => {
				dispatch( {
					type: 'COMMENTS_COMMENT_UPDATE_ERRORED',
					payload: {
						error,
					},
				} );
			} );
	};
}
