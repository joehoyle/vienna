import { forEach } from 'lodash'

export default function taxonomies( state = {}, action ) {
	switch ( action.type ) {
		case 'TAXONOMIES_UPDATED':
			forEach( action.data, taxonomy => {
				taxonomy.terms = {}
				taxonomy.list = {
					filter: { status: 'all' },
					isShowingFilter: false,
					loading: false,
				}
				taxonomy.new = {
					id: -1,
					count: 0,
					name: '',
					slug: '',
					parent: 0,
				}
			} )
			return action.data
		case 'TAXONOMY_TERMS_UPDATING':
			state[ action.payload.taxonomy ].list.loading = true
			return {...state}
		case 'TAXONOMY_TERMS_UPDATED':
			forEach( action.payload.terms, term => {
				state[ action.payload.taxonomy ].terms[ term.id ] = term
				state[ action.payload.taxonomy ].list.loading = false
			})
			return {...state}
		case 'TERM_CREATED':
			state[ action.payload.taxonomy ].terms[ action.payload.term.id ] = action.payload.term
			return {...state}
	}
	return state
}
