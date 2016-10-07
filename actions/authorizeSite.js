import OAuth from 'oauth-1.0a'
import querystring from 'query-string'
import { Linking } from 'react-native'
import SafariView from 'react-native-safari-view'
import httpapi from '../api'
import { values, trimEnd } from 'lodash'
import fetchSiteData from './fetchSiteData'
import { Navigation } from 'react-native-navigation'

/**
 * Authorize a site to get / renew oauth credentials for that site. This will handle
 * sending the user through the auth flow using a Safar inline view.
 *
 * As a workaround to not being able to show a safar view controller when a modal
 * is showing, we call `Navigation.dismissAllModals()` before showing the safari view,
 * which is a less than ideal UX.
 *
 * @param  int site
 */
export default function authorizeSite( site ) {
	return ( dispatch, getStore ) => {
		const store = getStore()
		site = store.sites[ site ]
		var url = site.url
		var promise = new Promise( ( resolve, reject ) => {

			if ( site.credentials.client ) {
				return resolve()
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
				type: 'AUTHORIZE_SITE_BROKER_CONNECTING',
			})

			return brokerApi.post( 'https://apps.wp-api.org/broker/connect', {
				server_url: url,
			} ).then( data => {
				if ( data.status === 'error' ) {
					throw { message: 'Broker Error: ' + data.type, code: data.type }
				}

				dispatch({
					type: 'AUTHORIZE_SITE_CLIENT_CREATED',
					data: data
				})

				resolve()
			}).catch( error => {
				reject( error )
			})
		})

		promise.then( function() {
				var store = getStore()
				var api = new httpapi( store.sites[ store.activeSite.id ] )

				dispatch({
					type: 'AUTHORIZE_SITE_REQUEST_TOKEN_UPDATING',
				})
				const someURL = url

				return api.post( site.authentication.oauth1.request, {
					callback_url: 'wordpress-react-native://site_callback',
				} )
			})
			.then( data => {
				var store = getStore()
				var url = store.sites[ store.activeSite.id ].url
				url = site.authentication.oauth1.authorize + '?' + querystring.stringify({
					oauth_token: data.oauth_token,
					oauth_callback: 'wordpress-react-native://site_callback'
				})
				dispatch({
					type: 'AUTHORIZE_SITE_REQUEST_TOKEN_UPDATED',
					data: data,
				})

				Navigation.dismissAllModals()

				setTimeout( () => {
					SafariView.show({
						url: url,
						tintColor: '#2E73B0',
					})
					Linking.addEventListener('url', listener )
				}, 1000 )

			} )
			.catch( error => {
				dispatch({
					type: 'AUTHORIZE_SITE_FAILED',
					error: error,
				})
			})

		var showErrorOnDismiss = SafariView.addEventListener( 'onDismiss', () => {
			Linking.removeEventListener( 'url', listener )
			dispatch({
				type: 'AUTHORIZE_SITE_FAILED',
				error: { message: 'Login modal dismissed.' },
			})
		} )

		var listener = function( event ) {
			showErrorOnDismiss.remove()
			SafariView.dismiss()
			Linking.removeEventListener( 'url', listener )
			var args = querystring.parse( event.url.split('?')[1] )

			dispatch({
				type: 'AUTHORIZE_SITE_ACCESS_TOKEN_UPDATING',
				data: args,
			})

			var store = getStore()
			var api = new httpapi( store.sites[ store.activeSite.id ] )

			api.post( site.authentication.oauth1.access, {
				oauth_verifier: args.oauth_verifier,
			}, function( data ) {
				dispatch({
					type: 'AUTHORIZE_SITE_ACCESS_TOKEN_UPDATED',
					data: data,
				})
			} )
		}
	}
}
