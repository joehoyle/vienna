export default function posts( state = {}, action ) {
	switch ( action.type ) {
		case 'POSTS_UPDATED':
			action.data.forEach( post => {
				state[ post.id ] = post
			})
			return {...state}
		case 'POSTS_POST_UPDATED':
			var post = state[ action.postId ]
			post = {...post, ...action.data}
			state[ action.postId ] = post
			return {...state}
		case 'POSTS_POST_TRASHED':
			delete state[ action.postId ]
			return {...state}
		case 'POSTS_POST_CREATED':
			state['new'] = action.data
			return {...state}
	}
	return state
}
