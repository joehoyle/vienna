import URI from 'urijs';

export async function fetchIndex( url ) {
	const parsed = new URI( url );
	const opts = {
		redirect: 'follow',
	};
	const apiIndex = parsed.addQuery( 'rest_route', '/' );
	const response = await fetch( apiIndex, opts );

	if ( response.status !== 200 ) {
		throw new Error( 'Site returned non-200 status code' );
	}

	// Parse the index back out.
	const data = await response.json();

	return data;
}

export async function isMultisite( url ) {
	const testUrl = `${ url.replace( /\/$/, '' ) }/wp-signup.php`;

	let response;
	try {
		response = await fetch( testUrl );
	} catch ( err ) {
		return;
	}

	// If the file wasn't found at all, likely it has been blocked entirely.
	if ( response.status !== 200 ) {
		return false;
	}

	// If we haven't been redirected, we're on the signup page.
	if ( response.url === testUrl ) {
		return true;
	}

	// We might have been redirected to a correct signup page.
	if ( response.url.indexOf( 'wp-signup.php' ) !== -1 ) {
		return true;
	}

	// Otherwise, nothing found, so assume we're on single-site.
	return false;
}

export default function addSite( url, index, credentials = {} ) {
	return {
		type: 'SITE_CREATED',
		payload: {
			site: index,
			rest_url: url,
			id: url,
			credentials,
		},
	};
}
