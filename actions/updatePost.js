export default function updatePost( postId, type, values ) {
	return {
		type: 'POSTS_POST_UPDATED',
		payload: {
			postId: postId,
			data: values,
			type: type,
		}
	}
}
