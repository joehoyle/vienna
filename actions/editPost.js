import { actions as routerActions } from 'react-native-router-redux'

export default function editPost( postId ) {
	return {
		type: routerActions.actionTypes.ROUTER_PUSH,
		payload: {
			name: 'posts-edit',
			data: {
				postId: postId,
			},
		},
	}
}
