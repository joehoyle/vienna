import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	SegmentedControlIOS,
	LayoutAnimation,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		padding: 10,
		paddingTop: 0,
		backgroundColor: '#2E73B0',
	},
	label: {
		fontSize: 11,
		color: 'white',
		marginBottom: 5,
	},
});

export default class ListItem extends Component {
	static propTypes = {
		filter: PropTypes.shape({
			status: PropTypes.string,
		}),
	};

	constructor(props) {
		super(props);
		this.state = { h: 0 };
	}

	componentWillMount() {
		// Animate creation
		LayoutAnimation.configureNext(
			LayoutAnimation.create(100, 'linear', 'opacity')
		);
	}

	componentDidMount() {
		this.setState({ h: 60 });
	}

	componentWillUnmount() {
		this.setState({ h: 0 });
	}

	onChange(event) {
		var statuses = ['all', 'approved', 'hold', 'spam', 'trash'];
		this.props.onChange({
			...this.props.filter,
			status: statuses[event.nativeEvent.selectedSegmentIndex],
		});
	}

	render() {
		return (
			<View style={[styles.container, { height: this.state.h }]}>
				<Text style={styles.label}>STATUS</Text>
				<SegmentedControlIOS
					values={['All', 'Approved', 'Hold', 'Spam', 'Trash']}
					selectedIndex={0}
					tintColor="white"
					onChange={this.onChange.bind(this)}
				/>
			</View>
		);
	}
}
