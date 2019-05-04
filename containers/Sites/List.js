import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';
import ListItem from '../../components/Sites/ListItem';
import NavigationButton from '../../components/Navigation/Button';

class List extends Component {
	static navigationOptions = ({ navigationOptions, navigation }) => ({
		title: 'Sites',
		headerRight: (
			<NavigationButton onPress={() => navigation.navigate('SitesAdd')}>
				Add site
			</NavigationButton>
		),
	});
	constructor(props) {
		super(props);
		this.state = {
			shownAddSiteOnLoad: false,
		};
	}
	componentWillReceiveProps(newProps) {
		if (
			newProps.loaded &&
			Object.values(newProps.sites).length === 0 &&
			!this.state.shownAddSiteOnLoad
		) {
			this.setState(
				{
					shownAddSiteOnLoad: true,
				},
				() => {
					this.props.navigation.navigate('SitesAdd');
				}
			);
		}
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
				{Object.values(this.props.sites).map(site => {
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
