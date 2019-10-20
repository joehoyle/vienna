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
	return false;
	/*
	const testUrl = `${ url.replace( /\/$/, '' ) }/wp-activate.php`;
	const opts = {
		// method: 'POST',
	};

	let response;
	try {
		response = await fetch( testUrl, opts );
	} catch ( err ) {
		console.log( err );
		return;
	}

	console.log( url );
	if ( response.url === testUrl ) {
		console.log( 'not redirected, is multisite' );
		console.log( response );
		return true;
	}

	if ( response.url.indexOf( 'wp-signup.php' ) !== -1 || response.url.indexOf( 'registration=' ) !== -1 ) {
		console.log( 'found signup.php, is multisite' );
		return true;
	}

	console.log( 'no hints found, assume single' );
	console.log( response );
	return false;
	*/
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
