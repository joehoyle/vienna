export default function activeSite( state = { id: null }, action ) {
	switch ( action.type ) {
		case 'SITE_CREATED':
			return {...state, id: action.payload.id }
		case 'ACTIVE_SITE_UPDATED':
			return {...state, id: action.payload.site.id}
		case 'SITE_REMOVED':
			return {...state, id: null }
		default:
			return state;
	}
}
