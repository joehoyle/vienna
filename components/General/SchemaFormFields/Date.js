import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	DatePickerIOS,
} from 'react-native';
// import CustomActionSheet from 'react-native-custom-action-sheet';
const CustomActionSheet = props => null;

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		height: 32,
		fontSize: 16,
		lineHeight: 30,
		textAlign: 'right',
		color: '#666666',
	},
	modal: {
		paddingTop: 15,
		height: 100,
	},
	picker: {
		backgroundColor: 'white',
	},
} );

export default class DateField extends Component {
	static propTypes = {
		value: PropTypes.any,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};
	constructor() {
		super();
		this.state = {
			showingPicker: false,
		};
	}
	onPressValue() {
		this.setState( { showingPicker: true } );
	}
	render() {
		return (
			<View>
				<TouchableOpacity onPress={ () => this.onPressValue() }>
					<Text style={ styles.container }>
						{ this.props.value ? this.props.value : 'Select Date' }
					</Text>
				</TouchableOpacity>
				{ this.state.showingPicker ? (
					<CustomActionSheet
						modalVisible={ true }
						onCancel={ () => {
							this.setState( { showingPicker: false } );
							this.props.onSave();
						} }
						backgroundColor="transparent"
						buttonText="Done"
					>
						<DatePickerIOS
							date={ new Date( this.props.value ) }
							onDateChange={ date => this.props.onChange( date.toISOString() ) }
							style={ styles.picker }
						/>
					</CustomActionSheet>
				) : null }
			</View>
		);
	}
}
