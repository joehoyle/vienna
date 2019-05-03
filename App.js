import React, { Component } from 'react';
import { NativeModules, AppRegistry } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import storageFilter from 'redux-storage-decorator-filter';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Routes from './Routes';

// Error tracing
// TODO: replace with sentry-expo: https://docs.sentry.io/clients/react-native/expo/
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers( applyMiddleware( ...middleware ) );
const store = createStore(storage.reducer(reducers), enhancer);
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
