import React, { Component } from 'react';
import { NativeModules, AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import { createLogger } from 'redux-logger';
import storageFilter from 'redux-storage-decorator-filter';
// import Raven from 'raven-js';
// import ReactRaven from 'raven-js/plugins/react-native';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Routes from './Routes';

// Error tracing
// NativeModules.AppDelegate.getBundleVersion(function(version, build) {
// 	if (__DEV__) {
// 		return false;
// 	}
// 	ReactRaven(Raven);
// 	Raven.config('https://1da89ea4f2a948f881160b9ebb3c71d8@sentry.io/104708', {
// 		release: version + '-' + build,
// 	}).install();
// });

const engine = storageFilter(createEngine('my-save-keydd'), [
	'activeSite',
	'sites',
]);

const storageMiddleware = storage.createMiddleware(engine);
const middleware = [thunk, storageMiddleware];

if (__DEV__) {
	const logger = createLogger({
		collapsed: true,
		predicate: (getState, action) =>
			['REDUX_STORAGE_SAVE'].indexOf(action.type) === -1,
	});
	middleware.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(storage.reducer(reducers));
const loadStorage = storage.createLoader(engine);

loadStorage(store).then(state => {

});



const Router = props => (
	<Routes
		navigation={addNavigationHelpers({
			dispatch: props.dispatch,
			state: props.navigator,
		})}
	/>
);

const RouterWithState = connect(s=>s)(Router)

export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<RouterWithState />
			</Provider>
		);
	}
}
