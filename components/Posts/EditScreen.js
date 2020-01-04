import { createStackNavigator, TransitionPresets, HeaderStyleInterpolators } from '@react-navigation/stack';
import React, { Component } from 'react';
import { ActionSheetIOS, Text, View } from 'react-native';
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
		isChanged: false,
		isNew: false,
	}

	constructor( props ) {
		super( props );

		if ( props.route.params.post ) {
			this.state.post = props.route.params.post;
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
		const post = {
			...this.state.post,
			[ property ]: value,
		};
		this.setState( {
			post,
			isChanged: true,
		} );
	}

	onSave = () => {
		if ( this.state.isNew ) {
			this.props.dispatch(
				createPost( this.state.post, this.props.route.params.type.slug ),
			);
		} else {
			this.props.dispatch( updatePost( this.state.post ) );
		}
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
							post={ post }
							onClose={ this.onClose }
							onChangePropertyValue={ this.onChangePropertyValue }
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
