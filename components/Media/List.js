import React, { Component, View, Image, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class List extends Component {

	static propTypes = {
		posts: React.PropTypes.arrayOf( PropTypes.Media ).isRequired,
		onEdit: React.PropTypes.func.isRequired,
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					{this.props.posts.map( attachment => {
						return (
							<TouchableOpacity
								key={attachment.id}
								onPress={this.props.onEdit.bind(null,attachment)}
								style={styles.imageHighlight}
								>
								{attachment.media_details.sizes ?
									<Image
										style={styles.image}
										source={{uri:attachment.media_details.sizes.thumbnail.source_url}}
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
		flex: 1,
		flexWrap: 'wrap',
	},
	imageHighlight: {
		margin: 1,
	},
	image: {
		height: 91,
		width: 91,
	},
})
