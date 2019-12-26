export default function updateSiteCredentials( id, credentials ) {
	return {
		type: 'SITE_CREDENTIALS_UPDATED',
		payload: {
			id,
			credentials,
		}
	};
}
