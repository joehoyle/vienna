import { ActionSheetIOS } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import httpapi from '../api';

// import createPost from '../actions/createPost';

const selectOptions = {
	title: 'Select Photo for Upload',
	options: [ 'Take Photo...', 'Choose from Library...', 'Cancel' ],
	destructiveButtonIndex: 2,
};

const libraryOptions = {
	mediaTypes: ImagePicker.MediaTypeOptions.All,
};

const cameraOptions = {
	exif: false,
	base64: true,
};

export default function uploadImage( type ) {
	return ( dispatch, getStore ) => {
		const store = getStore();
		const api = new httpapi( store.sites[store.activeSite.id] );
		return new Promise( ( resolve, reject ) => {
			// Work out which they want.
			ActionSheetIOS.showActionSheetWithOptions( selectOptions, async option => {
				if ( option === selectOptions.destructiveButtonIndex ) {
					// Cancelled.
					resolve();
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
						resolve();
						return;
					}
				}

				const response = await ( takePhoto ? ImagePicker.launchCameraAsync( cameraOptions ) : ImagePicker.launchImageLibraryAsync( libraryOptions ) );

				if ( response.cancelled ) {
					resolve();
					return;
				}

				dispatch( {
					type: 'TYPE_POSTS_NEW_UPDATING',
					payload: {
						type: type.slug,
					},
				} );

				// You can display the image using either data:
				// dispatch(createPost('attachment'));
				const formData = new FormData();
				const filename = response.uri.split( '/' ).pop();
				formData.append( 'file', {
					uri: response.uri,
					name: filename,
				} );
				const request = api
					.fetch( '/wp/v2/media', {
						method: 'POST',
						headers: {
							'Content-Type': 'multipart/form-data',
							'Content-Disposition': 'attachment; filename="' + filename + '"',
						},
						body: formData,
					} )
					.then( response => response.json() )
					.then( data => {
						dispatch( {
							type: 'TYPE_POSTS_NEW_UPDATED',
							payload: {
								type: type.slug,
								data,
							},
						} );
						return data;
					} );
				resolve( request );
			} );
		} );
	};
}
