import { Linking } from 'react-native'

export default function viewPost( post ) {
	Linking.openURL( post.link )
	return {
		type: 'POSTS_POST_VIEWED',
		data: post
	}
}
