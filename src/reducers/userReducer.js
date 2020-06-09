import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
         USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
         USER_LOGOUT,
         USER_GOOGLESIGNIN_REQUEST, USER_GOOGLESIGNIN_SUCCESS, USER_GOOGLESIGNIN_FAIL,
         USER_FACEBOOKSIGNIN_REQUEST, USER_FACEBOOKSIGNIN_SUCCESS, USER_FACEBOOKSIGNIN_FAIL,
         USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
         USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
         USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL,

        } from "../actions/types";



export function userSigninReducer(state = {} , action) {

    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };

        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_SIGNIN_FAIL:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};

        default: 
            return state;
    }
}


export function userRegisterReducer(state = {} , action) {

    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };
        
        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload };

        default: 
            return state;
    }
}

export function userGoogleSigninReducer(state = {} , action) {

    switch (action.type) {
        case USER_GOOGLESIGNIN_REQUEST:
            return { loading: true };

        case USER_GOOGLESIGNIN_SUCCESS:
            return { loading: false, userGoogleInfo: action.payload };

        case USER_GOOGLESIGNIN_FAIL:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};

        default: 
            return state;
    }
}

export function userFacebookSigninReducer(state = {} , action) {

    switch (action.type) {
        case USER_FACEBOOKSIGNIN_REQUEST:
            return { loading: true };

        case USER_FACEBOOKSIGNIN_SUCCESS:
            return { loading: false, userFacebookInfo: action.payload };

        case USER_FACEBOOKSIGNIN_FAIL:
            return { loading: false, error: action.payload };

        case USER_LOGOUT:
            return {};

        default: 
            return state;
    }
}


export function userListReducer (state = {userss: []}, action) {
    switch (action.type) {
        case USER_LIST_REQUEST :
            return {
                loading: true,
                users: []
            }
        case USER_LIST_SUCCESS :
            return {
                loading: false,
                users: action.payload
            }
        case USER_LIST_FAIL :
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export function userUpdateReducer(state = { user: {} }, action) {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { 
                loading: true 
            };
        case USER_UPDATE_SUCCESS:
            return { 
                loading: false, 
                success: true, 
                user: action.payload 
            };
        case USER_UPDATE_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }
        default:
            return state;
    }
}


export function userDeleteReducer(state = { user: {} }, action) {
    switch (action.type) {
        case USER_DELETE_REQUEST:
            return { 
                loading: true 
            };
        case USER_DELETE_SUCCESS:
            return { 
                loading: false, 
                user: action.payload, 
                success: true 
            };
        case USER_DELETE_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }
        default:
            return state;
    }
}