import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, TouchableOpacity, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { values, isEmpty } from 'lodash'
import { removeLocalData, fetchTypes, fetchTaxonomies, removeSite, fetchSiteData, authorizeSite } from '../../actions'

export default class _View extends Component {
	componentDidMount() {
		if ( isEmpty( this.props.types ) ) {
			this.props.dispatch( fetchTypes() )
			this.props.dispatch( fetchTaxonomies() )
		}
	}
	onRemoveLocalData() {
		this.props.dispatch( removeLocalData() )
		this.props.dispatch( fetchTypes() )
		this.props.dispatch( fetchTaxonomies() )
		this.props.dispatch( fetchSiteData() )
	}
	onRefresh() {
		this.props.dispatch( fetchTypes() )
		this.props.dispatch( fetchTaxonomies() )
	}
	onSelectType( type ) {
		this.props.navigator.push({
			screen: 'PostsList',
			passProps: {
				type: type.slug
			},
			title: type.name,
			backButtonTitle: this.getTruncatedTitle(),
		})
	}
	onSelectTaxonomy( taxonomy ) {
		this.props.navigator.push({
			screen: 'TermsList',
			passProps: {
				taxonomy: taxonomy.slug,
			},
			title: taxonomy.name,
			backButtonTitle: this.getTruncatedTitle(),
		})
	}
	onSelectUsers() {
		this.props.navigator.push({
			screen: 'UsersList',
			title: 'Users',
			backButtonTitle: this.getTruncatedTitle(),
		})
	}
	onSelectComments() {
		this.props.navigator.push({
			screen: 'CommentsList',
			title: 'Comments',
			backButtonTitle: this.getTruncatedTitle(),
		})
	}
	onSelectSettings() {
		this.props.navigator.push({
			screen: 'SettingsList',
			title: 'Settings',
			backButtonTitle: this.getTruncatedTitle(),
		})
	}
	onRemoveSite() {
		this.props.navigator.pop()
		this.props.dispatch( removeSite( this.props.activeSite.id ) )
	}
	getTruncatedTitle() {
		const length = 10;
		const site = this.props.sites[ this.props.activeSite.id ]
		var trimmedString = site.name.length > length ?
			site.name.substring(0, length - 3) + "..." :
			site.name
		return trimmedString
	}
	onReauthorize() {
		const site = this.props.sites[ this.props.activeSite.id ]
		this.props.dispatch( authorizeSite( site ) )
	}
	render() {

		var chevron = <Icon name="chevron-right" size={20} color="#BBBBBB" />

		return (
			<ScrollView
				style={styles.container}
				refreshControl={<RefreshControl
					refreshing={false}
					style={{backgroundColor: 'transparent'}}
					onRefresh={this.onRefresh.bind(this)}
					tintColor="#666666"
					title="Pull to refresh..."
					titleColor="#000000"
					/>
				}>
				<Text style={styles.sectionTitle}>TYPES</Text>
				<View style={styles.list}>
					{values(this.props.types).map( ( type, i, arr ) => {
						var iconsMap = {
							attachment: 'picture-o',
							page: 'file-powerpoint-o',
							attachment: 'picture-o',
						}

						var iconName = iconsMap[ type.slug ] ? iconsMap[ type.slug ] : 'pencil'

						return (
							<View key={type.slug}>
								<TouchableOpacity style={styles.listItem} onPress={this.onSelectType.bind(this,type)}>
									<Icon style={styles.listItemIcon} name={iconName} size={16} color="#999999" />
									<Text style={styles.listItemName}>{type.name}</Text>
									<View style={styles.listItemValue}>
										{chevron}
									</View>
								</TouchableOpacity>
								{i < arr.length - 1 ?
									<View style={styles.listItemDivider} />
								: null }
							</View>
						)
					})}
				</View>

				<Text style={styles.sectionTitle}>TAXONOMIES</Text>
				<View style={styles.list}>
					{values(this.props.taxonomies).map( ( taxonomy, i, arr ) => {
						var iconsMap = {
							category: 'list',
						}

						var iconName = iconsMap[ taxonomy.slug ] ? iconsMap[ taxonomy.slug ] : 'tags'

						return (
							<View key={taxonomy.slug}>
								<TouchableOpacity style={styles.listItem} onPress={ () => this.onSelectTaxonomy( taxonomy ) }>
									<Icon style={styles.listItemIcon} name={iconName} size={16} color="#999999" />
									<Text style={styles.listItemName}>{taxonomy.name}</Text>
									<View style={styles.listItemValue}>
										{chevron}
									</View>
								</TouchableOpacity>
								{i < arr.length - 1 ?
									<View style={styles.listItemDivider} />
								: null }
							</View>
						)

					})}
				</View>
				<Text style={styles.sectionTitle}></Text>
				<View style={styles.list}>
					<TouchableOpacity style={styles.listItem} onPress={ () => this.onSelectComments() }>
						<Icon style={styles.listItemIcon} name="comments" size={16} color="#999999" />
						<Text style={styles.listItemName}>Comments</Text>
						<View style={styles.listItemValue}>{chevron}</View>
					</TouchableOpacity>
					<View style={styles.listItemDivider} />
					<TouchableOpacity style={styles.listItem} onPress={ ()=> this.onSelectUsers() }>
						<Icon style={styles.listItemIcon} name="users" size={16} color="#999999" />
						<Text style={styles.listItemName}>Users</Text>
						<View style={styles.listItemValue}>{chevron}</View>
					</TouchableOpacity>
					{this.props.settings.available ?
						<TouchableOpacity style={styles.listItem} onPress={ () => this.onSelectSettings() }>
							<Icon style={styles.listItemIcon} name="gear" size={20} color="#999999" />
							<Text style={styles.listItemName}>Settings</Text>
							<View style={styles.listItemValue}>{chevron}</View>
						</TouchableOpacity>
					: null }
				</View>
				<Text style={styles.sectionTitle}></Text>
				<View style={styles.list}>
					<TouchableOpacity style={styles.listItem} onPress={this.onRemoveSite.bind(this)}>
						<Text style={styles.listItemNameCentered}>Remove Site from App</Text>
					</TouchableOpacity>
					<View style={styles.listItemDivider} />
					<TouchableOpacity style={styles.listItem} onPress={this.onRemoveLocalData.bind(this)}>
						<Text style={styles.listItemNameCentered}>Remove Local Data</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.listItem} onPress={this.onReauthorize.bind(this)}>
						<Text style={styles.listItemNameCentered}>Reauthorize</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	divider: {
		borderBottomColor: '#F0F4F7',
		borderBottomWidth: 1,
		margin: 20,
	},
	sectionTitle: {
		color: '#999999',
		fontSize: 11,
		marginTop: 15,
		marginLeft: 60,
	},
	list: {

	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		height: 40,
		paddingLeft: 0,
	},
	listItemDivider: {
		borderBottomColor: '#f1f1f1',
		marginLeft: 60,
		marginRight: 30,
	},
	listItemName: {
		fontSize: 16,
		flex: 1,
	},
	listItemNameCentered: {
		textAlign: 'center',
		color: 'red',
		flex: 1,
	},
	listItemIcon: {
		width: 38,
		marginLeft: 22,
	},
	listItemValue: {
		flexDirection: 'row',
	},
})
