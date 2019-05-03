import { WebBrowser } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class AddSiteInstructions extends Component {
	openURL(url) {
		WebBrowser.openBrowserAsync( url );
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.description}>
					Your WordPress site should have the following plugins installed.
				</Text>
				<View style={styles.steps}>
					<View style={styles.stepItem}>
						<Text>The</Text>
						<TouchableOpacity
							onPress={this.openURL.bind(
								this,
								'https://wordpress.org/plugins/rest-api-oauth1/'
							)}
						>
							<Text style={styles.link}> OAuth 1.0 </Text>
						</TouchableOpacity>
						<Text>plugin.</Text>
					</View>
					{this.props.requiresAuthBrokerPlugin
						? <View style={styles.stepItem}>
								<Text>The</Text>
								<TouchableOpacity
									onPress={this.openURL.bind(
										this,
										'https://wordpress.org/plugins/rest-api-broker/'
									)}
								>
									<Text style={styles.link}> Authentication Broker </Text>
								</TouchableOpacity>
								<Text>plugin.</Text>
							</View>
						: null}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	description: {
		color: '#666666',
		marginTop: 15,
		marginBottom: 15,
		textAlign: 'center',
	},
	link: {
		color: '#2E73B0',
	},
	steps: {
		marginBottom: 15,
		borderRadius: 2,
	},
	stepItem: {
		flexDirection: 'row',
		padding: 10,
	},
});
