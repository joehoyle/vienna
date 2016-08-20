import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, View, TextInput, Text, ActivityIndicator, Image} from 'react-native';
import { values, trim } from 'lodash'
import { addSite } from '../../actions'
import Icon from 'react-native-vector-icons/FontAwesome'
import AddSiteInstructions from '../../components/Sites/AddSiteInstructions'

export default class List extends Component {

	constructor() {
		super()
		this.state = {
			url: '',
			//key: 'RGZ9uqScRvNI',
			//secret: 'lQ95vLKvqFB6xgsmqww0a7PNd0H9bRAT6T3VU082Cz0Bsd5J',
			key: '',
			secret: '',
			addOAuth: false,
		}
	}
	onSubmit() {
		var url = this.state.url

		if ( url.indexOf( 'http' ) !== 0 ) {
			url = 'http://' + url
		}

		url = trim( url, '/' ) + '/'

		this.setState({url:url})

		if ( this.state.key && this.state.secret ) {
			var args = {
				credentials: {
					client_token: this.state.key,
					client_secret: this.state.secret,
				}
			}
		}
		this.props.dispatch(addSite(url,args))
	}

	render() {
		return (
			<View style={styles.container}>
				<Image source={require('../../images/app-icon-60.png')} style={styles.icon} />
				<AddSiteInstructions
					requiresAuthBrokerPlugin={!this.state.addOAuth}
				/>

				{!this.props.newSite.status ?
					<View>
						<View style={styles.input}>
							<Icon style={styles.inputIcon} name="globe" size={20} color="#666666" />
							<TextInput
								keyboardType="url"
								autoCapitalize="none"
								autoCorrect={false}
								style={styles.inputText}
								placeholder="Site URL..."
								value={this.state.url}
								onChangeText={text=>this.setState({url:text})}
								onSubmitEditing={this.onSubmit.bind(this)}
								returnKeyType="go"
							/>
						</View>
						{this.state.addOAuth ?
							<View>
								<View style={styles.input}>
									<Icon style={styles.inputIcon} name="key" size={18} color="#666666" />
									<TextInput
										autoCapitalize="none"
										autoCorrect={false}
										style={styles.inputText}
										placeholder="OAuth Client Key..."
										value={this.state.key}
										onChangeText={text=>this.setState({key:text})}
										onSubmitEditing={this.onSubmit.bind(this)}
										returnKeyType="next"
									/>
								</View>
								<View style={styles.input}>
									<Icon style={styles.inputIcon} name="lock" size={20} color="#666666" />
									<TextInput
										autoCapitalize="none"
										autoCorrect={false}
										style={styles.inputText}
										placeholder="OAuth Client Secret..."
										value={this.state.secret}
										onChangeText={text=>this.setState({secret:text})}
										onSubmitEditing={this.onSubmit.bind(this)}
										returnKeyType="go"
									/>
								</View>
							</View>
						: null }
					</View>
				:
					<View style={styles.input}>
						<ActivityIndicator size="small" color="#666666" style={{marginRight: 5,marginLeft: 5}} />
						<Text style={styles.inputText}>{this.props.newSite.status}</Text>
					</View>
				}
				{this.props.newSite.errorStatus ?
					<Text style={styles.errorMessage}><Icon name="exclamation-triangle" color="white" /> {this.props.newSite.errorStatus}</Text>
				: null }
				{!this.props.newSite.status && this.state.url ?
					<TouchableOpacity onPress={this.onSubmit.bind(this)} style={styles.addButton}>
						<Text style={styles.addButtonText}>Add Site</Text>
					</TouchableOpacity>
				: null }

				{!this.state.addOAuth ?
					<TouchableOpacity onPress={()=>this.setState({addOAuth:true})}>
						<Text style={styles.addOAuthText}>Using OAuth 1.0?</Text>
					</TouchableOpacity>
				: null }
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#2E73B0',
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
		backgroundColor: '#ffffff',
		height: 40,
		padding: 3,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#eeeeee'
	},
	inputIcon: {
		marginLeft: 4,
		marginRight: 6,
		width: 20,
		textAlign: 'center',
	},
	inputText: {
		flex: 1,
		fontSize: 16,
		lineHeight: 16
	},
	addButton: {
		margin: 10,
		backgroundColor: 'rgba(0,0,0,.3)',
		alignItems: 'center',
		padding: 8,
		borderRadius: 1,
	},
	addButtonText: {
		color: '#FFFFFF'
	},
	errorMessage: {
		color: 'white',
		textAlign: 'center',
		fontSize: 15,
		marginTop: 10,
		marginBottom: 5,
	},
	addOAuthText: {
		color: '#ffffff',
		textAlign: 'center',
		margin: 10,
	}
})
