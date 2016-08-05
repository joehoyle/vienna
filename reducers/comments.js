const defaultState = {
	comments: {},
	list: {
		loading: false,
		isShowingFilter: false,
		filter: { status: 'all' },
	},
	new: {
		data: {},
		loading: false,
		error: null,
	},
}
export default function users( state = defaultState, action ) {
	switch ( action.type ) {
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
	}
	return state
}
