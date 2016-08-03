import React, {Component} from 'react'
import {ScrollView, TextInput, View, StyleSheet, Text} from 'react-native'
import PropTypes from '../../PropTypes'

export default class Edit extends Component {
	static propTypes = {
		term: PropTypes.Term.isRequired,
	}
	render() {
		var term = this.props.term

		return (
			<ScrollView>
				<View style={styles.contentWrap}>
					<TextInput
						style={styles.title}
						onChangeText={()=>{}}
						value={term.name}
						placeholder="Name"
						placeholderTextColor="#AEC2D0"
					/>
					<View style={styles.divider}></View>
					<Text style={styles.content}>{term.description}</Text>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentWrap: {
		backgroundColor: 'white',
		paddingBottom: 10,
	},
	title: {
		fontSize: 28,
		fontFamily: 'Georgia',
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		height: 28,
	},
	content: {
		fontSize: 15,
		lineHeight: 20,
		color: '#666',
		fontFamily: 'Georgia',
		marginLeft: 20,
		marginRight: 20,
	},
	divider: {
		borderBottomColor: '#F0F4F7',
		borderBottomWidth: 1,
		margin: 20,
	},
})
