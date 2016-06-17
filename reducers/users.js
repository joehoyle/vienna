export default function users( state = {}, action ) {
	switch ( action.type ) {
		case 'USERS_UPDATED':
			action.data.forEach( user => {
				state[ user.id ] = user
			})
			return state
	}
	return state
}
