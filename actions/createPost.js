export default function createPost( type ) {
	return ( dispatch ) => {
		dispatch({
			type: 'TYPE_POSTS_NEW_UPDATING',
			payload: {
				type: type,
			},
		})
	}
}
