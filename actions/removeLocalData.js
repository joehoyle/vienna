
export default function removeLocalData( siteId ) {
	return ( dispatch, getStore ) => {
		dispatch({
			type: 'REMOVE_LOCAL_DATA',
			payload: {
				siteId: siteId,
			}
		})
	}
}
