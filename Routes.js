import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { Text } from 'react-native';
import { createStackNavigator, TransitionPresets, HeaderStyleInterpolators } from '@react-navigation/stack';
import { connect } from 'react-redux';

import SitesList from './containers/Sites/List';
import SitesAdd from './containers/Sites/Add';
import SitesReauth from './containers/Sites/Reauth';
import PostsList from './containers/Posts/List';
import TermsEdit from './containers/Terms/Edit';
import TermsAdd from './containers/Terms/Add';
import TermsList from './containers/Terms/List';
import UsersList from './containers/Users/List';
import UsersEdit from './containers/Users/Edit';
import UsersAdd from './containers/Users/Add';
import UsersSelect from './containers/Users/Select';
import CommentsList from './containers/Comments/List';
import SitesView from './containers/Sites/View';
import SettingsList from './containers/Settings/List';
import CommentsEdit from './containers/Comments/Edit';

import EditScreen from './components/Posts/EditScreen';
import ProfileButton from './components/Sites/ProfileButton.js';

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

const Main = createStackNavigator();
const Root = createStackNavigator();

const MainStack = () => {
	const PostTitle = connect( ( state, props ) => ( { ...state.sites[state.activeSite.id].data.types[props.route.params.type] } ) )( props => {
		return <Text>{ props.name }</Text>;
	} );

	return (
		<Main.Navigator initialRouteName="SitesList" screenOptions={ defaultOptions }>
			<Main.Screen
				name="SitesList"
				component={ SitesList }
				options={ {
					title: 'Sites',
				} }
			/>
			<Main.Screen
				name="SitesView"
				component={ SitesView }
				options={ ( { route } ) => ( {
					title: route.params ? route.params.site.name : '',
					headerRight: () => {
						return <ProfileButton />;
					},
				} ) }
			/>
			<Main.Screen name="SitesReauth" component={ SitesReauth } />
			<Main.Screen
				name="PostsList"
				component={ PostsList }
				options={ ( { route } ) => ( {
					title: <PostTitle route={ route } />,
				} ) }
			/>
			<Main.Screen
				name="PostsEdit"
				component={ EditScreen }
			/>
			<Main.Screen
				name="PostsAdd"
				component={ EditScreen }
			/>
			<Main.Screen
				name="TermsEdit"
				component={ TermsEdit }
				options={ ( { route } ) => ( {
					title: route.params ? `Edit ${route.params.taxonomy.labels.singular_name}` : '',
				} ) }
			/>
			<Main.Screen name="TermsAdd" component={ TermsAdd } />
			<Main.Screen
				name="TermsList"
				component={ TermsList }
				options={ ( { route } ) => ( {
					title: route.params ? route.params.taxonomy.name : '',
				} ) }
			/>
			<Main.Screen
				name="UsersList"
				component={ UsersList }
				options={ {
					title: 'Users',
				} }
			/>
			<Main.Screen name="UsersAdd" component={ UsersAdd } />
			<Main.Screen name="UsersSelect" component={ UsersSelect } />
			<Main.Screen
				name="CommentsList"
				component={ CommentsList }
				options={ {
					title: 'Comments',
				} }
			/>
			<Main.Screen
				name="CommentsEdit"
				component={ CommentsEdit }
				options={ {
					title: 'Edit Comment',
				} }
			/>
			<Main.Screen
				name="SettingsList"
				component={ SettingsList }
				options={ {
					title: 'Settings',
				} }
			/>
		</Main.Navigator>
	);
};

export default function RootStack() {
	return (
		<NavigationNativeContainer>
			<Root.Navigator
				headerMode="none"
				mode="modal"
				screenOptions={ {
					...defaultOptions,
					...TransitionPresets.ModalPresentationIOS,
					cardOverlayEnabled: true,
					gestureEnabled: true,
				} }
			>
				<Root.Screen name="Main" component={ MainStack } />
				<Root.Screen
					name="SitesAdd"
					component={ SitesAdd }
					options={ {
						title: 'Add New Site',
					} }
				/>
				<Root.Screen name="UsersEdit" component={ UsersEdit } />
			</Root.Navigator>
		</NavigationNativeContainer>
	);
}
