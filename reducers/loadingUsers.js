export default function loadingUsers( state = false, action ) {
	switch ( action.type ) {
		case 'USERS_UPDATING':
			return true
		case 'USERS_UPDATED':
			return false
	}
	return state
}
