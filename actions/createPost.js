import httpapi from '../api';

export default function createPost( post, type ) {
	return ( dispatch, getStore ) => {
		dispatch( {
			type: 'TYPE_POST_CREATING',
			payload: {
				type: type,
			},
		} );

		const store = getStore();
		const site = store.sites[store.activeSite.id];
		type = site.data.types[type];
		const api = new httpapi( site );

		api
			.post( type._links['wp:items'][0].href, post )
			.then( post => {
				dispatch( {
					type: 'TYPE_POST_CREATED',
					payload: {
						object: post,
					},
				} );
			} )
			.catch( err => {
				dispatch( {
					type: 'TYPE_POST_CREATE_ERRORED',
					payload: {
						object: { type: type.slug },
						error: err,
					},
				} );
			} );
	};
}
