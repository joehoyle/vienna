import { forEach } from 'lodash'

export default function type( state = {}, action ) {
	switch ( action.type ) {
		case 'TYPE_POSTS_UPDATED':
			forEach( action.payload.posts, post => {
				state.posts[ post.id ] = post
			})
			state.list.loading = false
			return {...state}
		case 'POSTS_LIST_FILTER_UPDATED':
			state.list.filter = {...state.filter, ...action.payload.filter}
			return {...state}
		case 'POSTS_LIST_TOGGLE_FILTER':
			state.list.isShowingFilter = ! state.list.isShowingFilter
			return {...state}
		case 'TYPE_POSTS_UPDATING':
			state.list.loading = true
			return {...state}
		case 'TYPES_POSTS_POST_UPDATED':
			state.posts[ action.payload.object.id ] = {
				...state.posts[ action.payload.object.id ],
				...action.payload.object
			}
			return {...state}
		case 'TYPES_POSTS_POST_UPDATE_ERRORED':
			state.list.lastError = action.payload.error
			return {...state}
		default:
			return state;
	}
}
