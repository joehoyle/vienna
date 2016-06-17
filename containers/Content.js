import React, { Component, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class List extends Component {

	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.sectionTitle}>TYPES</Text>
				<View style={styles.list}>
					<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'posts'}})}>
						<Text style={styles.listItemName}><Icon name="pencil" size={16} color="#999999" /> Posts</Text>
						<View style={styles.listItemValue}>
							<Icon name="chevron-right" size={20} color="#A3A3A8" />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'posts'}})}>
						<Text style={styles.listItemName}><Icon name="file-powerpoint-o" size={16} color="#999999" /> Pages</Text>
						<View style={styles.listItemValue}>
							<Icon name="chevron-right" size={20} color="#A3A3A8" />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'media'}})}>
						<Text style={styles.listItemName}><Icon name="picture-o" size={16} color="#999999" /> Media</Text>
						<View style={styles.listItemValue}>
							<Icon name="chevron-right" size={20} color="#A3A3A8" />
						</View>
					</TouchableOpacity>
				</View>

				<Text style={styles.sectionTitle}>TAXONOMIES</Text>
				<View style={styles.list}>
					<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'categories'}})}>
						<Text style={styles.listItemName}><Icon name="list" size={16} color="#999999" /> Categories</Text>
						<View style={styles.listItemValue}>
							<Icon name="chevron-right" size={20} color="#A3A3A8" />
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'tags'}})}>
						<Text style={styles.listItemName}><Icon name="tags" size={16} color="#999999" /> Tags</Text>
						<View style={styles.listItemValue}>
							<Icon name="chevron-right" size={20} color="#A3A3A8" />
						</View>
					</TouchableOpacity>
				</View>

				<Text style={styles.sectionTitle}></Text>
				<View style={styles.list}>
					<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'posts'}})}>
						<Text style={styles.listItemName}><Icon name="comments" size={16} color="#999999" /> Comments</Text>
						<View style={styles.listItemValue}>
							<Icon name="chevron-right" size={20} color="#A3A3A8" />
						</View>
					</TouchableOpacity>
				</View>

				<Text style={styles.sectionTitle}></Text>
				<View style={styles.list}>
					<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'posts'}})}>
						<Text style={styles.listItemName}><Icon name="users" size={16} color="#999999" /> Users</Text>
						<View style={styles.listItemValue}>
							<Icon name="chevron-right" size={20} color="#A3A3A8" />
						</View>
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
		borderBottomColor: '#C5D3DE',
		borderBottomWidth: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		paddingLeft: 15,
	},
	listItemName: {
		fontSize: 16,
	},
	listItemValue: {
		flexDirection: 'row',
	},
	listItemValueText: {
		marginRight: 5,
		fontSize: 16,
		color: '#7595AE',
	},
})
