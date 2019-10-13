import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	ActivityIndicator,
} from 'react-native';
import { trim } from 'lodash';

import { fetchIndex } from '../../actions/addSiteNew';
import { FontAwesome as Icon } from '@expo/vector-icons';

import Button from './Button';
import Logo from './Logo';
import TextInputWithIcon from '../General/TextInputWithIcon';

const styles = StyleSheet.create( {
	container: {
		flexGrow: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	description: {
		color: '#666666',
		marginTop: 15,
		marginBottom: 15,
		textAlign: 'center',
	},
	input: {
		backgroundColor: '#f1f1f1',
		height: 40,
		padding: 3,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee',
	},
	inputText: {
		flex: 1,
		fontSize: 16,
		lineHeight: 16,
	},
	addButton: {
		alignSelf: 'center',
		margin: 10,
	},
	errorMessage: {
		color: 'red',
		textAlign: 'center',
		fontSize: 15,
		marginTop: 10,
		marginBottom: 5,
	},
} );

const STATUS = {
	NONE: 'NONE',
	ERROR: 'ERROR',
	LOADING: 'LOADING',
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
		url: '',
		status: STATUS.NONE,
		error: null,
	}

	onSubmit = async () => {
		let url = this.state.url;

		// prepend https:// to the url if it wasn't set already.
		if ( url.indexOf( 'http' ) !== 0 ) {
			url = 'https://' + url;
		}

		// make sure the URL has a trailing slash
		url = trim( url, '/' ) + '/';

		this.setState( {
			status: STATUS.LOADING,
			url: url,
		} );

		try {
			const resolved = await fetchIndex( url );
			this.props.onConnect( resolved );
		} catch ( err ) {
			this.setState( {
				status: STATUS.ERROR,
				error: err.message,
			} );
			return;
		}
	}

	render() {
		return (
			<View style={ styles.container }>
				<Logo />

				<Text style={ styles.description }>
					Enter the address of the site you'd like to connect.
				</Text>

				{ this.state.status !== STATUS.LOADING ? (
					<View>
						<TextInputWithIcon
							autoFocus
							icon="globe"
							keyboardType="url"
							placeholder="Site URL..."
							value={ this.state.url }
							returnKeyType="go"
							onChangeText={ text => this.setState( { url: text } ) }
							onSubmitEditing={ this.onSubmit }
						/>
					</View>
				) : (
					<View style={ styles.input }>
						<ActivityIndicator
							size="small"
							color="#666666"
							style={ { marginRight: 5, marginLeft: 5 } }
						/>
						<Text style={ styles.inputText }>{ this.state.url }</Text>
					</View>
				) }

				{ this.state.error ? (
					<Text style={ styles.errorMessage }>
						<Icon name="exclamation-triangle" color="red" />
						{ ' ' }
						{ this.state.error }
					</Text>
				) : null }

				<Button
					disabled={ Boolean( this.state.status === STATUS.LOADING || ! this.state.url ) }
					style={ styles.addButton }
					onPress={ this.onSubmit }
				>
					Add Site
				</Button>
			</View>
		);
	}
}
