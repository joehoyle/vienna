import { combineReducers } from 'redux';
import sites from './reducers/sites';
import activeSite from './reducers/activeSite';
import newSite from './reducers/newSite';
import Routes from './Routes';

const initialState = Routes.router.getStateForAction(
	Routes.router.getActionForPathAndParams('Main/SitesList')
);
const navReducer = (state = initialState, action) => {
	const nextState = Routes.router.getStateForAction(action, state);
	// Simply return the original `state` if `nextState` is null or undefined.
	return nextState || state;
};

const allReducers = combineReducers({
	sites,
	activeSite,
	newSite,
	navigator: navReducer,
	loaded: (state = false, action) =>
		(action.type === 'REDUX_STORAGE_LOAD' ? true : state),
});

export default function reducers(state = {}, action) {
	if (state.activeSite && state.activeSite.id) {
		action.siteId = state.activeSite.id;
	}

	return allReducers(state, action);
}
