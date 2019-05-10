import { ActionSheetIOS } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
// import createPost from '../actions/createPost';
// import httpapi from '../api';

const selectOptions = {
	title: 'Select Photo for Upload',
	options: [
		'Take Photo...',
		'Choose from Library...',
		'Cancel',
	],
	destructiveButtonIndex: 2,
};

const libraryOptions = {
	mediaTypes: 'Images',
	base64: true,
};

const cameraOptions = {
	exif: false,
	base64: true,
};

export default function uploadImage() {
	return (dispatch, getStore) => {
		// const store = getStore();
		// const api = new httpapi(store.sites[store.activeSite.id]);

		// Work out which they want.
		ActionSheetIOS.showActionSheetWithOptions( selectOptions, async option => {
			if ( option === selectOptions.destructiveButtonIndex ) {
				// Cancelled.
				return;
			}

			const takePhoto = option === 0;
			const permission = takePhoto ? Permissions.CAMERA : Permissions.CAMERA_ROLL;

			// Do we have permission?
			let permissions = await Permissions.getAsync( permission );
			if ( permissions.status !== 'granted' ) {
				// Asking for permission...
				permissions = await Permissions.askAsync( permission );
				if ( permissions.status !== 'granted' ) {
					// No permission :(
					console.log( 'fuk' );
					return;
				}
			}

			const response = await (
				takePhoto ? ImagePicker.launchCameraAsync( cameraOptions ) : ImagePicker.launchImageLibraryAsync( libraryOptions )
			);

			if ( response.cancelled ) {
				return;
			}

			// You can display the image using either data:
			// dispatch(createPost('attachment'));

			// api
			// 	.upload('/wp/v2/media', response.data, 'image/png', 'test.png')
			// 	.then(data => {
			// 		dispatch({
			// 			type: 'TYPE_POSTS_NEW_UPDATED',
			// 			payload: {
			// 				type: 'attachment',
			// 				data: data,
			// 			},
			// 		});
			// 	})
			// 	.catch(err => {
			// 		console.error(err);
			// 	});
		});
	};
}
