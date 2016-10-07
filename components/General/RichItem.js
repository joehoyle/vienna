import React, {Component } from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, WebView } from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'
import ConfirmButton from '../ConfirmButton'

export default class RichItem extends Component {
	static propTypes = {
		avatarUrl: React.PropTypes.string,
		title: React.PropTypes.string.isRequired,
		content: React.PropTypes.string.isRequired,
	}
	constructor() {
		super()
		this.state = {
			webViewHeight: 0,
		}
	}
	updateWebViewHeight(event) {
		if ( ! event.jsEvaluationValue ) {
			return;
		}
		this.setState({webViewHeight: parseInt(event.jsEvaluationValue)})
	}
	render() {
		return (
			<View style={styles.container}>
				{this.props.avatarUrl ?
					<Image style={styles.authorImage} source={{uri:this.props.avatarUrl}} />
				:
					<View style={styles.authorImage} />
				}
				<View style={styles.contentRight}>
					<View style={styles.authorText}>
						<Text style={styles.authorName}>{this.props.title}</Text>
					</View>
					<View style={styles.content}>
						<WebView
							scrollEnabled={false}
							injectedJavaScript="document.getElementById('text').scrollHeight;"
							style={[styles.webView, {height:this.state.webViewHeight}]}
							source={{html:this.htmlExcerpt()}}
							automaticallyAdjustContentInsets={true}
							onNavigationStateChange={this.updateWebViewHeight.bind(this)}
						/>
					</View>
				</View>
			</View>
		)
	}

	htmlExcerpt() {
		return `<style>
			body {
				font-size: 15px;
				line-height: 20px;
				color: #666;
				font-family: sans-serif;
				margin: 0;
			}

			img {
				max-width: 100%;
			}

		</style>
		<div id="text">${this.props.content}</div>
		`
	}
}

const styles = StyleSheet.create({
	container: {
		marginBottom: 0,
		marginTop: 5,
		flexDirection: 'row',
	},
	authorName: {
		lineHeight: 16,
	},
	contentRight: {
		flex: 1,
		backgroundColor: 'white',
	},
	content: {
		marginBottom: 15,
	},
	webView: {
		height: 10,
		backgroundColor: 'white',
	},
	authorImage: {
		marginRight: 15,
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#EEEEEE',
	},
})
