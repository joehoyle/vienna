import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default async function shareAttachment( attachment ) {
	return FileSystem.downloadAsync(
		attachment.source_url,
		FileSystem.cacheDirectory + attachment.source_url.split( '/' ).pop(),
	).then( file => {
		return Sharing.shareAsync( file.uri );
	} );
}
