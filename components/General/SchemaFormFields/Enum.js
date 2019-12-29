import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';

import ExpandingView from '../ExpandingView';
import FormRow from '../FormRow';

const styles = StyleSheet.create( {
	container: {
		flex: 1,
	},
	label: {
		height: 32,
		lineHeight: 30,
		color: '#8D8E92',
		fontSize: 16.5,
	},
	modal: {
		paddingTop: 15,
		height: 100,
	},
	picker: {
		// position: 'absolute',
		backgroundColor: 'white',
		// bottom: 0,
		// left: 0,
		// right: 0,
		// top: 0,
	},
} );

export default class Enum extends Component {
	static propTypes = {
		value: PropTypes.any,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onBlur: PropTypes.func.isRequired,
		onChange: PropTypes.func.isRequired,
		onFocus: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};

	onToggle = () => {
		if ( this.props.focussed ) {
			//this.props.onBlur();
		} else {
			//this.props.onFocus();
		}
	}

	render() {
		return (
			<View>
				<FormRow label={ this.props.name }>
					<TouchableOpacity onPress={ this.onToggle }>
						<Text style={ styles.label }>{ this.props.value || 'Select…' }</Text>
					</TouchableOpacity>
				</FormRow>
				<ExpandingView
					expanded={ this.props.focussed }
					height={ 216 }
				>
					<Picker
						selectedValue={ this.props.value }
						onValueChange={ this.props.onChange }
						style={ styles.picker }
					>
						{ this.props.schema.enum.map( value => {
							return (
								<Picker.Item
									key={ value }
									label={ String( value ) }
									value={ value }
								/>
							);
						} ) }
					</Picker>
				</ExpandingView>
			</View>
		);
	}
}
