import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { WebView } from 'react-native-webview';

import { getSemanticColor } from '../../theme';

const styles = StyleSheet.create( {
	container: {
		marginBottom: 0,
		marginTop: 5,
		flexDirection: 'row',
	},
	authorName: {
		lineHeight: 16,
		color: getSemanticColor( 'label' ),
	},
	contentRight: {
		flex: 1,
	},
	content: {
		marginBottom: 15,
	},
	webView: {
		height: 10,
		backgroundColor: 'transparent',
	},
	authorImage: {
		marginRight: 15,
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#EEEEEE',
	},
} );

const injectedJavaScript = `
window.ReactNativeWebView.postMessage( document.getElementById('text').scrollHeight );
true;
`;

export default class RichItem extends Component {
	static propTypes = {
		avatarUrl: PropTypes.string,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	};

	state = {
		webViewHeight: 150,
	};

	onMessage = event => {
		this.setState( {
			webViewHeight: parseInt( event.nativeEvent.data, 10 ),
		} );
	};

	htmlExcerpt() {
		return `
			<meta name="viewport" content="width = device-width" />
			<style>
				body {
					background: ${ getSemanticColor( 'systemBackground' ) };
					font-size: 15px;
					line-height: 20px;
					color: ${ getSemanticColor( 'secondaryLabel' ) };
					font-family: sans-serif;
					margin: 0;
					max-width: 100%;
				}

				img {
					max-width: 100%;
				}

			</style>
			<div id="text">${this.props.content}</div>
		`;
	}

	render() {
		return (
			<View style={ styles.container }>
				{ this.props.avatarUrl ? (
					<Image
						style={ styles.authorImage }
						source={ { uri: this.props.avatarUrl } }
					/>
				) : (
					<View style={ styles.authorImage } />
				) }
				<View style={ styles.contentRight }>
					<View style={ styles.authorText }>
						<Text style={ styles.authorName }>{ this.props.title }</Text>
					</View>
					<View style={ styles.content }>
						<WebView
							scrollEnabled={ false }
							injectedJavaScript={ injectedJavaScript }
							originWhitelist={ [ '*' ] }
							style={ [ styles.webView, { height: this.state.webViewHeight } ] }
							source={ { html: this.htmlExcerpt() } }
							automaticallyAdjustContentInsets={ true }
							onMessage={ this.onMessage }
						/>
					</View>
				</View>
			</View>
		);
	}
}
