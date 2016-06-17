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
	},
	title: {
		fontSize: 20,
		fontFamily: 'Georgia',
		margin: 15,
	},
	chevron: {
		lineHeight: 35,
		marginRight: 5,
	},
})
