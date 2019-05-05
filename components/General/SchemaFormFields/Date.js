import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	DatePickerIOS,
} from 'react-native';

import ExpandingView from '../ExpandingView';
import FormRow from '../FormRow';

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	label: {
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
});

export default class DateField extends Component {
	static propTypes = {
		value: PropTypes.any,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};

	state = {
		showingPicker: false,
	};

	onShowPicker = () => {
		this.setState({ showingPicker: true });
	}

	onHidePicker = () => {
		this.setState({ showingPicker: false });
	}

	onTogglePicker = () => {
		if ( this.state.showingPicker ) {
			this.onHidePicker();
		} else {
			this.onShowPicker();
		}
	}

	render() {
		return (
			<View>
				<FormRow label={ this.props.name }>
					<TouchableOpacity onPress={ this.onTogglePicker }>
						<Text style={styles.label}>
							{this.props.value ? this.props.value : 'Select Date'}
						</Text>
					</TouchableOpacity>
				</FormRow>
				<ExpandingView
					expanded={ this.state.showingPicker }
					height={ 216 }
				>
					<DatePickerIOS
						date={new Date(this.props.value)}
						onDateChange={date => this.props.onChange(date.toISOString())}
						style={styles.picker}
					/>
				</ExpandingView>
			</View>
		);
	}
}
