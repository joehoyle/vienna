import site from './site'
import httpapi from '../api'

const defaultState = {}

export default function sites( state = defaultState, action ) {

	if ( action.type === 'SITE_CREATED' ) {
		state[ action.payload.id ] = site( undefined, action )
		state = {...state}
	} else if ( action.siteId ) {
		state[ action.siteId ] = site( state[ action.siteId ], action )
		state = {...state}
	}

	switch ( action.type ) {
		case 'SITE_CREATE_ERRORED':
			delete state[ action.siteId ]
			return {...state}
		case 'SITE_REMOVED':
			delete state[ action.payload.siteId ]
			return {...state}
	}
	return state
}
