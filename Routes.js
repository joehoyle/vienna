import React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, HeaderStyleInterpolators } from '@react-navigation/stack';

import SitesList from './containers/Sites/List';
import SitesAdd from './containers/Sites/Add';
import SitesReauth from './containers/Sites/Reauth';
import PostsList from './containers/Posts/List';
import PostsEdit from './containers/Posts/Edit';
import PostsAdd from './containers/Posts/Add';
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

import { getBrandColor, getSemanticColor } from './theme';

const defaultOptions = {
	cardStyle: {
		backgroundColor: getSemanticColor( 'systemBackground' ),
	},
	headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
};

const Main = createStackNavigator();
const Root = createStackNavigator();

const MainStack = () => {
	return (
		<Main.Navigator
			initialRouteName="SitesList"
			screenOptions={ defaultOptions }
		>
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
				} ) }
			/>
			<Main.Screen
				name="SitesReauth"
				component={ SitesReauth }
			/>
			<Main.Screen
				name="PostsList"
				component={ PostsList }
				options={ ( { route } ) => ( {
					title: route.params ? route.params.type.name : '',
				} ) }
			/>
			<Main.Screen
				name="PostsEdit"
				component={ PostsEdit }
				options={ ( { route } ) => ( {
					title: route.params ? `Edit ${ route.params.type.labels.singular_name }` : '',
				} ) }
			/>
			<Main.Screen
				name="PostsAdd"
				component={ PostsAdd }
			/>
			<Main.Screen
				name="TermsEdit"
				component={ TermsEdit }
				options={ ( { route } ) => ( {
					title: route.params ? `Edit ${ route.params.taxonomy.labels.singular_name }` : '',
				} ) }
			/>
			<Main.Screen
				name="TermsAdd"
				component={ TermsAdd }
			/>
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
			<Main.Screen
				name="UsersAdd"
				component={ UsersAdd }
			/>
			<Main.Screen
				name="UsersEdit"
				component={ UsersEdit }
			/>
			<Main.Screen
				name="UsersSelect"
				component={ UsersSelect }
			/>
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
	)
}

export default function RootStack() {
	const theme = {
		dark: false,
		colors: {
			primary: getBrandColor( 'primary' ),
			backgroundColor: getSemanticColor( 'systemBackground' ),
			card: getSemanticColor( 'secondarySystemBackground' ),
			text: getSemanticColor( 'label' ),
			border: getSemanticColor( 'separator' ),
		},
	};

	return (
		<NavigationNativeContainer
			theme={ theme }
		>
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
				<Root.Screen
					name="Main"
					component={ MainStack }
				/>
				<Root.Screen
					name="SitesAdd"
					component={ SitesAdd }
					options={ {
						title: 'Add New Site',
					} }
				/>
			</Root.Navigator>
		</NavigationNativeContainer>
	);
}
