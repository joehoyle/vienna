import site from './site'
import { reducer as router } from 'react-native-router-redux'
import httpapi from '../api'

const defaultState = {}

export default function sites( state = defaultState, action ) {

	if ( action.type === 'ADD_SITE_START' ) {
		state[ action.id ] = site( undefined, action )
		state = {...state}
	}
	if ( action.siteId ) {
		state[ action.siteId ] = site( state[ action.siteId ], action )
		state = {...state}
	}

	switch ( action.type ) {
		case 'ADD_SITE_FAILED':
			delete state[ action.siteId ]
			return {...state}
		case 'SITE_REMOVED':
			delete state[ action.payload.siteId ]
			return {...state}
	}
	return state
}
