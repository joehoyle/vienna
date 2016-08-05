import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import PropTypes from '../../PropTypes'

export default class ReplyToItem extends Component {
	static propTypes = {
		comment: PropTypes.Comment,
		onReply: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor() {
		super()
		this.state = {
			replyText: '',
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Reply to {this.props.comment.author_name}</Text>
				<TextInput
					style={styles.text}
					multiline={true}
					placeholder="Enter reply..."
					returnKeyType="done"
					autoFocus={true}
					onChangeText={replyText => this.setState({replyText})}
				/>
				<View style={styles.actions}>
					<TouchableOpacity onPress={this.props.onCancel}>
						<Text style={styles.actionsButtonText}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => this.props.onReply(this.state.replyText)}>
						<Text style={styles.actionsButtonText}>Reply</Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
	},
	title: {
		color: '#32619A',
	},
	text: {
		height: 80,
		padding: 10,
		flex: 1,
		fontSize: 14,
		marginTop: 10,
		backgroundColor: '#FFFFFF',
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
})
