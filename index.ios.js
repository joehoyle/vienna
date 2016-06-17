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

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import App from './components/App'

const createStoreWithMiddleware = applyMiddleware( thunk )( createStore )
const store = createStoreWithMiddleware( reducers )

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
