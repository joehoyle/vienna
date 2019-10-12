import React, { Component } from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	ActivityIndicator,
	Image,
} from 'react-native';
import { connect } from 'react-redux';
import { trim } from 'lodash';
import { addSite } from '../../actions';
import { FontAwesome as Icon } from '@expo/vector-icons';
import AddSiteInstructions from '../../components/Sites/AddSiteInstructions';
import TextInputWithIcon from '../../components/General/TextInputWithIcon';

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#FFFFFF',
		padding: 20,
		paddingBottom: 100,
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
	description: {
		color: '#666666',
		marginTop: 15,
		marginBottom: 15,
		textAlign: 'center',
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
} );

class Add extends Component {
	static navigatorButtons = {
		leftButtons: [
			{
				title: 'Back',
				id: 'close',
			},
		],
	};

	state = {
		url: '',
		key: '',
		secret: '',
		addOAuth: false,
	}

	onSubmit = () => {
		let url = this.state.url;

		// prepend http:// to the url if it wasn't set already.
		if ( url.indexOf('http') !== 0 ) {
			url = 'http://' + url;
		}

		// make sure the URL has a trailing slash
		url = trim( url, '/' ) + '/';

		this.setState( { url: url } );

		let args = {};
		if ( this.state.key && this.state.secret ) {
			args = {
				credentials: {
					client_token: this.state.key,
					client_secret: this.state.secret,
				},
			};
		}

		this.props.addSite( url, args );
	}

	render() {
		return (
			<View style={ styles.container }>
				<Image
					source={ require('../../images/logo-black-40.png') }
					style={ styles.icon }
				/>

				<Text style={ styles.description }>
					Enter the address of the site you'd like to connect.
				</Text>

				{ ! this.props.newSite.status ? (
					<View>
						<TextInputWithIcon
							icon="globe"
							keyboardType="url"
							placeholder="Site URL..."
							value={ this.state.url }
							returnKeyType="go"
							onChangeText={ text => this.setState( { url: text } ) }
							onSubmitEditing={ this.onSubmit }
						/>

						{ this.state.addOAuth ? (
							<View>
								<TextInputWithIcon
									icon="key"
									placeholder="OAuth Client Key..."
									returnKeyType="next"
									value={ this.state.key }
									onChangeText={ text => this.setState( { key: text } ) }
									onSubmitEditing={ this.onSubmit }
								/>
								<TextInputWithIcon
									icon="lock"
									placeholder="OAuth Client Secret..."
									returnKeyType="go"
									value={ this.state.secret }
									onChangeText={ text => this.setState( { secret: text } ) }
									onSubmitEditing={ this.onSubmit }
								/>
							</View>
						) : null }
					</View>
				) : (
					<View style={ styles.input }>
						<ActivityIndicator
							size="small"
							color="#666666"
							style={ { marginRight: 5, marginLeft: 5 } }
						/>
						<Text style={ styles.inputText }>{ this.props.newSite.status }</Text>
					</View>
				) }

				{ this.props.newSite.errorStatus ? (
					<Text style={ styles.errorMessage }>
						<Icon name="exclamation-triangle" color="white" />
						{ ' ' }
						{ this.props.newSite.errorStatus }
					</Text>
				) : null }

				{ ! this.props.newSite.status && this.state.url ? (
					<TouchableOpacity
						onPress={ this.onSubmit }
						style={ styles.addButton }
					>
						<Text style={ styles.addButtonText }>Add Site</Text>
					</TouchableOpacity>
				) : null }

				{ ! this.state.addOAuth ? (
					<TouchableOpacity onPress={ () => this.setState( { addOAuth: true } ) }>
						<Text style={ styles.addOAuthText }>Using OAuth 1.0?</Text>
					</TouchableOpacity>
				) : null }
			</View>
		);
	}
}

const mapStateToProps = state => ( {
	newSite: state.newSite,
} );
const mapDispatchToProps = dispatch => ( {
	addSite: ( ...args ) => dispatch( addSite( ...args ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Add );
