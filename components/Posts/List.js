import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import ViennaPropTypes from '../../PropTypes';
import ListItem from './ListItem';

const styles = StyleSheet.create( {
	listItem: {
		padding: 15,
		borderBottomColor: '#F7F7F7',
		borderBottomWidth: 1,
	},
} );

export default class List extends Component {
	static propTypes = {
		posts: PropTypes.arrayOf( ViennaPropTypes.Post ).isRequired,
		onEdit: PropTypes.func,
		onView: PropTypes.func,
		onTrash: PropTypes.func,
		media: PropTypes.objectOf( ViennaPropTypes.Media ),
		users: PropTypes.objectOf( ViennaPropTypes.User ),
	};
	render() {
		let posts = this.props.posts;
		return (
			<>
				{ posts.map( post => {
					return (
						<View style={ styles.listItem } key={ post.id }>
							<ListItem
								post={ post }
								featuredMedia={ post.featured_media ? this.props.media[post.featured_media] : null }
								onEdit={ this.props.onEdit.bind( this, post ) }
								onView={ this.props.onView.bind( this, post ) }
								onTrash={ this.props.onTrash.bind( this, post ) }
								author={ this.props.users[post.author] }
							/>
						</View>
					);
				} ) }
			</>
		);
	}
}
