import React, { Component, PropTypes } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class NavBar extends Component {
	static propTypes = {
		backText: PropTypes.string,
		title: PropTypes.string.isRequired,
		rightIcon: PropTypes.string,
		onBack: PropTypes.func,
		onRightPress: PropTypes.func,
	}

	render() {
		return <View style={styles.container}>
			<View style={styles.back}>
				{this.props.backText ?
					<TouchableOpacity onPress={this.props.onBack}>
						<View style={styles.backButton}>
							<Icon size={22} name="chevron-left" color="#333333" />
							<Text numberOfLines={1} style={[styles.backButtonText]}>{this.props.backText}</Text>
						</View>
					</TouchableOpacity>
				: null }
			</View>
			<Text style={styles.title}>{this.props.title}</Text>
			<View style={styles.right}>
				{this.props.rightIcon ?
					<TouchableOpacity onPress={this.props.onRightPress}>
						<Icon name={this.props.rightIcon} style={{marginRight:10}} size={20} color="#333333" />
					</TouchableOpacity>
				: null }
			</View>
		</View>
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		paddingTop: 30,
		justifyContent: 'space-between',
	},
	title: {
		fontSize: 15,
		color: '#333333',
	},
	right: {
		width: 80,
		justifyContent: 'flex-end',
		flexDirection: 'row',
	},
	back: {
		width: 80,
	},
	rightButtonText: {
		fontSize: 30,
		lineHeight: 26,
		marginRight: 10,
	},
	backButton: {
		flexDirection: 'row',
		paddingLeft: 10,
	},
	backButtonText: {
		color: '#333333',
		lineHeight: 18,
		marginLeft: 5,
		width: 80,
	}
})
