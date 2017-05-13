import React, {Component} from 'react'
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native'
import PropTypes from '../../PropTypes'
import MultilineTextFormField from '../General/FormFields/MultilineText'

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
				<MultilineTextFormField
					autoFocus={true}
					value={this.state.replyText}
					onChange={replyText => this.setState({replyText})}
					onSave={() => this.props.onReply(this.state.replyText)}
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
	text: {
		height: 80,
		flex: 1,
		fontSize: 14,
		marginTop: 10,
		backgroundColor: '#FFFFFF',
	},
	actions: {
		flexDirection: 'row',
	},
	actionsButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionsButtonText: {
		textAlign: 'center',
		color: '#2E74B1',
		marginRight: 10,
	},
})
