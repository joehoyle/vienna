import React, {Component} from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
import createLogger from 'redux-logger'
import storageFilter from 'redux-storage-decorator-filter'
import { Navigation } from 'react-native-navigation'

import SitesList from './containers/Sites/List'
import SitesAdd from './containers/Sites/Add'
import PostsList from './containers/Posts/List'
import PostsEdit from './containers/Posts/Edit'
import TermsEdit from './containers/Terms/Edit'
import TermsList from './containers/Terms/List'
import UsersList from './containers/Users/List'
import UsersEdit from './containers/Users/Edit'
import CommentsList from './containers/Comments/List'
import PostsCreate from './containers/Posts/Create'
import SitesView from './containers/Sites/View'
import SettingsList from './containers/Settings/List'
import CommentsEdit from './containers/Comments/Edit'

const logger = createLogger({
	collapsed: true,
	predicate: ( getState, action ) => {
		//return false;
		return [ 'REDUX_STORAGE_SAVE', 'REDUX_STORAGE_LOAD', 'ROUTER_POP', 'ROUTER_PUSH', 'ROUTER_RESET', 'ROUTER_INIT' ].indexOf( action.type ) === -1
	}
})
const engine = storageFilter( createEngine( 'my-save-key' ), [ 'activeSite', 'sites' ] )

const storageMiddleware = storage.createMiddleware(engine, ['ROUTER_INIT','ROUTER_PUSH','ROUTER_POP','ROUTER_RESET'])
const createStoreWithMiddleware = applyMiddleware( thunk, storageMiddleware, logger )( createStore )
const store = createStoreWithMiddleware( storage.reducer( reducers ) )
const loadStorage = storage.createLoader(engine)

loadStorage( store ).then( state => {
	//console.log( state )
})

var mapStateToProps = ((state) => {
	if ( state.activeSite.id ) {
		site = state.sites[ state.activeSite.id ].data
	} else {
		site = {}
	}
	return {...site, ...state}
} )

Navigation.registerComponent('SitesList', () => connect( mapStateToProps )( SitesList ), store, Provider)
Navigation.registerComponent('SitesAdd', () => connect( mapStateToProps )( SitesAdd ), store, Provider)
Navigation.registerComponent('SitesView', () => connect( mapStateToProps )( SitesView ), store, Provider)
Navigation.registerComponent('PostsList', () => connect( mapStateToProps )( PostsList ), store, Provider)
Navigation.registerComponent('PostsEdit', () => connect( mapStateToProps )( PostsEdit ), store, Provider)
Navigation.registerComponent('TermsEdit', () => connect( mapStateToProps )( TermsEdit ), store, Provider)
Navigation.registerComponent('TermsList', () => connect( mapStateToProps )( TermsList ), store, Provider)
Navigation.registerComponent('UsersList', () => connect( mapStateToProps )( UsersList ), store, Provider)
Navigation.registerComponent('UsersEdit', () => connect( mapStateToProps )( UsersEdit ), store, Provider)
Navigation.registerComponent('CommentsList', () => connect( mapStateToProps )( CommentsList ), store, Provider)
Navigation.registerComponent('CommentsEdit', () => connect( mapStateToProps )( CommentsEdit ), store, Provider)
Navigation.registerComponent('PostsCreate', () => connect( mapStateToProps )( PostsCreate ), store, Provider)
Navigation.registerComponent('SettingsList', () => connect( mapStateToProps )( SettingsList ), store, Provider)

Navigation.startSingleScreenApp({
	screen: {
		screen: 'SitesList',
		title: 'Sites',
	},
})
