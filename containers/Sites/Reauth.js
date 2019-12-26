import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateSiteCredentials from '../../actions/updateSiteCredentials';
import Authorize from '../../components/Setup/Authorize';

class Reauth extends Component {
	onAuthorize = ( id, token ) => {
		this.props.updateSiteCredentials(
			this.props.site.id,
			{
				client: {
					id: id,
				},
				token: {
					public: token,
				},
			}
		);

		// We're done, go home!
		this.props.navigation.goBack();
	}

	render() {
		return (
			<Authorize
				authentication={ this.props.site.authentication }
				onAuthorize={ this.onAuthorize }
			/>
		);
	}
}

const mapStateToProps = state => ( {
	siteid: state.activeSite.id,
	site: state.activeSite.id ? state.sites[ state.activeSite.id ] : null,
} );

const mapDispatchToProps = dispatch => ( {
	updateSiteCredentials: ( ...args ) => dispatch( updateSiteCredentials( ...args ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Reauth );
