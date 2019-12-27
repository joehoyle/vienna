import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create( {
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 44,
		padding: 10,
	},
	text: {
		marginLeft: 5,
	},
	title: {
		fontSize: 16,
	},
	url: {
		color: '#999999',
		fontSize: 12,
		lineHeight: 12,
	},
	icon: {
		width: 32,
		height: 32,
		marginRight: 5,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,.1)',
	},
	iconSpacer: {
		width: 37,
		height: 32,
	},
	chevron: {
		marginLeft: 'auto',
	},
} );

export default class ListItem extends Component {
	static propTypes = {
		site: PropTypes.object.isRequired,
	};

	render() {
		return (
			<View style={ styles.container }>
				{ this.props.site.icon ? (
					<Image
						source={ { uri: this.props.site.icon.src } }
						style={ styles.icon }
					/>
				) : (
					<View style={ styles.iconSpacer } />
				) }
				<View style={ styles.text }>
					<Text style={ styles.title }>{ this.props.site.name }</Text>
					<Text style={ styles.url }>{ this.props.site.url }</Text>
				</View>
				<Icon
					name="chevron-right"
					style={ styles.chevron }
					size={ 22 }
					color="#BBBBBB"
				/>
			</View>
		);
	}
}
