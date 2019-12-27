import React, { Component } from 'react';
import { ScrollView, View, RefreshControl, StyleSheet } from 'react-native';
import { isEmpty } from 'lodash';
import { fetchSettings, changeSetting, updateSettings } from '../../actions';
import SchemaFormField from '../../components/General/SchemaFormField';
import ListError from '../../components/General/ListError';
import { connect } from 'react-redux';

const styles = StyleSheet.create( {
	list: {
		paddingTop: 15,
	},
} );

class List extends Component {
	static navigationOptions = ( { navigationOptions, navigation } ) => ( {
		title: 'Settings',
	} );
	componentDidMount() {
		if ( isEmpty( this.props.settings.settings ) ) {
			this.props.dispatch( fetchSettings() );
		}
	}
	onRefresh() {
		this.props.dispatch( fetchSettings() );
	}
	onChangeSettingValue( setting, value ) {
		this.props.dispatch( changeSetting( setting, value ) );
	}
	onUpdateSettings() {
		this.props.dispatch( updateSettings( this.props.settings.settings ) );
	}
	render() {
		let settings = this.props.settings.settings;

		let settingsNamesMap = {
			title: 'Site Title',
			description: 'Site Description',
			url: 'Site URL',
			email: 'Contact Email',
			timezone: 'Timezone',
			date_format: 'Date Format',
			time_format: 'Time Format',
			start_of_week: 'Start of Week',
			language: 'Site Language',
			use_smilies: 'Smiley Support',
			default_category: 'Default Category',
			default_post_format: 'Default Post Format',
			posts_per_page: 'Posts Per Page',
			default_ping_status: 'Default Ping Status',
			default_comment_status: 'Default Comment Status',
		};

		return (
			<ScrollView
				refreshControl={
					<RefreshControl
						refreshing={ this.props.settings.list.loading }
						style={ { backgroundColor: 'transparent' } }
						onRefresh={ this.onRefresh.bind( this ) }
						tintColor="#666666"
						title={
							this.props.settings.list.loading
								? 'Loading Settings...'
								: 'Pull to Refresh...'
						}
						titleColor="#000000"
					/>
				}
			>
				{ this.props.settings.list.lastError ? (
					<ListError error={ this.props.settings.list.lastError } />
				) : null }
				<View style={ styles.list }>
					{ Object.entries( settings ).map( properties => {
						const value = properties[1];
						const setting = properties[0];
						const schema = this.props.settings.schema.properties[setting];
						return (
							<View style={ styles.listItem } key={ setting }>
								<SchemaFormField
									name={
										settingsNamesMap[setting]
											? settingsNamesMap[setting]
											: setting
									}
									schema={ schema }
									value={ value }
									onChange={ value => this.onChangeSettingValue( setting, value ) }
									onSave={ () => this.onUpdateSettings() }
								/>
							</View>
						);
					} ) }
				</View>
			</ScrollView>
		);
	}
}

export default connect( state => ( {
	...state,
	...( state.activeSite.id ? state.sites[state.activeSite.id].data : null ),
} ) )( List );
