import api from '../mockApi'

export default function fetchCategories( args ) {
	return dispatch => {
		dispatch({
			type: 'CATEGORIES_UPDATING',
		})
		api.get( '/wp/v2/categories', args, function( data, err ) {
			dispatch({
				type: 'CATEGORIES_UPDATED',
				data: data
			})
		})
	}
}
