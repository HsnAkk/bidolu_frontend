import axios from 'axios';
import { SHOP_LIST_REQUEST, SHOP_LIST_SUCCESS, SHOP_LIST_FAIL,
         SHOP_DETAILS_REQUEST, SHOP_DETAILS_SUCCESS, SHOP_DETAILS_FAIL, 
         SHOP_SAVE_REQUEST, SHOP_SAVE_SUCCESS, SHOP_SAVE_FAIL, 
         SHOP_DELETE_REQUEST, SHOP_DELETE_SUCCESS, SHOP_DELETE_FAIL
        } from './types';


export const listShop = () => async (dispatch) => {
    dispatch({ type: SHOP_LIST_REQUEST });
    axios
        .get("/shops")
        .then( res => dispatch({
            type: SHOP_LIST_SUCCESS,
            payload: res.data
        }))
        .catch (err => dispatch({ type: SHOP_LIST_FAIL, payload: err.message }));
}



export const detailsShop = (shopId) => dispatch => {
    dispatch({ type: SHOP_DETAILS_REQUEST});
    axios
        .get(`/shops/${shopId}`)
        .then( res => dispatch({
            type: SHOP_DETAILS_SUCCESS,
            payload: res.data
        }))
        .catch (err => dispatch({ type: SHOP_DETAILS_FAIL, payload: err.message }));
}


export const saveShop = shop => (dispatch, getState) => {
    dispatch({ type: SHOP_SAVE_REQUEST, payload: shop });  
    const { userSignin: { userInfo } } = getState();  
    
    if (!shop._id) {
        axios
            .post('/shops', shop, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token,
                    "content-type": "multipart/form-data"
                }
            })
            .then( res => dispatch({
                type: SHOP_SAVE_SUCCESS,
                payload: res.data
            }))
            .catch (err => dispatch({ type: SHOP_SAVE_FAIL, payload: err.message }));
    } else {
        axios
            .put('/shops/' + shop._id, shop.formData, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token,
                    "content-type": "multipart/form-data"
                }
            })
            .then( res => dispatch({
                type: SHOP_SAVE_SUCCESS,
                payload: res.data
            }))
            .catch (err => dispatch({ type: SHOP_SAVE_FAIL, payload: err.message}));
    }
}


export const deleteShop = shopId => (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: SHOP_DELETE_REQUEST, payload: shopId });
    axios
        .delete("/shops/" + shopId, {
            headers: {
            Authorization: 'Bearer ' + userInfo.token
            }
        })
        .then( res => dispatch({
            type: SHOP_DELETE_SUCCESS,
            payload: res.data,
            success: true
        }))
        .catch (err => dispatch({ type: SHOP_DELETE_FAIL, payload: err.message}));
}

