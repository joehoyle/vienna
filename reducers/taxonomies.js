import { forEach } from 'lodash'

export default function types( state = {}, action ) {
	switch ( action.type ) {
		case 'TAXONOMIES_UPDATED':
			forEach( action.data, type => {
				type.terms = {}
			} )
			return action.data
		case 'TAXONOMY_TERMS_UPDATED':
			forEach( action.payload.terms, term => {
				state[ action.payload.taxonomy ].terms[ term.id ] = term
			})
			return {...state}
	}
	return state
}
