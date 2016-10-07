export default function newSite( state = { status: null, errorStatus: null }, action ) {
	switch ( action.type ) {
		case 'SITE_CREATING':
			return {...state, status: 'Contacting site...'}
		case 'ADD_SITE_URL_ALREADY_EXISTING':
			return {...state, status: null, errorStatus: 'Site already added.'}
		case 'SITE_CREATE_ERRORED':
			return {...state, status: null, errorStatus: action.payload.error.message }
		case 'SITE_CREATED':
			return {...state, status: 'Adding site...', errorStatus: null}
		case 'AUTHORIZE_SITE_BROKER_CONNECTING':
			return {...state, status: 'Connecting to auth broker...'}
		case 'AUTHORIZE_SITE_REQUEST_TOKEN_UPDATING':
			return {...state, status: 'Getting a request token...'}
		case 'AUTHORIZE_SITE_REQUEST_TOKEN_UPDATED':
			return {...state, status: 'Sending user to site...'}
		case 'AUTHORIZE_SITE_ACCESS_TOKEN_UPDATING':
			return {...state, status: 'Getting an access token...'}
		case 'SITE_DATA_UPDATING':
			return {...state, status: 'Getting data about site...'}
		case 'SITE_DATA_UPDATED':
			return {...state, status: null}
		case 'AUTHORIZE_SITE_FAILED':
			return {...state, status: null, errorStatus: action.error.message }
	}
	return state
}
