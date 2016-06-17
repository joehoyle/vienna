import React, { Text, Component, StyleSheet, ScrollView } from 'react-native'
import CategoriesSelectableList from '../../components/Terms/SelectableList'
import { values } from 'lodash'
import { fetchCategories, updatePost } from '../../actions'

export default class SelectCategories extends Component {

	componentWillMount() {
		this.props.dispatch( fetchCategories() )
	}

	handleChangeCategories( categories ) {
		this.props.dispatch( updatePost( this.props.routerData.postId, {
			categories: categories,
		}))
	}

	render() {
		var post = this.props.posts[this.props.routerData.postId]
		return (
			<ScrollView>
				<CategoriesSelectableList
					terms={values(this.props.categories)}
					selectedTerms={post.categories}
					onChange={this.handleChangeCategories.bind(this)}
				/>
			</ScrollView>
		)
	}
}
