import React, { Component } from 'react';
import { updatePost } from '../../actions';
import Form from '../../components/Posts/Form';
import { connect } from 'react-redux';
import NavigationButton from '../../components/Navigation/Button';
import MediaEdit from '../../components/Media/Edit';

class Edit extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			post: { ...props.route.params.post },
		};
	}

	componentDidMount() {
		this.props.navigation.setOptions( {
			headerRight: () => (
				<NavigationButton
					onPress={ this.onSave }
				>
					Save
				</NavigationButton>
			),
		} );
	}

	onChangePropertyValue( property, value ) {
		let post = this.state.post;
		if ( property === 'content' || property === 'title' ) {
			post[property].raw = value;
		} else {
			post[property] = value;
		}
		this.setState( { post } );
	}

	onSave = () => {
		this.props.dispatch( updatePost( this.state.post ) );
		this.props.navigation.goBack();
	}

	render() {
		if ( ! this.props.route.params ) {
			return null;
		}

		const type = this.props.route.params.type;
		const slug = type._links['wp:items'][0].href.split( '/' ).slice( -1 )[0];
		let schema = this.props.sites[this.props.activeSite.id].routes[
			'/wp/v2/' + slug
		].schema;

		return (
			<>
				{ type.slug === 'attachment' &&
					<MediaEdit post={ this.state.post } />
				}
				<Form
					post={ this.state.post }
					schema={ schema }
					onChangePropertyValue={ ( p, v ) => this.onChangePropertyValue( p, v ) }
				/>
			</>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( Edit );
