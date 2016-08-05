import { combineReducers } from 'redux'
import types from './types'
import taxonomies from './taxonomies'
import comments from './comments'
import users from './users'
import { reducer as router } from 'react-native-router-redux'
import httpapi from '../api'

siteReducers = combineReducers({
	users,
	types,
	taxonomies,
	comments,
})

const defaultState = {}

export default function sites( state = defaultState, action ) {

	if ( action.siteId ) {
		state[ action.siteId ] = site( state[ action.siteId ], action )
		state = {...state}
	}

	switch ( action.type ) {
		case 'ADD_SITE_START':
			var newSite = {
				id: action.id,
				name: action.url,
				data: {},
				description: '',
				credentials: {},
				url: action.url,
			}
			state[ newSite.id ] = newSite
			return {...state}
		case 'ADD_SITE_FAILED':
			delete state[ action.siteId ]
			return {...state}
		case 'SITE_REMOVED':
			delete state[ action.payload.siteId ]
			return {...state}
	}
	return state
}

function site( state = {}, action ) {
	switch ( action.type ) {
		case 'ADD_SITE_DATA_UPDATED':
			state.name = action.data.name
			state.description = action.data.description
			state.namespaces = action.data.namespaces
			state.routes = action.data.routes
			return {...state}
		case 'ADD_SITE_CLIENT_CREATED':
			state.credentials.client = {}
			state.credentials.client.public = action.data.client_token
			state.credentials.client.secret = action.data.client_secret
			return {...state}
		case 'ADD_SITE_REQUEST_TOKEN_UPDATED':
			state.credentials.token = { secret: action.data.oauth_token_secret }
			return {...state}
		case 'ADD_SITE_ACCESS_TOKEN_UPDATING':
			state.credentials.token.public = action.data.oauth_token
			return state
		case 'ADD_SITE_ACCESS_TOKEN_UPDATED':
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
