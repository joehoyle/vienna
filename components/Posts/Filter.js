import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	SegmentedControlIOS,
} from 'react-native';

const styles = StyleSheet.create( {
	container: {
		padding: 10,
		paddingTop: 0,
	},
	label: {
		fontSize: 11,
		color: 'white',
		marginBottom: 5,
	},
} );

export default class ListItem extends Component {
	static propTypes = {
		filter: PropTypes.shape( {
			status: PropTypes.string,
		} ),
	};

	onChange( event ) {
		let statuses = [ 'all', 'draft', 'pending', 'publish', 'scheduled' ];
		this.props.onChange( {
			...this.props.filter,
			status: statuses[event.nativeEvent.selectedSegmentIndex],
		} );
	}

	render() {
		return (
			<View style={ styles.container }>
				<SegmentedControlIOS
					values={ [ 'All', 'Draft', 'Pending', 'Published', 'Scheduled' ] }
					selectedIndex={ 0 }
					tintColor="white"
					onChange={ this.onChange.bind( this ) }
				/>
			</View>
		);
	}
}
