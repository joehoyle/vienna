import { Localization } from 'expo';
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

const dateFormat = {
	day: 'numeric',
	year: 'numeric',
	month: 'long',
	hour: 'numeric',
	minute: 'numeric',
};

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
		date: null,
		showingPicker: false,
	};

	constructor( props ) {
		super( props );

		this.formatter = new Intl.DateTimeFormat( Localization.locales, dateFormat );
	}

	componentDidMount() {
		this.setState( {
			date: new Date( this.props.value ),
		} );
	}

	componentDidUpdate( prevProps ) {
		if ( this.props.value !== prevProps.value ) {
			this.setState( {
				date: new Date( this.props.value ),
			} );
		}
	}

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
		const { date } = this.state;

		return (
			<View>
				<FormRow label={ this.props.name }>
					<TouchableOpacity onPress={ this.onTogglePicker }>
						<Text style={styles.label}>
							{ ! isNaN( date ) ? this.formatter.format( date ) : 'Select Date' }
						</Text>
					</TouchableOpacity>
				</FormRow>
				<ExpandingView
					expanded={ this.state.showingPicker }
					height={ 216 }
				>
					<DatePickerIOS
						date={ date }
						style={ styles.picker }
						onDateChange={ value => this.props.onChange( value.toISOString() ) }
					/>
				</ExpandingView>
			</View>
		);
	}
}
