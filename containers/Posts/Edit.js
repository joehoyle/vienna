import React, { Component } from 'react';
import { updatePost } from '../../actions';
import Form from '../../components/Posts/Form';
import { connect } from 'react-redux';
import NavigationButton from '../../components/Navigation/Button';

class Edit extends Component {
	static navigationOptions = ({ navigationOptions, navigation }) => ({
		title: `Edit ${navigation.state.params.type.labels.singular_name}`,
		headerRight: (
			<NavigationButton onPress={() => _this.onSave()}>Save</NavigationButton>
		)
	});
	constructor(props) {
		super(props);
		this.state = {
			post: { ...props.navigation.state.params.post },
		};
		_this = this; // Big hack, see https://github.com/react-community/react-navigation/issues/145
	}
	onChangePropertyValue(property, value) {
		var post = this.state.post;
		if (property === 'content' || property === 'title') {
			post[property].raw = value;
		} else {
			post[property] = value;
		}
		this.setState({ post });
	}
	onSave() {
		this.props.dispatch(updatePost(this.state.post));
		this.props.navigation.goBack();
	}
	render() {
		const type = this.props.navigation.state.params.type;
		const slug = type._links['wp:items'][0].href.split('/').slice(-1)[0];
		var schema = this.props.sites[this.props.activeSite.id].routes[
			'/wp/v2/' + slug
		].schema;
		var object = this.state.post;

		return (
			<Form
				post={this.state.post}
				schema={schema}
				onChangePropertyValue={(p, v) => this.onChangePropertyValue(p, v)}
			/>
		);
	}
}

export default connect(state => ({
	...state,
	...(state.activeSite.id ? state.sites[state.activeSite.id].data : null),
}))(Edit);
