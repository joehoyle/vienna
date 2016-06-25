
export default function removeSite( siteId ) {
	return dispatch => {
		dispatch({
			type: 'ROUTER_RESET',
			payload: {
				name: 'sites',
			},
		})
		dispatch({
			type: 'SITE_REMOVED',
			payload: {
				siteId: siteId,
			},
		})
	}
}
