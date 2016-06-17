import React, {
	View,
	Component,
	StyleSheet,
	Image
} from 'react-native'
import PropTypes from '../../PropTypes'

export default class Edit extends Component {
	render() {
		var attachment = this.props.media[ this.props.routerData.mediaId ]

		return (
			<View style={styles.container}>
				<Image
					source={{uri:attachment.media_details.sizes.large.source_url}}
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
