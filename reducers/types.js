import { forEach } from 'lodash'
import type from './type'

export default function types( state = {}, action ) {
	switch ( action.type ) {
		case 'TYPES_UPDATED':
			forEach( action.data, type => {
				type.posts = {}
				type.list = {
					filter: { status: 'all' },
					isShowingFilter: false,
					loading: false,
				}
			} )
			return action.data
		case 'TYPE_POSTS_UPDATED':
		case 'POSTS_LIST_FILTER_UPDATED':
		case 'POSTS_LIST_TOGGLE_FILTER':
		case 'TYPE_POSTS_UPDATING':
		case 'POSTS_POST_UPDATED':
			var newState = type( state[ action.payload.type ], action )
			if ( newState !== state[ action.payload.type ] ) {
				state[ action.payload.type ] = newState
				return {...state}
			}
			break
	}
	return state
}
