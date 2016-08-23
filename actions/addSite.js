import OAuth from 'oauth-1.0a'
import querystring from 'query-string'
import { Linking } from 'react-native'
import SafariView from 'react-native-safari-view'
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

		var siteId = Math.max.apply( null, values( getStore().sites ).map( s => s.id ).concat( [0] ) ) + 1

		dispatch({
			type: 'ADD_SITE_START',
			url: url,
			id: siteId,
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

		promise
			.then( function( data ) {

				if ( data.status === 'error' ) {
					throw { message: 'Broker Error: ' + data.type, code: data.type }
				}

				dispatch({
					type: 'ADD_SITE_CLIENT_CREATED',
					data: data
				})
			}, function( err ) {
				if ( ! err.message ) {
					err.message = 'Unknown broker error.'
				}

				throw err
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

				SafariView.show({
					url: url,
					tintColor: '#2E73B0',
				})
				Linking.addEventListener('url', listener )
			} )
			.catch( error => {
				dispatch({
					type: 'ADD_SITE_FAILED',
					error: error,
				})
			})

		var showErrorOnDismiss = SafariView.addEventListener( 'onDismiss', () => {
			Linking.removeEventListener( 'url', listener )
			dispatch({
				type: 'ADD_SITE_FAILED',
				error: { message: 'Login modal dismissed.' },
			})
		} )

		var listener = function( event ) {
			showErrorOnDismiss.remove()
			SafariView.dismiss()
			Linking.removeEventListener( 'url', listener )
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
		}
	}
}
