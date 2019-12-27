export default function removeLocalData() {
	return ( dispatch, getStore ) => {
		dispatch( {
			type: 'REMOVE_LOCAL_DATA',
		} );
	};
}
