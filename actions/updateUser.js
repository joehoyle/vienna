import httpapi from '../api'

export default function updateUser( user ) {
	return ( dispatch, getStore ) => {
		const store = getStore()
		const api = new httpapi( store.sites[ store.activeSite.id ] )

		dispatch({
			type: 'USERS_USER_UPDATING',
			payload: {
				user: user
			}
		})
		api.post( '/wp/v2/users/' + user.id, user, function( data, err ) {
			if ( err ) {
				console.warn( err )
				return
			}
			dispatch({
				type: 'USERS_USER_UPDATED',
				payload: {
					user: data
				}
			})
		})
	}
}
