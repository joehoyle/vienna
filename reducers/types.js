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
					lastError: null,
				}
				type.new = {
					data: {},
					loading: false,
					error: null,
				}
			} )
			return action.data
		case 'TYPE_POSTS_NEW_UPDATING':
			state[ action.payload.type ].new.loading = true
			return {...state}
		case 'TYPE_POSTS_NEW_UPDATED':
			state[ action.payload.type ].new = {
				data: {},
				loading: false,
				error: null,
			}
			state[ action.payload.type ].posts[ action.payload.data.id ] = action.payload.data
			return {...state}
		case 'TYPE_POSTS_UPDATED':
		case 'POSTS_LIST_FILTER_UPDATED':
		case 'POSTS_LIST_TOGGLE_FILTER':
		case 'TYPE_POSTS_UPDATING':
		case 'TYPES_POSTS_POST_UPDATED':
		case 'TYPES_POSTS_POST_UPDATE_ERRORED':

			if ( action.payload.type ) {
				var newState = type( state[ action.payload.type ], action )
				if ( newState !== state[ action.payload.type ] ) {
					state[ action.payload.type ] = newState
					return {...state}
				}
			} else if ( action.payload.object.type ) {
				var newState = type( state[ action.payload.object.type ], action )
				if ( newState !== state[ action.payload.object.type ] ) {
					state[ action.payload.object.type ] = newState
					return {...state}
				}
			}
			break
	}
	return state
}
