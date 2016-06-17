import React, { Component, View, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import PropTypes from '../../PropTypes'

export default class List extends Component {

	static propTypes = {
		media: React.PropTypes.arrayOf( PropTypes.Media ).isRequired,
		onSelect: React.PropTypes.func.isRequired,
	}

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					{this.props.media.map( attachment => {
						return (
							<TouchableOpacity
								key={attachment.id}
								onPress={this.props.onSelect.bind(null,attachment)}

								>
								<Image
									style={styles.image}
									source={{uri:attachment.media_details.sizes.thumbnail.source_url}}
									/>
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
		height: 150,
		width: 138,
	},
	image: {
		height: 150,
		width: 138,
	}
})
