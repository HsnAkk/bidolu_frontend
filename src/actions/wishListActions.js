import axios from 'axios';
import Cookie from "js-cookie";
import { WISHLIST_ADD_ITEM, WISHLIST_REMOVE_ITEM } from './types';



export const addToWishList = (productId) => (dispatch, getState) => {

    axios
        .get('/products/' + productId)
        .then( res => {
            dispatch({
                        type: WISHLIST_ADD_ITEM,
                        payload: {
                            _id: res.data._id,
                            brand: res.data.brand,
                            name: res.data.name,
                            image: res.data.image[0],
                            price: res.data.price
            }});
            
            const { wishList: { wishListItems } } = getState();
            Cookie.set("wishListItems", JSON.stringify(wishListItems));
        })
        //.catch (err => dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message }));
}


export const removeFromWishList = (productId) => (dispatch, getState) => {
    dispatch({ type: WISHLIST_REMOVE_ITEM, payload: productId });
    
    const { wishList: { wishListItems } } = getState();
    Cookie.set("wishListItems", JSON.stringify(wishListItems));
}
