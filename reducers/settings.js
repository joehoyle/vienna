const defaultState = {
	available: false,
	schema: null,
	list: {
		loading: false,
		lastError: null,
	},
	settings: {},
	lastError: null,
}
export default function settings( state = defaultState, action ) {
	switch ( action.type ) {
		case 'SITE_DATA_UPDATED':
			return {
				...state,
				available: action.data.routes['/wp/v2/settings'] ? true : false,
				schema: action.data.routes['/wp/v2/settings'] ? action.data.routes['/wp/v2/settings'].schema : null,
			}
		case 'SETTINGS_CHANGED': {
			state.settings[ action.payload.setting ] = action.payload.value
			return {
				...state,
			}
		}
		case 'SETTINGS_UPDATING':
			return {
				...state,
				list: {
					loading: true
				}
			}
		case 'SETTINGS_UPDATED':
			return {
				...state,
				list: {
					loading: false,
				},
				settings: action.payload.settings
			}
	}
	return state
}
