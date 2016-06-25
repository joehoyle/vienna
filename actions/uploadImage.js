import imagepicker from 'react-native-image-picker'

const options = {
	title: 'Select Photo for Upload', // specify null or empty string to remove the title
	cancelButtonTitle: 'Cancel',
	takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
	chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
	cameraType: 'back', // 'front' or 'back'
	mediaType: 'photo', // 'photo' or 'video'
	videoQuality: 'high', // 'low', 'medium', or 'high'
	noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
}

export default function uploadImage() {
	return ( dispatch ) => {
		imagepicker.showImagePicker(options, (response) => {

			if ( response.didCancel ) {
				return
			} else if ( response.error ) {
				console.log('ImagePicker Error: ', response.error)
				return
			} else {
				// You can display the image using either data:
				const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true}

				console.log( 'selected iamge!!' )
			}
		})
	}
}
