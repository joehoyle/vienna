import React, { Component, ScrollView, Image } from 'react-native'
import { values } from 'lodash'
import { fetchCategories } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Terms/ListItem'

export default class List extends Component {

	static propTypes = {
		categories: React.PropTypes.objectOf( PropTypes.Term ).isRequired,
	}
	componentWillMount() {
		this.props.dispatch( fetchCategories() )
	}

	onSelectCategory( category ) {
		this.props.dispatch({
			type: 'ROUTER_PUSH',
			payload: {
				name: 'categories-edit',
				data: {
					categoryId: category.id,
				},
			},
		})
	}

	render() {
		return (
			<ScrollView>
				{values(this.props.categories).map( category => {
					return (
						<ListItem
							key={category.id}
							term={category}
							onEdit={this.onSelectCategory.bind(this,category)}
							onTrash={()=>{}}
						/>
					)
				})}
			</ScrollView>
		)
	}
}
