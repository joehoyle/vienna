export default function activeSite( state = { id: null }, action ) {
	switch ( action.type ) {
		case 'ADD_SITE_START':
			return {...state, id: action.id }
		case 'ROUTER_PUSH':
			if ( action.payload.name === 'site' ) {
				return {...state, id: action.payload.data.siteId}
			}
			break
		case 'ADD_SITE_FAILED':
		case 'SITE_REMOVED':
			return {...state, id: null }
	}
	return state
}
