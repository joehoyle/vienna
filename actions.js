import fetchTypes from './actions/fetchTypes'
import fetchTaxonomies from './actions/fetchTaxonomies'
import fetchTerms from './actions/fetchTerms'
import fetchUsers from './actions/fetchUsers'
import fetchPosts from './actions/fetchPosts'
import fetchComments from './actions/fetchComments'
import createPost from './actions/createPost'
import createComment from './actions/createComment'
import removeLocalData from './actions/removeLocalData'
import updateUser from './actions/updateUser'
import trashPost from './actions/trashPost'
import trashComment from './actions/trashComment'
import updatePost from './actions/updatePost'
import addSite from './actions/addSite'
import authorizeSite from './actions/authorizeSite'
import removeSite from './actions/removeSite'
import uploadImage from './actions/uploadImage'
import fetchSiteData from './actions/fetchSiteData'
import fetchSettings from './actions/fetchSettings'
import updateSettings from './actions/updateSettings'
import updateTerm from './actions/updateTerm'
import updateComment from './actions/updateComment'
import changeSetting from './actions/changeSetting'

export {
	removeLocalData,
	fetchUsers,
	fetchPosts,
	trashPost,
	trashComment,
	updatePost,
	updateUser,
	createPost,
	createComment,
	addSite,
	removeSite,
	uploadImage,
	fetchTypes,
	fetchTaxonomies,
	fetchTerms,
	fetchComments,
	fetchSiteData,
	fetchSettings,
	changeSetting,
	updateSettings,
	updateTerm,
	updateComment,
	authorizeSite,
}
