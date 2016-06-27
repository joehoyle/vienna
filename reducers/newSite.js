export default function newSite( state = { status: null, errorStatus: null }, action ) {
	switch ( action.type ) {
		case 'ADD_SITE_START':
			return {...state, status: 'Adding site...', errorStatus: null}
		case 'ADD_SITE_BROKER_CONNECTING':
			return {...state, status: 'Connecting to auth broker...'}
		case 'ADD_SITE_REQUEST_TOKEN_UPDATING':
			return {...state, status: 'Getting a request token...'}
		case 'ADD_SITE_REQUEST_TOKEN_UPDATED':
			return {...state, status: 'Sending user to site...'}
		case 'ADD_SITE_ACCESS_TOKEN_UPDATING':
			return {...state, status: 'Getting an access token...'}
		case 'ADD_SITE_DATA_UPDATING':
			return {...state, status: 'Getting data about site...'}
		case 'ADD_SITE_DATA_UPDATED':
			return {...state, status: null}
		case 'ADD_SITE_FAILED':
			return {...state, status: null, errorStatus: action.error.message }
	}
	return state
}
