import updateObject from './updateObject';

export default function updateUser( user ) {
	return updateObject( user, 'USERS_USER' );
}
