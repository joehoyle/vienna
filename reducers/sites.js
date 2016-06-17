import { combineReducers } from 'redux'
import users from './users'
import posts from './posts'
import media from './media'
import categories from './categories'
import tags from './tags'
import loadingUsers from './loadingUsers'
import postsList from './postsList'
import newPost from './newPost'
import { reducer as router } from 'react-native-router-redux'

siteReducers = combineReducers({
	posts,
	users,
	postsList,
	media,
	categories,
	tags,
	loadingUsers,
	router,
	newPost,
})

const defaultState = {
	1: {
		id: 1,
		url: 'http://wordpress.dev/',
		name: 'WordPress.dev',
		data: {}
	}
}

export default function sites( state = defaultState, action ) {
	action.siteId = 1
	if ( action.siteId ) {
		state[ action.siteId ].data = siteReducers( state[ action.siteId ].data, action )
		return {...state}
	}
}
