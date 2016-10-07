import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { createTerm } from '../../actions'
import Form from '../../components/Terms/Form'

export default class Add extends Component {
	static navigatorButtons = {
		rightButtons: [{
			title: 'Save',
			id: 'save'
		}]
	}
	constructor(props) {
		super(props)
		this.state = {
			term: {}
		}
		props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
	}
	onNavigatorEvent() {
		this.onSave()
	}
	onChangePropertyValue( property, value ) {
		var term = this.state.term
		term[ property ] = value
		this.setState({term})
	}
	onSave() {
		this.props.dispatch( createTerm( this.state.term, this.props.taxonomy ) )
		this.props.navigator.pop()
	}
	render() {
		const taxonomy = this.props.taxonomies[ this.props.taxonomy ]
		const slug = taxonomy._links['wp:items'][0].href.split( '/' ).slice(-1)[0]
		var schema = this.props.sites[ this.props.activeSite.id ].routes[ '/wp/v2/' + slug ].schema
		var object = this.state.term

		return <Form
			term={this.state.term}
			schema={schema}
			onChangePropertyValue={(p, v) => this.onChangePropertyValue( p, v )}
		/>
	}
}
