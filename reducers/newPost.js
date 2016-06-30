const defaultData = {
	id: -1,
	status: 'auto-draft',
	content: {
		raw: '',
		rendered: '',
	},
	excerpt: {
		raw: '',
		rendered: '',
	},
	title: {
		raw: '',
		rendered: '',
	},
	categories: [],
	tags: [],
	featured_image: 0,
	date: null,
}

export default function newPost( state = defaultData, action ) {
	return state
}
