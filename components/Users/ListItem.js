import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import ViennaPropTypes from '../../PropTypes';
import { FontAwesome as Icon } from '@expo/vector-icons';

export default class ListItem extends Component {
	static propTypes = {
		user: ViennaPropTypes.User,
		onEdit: PropTypes.func,
		icon: PropTypes.string,
	};

	static defaultProps = {
		icon: 'chevron-right',
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.left}>
					<Image
						style={styles.image}
						source={{ uri: this.props.user.avatar_urls['96'] }}
					/>
					<View style={styles.text}>
						<Text style={styles.title}>{this.props.user.name}</Text>
						<Text style={styles.roleText}>{this.props.user.roles[0]}</Text>
					</View>
				</View>
				{this.props.icon
					? <Icon
							name={this.props.icon}
							style={styles.chevron}
							size={22}
							color="#BBBBBB"
						/>
					: null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 44,
		padding: 10,
	},
	left: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {},
	title: {
		fontSize: 16,
		lineHeight: 16,
	},
	roleText: {
		color: '#999999',
		fontSize: 12,
		lineHeight: 12,
	},
	image: {
		marginRight: 15,
		marginLeft: 5,
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#EEEEEE',
	},
});
