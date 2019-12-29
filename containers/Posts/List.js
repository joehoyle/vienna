import React, { Component } from 'react';
import { StyleSheet, View, RefreshControl, ActivityIndicator, Text, Linking, ScrollView, Animated } from 'react-native';
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
	scrollAnimatedValue = new Animated.Value( 80 );
	componentDidMount() {
		this.props.navigation.setOptions( {
			headerRight: () => (
				<NavigationButton
					onPress={ () => {
						this.props.navigation.navigate( 'PostsAdd', {
							type: this.props.types[this.props.route.params.type],
						} );
					} }
				>
					Add New
				</NavigationButton>
			),
		} );

		setTimeout( () => {
			let posts = this.props.types[this.props.route.params.type].posts;
			if ( isEmpty( posts ) ) {
				this.props.dispatch( fetchPosts( { type: this.props.route.params.type } ) );
			}
		}, 400 );
	}

	onRefresh() {
		this.props.dispatch( fetchPosts( { type: this.props.route.params.type } ) );
	}
	onSelectPost( post ) {
		this.props.navigation.navigate( 'PostsEdit', {
			post: post,
			type: this.props.types[this.props.route.params.type],
		} );
	}
	onViewPost( post ) {
		Linking.openURL( post.link ).catch( err => {
			// eslint-disable-next-line no-console
			console.error( 'An error occurred', err );
		} );
	}
	onChangeFilter( filter ) {
		this.props.dispatch( updatePostfilter( this.props.route.params.type, filter ) );
	}

	render() {
		let type = this.props.types[this.props.route.params.type];
		let posts = type.posts;

		const componentMap = {
			attachment: MediaList,
		};

		let ListComponent = componentMap[type.slug] ? componentMap[type.slug] : PostsList;

		return (
			<View style={ { flex: 1 } }>
				<Animated.View
					style={ [
						{
							position: 'absolute',
							left: 0,
							right: 0,
							top: -80,
							zIndex: 2,
							opacity: 0,
						},
						{
							transform: [
								{
									translateY: this.scrollAnimatedValue.interpolate( {
										inputRange: [ 0, 80 ],
										outputRange: [ 80, 0 ],
										extrapolateRight: 'clamp',
										extrapolateLeft: 'clamp',
									} ),
								},
							],
							opacity: this.scrollAnimatedValue.interpolate( {
								inputRange: [ 0, 80 / 2, 80 ],
								outputRange: [ 1, 0.2, 0 ],
								extrapolateRight: 'clamp',
							} ),
						},
					] }
				>
					<Filter filter={ type.list.filter } onChange={ this.onChangeFilter.bind( this ) } />
				</Animated.View>
				{ type.new.loading ? (
					<View style={ styles.creating }>
						<ActivityIndicator />
						<Text style={ styles.creatingText }>Creating { type.name }</Text>
					</View>
				) : null }
				<Animated.ScrollView
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue }} }],
						/**
						* That's where the magic happens ✨
						* Try to enable the `runCPUburner` function in the componentDidMount,
						* then play with `useNativeDriver` to false / true and enjoy the result!
						**/
						{ useNativeDriver: true },
					  )}
					scrollEventThrottle={ 16 } // target 120fps
					contentOffset={ { y: 80 } }
					refreshControl={
						<View style={ { marginTop: 80 } }>
							<RefreshControl
								//refreshing={ type.list.loading }
								style={ { backgroundColor: 'transparent' } }
								//onRefresh={ () => this.onRefresh() }
								tintColor="#666666"
								title={ type.list.loading ? 'Loading ' + type.name + '...' : 'Pull to Refresh...' }
								titleColor="#000000"
							/>
						</View>
					}
				>
					{ type.list.lastError && <ListError error={ type.list.lastError } /> }
					<ListComponent
						posts={ Object.values( posts ) }
						users={ this.props.users.users }
						media={ this.props.types.attachment.posts }
						onEdit={ post => this.onSelectPost( post ) }
						onView={ post => this.onViewPost( post ) }
						onTrash={ post => this.props.dispatch( trashPost( post ) ) }
					/>
				</Animated.ScrollView>
			</View>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( List );
