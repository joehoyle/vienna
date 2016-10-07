const defaultState = {
	users: {},
	schema: null,
	available: true,
	list: {
		loading: false,
		lastError: null,
	},
}
export default function users( state = defaultState, action ) {
	switch ( action.type ) {
		case 'SITE_DATA_UPDATED':
		case 'SITE_CREATED':
			return {
				...state,
				schema: action.payload.site.routes['/wp/v2/users'].schema
			}
		case 'USERS_UPDATING':
			state.list.loading = true
			return {...state}
		case 'USERS_UPDATED':
			action.data.forEach( user => {
				state.users[ user.id ] = user
			})
			state.list.loading = false
			return {...state}
		case 'USERS_USER_UPDATED':
			state.users[ action.payload.object.id ] = action.payload.object
			return {...state}
		case 'USERS_UPDATE_ERRORED':
			state.list.lastError = action.payload.error
			return {...state}
	}
	return state
}
