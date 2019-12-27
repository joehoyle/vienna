import { combineReducers } from 'redux';
import sites from './reducers/sites';
import activeSite from './reducers/activeSite';
import newSite from './reducers/newSite';

const allReducers = combineReducers( {
	sites,
	activeSite,
	newSite,
	loaded: ( state = false, action ) =>
		action.type === 'REDUX_STORAGE_LOAD' ? true : state,
} );

export default function reducers( state = {}, action ) {
	if ( state.activeSite && state.activeSite.id ) {
		action.siteId = state.activeSite.id;
	}

	return allReducers( state, action );
}
