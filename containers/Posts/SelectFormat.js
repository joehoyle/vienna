import React, {Component} from 'react';
import {Text, StyleSheet, View, Picker} from 'react-native';
import { values } from 'lodash'
import { updatePost } from '../../actions'

export default class SelectFormat extends Component {

	onFormatChange( format ) {
		this.props.dispatch( updatePost( this.props.routerData.postId, {
			format: format,
		}))
	}

	render() {
		var post = this.props.types[ this.props.routerData.type ].posts[this.props.routerData.postId]

		var formats = [ "standard", "aside", "chat", "gallery", "link", "image", "quote", "status", "video", "audio" ]
		return (
			<View>
				<Picker
					onValueChange={this.onFormatChange.bind(this)}
					selectedValue={post.format}
					>
					{formats.map( format => {
						return <Picker.Item key={format} label={format} value={format} />
					})}
				</Picker>
			</View>
		)
	}
}
