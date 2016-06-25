import { actions as routerActions } from 'react-native-router-redux'

export default function editPost( post ) {
	return {
		type: routerActions.actionTypes.ROUTER_PUSH,
		payload: {
			name: 'posts-edit',
			data: {
				postId: post.id,
				type: post.type,
			},
		},
	}
}
