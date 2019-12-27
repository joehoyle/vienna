import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#f1f1f1',
		height: 40,
		padding: 3,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee',
	},
	icon: {
		alignSelf: 'center',
		marginBottom: 10,
	},
	inputIcon: {
		marginLeft: 4,
		marginRight: 6,
		width: 20,
		textAlign: 'center',
	},
	inputText: {
		flex: 1,
		fontSize: 16,
		lineHeight: 20,
	},
} );

export default class TextInputWithIcon extends Component {
	static defaultProps = {
		autoFocus: false,
		keyboardType: 'default',
	};

	static propTypes = {
		autoFocus: PropTypes.bool,
		keyboardType: PropTypes.string,
		icon: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		onChangeText: PropTypes.func.isRequired,
		onSubmitEditing: PropTypes.func,
		returnKeyType: PropTypes.string,
	};

	render() {
		return (
			<View style={ styles.container }>
				<Icon
					style={ styles.inputIcon }
					name={ this.props.icon }
					size={ 20 }
					color="#666666"
				/>
				<TextInput
					autoCapitalize="none"
					autoCorrect={ false }
					autoFocus={ this.props.autoFocus }
					keyboardType={ this.props.keyboardType }
					style={ styles.inputText }
					placeholder={ this.props.placeholder }
					value={ this.props.value }
					onChangeText={ this.props.onChangeText }
					onSubmitEditing={ this.props.onSubmitEditing }
					returnKeyType={ this.props.returnKeyType }
				/>
			</View>
		);
	}
}
