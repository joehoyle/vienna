import api from '../mockApi'

export default function fetchTags( args ) {
	return dispatch => {
		dispatch({
			type: 'TAGS_UPDATING',
		})
		api.get( '/wp/v2/tags', args, function( data, err ) {
			dispatch({
				type: 'TAGS_UPDATED',
				data: data
			})
		})
	}
}
