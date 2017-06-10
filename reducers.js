import { combineReducers } from 'redux';
import sites from './reducers/sites';
import activeSite from './reducers/activeSite';
import newSite from './reducers/newSite';

const allReducers = combineReducers({ sites, activeSite, newSite });

export default function reducers(state = {}, action) {
	if (state.activeSite && state.activeSite.id) {
		action.siteId = state.activeSite.id;
	}

	return allReducers(state, action);
}
