import updateObject from './updateObject';

export default function updatePost(post) {
	// workaround current issue with embedded objects in requests
	post = {
		...post,
		title: post.title.raw,
		content: post.content.raw,
	};
	return updateObject(post, 'TYPES_POSTS_POST');
}
