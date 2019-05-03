import httpapi from '../api';
import { forEach } from 'lodash';

export default function fetchPosts(args) {
	args = { context: 'edit', ...args };
	return (dispatch, getStore) => {
		dispatch({
			type: 'TYPES_UPDATING',
		});

		const store = getStore();
		const api = new httpapi(store.sites[store.activeSite.id]);

		api.get('/wp/v2/types', args).then(function(data, err) {
			if (err) {
				return console.warn(err.message);
			}
			const site = store.sites[store.activeSite.id];

			forEach(data, type => {
				var route = type._links['wp:items'][0].href.replace(
					site.routes['/']._links.self,
					''
				);
				if ( ! site.routes['/' + route] ) {
					return;
				}

				type.schema = site.routes['/' + route].schema;
			});

			dispatch({
				type: 'TYPES_UPDATED',
				data: data,
			});
		});
	};
}
