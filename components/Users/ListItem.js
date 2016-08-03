import React, {Component} from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import PropTypes from '../../PropTypes'

export default class ListItem extends Component {
	static propTypes = {
		user: PropTypes.User,
		onEdit: React.PropTypes.func
	}

	render() {
		return (
			<TouchableOpacity style={styles.container} onPress={this.props.onEdit}>
				<Image style={styles.image} source={{uri:this.props.user.avatar_urls['96']}} />
				<View style={styles.right}>
					<Text style={styles.name}>{this.props.user.name}</Text>
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
	image: {
		marginRight: 10,
		width: 48,
		height: 48,
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
