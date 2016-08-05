import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity, WebView } from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'
import ConfirmButton from '../ConfirmButton'
import ReplyToItem from './ReplyToItem'

export default class ListItem extends Component {
	static propTypes = {
		comment: PropTypes.Comment,
		onEdit: React.PropTypes.func,
		onReply: React.PropTypes.func,
	}

	constructor() {
		super()
		this.state = {
			isReplying: false,
			webViewHeight: 0,
		}
	}

	updateWebViewHeight(event) {
		if ( ! event.jsEvaluationValue ) {
			return;
		}
		console.log( event.jsEvaluationValue )
		this.setState({webViewHeight: parseInt(event.jsEvaluationValue)})
	}

	onReply( text ) {
		this.setState({ isReplying: false})
		this.props.onReply( this.props.comment, text )
	}

	render() {
		return (
			<View>
				<View style={styles.container}>
					<TouchableOpacity onPress={this.props.onEdit}>
						<View style={styles.author}>
							<Image style={styles.authorImage} source={{uri:this.props.comment.author_avatar_urls['24']}} />
							<View style={styles.authorText}>
								<Text style={styles.authorName}>{this.props.comment.author_name}</Text>
								{this.props.post ?
									<Text style={styles.commentPostName}>On {this.props.post.title.rendered}</Text>
								: null }
							</View>
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
					</TouchableOpacity>
					<View style={styles.actions}>
						{this.props.onEdit ?
							<TouchableOpacity style={styles.actionsButton} onPress={this.props.onEdit}>
								<View style={styles.actionsButton}>
									<Icon name="pencil" size={15} color="#2E74B1" />
									<Text style={styles.actionsButtonText}>Edit</Text>
								</View>
							</TouchableOpacity>
						: null }
						{this.props.onReply ?
							<TouchableOpacity style={styles.actionsButton} onPress={()=>this.setState({isReplying: true})}>
								<View style={styles.actionsButton}>
									<Icon name="reply" size={15} color="#2E74B1" />
									<Text style={styles.actionsButtonText}>Reply</Text>
								</View>
							</TouchableOpacity>
						: null }
						{this.props.onTrash ?
							<ConfirmButton
								style={styles.actionsButton}
								onPress={this.props.onTrash}
								text="Trash"
								textStyle={styles.actionsButtonText}
								confirmText="Confirm"
								confirmTextStyle={styles.actionsButtonText}
								icon="trash"
								confirmIcon="check"
							/>
						: null }
					</View>
				</View>
				{this.state.isReplying ?
					<View style={styles.replyToItem}>
						<ReplyToItem
							comment={this.props.comment}
							onCancel={() => this.setState({isReplying: false})}
							onReply={(text) => this.onReply( text )}
						/>
					</View>
				: null}
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

		</style>
		<div id="text">${this.props.comment.content.rendered}</div>
		`
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 10,
		marginBottom: 0,
		marginTop: 5,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#C4D0D9',
		flexDirection: 'column',
	},
	content: {
		paddingLeft: 10,
		paddingRight: 10,
		marginBottom: 15,
	},
	webView: {
		height: 10,
	},
	author: {
		flexDirection: 'row',
		marginBottom: 5,
		padding: 10,
	},
	authorName: {
		lineHeight: 13,
	},
	authorImage: {
		width: 24,
		height: 24,
		marginRight: 5,
		backgroundColor: '#333333',
	},
	commentPostName: {
		fontSize: 11,
		color: '#666666',
	},
	actions: {
		backgroundColor: '#F0F4F6',
		padding: 5,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
	},
	actionsButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionsButtonText: {
		textAlign: 'center',
		padding: 5,
		color: '#2E74B1',
	},
	replyToItem: {
		marginLeft: 50,
		marginRight: 10,
		marginTop: 10,
		marginBottom: 20,
	},
})
