import httpapi from '../api'

export default function fetchSiteData() {
	return ( dispatch, getStore ) => {
		dispatch({
			type: 'SITE_DATA_UPDATING',
		})

		const store = getStore()
		const site = store.sites[ store.activeSite.id ]
		const api = new httpapi( site )

		api.get( '/', { context: 'help' }, function( data ) {
			dispatch({
				type: 'SITE_DATA_UPDATED',
				data: data
			})
			dispatch({
				type: 'ROUTER_RESET',
				payload: {
					name: 'sites',
				},
			})
		} )
	}
}
