import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import storageFilter from 'redux-storage-decorator-filter';
import thunk from 'redux-thunk';

import reducers from './reducers';
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

const engine = storageFilter( createEngine( 'my-save-keydd' ), [
	'activeSite',
	'sites',
] );

const storageMiddleware = storage.createMiddleware( engine );
const middleware = [ thunk, storageMiddleware ];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers( applyMiddleware( ...middleware ) );
const store = createStore( storage.reducer( reducers ), enhancer );
const loadStorage = storage.createLoader( engine );

loadStorage( store ).then( state => {} );

StatusBar.setBarStyle( 'dark-content' );

// Enable react-native-screens for performance.
enableScreens();

export default class App extends Component {
	render() {
		return (
			<Provider store={ store }>
				<Routes />
			</Provider>
		);
	}
}
