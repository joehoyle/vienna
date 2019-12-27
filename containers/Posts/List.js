import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	RefreshControl,
	ActivityIndicator,
	Text,
	Linking,
} from 'react-native';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { trashPost, fetchPosts, updatePostfilter } from '../../actions';
import PostsList from '../../components/Posts/List';
import MediaList from '../../components/Media/List';
import Filter from '../../components/Posts/Filter';
import ListError from '../../components/General/ListError';
import NavigationButton from '../../components/Navigation/Button';

const styles = StyleSheet.create( {
	creating: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: 5,
		backgroundColor: '#2E73B0',
	},
	creatingText: {
		marginLeft: 5,
		lineHeight: 17,
		color: 'rgba(255,255,255,.3)',
	},
} );

class List extends Component {
	componentDidMount() {
		this.props.navigation.setOptions( {
			headerRight: () => (
				<NavigationButton
					onPress={ () => {
						this.props.navigation.navigate( 'PostsAdd', {
							type: this.props.route.params.type,
						} );
					} }
				>
					Add New
				</NavigationButton>
			),
		} );

		setTimeout( () => {
			let posts = this.props.types[this.props.route.params.type.slug]
				.posts;
			if ( isEmpty( posts ) ) {
				this.props.dispatch(
					fetchPosts( { type: this.props.route.params.type.slug } ),
				);
			}
		}, 400 );
	}

	onRefresh() {
		this.props.dispatch(
			fetchPosts( { type: this.props.route.params.type.slug } ),
		);
	}
	onSelectPost( post ) {
		this.props.navigation.navigate( 'PostsEdit', {
			post: post,
			type: this.props.route.params.type,
		} );
	}
	onViewPost( post ) {
		Linking.openURL( post.link ).catch( err => {
			// eslint-disable-next-line no-console
			console.error( 'An error occurred', err );
		} );
	}
	onChangeFilter( filter ) {
		this.props.dispatch( updatePostfilter( this.props.route.params.type.slug, filter ) );
	}

	filterPosts( post ) {
		let type = this.props.types[this.props.route.params.type.slug];
		if ( type.list.filter.status === 'all' ) {
			return true;
		}

		return type.list.filter.status === post.status;
	}

	render() {
		let type = this.props.route.params.type;
		let posts = type.posts;

		const componentMap = {
			attachment: MediaList,
		};

		let ListComponent = componentMap[
			this.props.route.params.type.slug
		]
			? componentMap[this.props.route.params.type.slug]
			: PostsList;

		return (
			<View style={ { flex: 1 } }>
				{ type.list.isShowingFilter ? (
					<Filter
						filter={ type.list.filter }
						onChange={ this.onChangeFilter.bind( this ) }
					/>
				) : null }
				{ type.new.loading ? (
					<View style={ styles.creating }>
						<ActivityIndicator />
						<Text style={ styles.creatingText }>Creating { type.name }</Text>
					</View>
				) : null }
				{ type.list.lastError ? <ListError error={ type.list.lastError } /> : null }
				<ListComponent
					refreshControl={
						<RefreshControl
							refreshing={ type.list.loading }
							style={ { backgroundColor: 'transparent' } }
							onRefresh={ this.onRefresh.bind( this ) }
							tintColor="#666666"
							title={
								type.list.loading
									? 'Loading ' + type.name + '...'
									: 'Pull to Refresh...'
							}
							titleColor="#000000"
						/>
					}
					posts={ Object.values( posts ).filter( this.filterPosts.bind( this ) ) }
					users={ this.props.users.users }
					media={ this.props.types.attachment.posts }
					onEdit={ post => this.onSelectPost( post ) }
					onView={ post => this.onViewPost( post ) }
					onTrash={ post => this.props.dispatch( trashPost( post ) ) }
				/>
			</View>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( List );
