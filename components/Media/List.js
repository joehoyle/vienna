import React, {Component} from 'react'
import {View, Image, StyleSheet, ScrollView, TouchableOpacity, Text, RefreshControl} from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'
import { isEmpty } from 'lodash'

export default class List extends Component {

	static propTypes = {
		posts: React.PropTypes.arrayOf( PropTypes.Media ).isRequired,
		onEdit: React.PropTypes.func.isRequired,
	}

	render() {
		return (
			<ScrollView
				refreshControl={this.props.refreshControl}
				>
				<View style={styles.container}>
					{this.props.posts.map( attachment => {
						return (
							<TouchableOpacity
								key={attachment.id}
								onPress={this.props.onEdit.bind(null,attachment)}
								style={styles.imageHighlight}
								>
								{attachment.media_type === 'image' ?
									<Image
										style={styles.image}
										source={{uri:attachment.media_details.sizes.thumbnail ? attachment.media_details.sizes.thumbnail.source_url : attachment.source_url}}
										/>
								:
									<Icon name="file" style={{margin:19}} size={61} color="#9999" />
								}
							</TouchableOpacity>
						)
					} ) }
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		flex: 1,
		alignItems: 'flex-start',
		flexWrap: 'wrap',
	},
	imageHighlight: {
		margin: 1,
		backgroundColor: 'red',

	},
	image: {
		width: 91,
		height: 91,
	},
})
