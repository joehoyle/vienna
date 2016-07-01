import React, {
	Component,
} from 'react-native'
import PropTypes from '../../PropTypes'
import EditTerm from '../../components/Terms/Edit'

export default class Create extends Component {

	render() {
		var taxonomy = this.props.taxonomies[ this.props.routerData.taxonomy ]
		return (
			<EditTerm term={taxonomy.new} dispatch={this.props.dispatch} />
		)
	}
}
