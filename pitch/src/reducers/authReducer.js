import {SIGN_IN, SIGN_OUT} from "../actions/types";

const INITIAL_STATE = {
	isSignedIn: null,
	userId: null,
	userGivenName: null
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {...state, isSignedIn: true, userId: action.payload.userId, userGivenName: action.payload.userGivenName};
		case SIGN_OUT:
			return {...state, isSignedIn: false, userId: null, userGivenName: null};
		default:
			return state;
	}
};

export default authReducer;