import httpapi from '../api';

export default function fetchSettings( args ) {
	return ( dispatch, getStore ) => {
		const store = getStore();
		const api = new httpapi( store.sites[store.activeSite.id] );

		args = {
			context: 'edit',
			...args,
		};

		dispatch( {
			type: 'SETTINGS_UPDATING',
		} );
		api.get( '/wp/v2/settings', args ).then( data => {
			dispatch( {
				type: 'SETTINGS_UPDATED',
				payload: {
					settings: data,
				},
			} );
		} ).catch( error => {
			dispatch( {
				type: 'SETTINGS_UPDATE_ERRORED',
				payload: {
					error,
					siteId: store.activeSite.id,
				},
			} );
		} );
	};
}
