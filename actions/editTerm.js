import { actions as routerActions } from 'react-native-router-redux'

export default function editTerm( term ) {
	return {
		type: routerActions.actionTypes.ROUTER_PUSH,
		payload: {
			name: 'term-edit',
			data: {
				termId: term.id,
				taxonomy: term.taxonomy,
			},
		},
	}
}
