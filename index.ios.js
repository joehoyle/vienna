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
import Raven from 'raven-js';
import ReactRaven from 'raven-js/plugins/react-native';
import { StackNavigator } from 'react-navigation';

import SitesList from './containers/Sites/List';
import SitesAdd from './containers/Sites/Add';
import PostsList from './containers/Posts/List';
import PostsEdit from './containers/Posts/Edit';
import PostsAdd from './containers/Posts/Add';
import TermsEdit from './containers/Terms/Edit';
import TermsAdd from './containers/Terms/Add';
import TermsList from './containers/Terms/List';
import UsersList from './containers/Users/List';
import UsersEdit from './containers/Users/Edit';
import UsersAdd from './containers/Users/Add';
import UsersSelect from './containers/Users/Select';
import CommentsList from './containers/Comments/List';
import SitesView from './containers/Sites/View';
import SettingsList from './containers/Settings/List';
import CommentsEdit from './containers/Comments/Edit';

// Error tracing
NativeModules.AppDelegate.getBundleVersion(function(version, build) {
	if (__DEV__) {
		return false;
	}
	ReactRaven(Raven);
	Raven.config('https://1da89ea4f2a948f881160b9ebb3c71d8@sentry.io/104708', {
		release: version + '-' + build,
	}).install();
});

const engine = storageFilter(createEngine('my-save-keydd'), [
	'activeSite',
	'sites',
]);

const storageMiddleware = storage.createMiddleware(engine);
const middleware = [thunk, storageMiddleware];

if (__DEV__) {
	const logger = createLogger({
		collapsed: true,
	});
	middleware.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(storage.reducer(reducers));
const loadStorage = storage.createLoader(engine);

loadStorage(store).then(state => {});

const Routes = StackNavigator(
	{
		SitesList: { screen: SitesList },
		SitesAdd: { screen: SitesAdd },
		SitesView: { screen: SitesView },
		PostsList: { screen: PostsList },
		PostsEdit: { screen: PostsEdit },
		PostsAdd: { screen: PostsAdd },
		TermsEdit: { screen: TermsEdit },
		TermsAdd: { screen: TermsAdd },
		TermsList: { screen: TermsList },
		UsersList: { screen: UsersList },
		UsersAdd: { screen: UsersAdd },
		UsersEdit: { screen: UsersEdit },
		UsersSelect: { screen: UsersSelect },
		CommentsList: { screen: CommentsList },
		CommentsEdit: { screen: CommentsEdit },
		SettingsList: { screen: SettingsList },
	},
	{
		navigationOptions: {
			headerStyle: {
				backgroundColor: 'white',
				borderBottomWidth: 0,
				shadowColor: 'transparent',
				shadowRadius: 0,
				shadowOffset: {
					height: 0,
				},
			},
		},
		cardStyle: {
			backgroundColor: 'white',
			borderTopWidth: 0,
			shadowRadius: 0,
			shadowOffset: {
				height: 0,
			},
			shadowColor: 'transparent',
		},
	}
);

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Routes />
			</Provider>
		);
	}
}

AppRegistry.registerComponent('Vienna', () => App);
