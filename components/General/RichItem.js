import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import decodeEntities from 'simple-entity-decode';

const styles = StyleSheet.create( {
	container: {
		marginBottom: 0,
		marginTop: 5,
		flexDirection: 'row',
	},
	authorName: {
		lineHeight: 16,
	},
	contentRight: {
		flex: 1,
		backgroundColor: 'white',
	},
	content: {
		color: '#666',
		fontSize: 13,
	},
	authorImage: {
		marginRight: 15,
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#EEEEEE',
	},
} );

export default class RichItem extends Component {
	static propTypes = {
		avatarUrl: PropTypes.string,
		title: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
	};

	state = {
		webViewHeight: 0,
	};

	onMessage = event => {
		this.setState( {
			webViewHeight: parseInt( event.nativeEvent.data, 10 ),
		} );
	};

	render() {
		const content = decodeEntities( this.props.content.replace( /(<([^>]+)>)/ig, '' ) );
		return (
			<View style={ styles.container }>
				{ this.props.avatarUrl ? (
					<Image
						style={ styles.authorImage }
						source={ { uri: this.props.avatarUrl } }
					/>
				) : (
					<View style={ styles.authorImage } />
				) }
				<View style={ styles.contentRight }>
					<View style={ styles.authorText }>
						<Text style={ styles.authorName }>{ this.props.title }</Text>
					</View>
					<Text style={ styles.content }>{ content }</Text>
				</View>
			</View>
		);
	}
}
