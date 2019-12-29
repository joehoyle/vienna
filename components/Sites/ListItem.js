import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

const styles = StyleSheet.create( {
	container: {
		marginBottom: 10,
	},
	inner: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 70,
		padding: 16,
	},
	text: {
		marginLeft: 5,
	},
	title: {
		fontSize: 14,
	},
	url: {
		color: '#999999',
		fontSize: 11.5,
		lineHeight: 14,
	},
	icon: {
		width: 64,
		height: 64,
		marginRight: 5,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,.1)',
	},
	iconSpacer: {
		width: 64,
		marginRight: 5,
		height: 64,
	},
	chevron: {
		marginLeft: 'auto',
	},
	line: {
		borderTopWidth: 1,
		borderTopColor: '#EEEEEE',
		height: 1,
		marginTop: 10,
		marginLeft: 88,
		marginRight: 20,
	},
} );

export default class ListItem extends Component {
	static propTypes = {
		site: PropTypes.object.isRequired,
	};

	render() {
		return (
			<View style={ styles.container }>
				<View style={ styles.inner }>
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
						size={ 18 }
						color="#BBBBBB"
					/>
				</View>
				<View style={ styles.line } />
			</View>
		);
	}
}
