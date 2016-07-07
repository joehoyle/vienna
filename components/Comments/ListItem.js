import React, { Component, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import PropTypes from '../../PropTypes'

export default class ListItem extends Component {
	static propTypes = {
		comment: PropTypes.Comment,
		onEdit: React.PropTypes.func,
	}

	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.onEdit}>
				<View style={styles.right}>
					<Text style={styles.name}>{this.props.comment.author_name}</Text>
					<Text>{this.props.comment.content.rendered}</Text>
				</View>
			</TouchableOpacity>
		)
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
		padding: 10,
		flexDirection: 'row',
	},
	name: {
		fontSize: 20,
		fontFamily: 'Georgia',
	},
	right: {

	},
	featuredMedia: {
		height: 180,
		flex: 1,
		marginBottom: 5,
	}
})
