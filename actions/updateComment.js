import updateObject from './updateObject';

export default function updateComment( comment ) {
	// workaround current issue with embedded objects in requests
	comment = {
		...comment,
		content: comment.content.raw,
	};
	return updateObject( comment, 'COMMENTS_COMMENT' );
}
