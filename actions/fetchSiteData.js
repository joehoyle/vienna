import httpapi from '../api';
import parseUrl from 'url-parse';

export default function fetchSiteData() {
	return ( dispatch, getStore ) => {
		dispatch( {
			type: 'SITE_DATA_UPDATING',
		} );

		const store = getStore();
		const site = store.sites[store.activeSite.id];
		const api = new httpapi( site );

		api.get( '/', { context: 'help' } )
			.then( data => {
				dispatch( {
					type: 'SITE_DATA_UPDATED',
					payload: {
						site: data,
					},
				} );
			} )
			.catch( error => {
				dispatch( {
					type: 'SITE_DATA_UPDATE_ERRORED',
					payload: {
						error,
					},
				} );
			} );

		dispatch( {
			type: 'SITE_DATA_PROFILE_UPDATING',
		} );

		api.get( '/wp/v2/users/me', { context: 'edit' } )
			.then( data => {
				dispatch( {
					type: 'SITE_DATA_PROFILE_UPDATED',
					payload: {
						data,
						siteId: site.id,
					},
				} );
			} )
			.catch( error => {
				dispatch( {
					type: 'SITE_DATA_PROFILE_UPDATE_ERRORED',
					payload: {
						error,
						siteId: site.id,
					},
				} );
			} );

		fetch(
			`http://favicongrabber.com/api/grab/${
				parseUrl( site.url ).hostname
			}`,
		)
			.then( r => r.json() )
			.then( siteData => {
				if ( ! siteData.icons.length ) {
					return;
				}

				dispatch( {
					type: 'SITE_DATA_ICONS_UPDATED',
					payload: {
						icons: siteData.icons,
						siteId: site.id,
					},
				} );
			} );
	};
}
