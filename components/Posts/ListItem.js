import React, {Component} from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Image, WebView} from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'
import TimeAgo from './../TimeAgo'
import ConfirmButton from '../ConfirmButton'

export default class ListItem extends Component {
	static propTypes = {
		post: PropTypes.Post.isRequired,
		onEdit: React.PropTypes.func,
		onView: React.PropTypes.func,
		onTrash: React.PropTypes.func,
		featuredMedia: PropTypes.Media,
	}

	constructor( props ) {
		super( props )
		this.state = { webViewHeight: 100 }
	}

	updateWebViewHeight(event) {
		if ( ! event.jsEvaluationValue ) {
			return
		}
		this.setState({webViewHeight: parseInt(event.jsEvaluationValue)})
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.props.onEdit}>
					<Text style={styles.title}>{this.props.post.title.rendered}</Text>
					{this.props.featuredMedia ?
						<Image
							style={styles.featuredMedia}
							source={{uri:this.props.featuredMedia.media_details.sizes.medium.source_url}}
							/>
					: null }

					<View style={styles.webView}>
						<WebView
							scrollEnabled={false}
							injectedJavaScript="document.getElementById('text').scrollHeight;"
							style={[{height:this.state.webViewHeight}]}
							source={{html:this.htmlExcerpt()}}
							automaticallyAdjustContentInsets={true}
							onNavigationStateChange={this.updateWebViewHeight.bind(this)}
						/>
					</View>
					{this.props.post.date ?
						<View style={styles.date}>
							<TimeAgo date={new Date( this.props.post.date )} style={styles.dateText} />
						</View>
					: null }
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
					{this.props.onView ?
						<TouchableOpacity style={styles.actionsButton} onPress={this.props.onView}>
							<View style={styles.actionsButton}>
								<Icon name="external-link" size={15} color="#2E74B1" />
								<Text style={styles.actionsButtonText}>View</Text>
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
		)
	}

	htmlExcerpt() {
		return `<style>
			body {
				font-size: 15px;
				line-height: 20px;
				color: #666;
				font-family: Georgia;
				margin: 0;
			}

		</style>
		<div id="text">${this.props.post.excerpt.rendered}</div>
		`
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 10,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#C4D0D9',
	},
	title: {
		fontSize: 20,
		fontFamily: 'Georgia',
		margin: 15,
	},
	dateText: {
		fontSize: 12,
		color: '#999',
	},
	date: {
		marginLeft: 15,
		marginRight: 15,
		marginTop: 5,
	},
	actions: {
		backgroundColor: '#F0F4F6',
		padding: 5,
		marginTop: 15,
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
	featuredMedia: {
		height: 180,
		flex: 1,
		marginBottom: 5,
	},
	webView: {
		marginLeft: 10,
		marginRight: 10,
	}
})
