import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, SegmentedControlIOS } from 'react-native';
import ViennaPropTypes from '../PropTypes';
import { FontAwesome as Icon } from '@expo/vector-icons';

function ucFirst( s ) {
	return s.charAt( 0 ).toUpperCase() + s.slice( 1 );
}
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
		backgroundColor: '#f3f3f3',
		borderRadius: 6,
		paddingLeft: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchInput: {
		flex: 1,
		marginLeft: 5,
	},
} );

export default class ListItem extends Component {
	static propTypes = {
		filter: PropTypes.shape( {
			status: PropTypes.string,
		} ),
		type: PropTypes.object.isRequired,
	};

	getStatuses() {
		const args = this.props.type.args;
		let statuses = null;
		if ( args.status && args.status.items ) {
			statuses = args.status.items.enum.slice( 0, 6 );
		} else if ( args.status && args.status.enum ) {
			statuses = args.status.enum.slice( 0, 6 );
		}
		return statuses;
	}

	onChange( event ) {
		this.props.onChange( {
			...this.props.filter,
			status: this.getStatuses()[ event.nativeEvent.selectedSegmentIndex - 1 ],
		} );
	}

	render() {
		const args = this.props.type.args;
		const statuses = this.getStatuses()

		return (
			<View style={ styles.container }>
				{ statuses && (
					<SegmentedControlIOS
						values={ [ 'All', ...statuses.map( ucFirst ) ] }
						selectedIndex={ 0 }
						tintColor="white"
						onChange={ this.onChange.bind( this ) }
					/>
				) }
				{ args.search &&
					<View style={ styles.search }>
						<Icon name="search" color="#ccc" size={ 14 } />
						<TextInput
							returnKeyType="search"
							style={ styles.searchInput }
							defaultValue={ this.props.filter.search }
							placeholder="Search..."
							onSubmitEditing={ e => this.props.onChange( { search: e.nativeEvent.text } ) }
						/>
					</View>
				}
			</View>
		);
	}
}
