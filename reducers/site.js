import { combineReducers } from 'redux'
import types from './types'
import taxonomies from './taxonomies'
import settings from './settings'
import comments from './comments'
import users from './users'

const defaultState = {
	id: null,
	name: 'A new site',
	data: {},
	description: '',
	credentials: {},
	url: '',
	lastError: null,
}

const siteReducers = combineReducers({
	users,
	types,
	taxonomies,
	comments,
	settings,
})

export default function site( state = defaultState, action ) {
	switch ( action.type ) {
		case 'ADD_SITE_START':
			state.id = action.id
			state.name = action.name
			state.url = action.url
			return {...state}
		case 'SITE_DATA_UPDATED':
			state.name = action.data.name
			state.description = action.data.description
			state.namespaces = action.data.namespaces
			state.routes = action.data.routes
			state = {...state}
			break
		case 'AUTHORIZE_SITE_CLIENT_CREATED':
			state.credentials = { client: {} }
			state.credentials.client.public = action.data.client_token
			state.credentials.client.secret = action.data.client_secret
			return {...state}
		case 'AUTHORIZE_SITE_REQUEST_TOKEN_UPDATED':
			state.credentials.token = { secret: action.data.oauth_token_secret }
			return {...state}
		case 'AUTHORIZE_SITE_ACCESS_TOKEN_UPDATING':
			state.credentials.token.public = action.data.oauth_token
			return state
		case 'AUTHORIZE_SITE_ACCESS_TOKEN_UPDATED':
			state.credentials.token.public = action.data.oauth_token
			state.credentials.token.secret = action.data.oauth_token_secret
			return {...state}
		case 'REMOVE_LOCAL_DATA':
			state.data = {}
			return {...state}
	}

	state.data = siteReducers( state.data, action )

	return state
}
