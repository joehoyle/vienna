import React, {Component} from 'react';
import {Text, View, StyleSheet, TabBarIOS, StatusBarIOS, ScrollView, TouchableOpacity, LinkingIOS} from 'react-native';
import { Linking } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts, editPost, createPost, addSite, uploadImage } from '../actions'
import Icon from 'react-native-vector-icons/FontAwesome'
import SitesList from '../containers/Sites/List'
import SitesAdd from '../containers/Sites/Add'
import PostsList from '../containers/Posts/List'
import PostsListNavBar from '../containers/Posts/ListNavBar'
import PostsEdit from '../containers/Posts/Edit'
import TermsEdit from '../containers/Terms/Edit'
import TermsList from '../containers/Terms/List'
import TermsListNavBar from '../containers/Terms/ListNavBar'
import UsersList from '../containers/Users/List'
import UsersListNavBar from '../containers/Users/ListNavBar'
import CommentsList from '../containers/Comments/List'
import CommentsListNavBar from '../containers/Comments/ListNavBar'
import PostsCreate from '../containers/Posts/Create'
import SelectCategories from '../containers/Posts/SelectCategories'
import SelectDate from '../containers/Posts/SelectDate'
import SelectFormat from '../containers/Posts/SelectFormat'
import SelectFeaturedMedia from '../containers/Posts/SelectFeaturedMedia'
import FilterListDropdownButton from '../components/FilterListDropdownButton'
import SiteView from '../containers/Sites/View'

import {
	actions as routerActions,
	NavBar,
	Route,
	Router,
	Schema,
	TabRoute,
	TabBar,
	Animations,
} from 'react-native-router-redux'

class App extends Component {

	componentDidMount() {
		if ( ! this.props.activeSite.id ) {
			//this.props.dispatch( addSite( 'http://wordpress.dev/' ) )
		} else {
			this.props.dispatch( {
				type: 'ROUTER_PUSH',
				payload: {
					name: 'site',
				},
			} )
		}
	}

	componentWillUpdate() {

	}

	handleUpdatePost() {
		this.props.dispatch({
			type: 'ROUTER_POP',
		})
	}

	handleCreateSite() {
		this.props.dispatch( {
			type: 'ROUTER_PUSH',
			payload: {
				name: 'add-site',
			},
		} )
	}

	handleCreateCategory() {

	}

	render() {
		return (
			<View style={styles.container}>
				<Router {...this.props} initial={'sites'}>
					<Schema
						name="default"
						navBar={NavBar}
						navTint="#2E73B0"
						statusStyle="light-content"
						navTitleColor="white"
						navLeftColor="white"
						navRightColor="white"
						tabBar={TabBar}
					/>
					<Route
						name="sites"
						component={SitesList}
						title="Sites"
						navRight={<TouchableOpacity onPress={this.handleCreateSite.bind(this)}><Icon name="plus" style={{marginRight:15}} size={22} color="white" /></TouchableOpacity>}
						tabItem={{title:'Sites'}}
					/>
					<Route
						name="add-site"
						component={SitesAdd}
						title="Add New Site"
						sceneConfig={Animations.FlatFloatFromBottom}
					/>
					<Route
						name="site"
						component={SiteView}
						title="Content"
						navLeftTitle="Switch Site"
					/>
					<Route
						name="type-posts"
						component={PostsList}
						navBar={PostsListNavBar}
					/>
					<Route
						name="media"
						component={PostsList}
						title="Media"
						tabItem={{title:'Media'}}
						navRight={<TouchableOpacity onPress={()=>this.props.dispatch(uploadImage())}><Icon name="upload" style={{marginRight:15}} size={20} color="white" /></TouchableOpacity>}
					/>
					<Route
						name="terms"
						component={TermsList}
						navBar={TermsListNavBar}
					/>
					<Route
						name="users"
						component={UsersList}
						navBar={UsersListNavBar}
						/>
					<Route
						name="comments"
						component={CommentsList}
						navBar={CommentsListNavBar}
						/>
					<Route
						name="posts-edit"
						component={PostsEdit}
						title="Edit Post"
						navRightTitle="Update"
						navRightHandler={this.handleUpdatePost.bind(this)}
					/>
					<Route
						name="posts-create"
						component={PostsCreate}
						title="New Post"
						navRightTitle="Save"
						navRightHandler={this.handleUpdatePost.bind(this)}
					/>
					<Route
						name="terms-edit"
						component={TermsEdit}
						title="Edit Term"
					/>
					<Route name="select-categories" component={SelectCategories} title="Select Categories" />
					<Route name="select-date" component={SelectDate} title="Select Date" />
					<Route name="select-featured-media" component={SelectFeaturedMedia} title="Select Featured Media" />
					<Route name="select-format" component={SelectFormat} title="Select Post Format" />
				</Router>
			</View>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		...routerActions,
	}, dispatch),
	dispatch,
});

export default connect((state) => {
	if ( state.activeSite.id ) {
		site = state.sites[ state.activeSite.id ].data
	} else {
		site = {}
	}
	return {...site, ...state}
}, mapDispatchToProps )(App)

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#D9E3EB',
		flex: 1,
	},
	topBar: {
		backgroundColor: '#2E73B0',
		height: 20,
	},
})
