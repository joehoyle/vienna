import { createStackNavigator, TransitionPresets, HeaderStyleInterpolators } from '@react-navigation/stack';
import React, { Component } from 'react';
import { ActionSheetIOS, Alert } from 'react-native';
import { connect } from 'react-redux';

import EditContent from './EditContent';
import Form from './Form';
import { createPost, updatePost } from '../../actions';

const EditStack = createStackNavigator();

const defaultOptions = {
	cardStyle: {
		backgroundColor: 'white',
		borderTopWidth: 0,
		shadowRadius: 0,
		shadowOffset: {
			height: 0,
		},
		shadowColor: 'transparent',
	},
	headerStyle: {
		shadowOpacity: 0,
	},
	headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
};

class EditScreen extends Component {
	state = {
		post: {},
		currentStatus: 'draft',
		isChanged: false,
		isNew: false,
		isSaving: false,
	}

	constructor( props ) {
		super( props );

		if ( props.route.params.post ) {
			this.state.post = props.route.params.post;
			this.state.currentStatus = props.route.params.post.status;
			this.state.isNew = false;
		} else {
			this.state.isNew = true;
		}
	}

	componentDidMount() {
		this.props.navigation.setOptions( {
			gestureEnabled: false,
			headerShown: false,
		} );
	}

	onChangePropertyValue = ( property, value ) => {
		if ( this.state.post[ property ] === value ) {
			return;
		}

		const post = {
			...this.state.post,
			[ property ]: value,
		};
		this.setState( {
			post,
			isChanged: true,
		} );
	}

	onPressSave = () => {
		if ( ! this.state.post.title ) {
			Alert.alert(
				'Unable to Publish',
				'Cannot save post without title.',
			);
			return;
		}

		// If the post is published, update and move on.
		if ( this.state.currentStatus === 'publish' ) {
			this.onSave();
			return;
		}

		const args = {
			options: [
				'Save as Draft',
				'Save and Publish',
				'Cancel',
			],
			cancelButtonIndex: 2,
		}
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
	}

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
	}

	onClose = () => {
		if ( ! this.state.isChanged ) {
			// No changes, so we can close.
			this.props.navigation.pop();
			return;
		}

		const args = {
			title: 'You have unsaved changes.',
			options: [
				this.state.isNew ? 'Save Draft' : 'Save Changes',
				'Discard',
				'Back to Editor',
			],
			destructiveButtonIndex: 1,
			cancelButtonIndex: 2,
		}
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
	}

	render() {
		const { route, site } = this.props;
		const { post } = this.state;

		const slug = route.params.type._links['wp:items'][0].href.split( '/' ).slice( -1 )[0];
		const schema = site.routes[ '/wp/v2/' + slug ].schema;

		return (
			<EditStack.Navigator
				navigation={ this.props.navigation }
				initialRouteName="content"
				mode="modal"
				screenOptions={ {
					...defaultOptions,
					...TransitionPresets.ModalPresentationIOS,
					cardOverlayEnabled: true,
					gestureEnabled: true,
				} }
			>
				<EditStack.Screen
					name="content"
					options={ {
						title: '',
					} }
				>
					{ props => (
						<EditContent
							{ ...props }
							currentStatus={ this.state.currentStatus }
							isSaving={ this.state.isSaving }
							post={ post }
							onClose={ this.onClose }
							onChangePropertyValue={ this.onChangePropertyValue }
							onPressSave={ this.onPressSave }
						/>
					) }
				</EditStack.Screen>

				<EditStack.Screen
					name="properties"
					options={ {
						title: 'Options',
					} }
				>
					{ props => (
						<Form
							{ ...props }
							post={ post }
							schema={ schema }
							onChangePropertyValue={ this.onChangePropertyValue }
						/>
					) }
				</EditStack.Screen>
			</EditStack.Navigator>
		);
	}
}

const mapStateToProps = state => {
	const activeSite = state.activeSite.id && state.sites[ state.activeSite.id ];

	return {
		site: activeSite,
	};
};

export default connect( mapStateToProps )( EditScreen );
