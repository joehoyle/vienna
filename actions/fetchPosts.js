import httpapi from '../api';

export default function fetchPosts( args ) {
	args = {
		context: 'edit',
		...args,
		per_page: 20,
	};
	return ( dispatch, getStore ) => {
		dispatch( {
			type: 'TYPE_POSTS_UPDATING',
			payload: {
				type: args.type,
			},
		} );

		const store = getStore();
		const site = store.sites[store.activeSite.id];
		const api = new httpapi( site );
		let url = site.data.types[args.type]._links['wp:items'][0].href;
		api.get( url, args ).then( data => {
			dispatch( {
				type: 'TYPE_POSTS_UPDATED',
				payload: {
					type: args.type,
					posts: data,
				},
			} );
		} )
		.catch( error => {
			dispatch( {
				type: 'TYPES_POSTS_POST_UPDATE_ERRORED',
				payload: {
					type: args.type,
					error,
				},
			} );
		})
	};
}
