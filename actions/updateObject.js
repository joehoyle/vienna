import httpapi from '../api';

export default function updateObject( object, actionPrefix = '' ) {
	return ( dispatch, getStore ) => {
		const store = getStore();
		const api = new httpapi( store.sites[store.activeSite.id] );
		dispatch( {
			type: actionPrefix + '_UPDATING',
			payload: {
				object,
			},
		} );
		return api
			.post( object._links.self[0].href, object )
			.then( data => {
				dispatch( {
					type: actionPrefix + '_UPDATED',
					payload: {
						object: data,
					},
				} );
				return data;
			} )
			.catch( error => {
				dispatch( {
					type: actionPrefix + '_UPDATE_ERRORED',
					payload: {
						object,
						error,
					},
				} );

			} );
	};
}
