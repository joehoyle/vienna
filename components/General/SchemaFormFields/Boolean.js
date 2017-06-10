import React, { Component, PropTypes } from 'react';
import { Switch } from 'react-native';

export default class Boolean extends Component {
	static propTypes = {
		value: PropTypes.bool,
		onChange: PropTypes.func.isRequired,
		schema: PropTypes.object.isRequired,
		name: PropTypes.string.isRequired,
	};
	render() {
		return (
			<Switch
				value={this.props.value}
				onValueChange={value => {
					this.props.onChange(value);
					this.props.onSave();
				}}
			/>
		);
	}
}
