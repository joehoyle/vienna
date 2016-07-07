const defaultState = {
	comments: {},
	list: {
		loading: false,
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
	}
	return state
}
