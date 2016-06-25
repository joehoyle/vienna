import React, { Component, StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'
import ConfirmButton from '../ConfirmButton'

export default class ListItem extends Component {
	static propTypes = {
		site: React.PropTypes.object.isRequired,
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>{this.props.site.name}</Text>
				<Icon name="chevron-right" style={styles.chevron} size={22} color="#999999" />
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
		alignItems: 'center',
		height: 44,
		padding: 5,
	},
	title: {
		fontSize: 16,
		fontFamily: 'Georgia',
		marginLeft: 5,
	},
	chevron: {

	},
})
