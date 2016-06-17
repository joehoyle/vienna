import api from '../mockApi'

export default function updatePost( postId, values ) {
	return {
		type: 'POSTS_POST_UPDATED',
		postId: postId,
		data: values,
	}
}
