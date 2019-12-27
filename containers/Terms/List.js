import React, { Component } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { fetchTerms } from '../../actions';
import ListItem from '../../components/Terms/ListItem';
import ListError from '../../components/General/ListError';
import NavigationButton from '../../components/Navigation/Button';

class List extends Component {
	componentDidMount() {
		this.props.navigation.setOptions( {
			headerRight: () => (
				<NavigationButton
					onPress={ () => {
						this.props.navigation.navigate( 'TermsAdd', {
							taxonomy: this.props.route.params.taxonomy,
						} );
					} }
				>
					Add New
				</NavigationButton>
			),
		} );

		if ( isEmpty( this.props.route.params.taxonomy.terms ) ) {
			this.props.dispatch(
				fetchTerms( {
					taxonomy: this.props.route.params.taxonomy.slug,
				} ),
			);
		}
	}
	onSelectTerm( term ) {
		this.props.navigation.navigate( 'TermsEdit', {
			taxonomy: this.props.route.params.taxonomy,
			term,
		} );
	}
	onRefresh() {
		this.props.dispatch(
			fetchTerms( { taxonomy: this.props.route.params.taxonomy.slug } ),
		);
	}
	render() {
		let taxonomy = this.props.route.params.taxonomy;
		let terms = taxonomy.terms;
		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={ taxonomy.list.loading }
						style={ { backgroundColor: 'transparent' } }
						onRefresh={ this.onRefresh.bind( this ) }
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
				{ taxonomy.list.lastError ? (
					<ListError error={ taxonomy.list.lastError } />
				) : null }
				{ Object.values( terms ).map( term => {
					return (
						<TouchableOpacity
							key={ term.id }
							onPress={ this.onSelectTerm.bind( this, term ) }
						>
							<ListItem term={ term } />
						</TouchableOpacity>
					);
				} ) }
			</ScrollView>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( List );
