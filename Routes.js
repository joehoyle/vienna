import {
	createStackNavigator,
	createAppContainer
} from 'react-navigation';

import SitesList from './containers/Sites/List';
import SitesAdd from './containers/Sites/Add';
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

export default createAppContainer(createStackNavigator(
	{
		SitesList: { screen: SitesList },
		SitesAdd: { screen: SitesAdd },
		SitesView: { screen: SitesView },
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
		cardStyle: {
			backgroundColor: 'white',
			borderTopWidth: 0,
			shadowRadius: 0,
			shadowOffset: {
				height: 0,
			},
			shadowColor: 'transparent',
		},
	}
));
