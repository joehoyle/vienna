import { combineReducers } from 'redux';
import { unescape } from 'lodash';
import types from './types';
import taxonomies from './taxonomies';
import settings from './settings';
import comments from './comments';
import users from './users';

const defaultState = {
	id: null,
	name: 'A new site',
	data: {},
	description: '',
	credentials: {},
	url: '',
	lastError: null,
	icon: null,
};

const siteReducers = combineReducers( {
	users,
	types,
	taxonomies,
	comments,
	settings,
} );

export default function site( state = defaultState, action ) {
	switch ( action.type ) {
		case 'SITE_CREATED':
			state.id = action.payload.id;
			state.name = unescape( action.payload.site.name );
			state.rest_url = action.payload.rest_url;
			state.description = action.payload.site.description;
			state.routes = action.payload.site.routes;
			state.url = action.payload.site.home;
			state.authentication = action.payload.site.authentication;
			state.credentials = action.payload.credentials;
			return { ...state };

		case 'SITE_CREDENTIALS_UPDATED':
			return {
				...state,
				credentials: action.payload.credentials,
			};

		case 'SITE_DATA_UPDATED':
			state.name = unescape( action.payload.site.name );
			state.description = action.payload.site.description;
			state.namespaces = action.payload.site.namespaces;
			state.routes = action.payload.site.routes;
			state.data = siteReducers( state.data, action );
			return { ...state };
		case 'REMOVE_LOCAL_DATA':
			state.data = {};
			return { ...state };
		case 'SITE_DATA_ICONS_UPDATED': {
			const icons = action.payload.icons.filter( icon => icon.type !== 'image/x-icon' );
			icons.sort( ( a, b ) => {
				if ( a.src.indexOf( '.svg' ) > -1 ) {
					return -1;
				}
				return ( parseInt( a.sizes ) > parseInt( b.sizes ) ) ? -1 : 1;
			} );
			return {
				...state,
				icon: icons[0],
			};
		}
		default:
			state.data = siteReducers( state.data, action );
			return state;
	}
}
