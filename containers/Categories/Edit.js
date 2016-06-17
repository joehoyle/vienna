import React, {
	Component,
} from 'react-native'
import PropTypes from '../../PropTypes'
import EditCategory from '../../components/Terms/Edit'

export default class Edit extends Component {
	render() {
		var category = this.props.categories[ this.props.routerData.categoryId ]

		return (
			<EditCategory term={category} />
		)
	}
}
