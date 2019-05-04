import React, { Component } from 'react';
import {
	ScrollView,
	RefreshControl,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { fetchTerms } from '../../actions';
import ListItem from '../../components/Terms/ListItem';
import ListError from '../../components/General/ListError';
import NavigationButton from '../../components/Navigation/Button';

class List extends Component {
	static navigationOptions = ({ navigationOptions, navigation }) => ({
		title: navigation.state.params.taxonomy.name,
		headerRight: (
			<NavigationButton
				onPress={() => {
					navigation.navigate('TermsAdd', {
						taxonomy: navigation.state.params.taxonomy,
					});
				}}
			>
				Add New
			</NavigationButton>
		),
	});
	componentDidMount() {
		if (isEmpty(this.props.navigation.state.params.taxonomy.terms)) {
			this.props.dispatch(
				fetchTerms({
					taxonomy: this.props.navigation.state.params.taxonomy.slug,
				})
			);
		}
	}
	onSelectTerm(term) {
		this.props.navigation.navigate('TermsEdit', {
			taxonomy: this.props.navigation.state.params.taxonomy,
			term,
		});
	}
	onRefresh() {
		this.props.dispatch(
			fetchTerms({ taxonomy: this.props.navigation.state.params.taxonomy.slug })
		);
	}
	render() {
		var taxonomy = this.props.navigation.state.params.taxonomy;
		var terms = taxonomy.terms;
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={taxonomy.list.loading}
						style={{ backgroundColor: 'transparent' }}
						onRefresh={this.onRefresh.bind(this)}
						tintColor="#666666"
						title={
							taxonomy.list.loading
								? 'Loading ' + taxonomy.name + '...'
								: 'Pull to Refresh...'
						}
						titleColor="#000000"
					/>
				}
			>
				{taxonomy.list.lastError
					? <ListError error={taxonomy.list.lastError} />
					: null}
				{Object.values(terms).map(term => {
					return (
						<TouchableOpacity
							key={term.id}
							onPress={this.onSelectTerm.bind(this, term)}
						>
							<ListItem term={term} />
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		);
	}
}

export default connect(state => ({
	...state,
	...(state.activeSite.id ? state.sites[state.activeSite.id].data : null),
}))(List);
