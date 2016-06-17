import querystring from 'query-string'

export default {

	data: {
		'/posts': require( './data/posts.json' ),
		'/categories': require( './data/categories.json' ),
		'/tags': require( './data/tags.json' ),
		'/media': require( './data/media.json' ),
	},

	get: function( url, data, callback ) {
		var file = url.replace( '/wp/v2', '' )
		callback( this.data[ file ] )
	},

	_delete: function( url, data, callback ) {
		return callback()
	}
}
