import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
	Keyboard,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	TextInput,
	View,
} from 'react-native';
import { Editor } from 'react-native-tinymce';
import { connect } from 'react-redux';

import Icon from '../Icon';
import NavigationButton from '../Navigation/Button';
import icons from '../icons';

const styles = StyleSheet.create( {
	title: {
		color: '#666666',
		fontSize: 20,
		height: 36,
		marginLeft: 8,
		marginRight: 8,
	},
} );

const CONTENT_CSS = `
	body {
		font-family: sans-serif;
	}

	img {
		max-width: 100%;
	}
`;

class EditContent extends Component {
	static propTypes = {
		post: PropTypes.object.isRequired,
		onChangePropertyValue: PropTypes.func.isRequired,
	}

	editor = null;

	componentDidMount() {
		this.props.navigation.setOptions( {
			title: '',
			headerLeft: () => (
				<NavigationButton
					back
					onPress={ this.onClose }
				>
					<Icon
						fallback="Close"
						icon={ icons.xmark }
					/>
				</NavigationButton>
			),
			headerRight: () => (
				<NavigationButton
					onPress={ () => this.props.navigation.push( 'properties' ) }
				>
					<Icon
						fallback="Options"
						icon={ icons['ellipsis.circle'] }
					/>
				</NavigationButton>
			),
		} );

		// Workaround for https://github.com/react-native-community/react-native-webview/issues/735#issuecomment-548059083
		Keyboard.addListener( 'keyboardWillShow', this.onKeyboardShow );
		StatusBar.setBarStyle( 'dark-content' );
	}

	componentWillUnmount() {
		Keyboard.removeListener( 'keyboardWillShow', this.onKeyboardShow );
		StatusBar.setBarStyle( 'dark-content' );
	}

	onKeyboardShow = () => {
		StatusBar.setBarStyle( 'dark-content' );
	}

	onClose = async () => {
		// Flush the editor first.
		const content = await this.editor.getContent();

		this.props.onChangePropertyValue( 'content', content );
		this.props.onClose();
	}

	render() {
		const { post } = this.props;

		return (
			<SafeAreaView style={ { flex: 1 } }>
				<StatusBar
					animated={ false }
					barStyle="dark-content"
					hidden={ false }
				/>
				<TextInput
					autoFocus={ ! post.title }
					placeholder="Enter title…"
					style={ styles.title }
					value={ post.title ? post.title.raw : null }
					onChangeText={ value => this.props.onChangePropertyValue( 'title', value ) }
					onSubmitEditing={ () => {} }
				/>
				<View style={ { flex: 1 } }>
					<Editor
						ref={ ref => this.editor = ref }
						contentCss={ CONTENT_CSS }
						placeholder="Start writing…"
						value={ post.content ? post.content.raw : null }
					/>
				</View>
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => {
	const activeSite = state.activeSite.id && state.sites[ state.activeSite.id ];

	return {
		site: activeSite,
	};
};

export default connect( mapStateToProps )( EditContent );
