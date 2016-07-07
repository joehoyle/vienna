import { PropTypes }  from 'react'

export default {
	User: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		avatar_urls: PropTypes.shape({
			24: PropTypes.string.isRequired,
			48: PropTypes.string.isRequired,
			96: PropTypes.string.isRequired,
		}),
	}),
	Post: PropTypes.shape({
		id: PropTypes.number.isRequired,
		title: PropTypes.shape({
			raw: PropTypes.string.isRequired,
			rendered: PropTypes.string.isRequired,
		}),
		content: PropTypes.shape({
			raw: PropTypes.string.isRequired,
			rendered: PropTypes.string.isRequired,
		}),
		date: PropTypes.string,
		excerpt: PropTypes.shape({
			raw: PropTypes.string.isRequired,
			rendered: PropTypes.string.isRequired,
		}),
	}),
	Term: PropTypes.shape({
		id: PropTypes.number.isRequired,
		count: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		slug: PropTypes.string.isRequired,
		parent: PropTypes.number,
	}),
	Media: PropTypes.shape({
		id: PropTypes.number.isRequired,
		media_details: PropTypes.object.isRequired,
	}),
}
