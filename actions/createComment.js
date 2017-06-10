import httpapi from '../api';

export default function createComment(args) {
	return (dispatch, getStore) => {
		dispatch({
			type: 'COMMENTS_NEW_UPDATING',
			payload: {
				taxonomy: args.taxonomy,
			},
		});

		const store = getStore();
		const site = store.sites[store.activeSite.id];
		const api = new httpapi(site);

		api.post('/wp/v2/comments', args).then(comment => {
			dispatch({
				type: 'COMMENTS_NEW_UPDATED',
				payload: { comment },
			});
		});
	};
}
