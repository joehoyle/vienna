import Constants from 'expo-constants';
import React, { Component } from 'react';
import {
	KeyboardAvoidingView,
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
} from 'react-native';
import { Header } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { trim } from 'lodash';

import addSite, { fetchIndex } from '../../actions/addSiteNew';

import StartScreen from '../../components/Sites/Start';

const styles = StyleSheet.create( {
	container: {
		backgroundColor: '#FFFFFF',
		padding: 20,
		flex: 1,
		alignItems: 'stretch',
	},
	main: {
		flexGrow: 1,
		alignItems: 'stretch',
		justifyContent: 'center',
	},
} );

const STEP = {
	START: 'START',
	INSTALL_CONNECT: 'INSTALL_CONNECT',
	AUTHORIZE: 'AUTHORIZE',
};

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
		step: STEP.START,
		index: null,
	}

	onConnect = async index => {
		// Store the index for future use.
		this.setState( { index } );

		// Does the site have App Connect installed?
		if ( ! ( 'connect' in index.authentication ) ) {
			console.log( 'needs connect' );
			this.setState( {
				index,
				step: STEP.INSTALL_CONNECT,
			} );
		} else {
			console.log( 'has connect' );
			this.setState( {
				index,
				step: STEP.AUTHORIZE,
			} );
		}

		// this.props.addSite( url, args );
	}

	render() {
		const { index, step } = this.state;

		return (
			<KeyboardAvoidingView
				behavior="height"
				keyboardVerticalOffset={ Header.HEIGHT + Constants.statusBarHeight - 20 }
				style={ styles.container }
			>
				{ step === STEP.START ? (
					<StartScreen
						onConnect={ this.onConnect }
					/>
				) : null }
			</KeyboardAvoidingView>
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
