import React, { Component } from 'react';
import { ActionSheetIOS, Alert, Dimensions, TouchableOpacity, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import ImageView from 'react-native-image-view';
import shareAttachment from '../../actions/shareAttachment';
import Form from '../Posts/Form';
import { createPost, updatePost } from '../../actions';
import Icon from '../Icon';
import icons from '../icons';
import ModalHeader from '../General/ModalHeader';
import NavigationButton from '../Navigation/Button';

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

class EditScreen extends Component {
	state = {
		post: {},
		currentStatus: 'draft',
		isChanged: false,
		isSaving: false,
		showingPreview: false,
	};

	constructor( props ) {
		super( props );
		this.state.post = props.route.params.post;
	}

	onChangePropertyValue = ( property, value ) => {
		if ( this.state.post[property] === value ) {
			return;
		}

		const post = {
			...this.state.post,
			[property]: value,
		};
		this.setState( {
			post,
			isChanged: true,
		} );
	};

	onPressSave = () => {
		if ( ! this.state.post.title ) {
			Alert.alert( 'Unable to Publish', 'Cannot save post without title.' );
			return;
		}

		// If the post is published, update and move on.
		if ( this.state.currentStatus === 'publish' ) {
			this.onSave();
			return;
		}

		const args = {
			options: [ 'Save as Draft', 'Save and Publish', 'Cancel' ],
			cancelButtonIndex: 2,
		};
		ActionSheetIOS.showActionSheetWithOptions( args, idx => {
			switch ( idx ) {
				case 0:
					this.onSave();
					break;

				case 1:
					this.onChangePropertyValue( 'status', 'publish' );
					this.onSave();
					break;

				default:
					// Cancel, no action.
					return;
			}
		} );
	};

	onSave = () => {
		this.setState( {
			isSaving: true,
		} );

		let action;
		if ( this.state.isNew ) {
			action = createPost( this.state.post, this.props.route.params.type.slug );
		} else {
			action = updatePost( this.state.post );
		}

		this.props.dispatch( action ).then( () => {
			this.setState( {
				currentStatus: this.state.post.status || this.state.currentStatus,
				isChanged: false,
				isSaving: false,
			} );
		} );
	};

	onShare( attachment ) {
		this.setState( { shareLoading: true } );
		shareAttachment( attachment ).then( () => {
			this.setState( { shareLoading: false } );
		} );
	}

	onClose = () => {
		if ( ! this.state.isChanged ) {
			// No changes, so we can close.
			this.props.navigation.pop();
			return;
		}

		const args = {
			title: 'You have unsaved changes.',
			options: [ 'Save', 'Discard', 'Back to Editor' ],
			destructiveButtonIndex: 1,
			cancelButtonIndex: 2,
		};
		ActionSheetIOS.showActionSheetWithOptions( args, idx => {
			switch ( idx ) {
				case 0:
					this.onSave();
					break;

				case 1:
					this.props.navigation.pop();
					break;

				default:
					// Cancel, no action.
					break;
			}
		} );
	};

	render() {
		const { route, site } = this.props;

		const slug = route.params.type._links['wp:items'][0].href.split( '/' ).slice( -1 )[0];
		const schema = site.routes['/wp/v2/' + slug].schema;

		let attachment = this.state.post;
		let width = null;
		let height = null;

		if ( attachment.media_details && attachment.media_details.sizes && attachment.media_details.sizes.full ) {
			width = Math.min( Dimensions.get( 'window' ).width, attachment.media_details.sizes.full.width );
			height = ( width / attachment.media_details.sizes.full.width ) * attachment.media_details.sizes.full.height;
		}

		return (
			<>
				<ModalHeader
					title="Edit Media"
					headerRight={ () => <NavigationButton onPress={ this.onSave }>{ this.state.updating ? 'Saving...' : 'Save' }</NavigationButton> }
				/>
				<ScrollView>
					{ attachment.media_details && attachment.media_details.sizes && attachment.media_details.sizes.full && (
						<>
							<ImageView
								images={ [
									{
										source: {
											uri: attachment.media_details.sizes.full.source_url,
											width: attachment.media_details.sizes.full.width,
											height: attachment.media_details.sizes.full.height,
										},
									},
								] }
								isVisible={ this.state.showingPreview }
								onClose={ () => {
									this.setState( { showingPreview: false } );
								} }
								renderFooter={ () => (
									<TouchableOpacity onPress={ () => this.onShare( attachment ) } style={ styles.shareButton }>
										{ ! this.state.shareLoading ? (
											<Icon icon={ icons['square.and.up.arrow'] } style={ {
												color: '#ffffff',
												fontSize: 24,
											} } />
										) : (
											<ActivityIndicator size="small" color="#ffffff" />
										) }
									</TouchableOpacity>
								) }
							/>
							<TouchableOpacity onPress={ () => this.setState( { showingPreview: true } ) }>
								<Image
									source={ {
										uri: attachment.media_details.sizes.full.source_url,
									} }
									style={ {
										width,
										height,
										marginTop: 16,
									} }
								/>
							</TouchableOpacity>
						</>
					) }
					<Form { ...this.props } post={ attachment } schema={ schema } onChangePropertyValue={ this.onChangePropertyValue } />
				</ScrollView>
			</>
		);
	}
}

const mapStateToProps = state => {
	const activeSite = state.activeSite.id && state.sites[state.activeSite.id];

	return {
		site: activeSite,
	};
};

export default connect( mapStateToProps )( EditScreen );
