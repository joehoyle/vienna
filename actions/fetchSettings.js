import httpapi from '../api'

export default function fetchSettings( args ) {
	return ( dispatch, getStore ) => {
		const store = getStore()
		const api = new httpapi( store.sites[ store.activeSite.id ] )

		args = { context: 'edit', ...args }

		dispatch({
			type: 'SETTINGS_UPDATING',
		})
		api.get( '/wp/v2/settings', args, function( data, err ) {
			dispatch({
				type: 'SETTINGS_UPDATED',
				payload: {
					settings: data
				}
			})
		})
	}
}
