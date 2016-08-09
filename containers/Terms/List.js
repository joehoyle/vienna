import React, {Component} from 'react';
import {ScrollView, Image, RefreshControl} from 'react-native';
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

	onRefresh() {

	}

	render() {
		var taxonomy = this.props.taxonomies[ this.props.routerData.taxonomy ]
		var terms = taxonomy.terms
		return (
			<ScrollView
				refreshControl={<RefreshControl
						refreshing={taxonomy.list.loading}
						onRefresh={this.onRefresh.bind(this)}
						tintColor="#666666"
						title={taxonomy.list.loading ? 'Loading ' + taxonomy.name + '...' : 'Pull to Refresh...'}
						titleColor="#000000"
					/>}>
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
