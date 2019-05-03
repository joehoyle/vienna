import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Image,
	WebView,
} from 'react-native';
import ViennaPropTypes from '../../PropTypes';
import { FontAwesome as Icon } from '@expo/vector-icons';
import TimeAgo from './../TimeAgo';
import ConfirmButton from '../ConfirmButton';
import RichItem from '../General/RichItem';

export default class ListItem extends Component {
	static propTypes = {
		post: ViennaPropTypes.Post.isRequired,
		onEdit: PropTypes.func,
		onView: PropTypes.func,
		onTrash: PropTypes.func,
		featuredMedia: ViennaPropTypes.Media,
		author: PropTypes.User,
	};
	constructor(props) {
		super(props);
		this.state = { webViewHeight: 100 };
	}
	render() {
		return (
			<View style={styles.container}>
				<RichItem
					title={this.props.post.title.rendered}
					content={this.props.post.excerpt.rendered}
					avatarUrl={
						this.props.author ? this.props.author.avatar_urls['96'] : null
					}
					imageUrl={
						this.props.featuredMedia
							? this.props.featuredMedia.media_details.sizes.medium.source_url
							: null
					}
				/>
				<View style={styles.actions}>
					{this.props.onEdit
						? <TouchableOpacity
								style={styles.actionsButton}
								onPress={this.props.onEdit}
							>
								<View style={styles.actionsButton}>
									<Icon name="pencil" size={14} color="#888888" />
									<Text style={styles.actionsButtonText}>Edit</Text>
								</View>
							</TouchableOpacity>
						: null}
					{this.props.onView
						? <TouchableOpacity
								style={styles.actionsButton}
								onPress={this.props.onView}
							>
								<View style={styles.actionsButton}>
									<Icon name="external-link" size={14} color="#888888" />
									<Text style={styles.actionsButtonText}>View</Text>
								</View>
							</TouchableOpacity>
						: null}
					{this.props.onTrash
						? <ConfirmButton
								style={styles.actionsButton}
								onPress={this.props.onTrash}
								text="Trash"
								textStyle={styles.actionsButtonText}
								confirmText="Confirm"
								confirmTextStyle={styles.actionsButtonText}
								icon="trash"
								confirmIcon="check"
							/>
						: null}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	title: {
		margin: 15,
		height: 25,
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
		flexDirection: 'row',
		marginLeft: 45,
	},
	actionsButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
	},
	actionsButtonText: {
		textAlign: 'center',
		padding: 5,
		fontSize: 14,
		color: '#666666',
	},
	featuredMedia: {
		height: 180,
		flex: 1,
		marginBottom: 5,
	},
	webView: {
		marginLeft: 10,
		marginRight: 10,
	},
});
