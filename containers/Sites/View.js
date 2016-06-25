import React, { Component, ScrollView, View, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { values, isEmpty } from 'lodash'
import { fetchTypes, fetchTaxonomies, removeSite } from '../../actions'

export default class _View extends Component {

	componentDidMount() {
		if ( isEmpty( this.props.types ) ) {
			this.props.dispatch( fetchTypes() )
			this.props.dispatch( fetchTaxonomies() )
		}
	}
	onRefresh() {
		this.props.dispatch( fetchTypes() )
		this.props.dispatch( fetchTaxonomies() )
	}
	onSelectType( type ) {
		this.props.dispatch({
			type:'ROUTER_PUSH',
			payload:{
				name:'type-posts',
				data:{
					type:type.slug
				}
			}
		})
	}
	onRemoveSite() {
		this.props.dispatch( removeSite( this.props.activeSite.id ) )
	}
	render() {
		//var site = this.sites[ this.props.activeSite.id ]
		return (
			<ScrollView
				style={styles.container}
				refreshControl={
					<RefreshControl
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
										<Icon name="chevron-right" size={20} color="#A3A3A8" />
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
								<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'terms',data:{taxonomy:taxonomy.slug}}})}>
									<Icon style={styles.listItemIcon} name={iconName} size={16} color="#999999" />
									<Text style={styles.listItemName}>{taxonomy.name}</Text>
									<View style={styles.listItemValue}>
										<Icon name="chevron-right" size={20} color="#A3A3A8" />
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
					<TouchableOpacity style={styles.listItem} onPress={this.onRemoveSite.bind(this)}>
						<Text style={styles.listItemNameCentered}>Remove Site from App</Text>
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
		color: '#3D5D76',
		fontSize: 14,
		marginTop: 15,
		marginLeft: 15,
		marginBottom: 5,
	},
	list: {
		backgroundColor: 'white',
		borderColor: '#CBD8E2',
		borderTopWidth: 1,
		borderBottomWidth: 1,
	},
	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		height: 44,
		paddingLeft: 0,
	},
	listItemDivider: {
		borderBottomColor: '#C5D3DE',
		borderBottomWidth: 1,
		marginLeft: 60,
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
