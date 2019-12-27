import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import ViennaPropTypes from '../../PropTypes';
import { FontAwesome as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create( {
	list: {
		backgroundColor: 'white',
		borderColor: '#CBD8E2',
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	listItem: {
		borderBottomColor: '#C5D3DE',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		paddingLeft: 15,
	},
	listItemName: {
		fontSize: 16,
	},
} );

export default class SelectableList extends Component {
	static propTypes = {
		terms: PropTypes.arrayOf( ViennaPropTypes.Term ).isRequired,
		selectedTerms: PropTypes.arrayOf( PropTypes.number ).isRequired,
		onChange: PropTypes.func.isRequired,
	};

	onChange( term ) {
		let terms = this.props.selectedTerms.slice();
		if ( terms.indexOf( term.id ) > -1 ) {
			terms.splice( terms.indexOf( term.id ), 1 );
		} else {
			terms.push( term.id );
		}
		this.props.onChange( terms );
	}

	render() {
		return (
			<View style={ styles.list }>
				{ this.props.terms.map( category => {
					return (
						<TouchableOpacity
							key={ category.id }
							style={ styles.listItem }
							onPress={ this.onChange.bind( this, category ) }
						>
							<Text style={ styles.listItemName }>{ category.name }</Text>
							{ this.props.selectedTerms.indexOf( category.id ) > -1 ? (
								<Icon name="check" size={ 20 } color="#A3A3A8" />
							) : null }
						</TouchableOpacity>
					);
				} ) }
			</View>
		);
	}
}
