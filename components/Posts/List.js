import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { values, isEmpty } from 'lodash';
import PropTypes from '../../PropTypes';
import ListItem from './ListItem';

export default class List extends Component {
	static propTypes = {
		posts: React.PropTypes.arrayOf(PropTypes.Post).isRequired,
		onEdit: React.PropTypes.func,
		onView: React.PropTypes.func,
		onTrash: React.PropTypes.func,
		media: React.PropTypes.objectOf(PropTypes.Media),
		users: React.PropTypes.objectOf(PropTypes.User),
	};
	render() {
		var posts = this.props.posts;
		return (
			<ScrollView refreshControl={this.props.refreshControl}>
				{posts.map(post => {
					return (
						<View style={styles.listItem} key={post.id}>
							<ListItem
								post={post}
								featuredMedia={
									post.featured_media
										? this.props.media[post.featured_media]
										: null
								}
								onEdit={this.props.onEdit.bind(this, post)}
								onView={this.props.onView.bind(this, post)}
								onTrash={this.props.onTrash.bind(this, post)}
								author={this.props.users[post.author]}
							/>
						</View>
					);
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	listItem: {
		padding: 15,
		borderBottomColor: '#F7F7F7',
		borderBottomWidth: 1,
	},
});
