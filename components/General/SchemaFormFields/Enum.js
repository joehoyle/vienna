import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Picker } from 'react-native';
// import CustomActionSheet from 'react-native-custom-action-sheet';
const CustomActionSheet = props => null;

export default class Enum extends Component {
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
		this.setState({ showingPicker: true });
	}
	render() {
		return (
			<View>
				<TouchableOpacity onPress={() => this.onPressValue()}>
					<Text style={styles.container}>{this.props.value}</Text>
				</TouchableOpacity>
				{this.state.showingPicker
					? <CustomActionSheet
							modalVisible={true}
							onCancel={() => {
								this.setState({ showingPicker: false });
								this.props.onSave();
							}}
							backgroundColor="transparent"
							buttonText="Done"
						>
							<Picker
								selectedValue={this.props.value}
								onValueChange={this.props.onChange}
								style={styles.picker}
							>
								{this.props.schema.enum.map(value => {
									return (
										<Picker.Item
											key={value}
											label={String(value)}
											value={value}
										/>
									);
								})}
							</Picker>
						</CustomActionSheet>
					: null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
		// position: 'absolute',
		backgroundColor: 'white',
		// bottom: 0,
		// left: 0,
		// right: 0,
		// top: 0,
	},
});
