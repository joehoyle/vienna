import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import ViennaPropTypes from '../../PropTypes';
import { FontAwesome as Icon } from '@expo/vector-icons';
import ConfirmButton from '../ConfirmButton';
import ReplyToItem from './ReplyToItem';
import RichItem from '../General/RichItem';

const styles = StyleSheet.create( {
	container: {
		marginBottom: 0,
		marginTop: 5,
		flexDirection: 'column',
	},
	belowRighItem: {
		marginLeft: 45,
	},
	actions: {
		flexDirection: 'row',
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
	replyToItem: {},
} );

export default class ListItem extends Component {
	static propTypes = {
		comment: ViennaPropTypes.Comment,
		onEdit: PropTypes.func,
		onReply: PropTypes.func,
	};

	constructor() {
		super();
		this.state = {
			isReplying: false,
			webViewHeight: 0,
		};
	}

	updateWebViewHeight( event ) {
		if ( ! event.jsEvaluationValue ) {
			return;
		}
		this.setState( { webViewHeight: parseInt( event.jsEvaluationValue, 10 ) } );
	}

	onReply( text ) {
		this.setState( { isReplying: false } );
		this.props.onReply( this.props.comment, text );
	}

	render() {
		return (
			<View style={ styles.container }>
				<RichItem
					title={ this.props.comment.author_name }
					content={ this.props.comment.content.rendered }
					avatarUrl={ this.props.comment.author_avatar_urls['24'] }
				/>
				<View style={ styles.belowRighItem }>
					{ this.state.isReplying ? (
						<View style={ styles.replyToItem }>
							<ReplyToItem
								comment={ this.props.comment }
								onCancel={ () => this.setState( { isReplying: false } ) }
								onReply={ text => this.onReply( text ) }
							/>
						</View>
					) : (
						<View style={ styles.actions }>
							{ this.props.onEdit ? (
								<TouchableOpacity
									style={ styles.actionsButton }
									onPress={ this.props.onEdit }
								>
									<View style={ styles.actionsButton }>
										<Icon name="pencil" size={ 14 } color="#888888" />
										<Text style={ styles.actionsButtonText }>Edit</Text>
									</View>
								</TouchableOpacity>
							) : null }
							{ this.props.onReply ? (
								<TouchableOpacity
									style={ styles.actionsButton }
									onPress={ () => this.setState( { isReplying: true } ) }
								>
									<View style={ styles.actionsButton }>
										<Icon name="reply" size={ 14 } color="#888888" />
										<Text style={ styles.actionsButtonText }>Reply</Text>
									</View>
								</TouchableOpacity>
							) : null }
							{ this.props.onTrash ? (
								<ConfirmButton
									style={ styles.actionsButton }
									onPress={ this.props.onTrash }
									text="Trash"
									textStyle={ styles.actionsButtonText }
									confirmText="Confirm"
									confirmTextStyle={ styles.actionsButtonText }
									icon="trash"
									confirmIcon="check"
								/>
							) : null }
						</View>
					) }
				</View>
			</View>
		);
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
		`;
	}
}
