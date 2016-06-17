import React, { Component, Text, View, StyleSheet, TabBarIOS, StatusBarIOS, ScrollView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPosts, editPost, createPost } from '../actions'
import Icon from 'react-native-vector-icons/FontAwesome'
import SitesList from '../containers/Sites/List'
import PostsList from '../containers/Posts/List'
import MediaList from '../containers/Media/List'
import PostsEdit from '../containers/Posts/Edit'
import CategoriesEdit from '../containers/Categories/Edit'
import CategoriesList from '../containers/Categories/List'
import TagsEdit from '../containers/Tags/Edit'
import TagsList from '../containers/Tags/List'
import MediaEdit from '../containers/Media/Edit'
import PostsCreate from '../containers/Posts/Create'
import SelectCategories from '../containers/Posts/SelectCategories'
import SelectDate from '../containers/Posts/SelectDate'
import SelectFormat from '../containers/Posts/SelectFormat'
import SelectFeaturedMedia from '../containers/Posts/SelectFeaturedMedia'
import FilterListDropdownButton from '../components/FilterListDropdownButton'
import Content from '../containers/Content'

import {
	actions as routerActions,
	NavBar,
	Route,
	Router,
	Schema,
	TabRoute,
	TabBar,
} from 'react-native-router-redux'

export default class Site extends Component {

	componentWillMount() {
		this.props.dispatch( fetchPosts() )
	}

	handleUpdatePost() {
		this.props.dispatch({
			type: 'ROUTER_POP',
		})
	}

	handleCreatePost() {
		this.props.dispatch( {
			type: 'ROUTER_PUSH',
			payload: {
				name: 'posts-create',
			},
		} )
	}

	handleCreateCategory() {

	}

	render() {
		return (
			<View style={styles.container}>
				<Router {...this.props} initial="content">
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
					<TabRoute name="tabBar" barTint='#FFFFFF' tint="#32DEAF">
						<Route
							name="content"
							component={Content}
							title="Content"
							navLeftTitle="Switch Site"
							tabItem="Content"
						/>
					</TabRoute>

					<Route
						name="posts"
						component={PostsList}
						title="Posts"
						navTitle={<FilterListDropdownButton onPress={()=>this.props.dispatch({type:'POSTS_LIST_TOGGLE_FILTER'})}>Posts</FilterListDropdownButton>}
						navRight={<TouchableOpacity onPress={this.handleCreatePost.bind(this)}><Icon name="pencil-square-o" style={{marginRight:15}} size={22} color="white" /></TouchableOpacity>}
					/>
					<Route
						name="media"
						component={MediaList}
						title="Media"
						tabItem={{title:'Media'}}
						navRight={<Icon name="upload" style={{marginRight:15}} size={20} color="white" />}
					/>
					<Route
						name="categories"
						component={CategoriesList}
						title="Categories"
						navRight={<TouchableOpacity onPress={this.handleCreateCategory.bind(this)}><Icon name="pencil-square-o" style={{marginRight:15}} size={22} color="white" /></TouchableOpacity>}
					/>
					<Route
						name="tags"
						component={TagsList}
						title="Tags"
						navRight={<TouchableOpacity onPress={this.handleCreateCategory.bind(this)}><Icon name="pencil-square-o" style={{marginRight:15}} size={22} color="white" /></TouchableOpacity>}
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
						navRightHandler={this.handleCreatePost.bind(this)}
					/>
					<Route
						name="media-edit"
						component={MediaEdit}
						title="Edit Media"
					/>
					<Route
						name="categories-edit"
						component={CategoriesEdit}
						title="Edit Category"
					/>
					<Route
						name="tags-edit"
						component={TagsEdit}
						title="Edit Tag"
					/>
					<Route name="select-categories" component={SelectCategories} title="Select Categories" />
					<Route name="select-date" component={SelectDate} title="Select Date" />
					<Route name="select-featured-media" component={SelectFeaturedMedia} title="Select Featured Media" />
				</Router>
			</View>
		)
	}
}

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
