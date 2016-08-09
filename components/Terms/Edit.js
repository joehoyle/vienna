import React, {Component} from 'react'
import {ScrollView, TextInput, View, StyleSheet, Text} from 'react-native'
import PropTypes from '../../PropTypes'

export default class Edit extends Component {
	static propTypes = {
		term: PropTypes.Term.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			term: this.props.term
		}
	}

	render() {

		return (
			<ScrollView>
				<View style={styles.contentWrap}>
					<TextInput
						style={styles.title}
						onChange={(event) => {
							this.state.term.name = event.nativeEvent.text
							this.setState({term: this.state.term})
		        }}
						value={this.state.term.name}
						placeholder="Name"
						placeholderTextColor="#AEC2D0"
					/>
					<View style={styles.divider}></View>
					<Text style={styles.content}>{this.state.term.description}</Text>
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
