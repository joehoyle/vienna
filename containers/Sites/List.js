import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import { values } from 'lodash';
import ListItem from '../../components/Sites/ListItem';

class List extends Component {
	static navigationOptions = ({ navigationOptions, navigation }) => ({
		title: 'Sites',
		headerRight: (
			<TouchableOpacity onPress={() => navigation.navigate('SitesAdd')}>
				<Text>Add site</Text>
			</TouchableOpacity>
		),
	});
	constructor(props) {
		super(props);
	}
	onSelectSite(site) {
		this.props.dispatch({
			type: 'ACTIVE_SITE_UPDATED',
			payload: {
				site,
			},
		});
		this.props.navigation.navigate('SitesView', { site });
	}
	render() {
		return (
			<ScrollView>
				{values(this.props.sites).map(site => {
					return (
						<TouchableOpacity
							key={site.id}
							onPress={() => this.onSelectSite(site)}
						>
							<ListItem site={site} />
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	}
}

export default connect(s => s)(List);
