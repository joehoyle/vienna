import imagepicker from 'react-native-image-picker'
import { createPost } from '../actions'
import httpapi from '../api'

const options = {
	title: 'Select Photo for Upload', // specify null or empty string to remove the title
	cancelButtonTitle: 'Cancel',
	takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
	chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
	cameraType: 'back', // 'front' or 'back'
	mediaType: 'photo', // 'photo' or 'video'
	noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
}

export default function uploadImage() {
	return ( dispatch, getStore ) => {

		const store = getStore()
		const api = new httpapi( store.sites[ store.activeSite.id ] )

		imagepicker.showImagePicker(options, (response) => {

			if ( response.didCancel ) {
				return
			} else if ( response.error ) {
				console.log( 'ImagePicker Error: ', response.error )
				return
			} else {

				// You can display the image using either data:
				dispatch( createPost( 'attachment' ) )

				api.upload( '/wp/v2/media', response.data, 'image/png', 'test.png' )
				.then( data => {
					dispatch({
						type: 'TYPE_POSTS_NEW_UPDATED',
						payload: {
							type: 'attachment',
							data: data
						},
					})
				}).catch( err => {
					console.error( err )
				})
			}
		})
	}
}
