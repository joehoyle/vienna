export default function tags( state = {}, action ) {
	switch ( action.type ) {
		case 'TAGS_UPDATED':
			action.data.forEach( tag => {
				state[ tag.id ] = tag
			})
			return {...state}
	}
	return state
}
