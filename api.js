import querystring from 'query-string'
import oauth from 'oauth-1.0a'

export default class {
	constructor( config ) {
		this.url = config.url + 'wp-json'
		this.credentials = config.credentials
		this.oauth = new oauth({
			consumer: config.credentials.client,
			signature_method: 'HMAC-SHA1'
		})
	}

	get( url, data, callback ) {

		return this.request( 'GET', url, data, callback )
	}

	post( url, data, callback ) {

		return this.request( 'POST', url, data, callback )
	}

	_delete( url, data, callback ) {
		return this.request( 'DELETE', url, data, callback )
	}

	request( method, url, data, callback ) {

		if ( method === 'GET' && data ) {
			url += '?' + querystring.stringify( data )
			data = null
		}

		if ( url.indexOf( 'http' ) !== 0 ) {
			url = this.url + url
		}

		var oauthData = this.oauth.authorize( {
			method: method,
			url: url,
			data: data
		}, this.credentials.token ? this.credentials.token : null )
		return fetch( url, {
			method: method,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				...this.oauth.toHeader( oauthData )
			},
			body: querystring.stringify( data )
		} )
		.then( response => {
			if ( response.headers.get( 'Content-Type' ).indexOf( 'x-www-form-urlencoded' ) > -1 ) {
				return response.text().then( text => {
					return querystring.parse( text )
				})
			}
			return response.text().then( text => {
				try {
					var json = JSON.parse( text )
				} catch( e ) {
					throw { message: text, code: response.status }
				}

				if ( response.status >= 300) {
					throw json
				} else {
					return json
				}
			})

		} )
		.then( function( data ) {
			if ( callback ) {
				callback( data )
			}
			return data
		})
		.catch( error => {
			if ( callback ) {
				callback( null, error )
			} else {
				throw error
			}
		})
	}
}
