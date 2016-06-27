export default function activeSite( state = { id: null }, action ) {
	switch ( action.type ) {
		case 'ADD_SITE_START':
			return {...state, id: action.id }
		case 'SITE_REMOVED':
			return {...state, id: null }
	}
	return state
}
