/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
	AppRegistry,
	Component,
	StyleSheet,
	Text,
	View
} from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
import App from './containers/App'
import createLogger from 'redux-logger'
import storageFilter from 'redux-storage-decorator-filter'
import { isEmpty } from 'lodash'

const logger = createLogger({
	collapsed: true,
	predicate: ( getState, action ) => {
		return [ 'REDUX_STORAGE_SAVE', 'REDUX_STORAGE_LOAD', 'ROUTER_POP', 'ROUTER_PUSH', 'ROUTER_RESET', 'ROUTER_INIT' ].indexOf( action.type ) === -1
	}
})
const engine = storageFilter( createEngine( 'my-save-key' ), [ 'activeSite', 'sites' ] )

const storageMiddleware = storage.createMiddleware(engine, ['ROUTER_INIT','ROUTER_PUSH','ROUTER_POP','ROUTER_RESET'])
const createStoreWithMiddleware = applyMiddleware( thunk, storageMiddleware, logger )( createStore )
const store = createStoreWithMiddleware( storage.reducer( reducers ) )
const loadStorage = storage.createLoader(engine)

loadStorage( store ).then( state => {
	if ( isEmpty( state.sites ) ) {
		store.dispatch({
			type: 'ROUTER_PUSH',
			payload: {
				name: 'add-site',
			},
		})
	}
})

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}
AppRegistry.registerComponent('Project', () => Root)
