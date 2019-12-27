import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { trim } from 'lodash';

import { fetchIndex } from '../../actions/addSite';

import Button from './Button';
import Description from './Description';
import ErrorMessage from './ErrorMessage';
import Logo from './Logo';
import TextInputWithIcon from '../General/TextInputWithIcon';

const styles = StyleSheet.create( {
	container: {
		flexGrow: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
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
		url: 'https://',
		status: STATUS.NONE,
		error: null,
	};

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
	};

	render() {
		return (
			<View style={ styles.container }>
				<Logo />

				<Description>
					Enter the address of the site you'd like to connect.
				</Description>

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
							style={ {
								marginRight: 5,
								marginLeft: 5,
							} }
						/>
						<Text style={ styles.inputText }>{ this.state.url }</Text>
					</View>
				) }

				{ this.state.error ? (
					<ErrorMessage>{ this.state.error }</ErrorMessage>
				) : null }

				<Button
					disabled={ Boolean(
						this.state.status === STATUS.LOADING || ! this.state.url,
					) }
					style={ styles.addButton }
					onPress={ this.onSubmit }
				>
					Add Site
				</Button>
			</View>
		);
	}
}
