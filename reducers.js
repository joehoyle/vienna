import { combineReducers } from 'redux'
import sites from './reducers/sites'
import { reducer as router } from 'react-native-router-redux'

export default reducers = combineReducers({
	sites,
	router,
	activeSite
})

function activeSite( state = {}, action ) {
	return {
		siteId: 1
	}
}
