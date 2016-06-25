import React, { Text, Component, StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from '../../PropTypes'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class SelectableList extends Component {

	static propTypes = {
		terms: React.PropTypes.arrayOf( PropTypes.Term ).isRequired,
		selectedTerms: React.PropTypes.arrayOf( React.PropTypes.number ).isRequired,
		onChange: React.PropTypes.func.isRequired,
	}

	onChange( term ) {
		var terms = this.props.selectedTerms.slice()
		if ( terms.indexOf( term.id ) > -1 ) {
			terms.splice( terms.indexOf( term.id ), 1 )
		} else {
			terms.push( term.id )
		}
		this.props.onChange( terms )
	}

	render() {
		return (
			<View style={styles.list}>
				{this.props.terms.map( category => {
					return (
						<TouchableOpacity key={category.id} style={styles.listItem} onPress={this.onChange.bind(this,category)}>
							<Text style={styles.listItemName}>{category.name}</Text>
							{this.props.selectedTerms.indexOf( category.id ) > -1 ?
								<Icon name="check" size={20} color="#A3A3A8" />
							: null }
						</TouchableOpacity>
					)
				})}
			</View>
		)
	}
}

const styles = StyleSheet.create({
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
})
