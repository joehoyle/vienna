const defaultState = {
	users: {},
	schema: null,
	available: true,
	list: {
		loading: false,
		lastError: null,
	},
	profile: {
		loading: false,
		lastError: null,
		data: null,
	},
};
export default function users( state = defaultState, action ) {
	switch ( action.type ) {
		case 'SITE_DATA_UPDATED':
		case 'SITE_CREATED':
			return {
				...state,
				schema: action.payload.site.routes['/wp/v2/users'].schema,
			};
		case 'USERS_UPDATING':
			state.list.loading = true;
			state.list.lastError = null;
			return { ...state };
		case 'USERS_UPDATED':
			action.data.forEach( user => {
				state.users[user.id] = user;
			} );
			state.list.loading = false;
			return { ...state };
		case 'USERS_USER_UPDATED':
			state.users[action.payload.object.id] = action.payload.object;
			return { ...state };
		case 'USERS_UPDATE_ERRORED':
			state.list.lastError = action.payload.error;
			state.list.loading = false;
			return { ...state };
		case 'SITE_DATA_PROFILE_UPDATING':
			return {
				...state,
				profile: {
					...state.profile,
					loading: true,
					lastError: null,
				},
			};
		case 'SITE_DATA_PROFILE_UPDATED':
			return {
				...state,
				users: {
					...state.users,
					[ action.payload.data.id ]: action.payload.data,
				},
				profile: {
					...state.profile,
					data: action.payload.data,
					loading: false,
					lastError: null,
				},
			};
		case 'SITE_DATA_PROFILE_UPDATE_ERRORED':
			return {
				...state,
				profile: {
					...state.profile,
					loading: false,
					lastError: action.payload.error,
				},
			};
		default:
			return state;
	}
}
