const defaultState = {
	comments: {},
	list: {
		loading: false,
		schema: null,
		isShowingFilter: false,
		filter: { status: 'all' },
		lastError: null,
	},
	new: {
		data: {},
		loading: false,
		error: null,
	},
}
export default function comments( state = defaultState, action ) {
	switch ( action.type ) {
		case 'SITE_DATA_UPDATED':
		case 'SITE_CREATED':
			return {
				...state,
				schema: action.payload.sites.routes['/wp/v2/comments'].schema
			}
		case 'COMMENTS_UPDATING':
			state.list.loading = true
			return {...state}
		case 'COMMENTS_UPDATED':
			action.payload.comments.forEach( comment => {
				state.comments[ comment.id ] = comment
			})
			state.list.loading = false
			return {...state}
		case 'COMMENTS_NEW_UPDATING':
			state.new.loading = true
			return {...state}
		case 'COMMENTS_NEW_UPDATED':
			state.new.loading = false
			state.comments[ action.payload.comment.id ] = action.payload.comment
			return {...state}
		case 'COMMENT_TRASHED':
			delete state.comments[ action.payload.commentId ]
			return {...state}
		case 'COMMENTS_LIST_TOGGLE_FILTER':
			state.list.isShowingFilter = ! state.list.isShowingFilter
			return {...state}
		case 'COMMENTS_LIST_FILTER_UPDATED':
			state.list.filter = action.payload.filter
			return {...state}
		case 'COMMENTS_COMMENT_UPDATED':
			state.comments[ action.payload.object.id ] = action.payload.object
			return {...state}
		case 'COMMENTS_COMMENT_UPDATE_ERRORED':
			state.list.lastError = action.payload.error
			return {...state}
	}
	return state
}
