import { openAuthSessionAsync } from 'expo-web-browser';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import URI from 'urijs';

import { fetchIndex, isMultisite } from '../../actions/addSite';

import Button from './Button';
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

const STATUS = {
	NONE: 'NONE',
	WAITING: 'WAITING',
	CHECKING: 'CHECKING',
	ERROR: 'ERROR',
};

export default class Start extends Component {
	static navigatorButtons = {
		leftButtons: [
			{
				title: 'Back',
				id: 'close',
			},
		],
	};

	state = {
		status: STATUS.NONE,
		error: null,
	};

	componentDidMount() {
		this.multisiteCheck = this.onCheckMultisite();
	}

	onCheckMultisite = async () => {
		// Determine whether the site is multisite or not, and store.
		const { url } = this.props.index;
		return await isMultisite( url );
	};

	onInstall = async () => {
		const { url } = this.props.index;

		this.setState( {
			status: STATUS.WAITING,
		} );

		// First, determine whether the site is multisite or not.
		const multisite = await this.multisiteCheck;

		// Prepare the browser.
		const baseUrl = url.replace( /\/$/, '' ) + '/wp-admin';
		const adminUrl = new URI(
			multisite
				? baseUrl + '/network/plugin-install.php'
				: url + '/plugin-install.php',
		);
		const installUrl = adminUrl.addQuery( {
			tab: 'search',
			type: 'term',
			s: 'connect',
		} );

		// Open the browser and wait.
		openAuthSessionAsync( '' + installUrl ).then( this.onCheck );
	};

	onCheck = async () => {
		this.setState( {
			status: STATUS.CHECKING,
		} );

		const { url } = this.props.index;
		try {
			const index = await fetchIndex( url );

			// Does the site have App Connect installed?
			if ( ! ( 'connect' in index.authentication ) ) {
				this.setState( {
					status: STATUS.ERROR,
					message:
						'App Connect does not appear to be installed. Please try again.',
				} );
				return;
			}

			this.props.onInstall( index );
		} catch ( err ) {
			this.setState( {
				status: STATUS.ERROR,
				message: err.message,
			} );
		}
	};

	render() {
		const { status } = this.state;
		return (
			<View style={ styles.container }>
				<Logo />

				<Description>
					Vienna requires the App Connect plugin. We'll take you to your site to
					install it.
				</Description>
				<Description>
					Once you've installed and activated the plugin, close the browser and
					hit reload below.
				</Description>

				{ status === STATUS.NONE || status === STATUS.ERROR ? (
					<Button style={ styles.button } onPress={ this.onInstall }>
						Install
					</Button>
				) : null }

				{ status === STATUS.CHECKING ? (
					<View style={ styles.loader }>
						<ActivityIndicator
							size="small"
							color="#666666"
							style={ styles.loadingIcon }
						/>

						<Text>Checking site…</Text>
					</View>
				) : null }

				{ status === STATUS.WAITING ? (
					<Button style={ styles.button } onPress={ this.onCheck }>
						Check Site
					</Button>
				) : null }

				{ status === STATUS.ERROR ? (
					<ErrorMessage>{ this.state.message }</ErrorMessage>
				) : null }
			</View>
		);
	}
}
