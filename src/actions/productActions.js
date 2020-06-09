import axios from 'axios';
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
         PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
         PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, 
         PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
         ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL,
         UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAIL,
         DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL
        } from './types';


export const listProduct = () => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    axios
        .get("/products")
        .then( res => dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data
        }))
        .catch (err => dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message }));
}



export const detailsProduct = (productId) => dispatch => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST});
    axios
        .get(`/products/${productId}`)
        .then( res => dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: res.data
        }))
        .catch (err => dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message }));
}


export const saveProduct = product => (dispatch, getState) => {
    
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });  
    const { userSignin: { userInfo } } = getState();  
    
    if (!product._id) {
        axios
            .post('/products', product, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token,
                    "content-type": "multipart/form-data"
                }
            })
            .then( res => dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: res.data
            }))
            .catch (err => dispatch({ type: PRODUCT_SAVE_FAIL, payload: err.message }));
    } else {
        axios
            .put('/products/' + product._id, product.formData, {
                headers: {
                    'Authorization': 'Bearer ' + userInfo.token,
                    "content-type": "multipart/form-data"
                }
            })
            .then( res => dispatch({
                type: PRODUCT_SAVE_SUCCESS,
                payload: res.data
            }))
            .catch (err => dispatch({ type: PRODUCT_SAVE_FAIL, payload: err.message}));
    }
}


export const deleteProduct = productId => (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    axios
        .delete("/products/" + productId, {
            headers: {
            Authorization: 'Bearer ' + userInfo.token
            }
        })
        .then( res => dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: res.data,
            success: true
        }))
        .catch (err => dispatch({ type: PRODUCT_DELETE_FAIL, payload: err.message}));
}


export const addReview = (productId, review) => async (dispatch, getState) => {
    
    if (!review._id) {
        try {

            dispatch({ type: ADD_REVIEW_REQUEST });
            const { userSignin: { userInfo } } = getState();
            const { userGoogleSignin: { userGoogleInfo } } = getState();
            const { userFacebookSignin: { userFacebookInfo } } = getState();

            const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token

            const { data } = await axios.post("/products/" + productId + "/review", review, {
                headers:
                { Authorization: 'Bearer ' + tokenParam}
            });
            
            dispatch({ type: ADD_REVIEW_SUCCESS, payload: data })

        } catch (error) {
            dispatch({ type: ADD_REVIEW_FAIL, payload: error.message });
        }

    } else {

        try {

            dispatch({ type: UPDATE_REVIEW_REQUEST });
            const { userSignin: { userInfo } } = getState();
            const { userGoogleSignin: { userGoogleInfo } } = getState();
            const { userFacebookSignin: { userFacebookInfo } } = getState();

            const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token

            const { data } = await axios.put("/products/" + productId + "/review/" + review._id, review, {
                headers:
                { Authorization: 'Bearer ' + tokenParam}
            });
            
            dispatch({ type: UPDATE_REVIEW_SUCCESS, payload: data })

        } catch (error) {
            dispatch({ type: UPDATE_REVIEW_FAIL, payload: error.message });
        }
    }
}



export const deleteReview = (productId, reviewId) => async (dispatch, getState) => {
    
    try {

        console.log('delete action review tetiklnedi')
        console.log('productId :', productId)
        console.log('reviewId :', reviewId)

        dispatch({ type: DELETE_REVIEW_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { userGoogleSignin: { userGoogleInfo } } = getState();
        const { userFacebookSignin: { userFacebookInfo } } = getState();

        const tokenParam = userInfo ? userInfo.token : userGoogleInfo ? userGoogleInfo.token : userFacebookInfo.token

        const { data } = await axios.delete("/products/" + productId + /review/+ reviewId, {
            headers:
            { Authorization: 'Bearer ' + tokenParam}
        });
        
        dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: DELETE_REVIEW_FAIL, payload: error.message });
    }
    
}
