export default function categories( state = {}, action ) {
	switch ( action.type ) {
		case 'CATEGORIES_UPDATED':
			action.data.forEach( category => {
				state[ category.id ] = category
			})
			return {...state}
	}
	return state
}
