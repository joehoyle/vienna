import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { values, isEmpty } from 'lodash'
import PropTypes from '../../PropTypes'
import { updateUser } from '../../actions'
import SchemaFormField from '../../components/General/SchemaFormField'

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
			user: {...props.users.users[ this.props.user ]}
		}
		this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent() {
		this.onSave()
	}
	onChangePropertyValue( property, value ) {
		var user = this.state.user
		user[ property ] = value
		this.setState({user: user})
	}
	onSave() {
		this.props.dispatch( updateUser( this.state.user ) )
		this.props.navigator.pop()
	}
	render() {
		var schema = this.props.users.schema
		var object = this.state.user

		var namesMap = {
			username: 'Username',
			name: 'Name',
			first_name: 'First Name',
			last_name: 'Last Name',
			email: 'Email Address',
			url: 'Website',
			description: 'Bio',
			nickname: 'Nickname',
			slug: 'Name in URL',
			roles: 'Roles',
		}

		return (
			<ScrollView>
				<View style={styles.list}>
					{Object.entries( schema.properties ).map( properties => {
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
	}
})
