import { AuthSession } from 'expo';
import querystring from 'query-string';
import httpapi from '../api';
import { values, trimEnd } from 'lodash';
import fetchSiteData from './fetchSiteData';

/**
 * Authorize a site to get / renew oauth credentials for that site. This will handle
 * sending the user through the auth flow using a Safar inline view.
 *
 * @param  int site
 */
export default function authorizeSite(site) {
	return (dispatch, getStore) => {
		const store = getStore();
		site = store.sites[site];
		var url = site.url;
		var promise = new Promise((resolve, reject) => {
			if (site.credentials.client) {
				return resolve();
			}

			const brokerApi = new httpapi({
				url: 'https://apps.wp-api.org/',
				credentials: {
					client: {
						public: 'PWZ3haBUxfS9',
						secret: 'IrDbVViTpDO16C6W11eIBAaJcEB8C7237K1FWWnDdviVzC0P',
					},
				},
			});

			dispatch({
				type: 'AUTHORIZE_SITE_BROKER_CONNECTING',
			});

			return brokerApi
				.post('https://apps.wp-api.org/broker/connect', {
					server_url: url,
				})
				.then(data => {
					if (data.status === 'error') {
						throw { message: 'Broker Error: ' + data.type, code: data.type };
					}

					dispatch({
						type: 'AUTHORIZE_SITE_CLIENT_CREATED',
						data: data,
					});

					resolve();
				})
				.catch(error => {
					reject(error);
				});
		});

		promise
			.then(function() {
				var store = getStore();
				var api = new httpapi(store.sites[store.activeSite.id]);

				dispatch({
					type: 'AUTHORIZE_SITE_REQUEST_TOKEN_UPDATING',
				});
				const someURL = url;

				return api.post(site.authentication.oauth1.request, {
					callback_url: 'wordpress-react-native://site_callback',
				});
			})
			.then(data => {
				const redirectUrl = AuthSession.getRedirectUrl();
				var store = getStore();
				var url = store.sites[store.activeSite.id].url;
				url =
					site.authentication.oauth1.authorize +
					'?' +
					querystring.stringify({
						oauth_token: data.oauth_token,
						oauth_callback: redirectUrl,
					});
				dispatch({
					type: 'AUTHORIZE_SITE_REQUEST_TOKEN_UPDATED',
					data: data,
				});

				setTimeout(async () => {
					let result = await AuthSession.startAsync( {
						authUrl: url,
					} );

					if ( result.type === 'dismiss' ) {
						// Manually cancelled elsewhere.
						return;
					}

					switch ( result.type ) {
						case 'cancel':
							dispatch({
								type: 'AUTHORIZE_SITE_FAILED',
								error: { message: 'Login modal dismissed.' },
							});
							break;

						case 'success':
							handler( result.params );
							break;

						case 'error':
							console.log( result );
							dispatch({
								type: 'AUTHORIZE_SITE_FAILED',
								error: { message: `Could not authorize: ${ result.errorCode }` },
							});
							break;

						default:
							console.log( result );
							dispatch({
								type: 'AUTHORIZE_SITE_FAILED',
								error: { message: 'Unknown error occurred' },
							});
							break;
					}
				}, 1000);
			})
			.catch(error => {
				console.log(error);
				dispatch({
					type: 'AUTHORIZE_SITE_FAILED',
					error: error,
				});
			});

		var handler = ( args ) => {
			dispatch({
				type: 'AUTHORIZE_SITE_ACCESS_TOKEN_UPDATING',
				data: args,
			});

			var store = getStore();
			var api = new httpapi(store.sites[store.activeSite.id]);

			api
				.post(site.authentication.oauth1.access, {
					oauth_verifier: args.oauth_verifier,
				})
				.then(function(data) {
					dispatch({
						type: 'AUTHORIZE_SITE_ACCESS_TOKEN_UPDATED',
						data: data,
					});
				});
		};
	};
}
