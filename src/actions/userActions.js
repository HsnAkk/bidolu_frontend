import axios from "axios";
import Cookie from 'js-cookie';
import { returnErrors } from './errorActions';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, 
         USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, 
         USER_LOGOUT,
         USER_GOOGLESIGNIN_REQUEST, USER_GOOGLESIGNIN_SUCCESS, USER_GOOGLESIGNIN_FAIL,
         USER_FACEBOOKSIGNIN_REQUEST, USER_FACEBOOKSIGNIN_SUCCESS, USER_FACEBOOKSIGNIN_FAIL,
         USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL,
         USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
         USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL
        } from "./types";



export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("/users/signin", { email, password });
        //console.log('data from signin :', data)
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));
        

    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'USER_LOGIN_FAIL'));
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    }
}



export const register = (name, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
    try {
        const { data } = await axios.post("/users/register", { name, email, password });

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch(returnErrors(error.response.data, error.response.status, 'USER_REGISTER_FAIL'));
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}


export const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    Cookie.remove("userGoogleInfo");
    Cookie.remove("userFacebookInfo");
    dispatch({ type: USER_LOGOUT })
}


export const googleSignin = id => async (dispatch) => {
    dispatch({ type: USER_GOOGLESIGNIN_REQUEST });
    try {
        const { data }  = await axios.get(`/users/signin/google/${id}`);
        dispatch({ type: USER_GOOGLESIGNIN_SUCCESS, payload: data });
        Cookie.set('userGoogleInfo', JSON.stringify(data));

    } catch (error) {
        //dispatch(returnErrors(error.response.data, error.response.status, 'USER_GOOGLESIGNIN_FAIL'));
        dispatch({ type: USER_GOOGLESIGNIN_FAIL, payload: error.message });
    }
}


export const facebookSignin = id => async (dispatch) => {
    dispatch({ type: USER_FACEBOOKSIGNIN_REQUEST });
    try {
        
        const { data } = await axios.get(`/users/signin/facebook/${id}`);
        
        dispatch({ type: USER_FACEBOOKSIGNIN_SUCCESS, payload: data });
        Cookie.set('userFacebookInfo', JSON.stringify(data));

    } catch (error) {
        //dispatch(returnErrors(error.response.data, error.response.status, 'USER_FACEBOOKSIGNIN_FAIL'));
        dispatch({ type: USER_FACEBOOKSIGNIN_FAIL, payload: error.message });
    }
}


export const listUsers = () => async (dispatch) => {
    dispatch({ type: USER_LIST_REQUEST });
    axios
        .get("/users")
        .then( res => dispatch({
            type: USER_LIST_SUCCESS,
            payload: res.data
        }))
        .catch (err => dispatch({ type: USER_LIST_FAIL, payload: err.message }));
}


export const updateUser = user => (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });  
    const { userSignin: { userInfo } } = getState();  
    
    axios
        .put('/users/' + user._id, user, {
            headers: {
                'Authorization': 'Bearer ' + userInfo.token
            }
        })
        .then( res => dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: res.data
        }))
        .catch (err => dispatch({ type: USER_UPDATE_FAIL, payload: err.message}));
}


export const deleteUser = userId => (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_DELETE_REQUEST, payload: userId });
    axios
        .delete("/users/" + userId, {
            headers: {
            Authorization: 'Bearer ' + userInfo.token
            }
        })
        .then( res => dispatch({
            type: USER_DELETE_SUCCESS,
            payload: res.data,
            success: true
        }))
        .catch (err => dispatch({ type: USER_DELETE_FAIL, payload: err.message}));
}

