export default function media( state = {}, action ) {
	switch ( action.type ) {
		case 'MEDIA_UPDATED':
			action.data.forEach( attachment => {
				state[ attachment.id ] = attachment
			})
			return {...state}
	}
	return state
}
