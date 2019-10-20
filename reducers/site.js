import { combineReducers } from 'redux'
import { unescape } from 'lodash'
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
		case 'SITE_CREATED':
			state.id = action.payload.id
			state.name = unescape( action.payload.site.name )
			state.rest_url = action.payload.rest_url
			state.description = action.payload.site.description
			state.routes = action.payload.site.routes
			state.url = action.payload.site.home
			state.authentication = action.payload.site.authentication
			state.credentials = action.payload.credentials
			return {...state}
		case 'SITE_DATA_UPDATED':
			state.name = unescape( action.payload.site.name )
			state.description = action.payload.site.description
			state.namespaces = action.payload.site.namespaces
			state.routes = action.payload.site.routes
			return {...state}
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
		default:
			state.data = siteReducers( state.data, action )
			return state
	}
}
