import React, { Component } from 'react';
import { StyleSheet, View, RefreshControl, ActivityIndicator, Text, Linking, Animated } from 'react-native';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { trashPost, fetchPosts, updatePostFilter, uploadImage } from '../../actions';
import PostsList from '../../components/Posts/List';
import MediaList from '../../components/Media/List';
import Filter from '../../components/Filter';
import ListError from '../../components/General/ListError';
import NavigationButton from '../../components/Navigation/Button';

const styles = StyleSheet.create( {
	creating: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingBottom: 5,
	},
	creatingText: {
		marginLeft: 5,
		lineHeight: 17,
		color: 'rgba(0,0,0,.3)',
	},
} );

class List extends Component {
	scrollAnimatedValue = new Animated.Value( 80 );
	componentDidMount() {
		this.props.navigation.setOptions( {
			headerRight: () => (
				<NavigationButton onPress={ () => this.onPressNewPost() }>{ this.props.type.slug === 'attachment' ? 'Upload' : 'Add New' }</NavigationButton>
			),
		} );

		setTimeout( () => {
			let posts = this.props.type.posts;
			if ( isEmpty( posts ) ) {
				this.props.dispatch( fetchPosts( { type: this.props.type.slug } ) );
			}
		}, 400 );
	}

	onPressNewPost() {
		if ( this.props.type.slug === 'attachment' ) {
			this.props.dispatch( uploadImage( this.props.type ) );
		} else {
			this.props.navigation.navigate( 'PostsAdd', {
				type: this.props.type,
			} );
		}
	}

	onRefresh() {
		this.props.dispatch( fetchPosts( { type: this.props.type.slug } ) );
	}
	onSelectPost( post ) {
		this.props.navigation.navigate( 'PostsEdit', {
			post: post,
			type: this.props.type,
		} );
	}
	onViewPost( post ) {
		Linking.openURL( post.link ).catch( err => {
			// eslint-disable-next-line no-console
			console.error( 'An error occurred', err );
		} );
	}
	onLoadMore() {
		this.props.dispatch(
			fetchPosts( {
				type: this.props.type.slug,
				offset: Object.keys( this.props.type.posts ).length,
			} )
		);
	}
	onChangeFilter( filter ) {
		this.props.dispatch( updatePostFilter( this.props.type.slug, filter ) );
	}

	render() {
		let type = this.props.type;
		let posts = Object.values( type.posts );
		posts.sort( ( a, b ) => ( a.date_gmt > b.date_gmt ? -1 : 1 ) );

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
					<Filter type={ type } filter={ type.list.filter } onChange={ this.onChangeFilter.bind( this ) } />
				</Animated.View>
				<Animated.ScrollView
					onScroll={ Animated.event(
						[ { nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } } } ],
						/**
						 * That's where the magic happens ✨
						 * Try to enable the `runCPUburner` function in the componentDidMount,
						 * then play with `useNativeDriver` to false / true and enjoy the result!
						 **/
						{ useNativeDriver: true }
					) }
					onMomentumScrollEnd={ () => this.onLoadMore() }
					scrollEventThrottle={ 16 } // target 120fps
					contentContainerStyle={ { paddingBottom: 100 } }
					contentOffset={ { y: 80 } }
					refreshControl={
						<View style={ { marginTop: 80 } }>
							<RefreshControl
								refreshing={ false }
								style={ { backgroundColor: 'transparent' } }
								onRefresh={ () => this.onRefresh() }
								tintColor="#666666"
								title={ type.list.loading ? 'Loading ' + type.name + '...' : 'Pull to Refresh...' }
								titleColor="#000000"
							/>
						</View>
					}
				>
					{ type.list.lastError && <ListError error={ type.list.lastError } /> }
					{ type.new.loading ? (
						<View style={ styles.creating }>
							<ActivityIndicator />
							<Text style={ styles.creatingText }>Creating { type.name }</Text>
						</View>
					) : null }
					<ListComponent
						posts={ posts }
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

export default connect( ( state, props ) => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
	type: state.sites[state.activeSite.id].data.types[props.route.params.type],
} ) )( List );
