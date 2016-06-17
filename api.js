import querystring from 'query-string'

export default {

	api_url: 'http://wordpress.dev/wp-json',

	get: function( url, data, callback ) {

		return this.request( 'GET', url, data, callback )
	},

	post: function( url, data, callback ) {

		return this.request( 'POST', url, data, callback )
	},

	_delete: function( url, data, callback ) {
		return this.request( 'DELETE', url, data, callback )
	},

	request: function( method, url, data, callback ) {
		var xmlhttp = new XMLHttpRequest()

		xmlhttp.onreadystatechange = function() {
			if ( xmlhttp.readyState == 4 ) {
				if ( ! callback ) {
					return
				}
				try {
					var data = JSON.parse( xmlhttp.responseText )
				} catch ( e ) {
					console.log( xmlhttp.responseText )
					return callback( null, { message: xmlhttp.responseText } )
				}

				if ( xmlhttp.status < 300 ) {
					callback( data, null )
				} else {
					console.log( url )
					callback( null, data )
				}
			}
		}

		if ( method === 'GET' ) {
			url += '?' + querystring.stringify( data )
		}
		xmlhttp.open( method, this.api_url + url, true )
		if ( method === 'POST' || method === 'PUT' || method === 'OPTIONS' ) {
			xmlhttp.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" )
			console.log( 'sending')
			console.log( data )
			xmlhttp.send(JSON.stringify( data ) )
		} else {
			xmlhttp.send()
		}

		return xmlhttp
	},
}
