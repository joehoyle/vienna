import React, {Component} from 'react';
import {ScrollView, Image, RefreshControl, TouchableOpacity} from 'react-native';
import { values, isEmpty } from 'lodash'
import { fetchTerms } from '../../actions'
import PropTypes from '../../PropTypes'
import ListItem from '../../components/Terms/ListItem'

export default class List extends Component {
	componentDidMount() {
		if ( isEmpty( this.props.taxonomies[ this.props.taxonomy ].terms ) ) {
			this.props.dispatch( fetchTerms( {taxonomy:this.props.taxonomy} ) )
		}
	}
	onSelectTerm( term ) {
		this.props.navigator.push({
			screen: 'TermsEdit',
			passProps: {
				taxonomy: this.props.taxonomy,
				term: term.id,
			},
			title: term.name,
		})
	}
	onRefresh() {
		this.props.dispatch( fetchTerms( {taxonomy:this.props.taxonomy}) )
	}
	render() {
		var taxonomy = this.props.taxonomies[ this.props.taxonomy ]
		var terms = taxonomy.terms
		return (
			<ScrollView
				refreshControl={<RefreshControl
					refreshing={taxonomy.list.loading}
					style={{backgroundColor: 'transparent'}}
					onRefresh={this.onRefresh.bind(this)}
					tintColor="#666666"
					title={taxonomy.list.loading ? 'Loading ' + taxonomy.name + '...' : 'Pull to Refresh...'}
					titleColor="#000000"
				/>}
				>
				{values(terms).map( term => {
					return (
						<TouchableOpacity key={term.id} onPress={this.onSelectTerm.bind(this,term)}>
							<ListItem
								term={term}
							/>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		)
	}
}
