import React, { Component } from 'react';
import {
	ScrollView,
	Image,
	RefreshControl,
	TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { values, isEmpty } from 'lodash';
import { fetchTerms } from '../../actions';
import PropTypes from '../../PropTypes';
import ListItem from '../../components/Terms/ListItem';
import ListError from '../../components/General/ListError';

class List extends Component {
	static navigationOptions = ({ navigationOptions, navigation }) => ({
		title: navigation.state.params.taxonomy.name,
	});
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (isEmpty(this.props.navigation.state.params.taxonomy.terms)) {
			this.props.dispatch(fetchTerms({ taxonomy: this.props.navigation.state.params.taxonomy.slug }));
		}
	}
	onSelectTerm(term) {
		this.props.navigator.push({
			screen: 'TermsEdit',
			passProps: {
				taxonomy: this.props.taxonomy,
				term: term.id,
			},
			title: term.name,
		});
	}
	onRefresh() {
		this.props.dispatch(fetchTerms({ taxonomy: this.props.navigation.state.params.taxonomy.slug }));
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
				{values(terms).map(term => {
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
