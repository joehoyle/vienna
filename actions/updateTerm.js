import httpapi from '../api'

export default function updateTerm( term  ) {
	return ( dispatch, getStore ) => {
		const store = getStore()
		const api = new httpapi( store.sites[ store.activeSite.id ] )

		dispatch({
			type: 'TAXONOMY_TERMS_TERM_UPDATING',
			payload: {
				term: term,
				taxonomy: term.taxonomy,
			}
		})
		api.post( term._links.self[0].href, term, function( data, err ) {
			if ( err ) {
				console.warn( err )
				return
			}
			dispatch({
				type: 'TAXONOMY_TERMS_TERM_UPDATED',
				payload: {
					term: data,
					taxonomy: data.taxonomy,
				}
			})
		})
	}
}
