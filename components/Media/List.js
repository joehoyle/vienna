import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	View,
	Image,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import ViennaPropTypes from '../../PropTypes';
import { FontAwesome as Icon } from '@expo/vector-icons';

const imageSize = ( ( Dimensions.get( 'screen' ).width - 6 ) / 3 );

const styles = StyleSheet.create( {
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		flex: 1,
		alignItems: 'flex-start',
		flexWrap: 'wrap',
	},
	imageHighlight: {
		width: imageSize,
		height: imageSize,
		marginBottom: 3,
		backgroundColor: '#f8f8f8',
	},
	image: {
		width: imageSize,
		height: imageSize,
	},
} );

export default class List extends Component {
	static propTypes = {
		posts: PropTypes.arrayOf( ViennaPropTypes.Media ).isRequired,
		onEdit: PropTypes.func.isRequired,
	};

	render() {
		return (
			<ScrollView refreshControl={ this.props.refreshControl }>
				<View style={ styles.container }>
					{ this.props.posts.map( attachment => {
						return (
							<TouchableOpacity
								key={ attachment.id }
								onPress={ this.props.onEdit.bind( null, attachment ) }
								style={ styles.imageHighlight }
							>
								{ attachment.media_type === 'image' &&
								attachment.media_details.sizes &&
								attachment.media_details.sizes.thumbnail ? (
										<Image
											style={ styles.image }
											source={ {
												uri: attachment.media_details.sizes.thumbnail
													? attachment.media_details.sizes.thumbnail.source_url
													: attachment.source_url,
											} }
										/>
									) : (
										<Icon
											name="file"
											style={ { margin: imageSize - 60 } }
											size={ 60 }
											color="#9999"
										/>
									) }
							</TouchableOpacity>
						);
					} ) }
				</View>
			</ScrollView>
		);
	}
}
