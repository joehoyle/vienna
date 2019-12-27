const defaultState = {
	available: false,
	schema: null,
	list: {
		loading: false,
		lastError: null,
	},
	settings: {},
	lastError: null,
};
export default function settings( state = defaultState, action ) {
	switch ( action.type ) {
		case 'SITE_DATA_UPDATED':
		case 'SITE_CREATED':
			return {
				...state,
				available: action.payload.site.routes['/wp/v2/settings'] ? true : false,
				schema: action.payload.site.routes['/wp/v2/settings']
					? action.payload.site.routes['/wp/v2/settings'].schema
					: null,
			};
		case 'SETTINGS_CHANGED': {
			state.settings[action.payload.setting] = action.payload.value;
			return {
				...state,
			};
		}
		case 'SETTINGS_UPDATING':
			return {
				...state,
				list: {
					...state.list,
					loading: true,
				},
			};
		case 'SETTINGS_UPDATED':
			return {
				...state,
				list: {
					...state.list,
					loading: false,
				},
				settings: action.payload.settings,
			};
		case 'SETTINGS_UPDATE_ERRORED':
			return {
				...state,
				list: {
					...state.list,
					loading: false,
					lastError: action.payload.error,
				},
			};
		default:
			return state;
	}
}
