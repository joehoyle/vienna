import httpapi from '../api';

export default function trashComment(commentId) {
	return (dispatch, getStore) => {
		const store = getStore();
		const api = new httpapi(store.sites[store.activeSite.id]);

		dispatch({
			type: 'COMMENT_TRASHING',
		});
		api._delete('/wp/v2/comments/' + commentId, {}).then(function(data, err) {
			dispatch({
				type: 'COMMENT_TRASHED',
				payload: { commentId },
			});
		});
	};
}
