import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';

export default class Text extends Component {
	static propTypes = {
		value: PropTypes.string,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
		autoFocus: PropTypes.bool,
	};
	render() {
		return (
			<AutoGrowingTextInput
				autoFocus={this.props.autoFocus}
				placeholder={'Enter Content...'}
				value={this.props.value}
				style={styles.container}
				onChangeText={this.props.onChange}
				onSubmitEditing={this.props.onSave}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		color: '#666666',
		fontSize: 16,
	},
});
