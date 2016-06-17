const defaultState = {
	filter: { status: 'all' },
	isShowingFilter: false,
}
export default function postsList( state = defaultState, action ) {

	switch ( action.type ) {
		case 'POSTS_LIST_FILTER_UPDATED':
			state.filter = {...state.filter, ...action.filter}
			return {...state}
		case 'POSTS_LIST_TOGGLE_FILTER':
			return {...state, isShowingFilter: ! state.isShowingFilter }
	}

	return state
}
