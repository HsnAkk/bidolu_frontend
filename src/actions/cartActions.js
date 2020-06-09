import axios from 'axios';
import Cookie from "js-cookie";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from './types';



export const addToCart = (productId, qty, color, size) => (dispatch, getState) => {

    axios
        .get('/products/' + productId)
        .then( res => {
            dispatch({
                        type: CART_ADD_ITEM,
                        payload: {
                            product: res.data._id,
                            name: res.data.name,
                            image: res.data.image[0],
                            price: res.data.price,
                            countInStock: res.data.countInStock,
                            sca: res.data.sca,
                            qty: qty,
                            color:color,
                            size: size
            }});
            
            const { cart: { cartItems } } = getState();
            Cookie.set("cartItems", JSON.stringify(cartItems));
        })
        //.catch (err => dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message }));
}


export const saveShipping = data => dispatch => {
    dispatch({ type: CART_SAVE_SHIPPING, payload: data });
}


export const savePayment = data => dispatch => {
    dispatch({ type: CART_SAVE_PAYMENT, payload: data });
}


export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    
    const { cart: { cartItems } } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}
