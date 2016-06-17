import { Component, StyleSheet } from 'react-native'
import PropTypes from '../../PropTypes'

export default class ListItem extends Component {
	static propTypes = {
		post: PropTypes.Post,
	}

	render() {
		return (
			<View>
				<Text style={styles.title}>{this.props.post.title.rendered}</Text>
				<Text style={styles.excerpt}>{this.props.content.rendered}</Text>
				<View style={styles.date}>{this.props.date}</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({

})
