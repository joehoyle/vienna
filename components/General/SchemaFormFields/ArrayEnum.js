import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	ScrollView,
} from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

import FormRow from '../FormRow';

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
	listItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#F7F7F7',
		paddingLeft: 10,
		paddingRight: 10,
		height: 42,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	listItemText: {
		fontSize: 16,
	},
	modalHeader: {
		height: 42,
		marginTop: 22,
		padding: 10,
	},
	modalCloseText: {
		fontSize: 18,
		color: '#1F5FF3',
	},
} );

export default class ArrayEnum extends Component {
	static propTypes = {
		value: PropTypes.array.isRequired,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		onSave: PropTypes.func.isRequired,
	};
	constructor() {
		super();
		this.state = {
			showingModal: false,
		};
	}
	onPressValue() {
		this.setState( { showingModal: true } );
	}
	onToggleValue( value ) {
		let newValue = this.props.value.slice();

		if ( newValue.indexOf( value ) > -1 ) {
			newValue.splice( newValue.indexOf( value ), 1 );
		} else {
			newValue.push( value );
		}

		this.props.onChange( newValue );
	}
	render() {
		return (
			<FormRow label={ this.props.name }>
				<TouchableOpacity onPress={ () => this.onPressValue() }>
					<Text style={ styles.container }>
						{ this.props.value.length
							? this.props.value.join( ', ' )
							: 'Select...' }
					</Text>
				</TouchableOpacity>
				{ this.state.showingModal ? (
					<Modal visible={ true } animationType={ 'slide' }>
						<View style={ styles.modalHeader }>
							<TouchableOpacity
								onPress={ () => this.setState( { showingModal: false } ) }
							>
								<Text style={ styles.modalCloseText }>Done</Text>
							</TouchableOpacity>
						</View>
						<ScrollView>
							{ this.props.schema.items.enum.map( value => {
								return (
									<TouchableOpacity
										key={ value }
										style={ styles.listItem }
										onPress={ () => this.onToggleValue( value ) }
									>
										<Text style={ styles.listItemText }>{ value }</Text>
										{ this.props.value.indexOf( value ) > -1 ? (
											<Icon name="check" size={ 20 } color="#333333" />
										) : null }
									</TouchableOpacity>
								);
							} ) }
						</ScrollView>
					</Modal>
				) : null }
			</FormRow>
		);
	}
}
