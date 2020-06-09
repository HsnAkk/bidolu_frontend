import axios from "axios";
import {
        ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
        ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
        ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
        MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
        ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, 
        ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
        } from "./types";



export const createOrder = order => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
       
        const { userSignin: { userInfo } } = getState();
        const { userGoogleSignin: { userGoogleInfo } } = getState();
        const { userFacebookSignin: { userFacebookInfo } } = getState();
        
        const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token
        const { data: { data: newOrder } } = await axios.post("/orders", order, {
            headers: {
                Authorization: ' Bearer ' + tokenParam
            }
        });
        
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
    }
}


export const detailsOrder = orderId => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { userGoogleSignin: { userGoogleInfo } } = getState();
        const { userFacebookSignin: { userFacebookInfo } } = getState();
        const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token
        const { data } = await axios.get("/orders/" + orderId, {
        headers:
            { Authorization: 'Bearer ' + tokenParam }
        });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
    }
}

export const payOrder = (order, paymentResult, method) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });

        const { userSignin: { userInfo } } = getState();
        const { userGoogleSignin: { userGoogleInfo } } = getState();
        const { userFacebookSignin: { userFacebookInfo } } = getState();
        const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token

        const { data } = await axios.put("/orders/" + order._id + "/pay", { paymentResult, method}, {
            headers:
            { Authorization: 'Bearer ' + tokenParam }
        });
        
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
    }
}


export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: MY_ORDER_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { userGoogleSignin: { userGoogleInfo } } = getState();
        const { userFacebookSignin: { userFacebookInfo } } = getState();
        const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token
        const { data } = await axios.get("/orders/mine", {
            headers:
            { Authorization: 'Bearer ' + tokenParam }
        });
        dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data })
        
    } catch (error) {
        dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
    }
}


export const listOrders = () => async (dispatch, getState) => {

    try {
        dispatch({ type: ORDER_LIST_REQUEST });

        const { userSignin: { userInfo } } = getState();
        const { userGoogleSignin: { userGoogleInfo } } = getState();
        const { userFacebookSignin: { userFacebookInfo } } = getState();
        //const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token
        const { data } = await axios.get("/orders", {
            headers:
            { Authorization: 'Bearer ' + userInfo.token }
        });

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
    }
}



export const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {

      dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });

      const { userSignin: { userInfo } } = getState();
      const { userGoogleSignin: { userGoogleInfo } } = getState();
      const { userFacebookSignin: { userFacebookInfo } } = getState();
      const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token
      const { data } = await axios.delete("/orders/" + orderId, {
        headers:
          { Authorization: 'Bearer ' + tokenParam }
      });

      dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({ type: ORDER_DELETE_FAIL, payload: error.message });
    }
}
