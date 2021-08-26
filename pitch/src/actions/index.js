import streams from "../api/streams";
import history from "../history";
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	ADD_COMMENT
} from "./types";

export const signIn = (userId, userGivenName) => {
	return {
		type: SIGN_IN,
		payload: {userId, userGivenName}
	}
};

export const signOut = () => {
	return {
		type: SIGN_OUT
	}
};

export const createStream = formValues => async (dispatch, getState) => {
	const {userId} = getState().auth;
	const comments = [];
	const response = await streams.post('/streams', {...formValues, userId, comments});

	dispatch({type: CREATE_STREAM, payload: response.data});
	history.push('/')
};

export const fetchStreams = () => async dispatch => {
	const response = await streams.get('/streams');

	dispatch({type: FETCH_STREAMS, payload: response.data});
};

export const fetchStream = id => async dispatch => {
	const response = await streams.get(`/streams/${id}`);

	dispatch({type: FETCH_STREAM, payload: response.data});
};

export const editStream = (id, formValues) => async dispatch => {
	const response = await streams.patch(`/streams/${id}`, formValues);

	dispatch({type: EDIT_STREAM, payload: response.data});
	history.push('/')
};

export const deleteStream = id => async dispatch => {
	await streams.delete(`/streams/${id}`);

	dispatch({type: DELETE_STREAM, payload: id});
	history.push('/')
};

export const addComment = (id, formValues) => async (dispatch, getState) => {
	const {comments} = getState().streams.filter(stream => stream.id === id)[0];
	const commentId = ++comments.length;

	const comment = {
		'id': commentId,
		'author': getState().auth.userGivenName,
		'text': formValues
	};

	const response = await streams.patch(`/streams/${id}`, [...comments, comment]);

	dispatch({type: ADD_COMMENT, payload: response.data});
};