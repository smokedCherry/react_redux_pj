import _ from 'lodash';

import {
	CREATE_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	ADD_COMMENT
} from "../actions/types";

const streamReducer = (state = {}, action) => {
	switch (action.type) {
		case (CREATE_STREAM):
			console.log('payload is ', action.payload);
			// console.log({...state, [action.payload.id]: action.payload});
			return {...state, [action.payload.id]: action.payload};
		case (FETCH_STREAMS):
			return {...state, ..._.mapKeys(action.payload, 'id')};
		case (FETCH_STREAM):
			return {...state, [action.payload.id]: action.payload};
		case (EDIT_STREAM):
			return {...state, [action.payload.id]: action.payload};
		case (DELETE_STREAM):
			return _.omit(state, action.payload);
		case (ADD_COMMENT):
			return {...state, [action.payload.id]: action.payload};
		default:
			return state;
	}
};

export default streamReducer;