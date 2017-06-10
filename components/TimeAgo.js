import React, { Component } from 'react';
import { Text } from 'react-native';
import timeago from 'time-ago';

export default class TimeAgo extends Component {
	propTypes: {};

	render() {
		return (
			<Text style={this.props.style}>{timeago().ago(this.props.date)}</Text>
		);
	}
}
