import React, {
	Component,
} from 'react-native'
import PropTypes from '../../PropTypes'
import EditTerm from '../../components/Terms/Edit'

export default class Edit extends Component {
	render() {
		var term = this.props.taxonomies[ this.props.routerData.taxonomy ].terms[ this.props.routerData.termId ]

		return (
			<EditTerm term={term} />
		)
	}
}
