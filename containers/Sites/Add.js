import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	TextInput,
	Text,
	ActivityIndicator,
	Image,
} from 'react-native';
import { connect } from 'react-redux';
import { values, trim } from 'lodash';
import { addSite } from '../../actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddSiteInstructions from '../../components/Sites/AddSiteInstructions';
import TextInputWithIcon from '../../components/General/TextInputWithIcon';

class Add extends Component {
	static navigatorButtons = {
		leftButtons: [
			{
				title: 'Back',
				id: 'close',
			},
		],
	};
	constructor(props) {
		super(props);
		this.state = {
			url: '',
			//key: 'RGZ9uqScRvNI',
			//secret: 'lQ95vLKvqFB6xgsmqww0a7PNd0H9bRAT6T3VU082Cz0Bsd5J',
			key: '',
			secret: '',
			addOAuth: false,
		};
		//this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent(event) {
		if (event.type == 'NavBarButtonPress') {
			if (event.id == 'close') {
				this.props.navigator.dismissModal();
			}
		}
	}
	onSubmit() {
		var url = this.state.url;

		// prepend http:// to the url if it wasn't set already.
		if (url.indexOf('http') !== 0) {
			url = 'http://' + url;
		}

		// make sure the URL has a trailing slash
		url = trim(url, '/') + '/';

		this.setState({ url: url });

		if (this.state.key && this.state.secret) {
			var args = {
				credentials: {
					client_token: this.state.key,
					client_secret: this.state.secret,
				},
			};
		}
		this.props.dispatch(addSite(url, args));
	}

	render() {
		return (
			<View style={styles.container}>
				<Image
					source={require('../../images/logo-black-40.png')}
					style={styles.icon}
				/>
				<AddSiteInstructions requiresAuthBrokerPlugin={!this.state.addOAuth} />

				{!this.props.newSite.status
					? <View>
							<TextInputWithIcon
								icon="globe"
								keyboardType="url"
								placeholder="Site URL..."
								value={this.state.url}
								returnKeyType="go"
								onChangeText={text => this.setState({ url: text })}
								onSubmitEditing={this.onSubmit.bind(this)}
							/>
							{this.state.addOAuth
								? <View>
										<TextInputWithIcon
											icon="key"
											placeholder="OAuth Client Key..."
											returnKeyType="next"
											value={this.state.key}
											onChangeText={text => this.setState({ key: text })}
											onSubmitEditing={this.onSubmit.bind(this)}
										/>
										<TextInputWithIcon
											icon="lock"
											placeholder="OAuth Client Secret..."
											returnKeyType="go"
											value={this.state.secret}
											onChangeText={text => this.setState({ secret: text })}
											onSubmitEditing={this.onSubmit.bind(this)}
										/>
									</View>
								: null}
						</View>
					: <View style={styles.input}>
							<ActivityIndicator
								size="small"
								color="#666666"
								style={{ marginRight: 5, marginLeft: 5 }}
							/>
							<Text style={styles.inputText}>{this.props.newSite.status}</Text>
						</View>}
				{this.props.newSite.errorStatus
					? <Text style={styles.errorMessage}>
							<Icon name="exclamation-triangle" color="white" />
							{' '}
							{this.props.newSite.errorStatus}
						</Text>
					: null}
				{!this.props.newSite.status && this.state.url
					? <TouchableOpacity
							onPress={this.onSubmit.bind(this)}
							style={styles.addButton}
						>
							<Text style={styles.addButtonText}>Add Site</Text>
						</TouchableOpacity>
					: null}

				{!this.state.addOAuth
					? <TouchableOpacity onPress={() => this.setState({ addOAuth: true })}>
							<Text style={styles.addOAuthText}>Using OAuth 1.0?</Text>
						</TouchableOpacity>
					: null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		padding: 20,
		paddingBottom: 100,
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	icon: {
		alignSelf: 'center',
		marginBottom: 10,
	},
	input: {
		backgroundColor: '#f1f1f1',
		height: 40,
		padding: 3,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee',
	},
	inputText: {
		flex: 1,
		fontSize: 16,
		lineHeight: 16,
	},
	addButton: {
		margin: 10,
		backgroundColor: 'rgba(0,0,0,.3)',
		alignItems: 'center',
		padding: 8,
		borderRadius: 1,
	},
	addButtonText: {
		color: '#FFFFFF',
	},
	errorMessage: {
		color: 'red',
		textAlign: 'center',
		fontSize: 15,
		marginTop: 10,
		marginBottom: 5,
	},
	addOAuthText: {
		color: '#333333',
		textAlign: 'center',
		margin: 10,
	},
});

export default connect(s => s)(Add);
