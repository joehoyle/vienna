import React, {Component} from 'react'
import {View, StyleSheet, Image} from 'react-native'
import PropTypes from '../../PropTypes'

export default class Edit extends Component {

	static propTypes: {
		post: PropTypes.Media,
	}

	render() {
		var attachment = this.props.post

		return (
			<View style={styles.container}>
				<Image
					source={{uri:attachment.media_details.sizes.full.source_url}}
					style={{flex:1}}
					resizeMode="contain"
					/>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
