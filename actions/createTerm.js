import httpapi from '../api'

export function createTerm(taxonomy, term) {
  return dispatch => {
    const store = getStore()
		const site = store.sites[ store.activeSite.id ]
		const api = new httpapi( site )

    api.post( '/wp/v2/' + taxonomy, term )
      .then( data => {
        dispatch( {
          type: 'TERM_CREATED',
          payload: {
            taxonomy: taxonomy,
            term: data,
          }
        })
      })
  }
}
