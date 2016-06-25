import httpapi from '../api'

export default function fetchUsers( args ) {
	return ( dispatch, getStore ) => {
		const store = getStore()
		const api = new httpapi( store.sites[ store.activeSite.id ] )

		dispatch({
			type: 'USERS_UPDATING',
		})
		api.get( '/wp/v2/users', args, function( data, err ) {
			dispatch({
				type: 'USERS_UPDATED',
				data: data
			})
		})
	}
}
