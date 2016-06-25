import React, { Text, Component, StyleSheet, View, DatePickerIOS } from 'react-native'
import { values } from 'lodash'
import { updatePost } from '../../actions'

export default class SelectDate extends Component {

	onDateChange( date ) {
		this.props.dispatch( updatePost( this.props.routerData.postId, {
			date: date.toISOString(),
		}))
	}

	render() {
		var post = this.props.types[ this.props.routerData.type ].posts[this.props.routerData.postId]
		var date = new Date( post.date )
		return (
			<View style={{backgroundColor:'white',alignItems:'center',flexDirection:'column'}}>
				<DatePickerIOS
					date={date}
					mode="datetime"
					onDateChange={this.onDateChange.bind(this)}
				/>
			</View>
		)
	}
}
