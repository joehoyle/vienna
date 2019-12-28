import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import PropTypes from '../../PropTypes';
import ImageView from 'react-native-image-view';
import { Feather as Icon } from '@expo/vector-icons';
import shareAttachment from '../../actions/shareAttachment';

const styles = StyleSheet.create( {
	container: {
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
	},
	shareButton: {
		marginBottom: 40,
		marginRight: 20,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
		width: 30,
		height: 30,
	},
} );

export default class Edit extends Component {
	static propTypes = {
		post: PropTypes.Media,
	};

	constructor( props ) {
		super( props );
		this.state = {
			showingPreview: false,
			shareLoading: false,
		};
	}
	onShare( attachment ) {
		this.setState( { shareLoading: true } );
		shareAttachment( attachment ).then( () => {
			this.setState( { shareLoading: false } );
		} );
	}
	render() {
		let attachment = this.props.post;
		let preview = '';
		if (
			attachment.media_details &&
			attachment.media_details.sizes &&
			attachment.media_details.sizes.full
		) {
			const width = Math.min(
				Dimensions.get( 'window' ).width,
				attachment.media_details.sizes.full.width,
			);
			const height =
				( width / attachment.media_details.sizes.full.width ) *
				attachment.media_details.sizes.full.height;
			preview = (
				<>
					<ImageView
						images={ [
							{
								source: {
									uri:
										attachment.media_details.sizes.full
											.source_url,
									width:
										attachment.media_details.sizes.full
											.width,
									height:
										attachment.media_details.sizes.full
											.height,
								},
							},
						] }
						isVisible={ this.state.showingPreview }
						onClose={ () => {
							this.setState( { showingPreview: false } );
						} }
						renderFooter={ () => (
							<TouchableOpacity
								onPress={ () => this.onShare( attachment ) }
								style={ styles.shareButton }
							>
								{ ! this.state.shareLoading ? (
									<Icon
										name="share"
										size={ 30 }
										color="#ffffff"
									/>
								) : (
									<ActivityIndicator
										size="small"
										color="#ffffff"
									/>
								) }
							</TouchableOpacity>
						) }
					/>
					<TouchableOpacity
						onPress={ () => this.setState( { showingPreview: true } ) }
					>
						<Image
							source={ {
								uri:
									attachment.media_details.sizes.full
										.source_url,
							} }
							style={ {
								width,
								height,
							} }
						/>
					</TouchableOpacity>
				</>
			);
		}
		return <View style={ styles.container }>{ preview }</View>;
	}
}
