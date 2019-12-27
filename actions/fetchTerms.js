import httpapi from '../api';

export default function fetchTerms(args) {
	args = { context: 'edit', ...args };
	return (dispatch, getStore) => {
		dispatch({
			type: 'TAXONOMY_TERMS_UPDATING',
			payload: {
				taxonomy: args.taxonomy,
			},
		});

		const store = getStore();
		const site = store.sites[store.activeSite.id];
		const api = new httpapi(site);

		var url = site.data.taxonomies[args.taxonomy]._links['wp:items'][0].href;
		api.get(url, args).then(function(data) {
			dispatch({
				type: 'TAXONOMY_TERMS_UPDATED',
				payload: {
					taxonomy: args.taxonomy,
					terms: data,
				},
			});
		}).catch( error => {
			dispatch({
				type: 'TAXONOMY_TERM_UPDATE_ERRORED',
				payload: {
					error,
					taxonomy: args.taxonomy,
				},
			});
		});
	};
}
