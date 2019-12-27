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

// const screenOptions = {
// 	headerStyle: {
// 		backgroundColor: 'white',
// 		borderBottomWidth: 0,
// 		shadowColor: 'transparent',
// 		shadowRadius: 0,
// 		shadowOffset: {
// 			height: 0,
// 		},
// 	},
// };

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

const MainStack = createStackNavigator();

const RootStack = () => {
	return (
		<NavigationNativeContainer>
			<MainStack.Navigator
				initialRouteName="SitesList"
				screenOptions={ defaultOptions }
			>
				<MainStack.Screen
					name="SitesList"
					component={ SitesList }
					options={ {
						title: 'Sites',
					} }
				/>
				<MainStack.Screen
					name="SitesView"
					component={ SitesView }
					options={ ( { route } ) => ( {
						title: route.params ? route.params.site.name : '',
					} ) }
				/>
				<MainStack.Screen
					name="SitesReauth"
					component={ SitesReauth }
				/>
				<MainStack.Screen
					name="PostsList"
					component={ PostsList }
					options={ ( { route } ) => ( {
						title: route.params ? route.params.type.name : '',
					} ) }
				/>
				<MainStack.Screen
					name="PostsEdit"
					component={ PostsEdit }
					options={ ( { route } ) => ( {
						title: route.params ? `Edit ${ route.params.type.labels.singular_name }` : '',
					} ) }
				/>
				<MainStack.Screen
					name="PostsAdd"
					component={ PostsAdd }
				/>
				<MainStack.Screen
					name="TermsEdit"
					component={ TermsEdit }
					options={ ( { route } ) => ( {
						title: route.params ? `Edit ${ route.params.taxonomy.labels.singular_name }` : '',
					} ) }
				/>
				<MainStack.Screen
					name="TermsAdd"
					component={ TermsAdd }
				/>
				<MainStack.Screen
					name="TermsList"
					component={ TermsList }
					options={ ( { route } ) => ( {
						title: route.params ? route.params.taxonomy.name : '',
					} ) }
				/>
				<MainStack.Screen
					name="UsersList"
					component={ UsersList }
					options={ {
						title: 'Users',
					} }
				/>
				<MainStack.Screen
					name="UsersAdd"
					component={ UsersAdd }
				/>
				<MainStack.Screen
					name="UsersEdit"
					component={ UsersEdit }
				/>
				<MainStack.Screen
					name="UsersSelect"
					component={ UsersSelect }
				/>
				<MainStack.Screen
					name="CommentsList"
					component={ CommentsList }
					options={ {
						title: 'Comments',
					} }
				/>
				<MainStack.Screen
					name="CommentsEdit"
					component={ CommentsEdit }
					options={ {
						title: 'Edit Comment',
					} }
				/>
				<MainStack.Screen
					name="SettingsList"
					component={ SettingsList }
					options={ {
						title: 'Settings',
					} }
				/>
			</MainStack.Navigator>
		</NavigationNativeContainer>
	)
}

export default RootStack;

// export default createAppContainer(
// 	createStackNavigator(
// 		{
// 			Main: {
// 				screen: mainStack,
// 			},
// 			SitesAdd: {
// 				screen: SitesAdd,
// 				navigationOptions: {
// 					title: 'Add New Site',
// 				},
// 			},
// 		},
// 		{
// 			mode: 'modal',
// 			headerMode: 'none',
// 			defaultNavigationOptions: {
// 				...TransitionPresets.ModalPresentationIOS,
// 				cardOverlayEnabled: true,
// 				gestureEnabled: true,
// 			},
// 		},
// 	),
// );
