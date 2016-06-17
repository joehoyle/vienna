import React, { Component, ScrollView, Image } from 'react-native'
import { values } from 'lodash'
import { fetchTags } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Terms/ListItem'

export default class List extends Component {

	static propTypes = {
		tags: React.PropTypes.objectOf( PropTypes.Term ).isRequired,
	}
	componentWillMount() {
		this.props.dispatch( fetchTags() )
	}

	onSelectTag( tag ) {
		this.props.dispatch({
			type: 'ROUTER_PUSH',
			payload: {
				name: 'tags-edit',
				data: {
					tagId: tag.id,
				},
			},
		})
	}

	render() {
		return (
			<ScrollView>
				{values(this.props.tags).map( tag => {
					return (
						<ListItem
							key={tag.id}
							term={tag}
							onEdit={this.onSelectTag.bind(this,tag)}
							onTrash={()=>{}}
						/>
					)
				})}
			</ScrollView>
		)
	}
}
