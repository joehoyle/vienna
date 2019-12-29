import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, SegmentedControlIOS } from 'react-native';

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
	search: {
		marginTop: 10,
		height: 32,
		padding: 0,
		marginBottom: 0,
	},
	searchInput: {
		flex: 1,
		backgroundColor: '#f3f3f3',
		borderRadius: 6,
		paddingLeft: 10,
	},
} );

export default class ListItem extends Component {
	static propTypes = {
		filter: PropTypes.shape( {
			status: PropTypes.string,
		} ),
	};

	onChange( event ) {
		let statuses = [ '', 'draft', 'pending', 'publish', 'scheduled' ];
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
				<View style={ styles.search }>
					<TextInput returnKeyType='search' style={ styles.searchInput } placeholder="Search..." onSubmitEditing={ e => this.props.onChange( { search: e.nativeEvent.text } ) } />
				</View>
			</View>
		);
	}
}
