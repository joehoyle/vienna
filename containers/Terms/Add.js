import React, { Component } from 'react';
import {
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';
import { createTerm } from '../../actions';
import Form from '../../components/Terms/Form';
import { connect } from 'react-redux';
import NavigationButton from '../../components/Navigation/Button';

class Add extends Component {
	static navigationOptions = ({ navigationOptions, navigation }) => ({
		title: `Add ${navigation.state.params.taxonomy.labels.singular_name}`,
		headerRight: (
			<NavigationButton onPress={() => _this.onSave()}>Save</NavigationButton>
		),
	});
	constructor(props) {
		super(props);
		this.state = {
			term: {},
		};
		_this = this; // Big hack, see https://github.com/react-community/react-navigation/issues/145
	}
	onChangePropertyValue(property, value) {
		var term = this.state.term;
		term[property] = value;
		this.setState({ term });
	}
	onSave() {
		this.props.dispatch(
			createTerm(
				this.state.term,
				this.props.navigation.state.params.taxonomy.slug
			)
		);
		this.props.navigation.toBack();
	}
	render() {
		const taxonomy = this.props.navigation.state.params.taxonomy;
		const slug = taxonomy._links['wp:items'][0].href.split('/').slice(-1)[0];
		var schema = this.props.sites[this.props.activeSite.id].routes[
			'/wp/v2/' + slug
		].schema;
		var object = this.state.term;

		return (
			<Form
				term={this.state.term}
				schema={schema}
				onChangePropertyValue={(p, v) => this.onChangePropertyValue(p, v)}
			/>
		);
	}
}

export default connect(state => ({
	...state,
	...(state.activeSite.id ? state.sites[state.activeSite.id].data : null),
}))(Add);
