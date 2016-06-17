import api from '../mockApi'

export default function fetchMedia( args ) {
	return dispatch => {
		dispatch({
			type: 'MEDIA_UPDATING',
		})
		api.get( '/wp/v2/media', args, function( data, err ) {
			dispatch({
				type: 'MEDIA_UPDATED',
				data: data
			})
		})
	}
}
