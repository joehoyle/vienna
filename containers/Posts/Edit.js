import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { values, isEmpty } from 'lodash'
import PropTypes from '../../PropTypes'
import { updatePost } from '../../actions'
import SchemaFormField from '../../components/General/SchemaFormField'
import MultilineTextFormField from '../../components/General/FormFields/MultilineText'

export default class Edit extends Component {
	static navigatorButtons = {
		rightButtons: [
			{
				title: 'Save',
				id: 'save'
			}
		]
	}
	constructor(props) {
		super(props)
		this.state = {
			post: {...props.types[ props.type ].posts[ props.post ] }
		}
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent() {
		this.onSave()
	}
	onChangePropertyValue( property, value ) {
		var post = this.state.post
		if ( property === 'content' || property === 'title' ) {
			post[ property ].raw = value
		} else {
			post[ property ] = value
		}
		this.setState({post})
	}
	onSave() {
		this.props.dispatch( updatePost( this.state.post ) )
		this.props.navigator.pop()
	}
	render() {
		const type = this.props.types[ this.props.type ]
		const slug = type._links['wp:items'][0].href.split( '/' ).slice(-1)[0]
		var schema = this.props.sites[ this.props.activeSite.id ].routes[ '/wp/v2/' + slug ].schema
		var object = this.state.post

		var namesMap = {
			title: 'Title',
			slug: 'Slug',
			status: 'Status',
			date: 'Date',
			comment_status: 'Comment Status',
			ping_status: 'Ping Status',
			format: 'Format',
			sticky: 'Stick to Front',
			password: 'Post Password',
			description: 'Description',
		}

		var ignoreProperties = [
			'date_gmt',
			'author',
			'content',
			'title',
			'featured_media',
		]

		return (
			<ScrollView>
				<View style={styles.contentField}>
					<MultilineTextFormField
						value={object.title.raw}
						onChange={ value => this.onChangePropertyValue( 'title', value ) }
						onSave={()=>{}}
					/>
					<MultilineTextFormField
						value={object.content.raw}
						onChange={ value => this.onChangePropertyValue( 'content', value ) }
						onSave={()=>{}}
					/>
				</View>
				<View style={styles.list}>
					{Object.entries( schema.properties )
						.filter( properties => ignoreProperties.indexOf( properties[0] ) === -1 )
						.map( properties => {
						const propertySchema = properties[1]
						const property = properties[0]
						const value = object[ property ]

						if ( typeof value === 'undefined' ) {
							console.log( 'Can not find schema property ' + property + ' in object.' )
							return null
						}

						if ( propertySchema.readonly ) {
							return null;
						}

						return <View style={styles.listItem} key={property}>
							<SchemaFormField
								name={namesMap[ property ] ? namesMap[ property ] : property}
								schema={propertySchema}
								value={value}
								onChange={ value => this.onChangePropertyValue( property, value ) }
								onSave={()=>{}}
							/>
						</View>
					})}
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	list: {
		paddingTop: 15,
	},
	contentField: {
		margin: 10,
	},
})
