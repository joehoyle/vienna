export default function removeSite( siteId ) {
	return dispatch => {
		dispatch( {
			type: 'SITE_REMOVED',
			payload: {
				siteId: siteId,
			},
		} );
	};
}
