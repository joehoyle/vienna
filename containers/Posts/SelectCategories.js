import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import CategoriesSelectableList from '../../components/Terms/SelectableList'
import { values, isEmpty } from 'lodash'
import { fetchTerms, updatePost } from '../../actions'

export default class SelectCategories extends Component {

	componentDidMount() {
		var terms = this.props.taxonomies[ this.props.routerData.taxonomy ].terms
		if ( isEmpty( terms ) ) {
			this.props.dispatch( fetchTerms( {taxonomy: this.props.routerData.taxonomy}) )
		}
	}

	handleChangeCategories( categories ) {
		this.props.dispatch( updatePost( this.props.routerData.postId, this.props.routerData.type, {
			categories: categories,
		}))
	}

	render() {
		var post = this.props.types[ this.props.routerData.type ].posts[this.props.routerData.postId]
		var terms = this.props.taxonomies[ this.props.routerData.taxonomy ].terms

		return (
			<ScrollView>
				<CategoriesSelectableList
					terms={values(terms)}
					selectedTerms={post.categories}
					onChange={this.handleChangeCategories.bind(this)}
				/>
			</ScrollView>
		)
	}
}
