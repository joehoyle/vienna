import { actions as routerActions } from 'react-native-router-redux'

export default function editTerm( term ) {
	return {
		type: routerActions.actionTypes.ROUTER_PUSH,
		payload: {
			name: 'terms-edit',
			data: {
				termId: term.id,
				taxonomy: term.taxonomy,
			},
		},
	}
}
