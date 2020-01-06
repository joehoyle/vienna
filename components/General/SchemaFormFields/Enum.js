import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker, ActionSheetIOS } from 'react-native';
import SegmentedControlIOS from '@react-native-community/segmented-control';

import FormRow from '../FormRow';

function ucFirst( s ) {
	return s.charAt( 0 ).toUpperCase() + s.slice( 1 );
}

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
	text: {
		color: '#8D8E92',
		fontSize: 16.5,
	},
} );

export default class Enum extends Component {
	static propTypes = {
		value: PropTypes.any,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};

	onSelectLongList = () => {
		const options = this.props.schema.enum.map( String ).map( ucFirst );
		options.push( 'Cancel' );

		ActionSheetIOS.showActionSheetWithOptions(
			{
				options,
				cancelButtonIndex: options.length - 1,
			},
			buttonIndex => {
				if ( buttonIndex === options.length - 1 ) {
					return;
				}
				this.props.onChange( this.props.schema.enum[buttonIndex] );
			}
		);
	};

	render() {
		return (
			<View style={ styles.container }>
				<FormRow label={ this.props.name }>
					{ this.props.schema.enum.length < 4 ? (
						<SegmentedControlIOS
							values={ this.props.schema.enum.map( String ).map( ucFirst ) }
							selectedIndex={ this.props.schema.enum.indexOf( this.props.value ) }
							style={ {
								width: this.props.schema.enum.length * 60,
								marginLeft: 'auto',
							} }
							onChange={ event => {
								this.setState( { selectedIndex: event.nativeEvent.selectedSegmentIndex } );
							} }
						/>
					) : (
						<TouchableOpacity onPress={ this.onSelectLongList } style={ { marginLeft: 'auto' } }>
							<Text style={ styles.text }>{ ucFirst( String( this.props.value ) || 'Select...' ) }</Text>
						</TouchableOpacity>
					) }
				</FormRow>
			</View>
		);
	}
}
