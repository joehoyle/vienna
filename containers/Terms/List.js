import React, { Component, ScrollView, Image } from 'react-native'
import { values } from 'lodash'
import { fetchTerms } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Terms/ListItem'
import { editTerm } from '../../actions'
export default class List extends Component {

	componentWillMount() {
		this.props.dispatch( fetchTerms( {taxonomy:this.props.routerData.taxonomy}) )
	}

	onSelectTerm( term ) {
		this.props.dispatch({
			type: 'ROUTER_PUSH',
			payload: {
				name: 'terms-edit',
				data: {
					termId: term.id,
					taxonomy: this.props.routerData.taxonomy
				},
			},
		})
	}

	render() {
		var taxonomy = this.props.taxonomies[ this.props.routerData.taxonomy ]
		var terms = taxonomy.terms
		return (
			<ScrollView>
				{values(terms).map( term => {
					return (
						<ListItem
							key={term.id}
							term={term}
							onEdit={this.onSelectTerm.bind(this,term)}
							onTrash={()=>{}}
						/>
					)
				})}
			</ScrollView>
		)
	}
}
