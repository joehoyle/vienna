import React, { Component, TouchableOpacity, ScrollView } from 'react-native'
import { values } from 'lodash'
import ListItem from '../../components/Sites/ListItem'

export default class List extends Component {
	onSelectSite( site ) {
		this.props.dispatch({
			type: 'ROUTER_PUSH',
			payload: {
				name: 'site',
				data: {
					siteId: site.id,
				},
			},
		})
	}
	render() {
		return (
			<ScrollView>
				{values(this.props.sites).map( site => {
					return (
						<TouchableOpacity key={site.id} onPress={this.onSelectSite.bind(this,site)}>
							<ListItem site={site} />
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		)
	}
}
