const defaultState = {
	users: {},
	list: {
		loading: false,
	},
}
export default function users( state = defaultState, action ) {
	switch ( action.type ) {
		case 'USERS_UPDATING':
			state.list.loading = true
			return {...state}
		case 'USERS_UPDATED':
			action.data.forEach( user => {
				state.users[ user.id ] = user
			})
			state.list.loading = false
			return {...state}
	}
	return state
}
