import api from '../api'

export default function fetchUsers( args ) {
	return dispatch => {
		dispatch({
			type: 'USERS_UPDATING',
		})
		api.get( '/wp/v2/users', args, function( data, err ) {
			dispatch({
				type: 'USERS_UPDATED',
				data: data
			})
		})
	}
}
