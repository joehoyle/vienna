import React, { Component } from 'react';
import { StyleSheet, View, RefreshControl, Animated } from 'react-native';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { fetchComments, createComment, trashComment, updateCommentsFilter } from '../../actions';
import ListItem from '../../components/Comments/ListItem';
import Filter from '../../components/Filter';
import ListError from '../../components/General/ListError';

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
		if ( isEmpty( this.props.comments.comments ) ) {
			this.props.dispatch( fetchComments( this.props.comments.list.filter ) );
		}
	}

	onRefresh() {
		this.props.dispatch( fetchComments( this.props.comments.list.filter ) );
	}

	onSelectComment( comment ) {
		this.props.navigation.navigate( 'CommentsEdit', { comment } );
	}

	onReplyToComment( comment, text ) {
		this.props.dispatch(
			createComment( {
				parent: comment.id,
				content: text,
				post: comment.post,
			} )
		);
	}

	onTrashComment( comment ) {
		this.props.dispatch( trashComment( comment.id ) );
	}
	onLoadMore() {
		this.props.dispatch(
			fetchComments( {
				offset: Object.keys( this.props.comments.comments ).length,
			} )
		);
	}
	onChangeFilter( filter ) {
		console.log( filter );
		this.props.dispatch( updateCommentsFilter( filter ) );
	}

	render() {
		let comments = Object.values( this.props.comments.comments );
		comments.sort( ( a, b ) => ( a.date_gmt > b.date_gmt ? -1 : 1 ) );

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
					<Filter type={ this.props.comments } filter={ this.props.comments.list.filter } onChange={ this.onChangeFilter.bind( this ) } />
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
								title={ this.props.comments.list.loading ? 'Loading Comments...' : 'Pull to Refresh...' }
								titleColor="#000000"
							/>
						</View>
					}
				>
					{ this.props.comments.list.lastError && <ListError error={ this.props.comments.list.lastError } /> }
					{ comments.map( comment => {
						return (
							<View style={ styles.listItem } key={ comment.id }>
								<ListItem
									comment={ comment }
									post={ comment.post && this.props.types.post.posts[comment.post] ? this.props.types.post.posts[comment.post] : null }
									onEdit={ this.onSelectComment.bind( this, comment ) }
									onTrash={ this.onTrashComment.bind( this, comment ) }
									onReply={ this.onReplyToComment.bind( this ) }
								/>
							</View>
						);
					} ) }
				</Animated.ScrollView>
			</View>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( List );
