import fetchTypes from './actions/fetchTypes'
import fetchTaxonomies from './actions/fetchTaxonomies'
import fetchTerms from './actions/fetchTerms'
import fetchUsers from './actions/fetchUsers'
import fetchPosts from './actions/fetchPosts'
import fetchComments from './actions/fetchComments'
import createPost from './actions/createPost'
import createComment from './actions/createComment'
import removeLocalData from './actions/removeLocalData'
import editPost from './actions/editPost'
import trashPost from './actions/trashPost'
import trashComment from './actions/trashComment'
import updatePost from './actions/updatePost'
import viewPost from './actions/viewPost'
import addSite from './actions/addSite'
import removeSite from './actions/removeSite'
import uploadImage from './actions/uploadImage'

export {
	removeLocalData,
	fetchUsers,
	fetchPosts,
	editPost,
	trashPost,
	trashComment,
	updatePost,
	createPost,
	createComment,
	viewPost,
	addSite,
	removeSite,
	uploadImage,
	fetchTypes,
	fetchTaxonomies,
	fetchTerms,
	fetchComments,
}
