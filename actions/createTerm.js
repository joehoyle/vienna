import httpapi from '../api';

export default function createTerm( term, taxonomy ) {
	return ( dispatch, getStore ) => {
		dispatch( {
			type: 'TAXONOMY_TERM_CREATING',
			payload: {
				taxonomy: taxonomy,
			},
		} );

		const store = getStore();
		const site = store.sites[store.activeSite.id];
		taxonomy = site.data.taxonomies[taxonomy];
		const api = new httpapi( site );

		api
			.post( taxonomy._links['wp:items'][0].href, term )
			.then( term => {
				dispatch( {
					type: 'TAXONOMY_TERM_CREATED',
					payload: {
						object: term,
					},
				} );
			} )
			.catch( err => {
				dispatch( {
					type: 'TAXONOMY_TERM_CREATE_ERRORED',
					payload: {
						object: { taxonomy: taxonomy.slug },
						error: err,
					},
				} );
			} );
	};
}
