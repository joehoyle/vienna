import React, { Component } from 'react'
import { updatePost } from '../../actions'
import Form from '../../components/Posts/Form'

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
		//this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
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

		return <Form
			post={this.state.post}
			schema={schema}
			onChangePropertyValue={(p, v) => this.onChangePropertyValue( p, v )}
		/>
	}
}
