import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets, HeaderStyleInterpolators } from 'react-navigation-stack';

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

const mainStack = createStackNavigator(
	{
		SitesList: { screen: SitesList },
		SitesView: { screen: SitesView },
		SitesReauth: { screen: SitesReauth },
		PostsList: { screen: PostsList },
		PostsEdit: { screen: PostsEdit },
		PostsAdd: { screen: PostsAdd },
		TermsEdit: { screen: TermsEdit },
		TermsAdd: { screen: TermsAdd },
		TermsList: { screen: TermsList },
		UsersList: { screen: UsersList },
		UsersAdd: { screen: UsersAdd },
		UsersEdit: { screen: UsersEdit },
		UsersSelect: { screen: UsersSelect },
		CommentsList: { screen: CommentsList },
		CommentsEdit: { screen: CommentsEdit },
		SettingsList: { screen: SettingsList },
	},
	{
		initialRouteName: 'SitesList',
		navigationOptions: {
			headerStyle: {
				backgroundColor: 'white',
				borderBottomWidth: 0,
				shadowColor: 'transparent',
				shadowRadius: 0,
				shadowOffset: {
					height: 0,
				},
			},
		},
		defaultNavigationOptions: {
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
		},
	},
);

export default createAppContainer(
	createStackNavigator(
		{
			Main: {
				screen: mainStack,
			},
			SitesAdd: {
				screen: SitesAdd,
				navigationOptions: {
					title: 'Add New Site',
				},
			},
		},
		{
			mode: 'modal',
			headerMode: 'none',
			defaultNavigationOptions: {
				...TransitionPresets.ModalPresentationIOS,
				cardOverlayEnabled: true,
				gestureEnabled: true,
			},
		},
	),
);
