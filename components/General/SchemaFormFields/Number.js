import React, { Component, PropTypes } from 'react'
import { TextInput, StyleSheet } from 'react-native'

export default class Number extends Component {
	static propTypes = {
		value: PropTypes.number.isRequired,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	}
	render() {
		return <TextInput
			value={String(this.props.value)}
			style={styles.container}
			keyboardType="numeric"
			placeholder={String(this.props.schema.default)}
			onChangeText={value => { this.props.onChange( value ? parseFloat( value ) : 0 ) } }
			onSubmitEditing={this.props.onSave}
		/>
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: 32,
		textAlign: 'right',
		color: '#666666'
	}
})
