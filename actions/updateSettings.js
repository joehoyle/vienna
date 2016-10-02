import httpapi from '../api'

export default function updateSettings( settings ) {
	return ( dispatch, getStore ) => {
		const store = getStore()
		const api = new httpapi( store.sites[ store.activeSite.id ] )

		dispatch({
			type: 'SETTINGS_UPDATING',
		})
		api.post( '/wp/v2/settings', settings, function( data, err ) {
			dispatch({
				type: 'SETTINGS_UPDATED',
				payload: {
					settings: data
				}
			})
		})
	}
}
