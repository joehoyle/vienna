import OAuth from 'oauth-1.0a'
import querystring from 'query-string'
import { Linking } from 'react-native'
import SafariView from 'react-native-safari-view'
import httpapi from '../api'
import { values, trimEnd } from 'lodash'
import fetchSiteData from './fetchSiteData'
import authorizeSite from './authorizeSite'

export default function addSite( url, args = {} ) {

	return ( dispatch, getStore ) => {
		/*
		 * Don't add duplicate sites.
		 */
		var siteUrls = values( getStore().sites ).map( site => site.url );
		dispatch({
			type: 'SITE_CREATING',
		})

		var siteId = Math.max.apply( null, values( getStore().sites ).map( s => s.id ).concat( [0] ) ) + 1

		fetch( url, { redirect: 'follow' } )
			.then( response => {
				var linkHeaders = response.headers.getAll( 'Link' ).filter( link => link.match( 'rel="https://api.w.org/"' ) )

				if ( linkHeaders.length === 0 ) {
					throw new Error( 'Unable to find REST API Link header on the site.' )
				}

				var restUrl = linkHeaders[0].match( '<(.+)>; rel="https://api.w.org/"' )[1]
				return fetch( `${restUrl}?context=help` )
					.then( response => response.json() )
					.then( data => {
						if ( data.namespaces.indexOf( 'wp/v2' ) === -1 ) {
							throw new Error( 'This site does not have the WP REST API. Please install the WP REST API plugin.' )
						}
						if ( ! data.authentication.oauth1 ) {
							throw new Error( 'This site does not have OAuth 1 authentication available. Please install the WP REST API OAuth 1 plugin.' )
						}
						if ( ! args.credentials && ! data.authentication.broker ) {
							throw new Error( 'This site does not have broker authentication available. Please install the WP REST API Broker plugin.' )
						}
						dispatch({
							type: 'SITE_CREATED',
							payload: {
								site: data,
								rest_url: restUrl,
								id: siteId,
								args: args,
							}
						})
						dispatch( authorizeSite( siteId ) )
					})
			})
			.catch( error => {
				return dispatch({
					type: 'SITE_CREATE_ERRORED',
					payload: {
						error: error
					}
				})
			})
	}
}
