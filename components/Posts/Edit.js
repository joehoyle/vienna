import React, {
	View,
	Component,
	TouchableOpacity,
	StyleSheet, Text,
	TextInput,
	ScrollView,
	SegmentedControlIOS,
	Picker,
	Image
} from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Edit extends Component {
	static propTypes = {
		post: PropTypes.Post,
		onChange: React.PropTypes.func,
		media: React.PropTypes.objectOf( PropTypes.Media ),
	}

	render() {
		var post = this.props.post

		return (
			<View style={styles.container}>
				<ScrollView>
					<View style={styles.contentWrap}>
						<TextInput
							style={styles.title}
							onChangeText={()=>{}}
							value={post.title.raw}
							placeholder="Post title"
							placeholderTextColor="#AEC2D0"
						/>
						<View style={styles.divider}></View>
						<Text style={styles.content}>{post.content.raw}</Text>
					</View>

					<Text style={styles.sectionTitle}>TAXONOMY</Text>
					<View style={styles.list}>
						<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'select-categories', data: {postId: post.id}}})}>
							<Text style={styles.listItemName}>Categories</Text>
							<View style={styles.listItemValue}>
								<Text style={styles.listItemValueText}>Uncategorized</Text>
								<Icon name="chevron-right" size={20} color="#A3A3A8" />
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={styles.listItem}>
							<Text style={styles.listItemName}>Tags</Text>
							<View style={styles.listItemValue}>
								<Text style={styles.listItemValueText}>Uncategorized</Text>
								<Icon name="chevron-right" size={20} color="#A3A3A8" />
							</View>
						</TouchableOpacity>
					</View>
					<Text style={styles.sectionTitle}>PUBLISH</Text>
					<View style={styles.list}>
						<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'select-date', data: {postId: post.id}}})}>
							<Text style={styles.listItemName}>Publish</Text>
								<View style={styles.listItemValue}>
									<Text style={styles.listItemValueText}>
										{post.date ?
											new Date( post.date ).toUTCString()
										:
											'Immediately'
										}
									</Text>
									<Icon name="chevron-right" size={20} color="#A3A3A8" />
								</View>
						</TouchableOpacity>
						<View style={styles.listItem}>
							<Text style={styles.listItemName}>Status</Text>
							<View style={styles.listItemValue}>
								<View style={{width: 150}}>
									<SegmentedControlIOS
										style={{margin: -5}}
										values={['Draft', 'Published']}
										selectedIndex={0}
										tintColor="#3078B2"
									/>
								</View>
							</View>
						</View>
					</View>
					<Text style={styles.sectionTitle}>POST FORMAT</Text>
					<View style={styles.list}>
						<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'select-format', data: {postId: post.id}}})}>
							<Text style={styles.listItemName}>Post Format</Text>
							<View style={styles.listItemValue}>
								<Text style={styles.listItemValueText}>{post.format}</Text>
								<Icon name="chevron-right" size={20} color="#A3A3A8" />
							</View>
						</TouchableOpacity>
					</View>
					<Text style={styles.sectionTitle}>FEATURED IMAGE</Text>
					<View style={styles.list}>
						<TouchableOpacity style={styles.listItem} onPress={()=>this.props.dispatch({type:'ROUTER_PUSH',payload:{name:'select-featured-media', data: {postId: post.id}}})}>
							{this.props.media[post.featured_image] ?
								<Image
									source={{uri:this.props.media[post.featured_image].media_details.sizes.thumbnail.source_url}}
									style={{width:150,height:150}}
									/>
							: null }
							<Text style={styles.listItemTextButton}>Set Featured Image</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	contentWrap: {
		backgroundColor: 'white',
		paddingBottom: 10,
	},
	title: {
		fontSize: 28,
		fontFamily: 'Georgia',
		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		height: 28,
	},
	content: {
		fontSize: 15,
		lineHeight: 20,
		color: '#666',
		fontFamily: 'Georgia',
		marginLeft: 20,
		marginRight: 20,
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
	listItemTextButton: {
		color: '#3078B2',
		textAlign: 'center',
		flex: 1,
		fontSize: 16,
	},
})
