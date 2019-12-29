const defaultState = {
	comments: {},
	list: {
		loading: false,
		schema: null,
		isShowingFilter: false,
		filter: {
			status: '',
			search: '',
		},
		lastError: null,
	},
	new: {
		data: {},
		loading: false,
		error: null,
	},
};
export default function comments( state = defaultState, action ) {
	switch ( action.type ) {
		case 'SITE_DATA_UPDATED':
		case 'SITE_CREATED': {
			const getEndpoints = action.payload.site.routes['/wp/v2/comments'].endpoints.filter( endpoint => endpoint.methods.indexOf( 'GET' ) > -1 );
			const schema = action.payload.site.routes['/wp/v2/comments'].schema;
			const args = getEndpoints.length ? getEndpoints[0].args : null;
			// Fix up some missing items in args
			if ( args ) {
				args.status.enum = [ 'approve', 'hold', 'spam', 'trash' ];
			}
			return {
				...state,
				schema,
				args,
			};
		}
		case 'COMMENTS_UPDATING':
			return {
				...state,
				list: {
					...state.list,
					loading: true,
					lastError: null,
				},
			};
		case 'COMMENTS_UPDATED':
			return {
				...state,
				list: {
					...state.list,
					loading: false,
				},
				comments: {
					...state.comments,
					...action.payload.comments.reduce( ( all, comment ) => ( {
						...all,
						[comment.id]: comment,
					} ), {} ),
				},
			};
		case 'COMMENTS_NEW_UPDATING':
			state.new.loading = true;
			return { ...state };
		case 'COMMENTS_NEW_UPDATED':
			state.new.loading = false;
			state.comments[action.payload.comment.id] = action.payload.comment;
			return { ...state };
		case 'COMMENT_TRASHED':
			delete state.comments[action.payload.commentId];
			return { ...state };
		case 'COMMENTS_LIST_TOGGLE_FILTER':
			state.list.isShowingFilter = ! state.list.isShowingFilter;
			return { ...state };
		case 'COMMENTS_LIST_FILTER_UPDATED':
			return {
				...state,
				comments: {},
				list: {
					...state.list,
					filter: action.payload.filter,
				},
			};
		case 'COMMENTS_COMMENT_UPDATED':
			state.comments[action.payload.object.id] = action.payload.object;
			return { ...state };
		case 'COMMENTS_COMMENT_UPDATE_ERRORED':
			state.list.lastError = action.payload.error;
			state.list.loading = false;
			return { ...state };
		default:
			return state;
	}
}
