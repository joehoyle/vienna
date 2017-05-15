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

const logger = createLogger({
	collapsed: true,
});
const engine = storageFilter(createEngine('my-save-keydd'), [
	'activeSite',
	'sites',
]);

const storageMiddleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(
	thunk,
	storageMiddleware,
	logger
)(createStore);
const store = createStoreWithMiddleware(storage.reducer(reducers));
const loadStorage = storage.createLoader(engine);

loadStorage(store).then(state => {
	// Object.entries( state.sites ).each( entry => {
	//
	// })
});

var mapStateToProps = state => {
	if (state.activeSite.id) {
		site = state.sites[state.activeSite.id].data;
	} else {
		site = {};
	}
	return { ...site, ...state };
};

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
			},
		},
		cardStyle: {
			backgroundColor: 'white',
			borderTopWidth: 0,
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

// Navigation.registerComponent('SitesList', () => connect( mapStateToProps )( SitesList ), store, Provider)
// Navigation.registerComponent('SitesAdd', () => connect( mapStateToProps )( SitesAdd ), store, Provider)
// Navigation.registerComponent('SitesView', () => connect( mapStateToProps )( SitesView ), store, Provider)
// Navigation.registerComponent('PostsList', () => connect( mapStateToProps )( PostsList ), store, Provider)
// Navigation.registerComponent('PostsEdit', () => connect( mapStateToProps )( PostsEdit ), store, Provider)
// Navigation.registerComponent('PostsAdd', () => connect( mapStateToProps )( PostsAdd ), store, Provider)
// Navigation.registerComponent('TermsEdit', () => connect( mapStateToProps )( TermsEdit ), store, Provider)
// Navigation.registerComponent('TermsAdd', () => connect( mapStateToProps )( TermsAdd ), store, Provider)
// Navigation.registerComponent('TermsList', () => connect( mapStateToProps )( TermsList ), store, Provider)
// Navigation.registerComponent('UsersList', () => connect( mapStateToProps )( UsersList ), store, Provider)
// Navigation.registerComponent('UsersEdit', () => connect( mapStateToProps )( UsersEdit ), store, Provider)
// Navigation.registerComponent('UsersAdd', () => connect( mapStateToProps )( UsersAdd ), store, Provider)
// Navigation.registerComponent('UsersSelect', () => connect( mapStateToProps )( UsersSelect ), store, Provider)
// Navigation.registerComponent('CommentsList', () => connect( mapStateToProps )( CommentsList ), store, Provider)
// Navigation.registerComponent('CommentsEdit', () => connect( mapStateToProps )( CommentsEdit ), store, Provider)
// Navigation.registerComponent('SettingsList', () => connect( mapStateToProps )( SettingsList ), store, Provider)

// Navigation.startSingleScreenApp({
// 	screen: {
// 		screen: 'SitesList',
// 		title: 'Sites',
// 		navigatorStyle: {
// 			navBarNoBorder: true,
// 		}
// 	},
// })
