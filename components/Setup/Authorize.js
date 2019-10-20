import { AuthSession } from 'expo';
// import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';
import URI from 'urijs';

import Description from './Description';
import ErrorMessage from './ErrorMessage';
import Logo from './Logo';

const styles = StyleSheet.create( {
	container: {
		flexGrow: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	button: {
		alignSelf: 'center',
		margin: 10,
	},
	loader: {
		alignSelf: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
	},
	loadingIcon: {
		marginRight: 5,
		marginLeft: 5,
	},
} );

const CONNECT_AUTH_ENDPOINT = new URI( 'https://apps-beta.wp-api.org/broker/2/connect' );
const CLIENT_ID = 'awzvyrf3p74o';
const CLIENT_SECRET = 'YaMKLzyFuxkQHFGRwSo0MEaperAsrKxNEseuRk7U0lKhM2NJ';

export default class Authorize extends React.Component {
	componentDidMount() {
		this.onLaunchBrowser();
	}

	async onLaunchBrowser() {
		const authEndpoint = CONNECT_AUTH_ENDPOINT.addQuery( {
			site: this.props.index.authentication.connect.url,
			client_id: CLIENT_ID,

			// Other OAuth parameters to pass through.
			response_type: 'code',
		} );
		const redirectUrl = AuthSession.getRedirectUrl();
		const result = await AuthSession.startAsync( {
			authUrl: '' + authEndpoint,
		} );
		switch ( result.type ) {
			case 'locked':
				return;

			case 'cancel':
			case 'dismissed':
				return;

			case 'error':
				return;

			case 'success':
				const { brokered_id, code } = result.params;

				// Exchange code for token.
				await this.onExchangeCode( brokered_id, code, redirectUrl );

		}
	}

	async onExchangeCode( id, code, redirectUrl ) {
		const tokenEndpoint = this.props.index.authentication.oauth2.endpoints.token;
		const body = new URLSearchParams( {
			grant_type: 'authorization_code',
			code,
			client_id: id,
			redirect_uri: redirectUrl
		} );
		const request = {
			method: 'POST',
			body: '' + body,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
			},
		};
		const response = await fetch( tokenEndpoint, request );
		const data = await response.json();

		this.props.onAuthorize( id, data.access_token );
	}

	render() {
		return (
			<View style={ styles.container }>
				<Logo />

				<Description>
					Waiting for authorization…
				</Description>
			</View>
		);
	}
}