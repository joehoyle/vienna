import { combineReducers } from 'redux'
import sites from './reducers/sites'
import activeSite from './reducers/activeSite'
import newSite from './reducers/newSite'
import { reducer as router } from 'react-native-router-redux'

const allReducers = combineReducers( { sites, router, activeSite, newSite } )

export default function reducers( state = {}, action ) {

	if ( state.activeSite && state.activeSite.id ) {
		action.siteId = state.activeSite.id
	}

	return allReducers( state, action )
}
