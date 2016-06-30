import OAuth from 'oauth-1.0a'
import querystring from 'query-string'
import { Linking } from 'react-native'
import httpapi from '../api'
import { values, trimEnd } from 'lodash'

export default function addSite( url, args = {} ) {

	return ( dispatch, getStore ) => {
		/*
		 * Don't add duplicate sites.
		 */
		var siteUrls = values( getStore().sites ).map( site => site.url );

		if (siteUrls.indexOf( url ) > 0 ) {
			dispatch({
				type: 'ADD_SITE_URL_ALREADY_EXISTING'
			})

			return
		}

		dispatch({
			type: 'ADD_SITE_START',
			url: url,
			id: Math.max( values( getStore().sites ).map( s => s.id ) ) + 1
		})

		var promise = new Promise( ( resolve, reject ) => {
			if ( args.credentials ) {
				return resolve( args.credentials )
			}

			const brokerApi = new httpapi({
				url: 'https://apps.wp-api.org',
				credentials: {
					client: {
						public: 'PWZ3haBUxfS9',
						secret: 'IrDbVViTpDO16C6W11eIBAaJcEB8C7237K1FWWnDdviVzC0P',
					},
				},
			})

			dispatch({
				type: 'ADD_SITE_BROKER_CONNECTING',
			})

			resolve( brokerApi.post( 'https://apps.wp-api.org/broker/connect', {
				server_url: url,
			} ) )
		})

		promise.then( function( data ) {
				dispatch({
					type: 'ADD_SITE_CLIENT_CREATED',
					data: data
				})
			})
			.then( function() {
				var store = getStore()
				var api = new httpapi( store.sites[ store.activeSite.id ] )

				dispatch({
					type: 'ADD_SITE_REQUEST_TOKEN_UPDATING',
				})
				const someURL = url

				return api.post( url + 'oauth1/request', {
					callback_url: 'wordpress-react-native://site_callback',
				} )
			})
			.then( data => {
				var store = getStore()
				var url = store.sites[ store.activeSite.id ].url
				url = url + 'oauth1/authorize?' + querystring.stringify({
					oauth_token: data.oauth_token,
					oauth_callback: 'wordpress-react-native://site_callback'
				})
				dispatch({
					type: 'ADD_SITE_REQUEST_TOKEN_UPDATED',
					data: data,
				})
				Linking.openURL( url )
			} )
			.catch( error => {
				dispatch({
					type: 'ADD_SITE_FAILED',
					error: error,
				})
			})

		Linking.addEventListener('url', function( event ) {
			var args = querystring.parse( event.url.split('?')[1] )

			dispatch({
				type: 'ADD_SITE_ACCESS_TOKEN_UPDATING',
				data: args,
			})

			var store = getStore()
			var api = new httpapi( store.sites[ store.activeSite.id ] )

			api.post( url + 'oauth1/access', {
				oauth_verifier: args.oauth_verifier,
			}, function( data ) {
				dispatch({
					type: 'ADD_SITE_ACCESS_TOKEN_UPDATED',
					data: data,
				})
				dispatch({
					type: 'ADD_SITE_DATA_UPDATING',
				})
				var store = getStore()
				var api = new httpapi( store.sites[ store.activeSite.id ] )
				api.get( '/', { context: 'help' }, function( data ) {
					dispatch({
						type: 'ADD_SITE_DATA_UPDATED',
						data: data
					})
					dispatch({
						type: 'ROUTER_RESET',
						payload: {
							name: 'sites',
						},
					})
				} )
			} )
		})
	}
}
