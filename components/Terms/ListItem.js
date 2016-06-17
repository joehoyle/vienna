import React, { Component, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'
import ConfirmButton from '../ConfirmButton'

export default class ListItem extends Component {
	static propTypes = {
		term: PropTypes.Term.isRequired,
		onEdit: React.PropTypes.func,
		onTrash: React.PropTypes.func,
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.props.onEdit}>
					<Text style={styles.title}>{this.props.term.name}</Text>
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
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		borderBottomWidth: 1,
		borderColor: '#C4D0D9',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 20,
		fontFamily: 'Georgia',
		margin: 15,
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
		paddingLeft: 10,
		paddingRight: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	actionsButtonText: {
		textAlign: 'center',
		padding: 5,
		color: '#2E74B1',
	}
})
