import httpapi from '../api';

export default function createComment( args ) {
	return ( dispatch, getStore ) => {
		dispatch( {
			type: 'USER_CREATING',
			payload: {
				user: args,
			},
		} );

		const store = getStore();
		const site = store.sites[store.activeSite.id];
		const api = new httpapi( site );

		api.post( '/wp/v2/users', args ).then( user => {
			dispatch( {
				type: 'USER_CREATED',
				payload: { user },
			} );
		} );
	};
}
