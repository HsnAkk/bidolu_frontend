
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
         PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
         PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, 
         PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL,
         ADD_REVIEW_REQUEST, ADD_REVIEW_SUCCESS, ADD_REVIEW_FAIL,
         UPDATE_REVIEW_REQUEST, UPDATE_REVIEW_SUCCESS, UPDATE_REVIEW_FAIL,
         DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL
    } from '../actions/types';



export function productListReducer (state = {products: []}, action) {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST :
            return {
                loading: true,
                products: []
            }
        case PRODUCT_LIST_SUCCESS :
            return {
                loading: false,
                products: action.payload
            }
        case PRODUCT_LIST_FAIL :
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export function productDetailsReducer(state = { product: {} }, action) {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { 
                loading: true 
            }
        case PRODUCT_DETAILS_SUCCESS:
            return { 
                loading: false, 
                product: action.payload 
            };
        case PRODUCT_DETAILS_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }
        default:
            return state;
    }
}


export function productDeleteReducer(state = { product: {} }, action) {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { 
                loading: true 
            };
        case PRODUCT_DELETE_SUCCESS:
            return { 
                loading: false, 
                product: action.payload, 
                success: true 
            };
        case PRODUCT_DELETE_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }
        default:
            return state;
    }
}


export function productSaveReducer(state = { product: {} }, action) {
    switch (action.type) {
        case PRODUCT_SAVE_REQUEST:
            return { 
                loading: true 
            };
        case PRODUCT_SAVE_SUCCESS:
            return { 
                loading: false, 
                success: true, 
                product: action.payload 
            };
        case PRODUCT_SAVE_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }
        default:
            return state;
    }
}


export function productReviewReducer(state = {
    product: {
        reviews: []
    }
    }, action) {

    switch (action.type) {
        case ADD_REVIEW_REQUEST:
            return { loading: true };

        case ADD_REVIEW_SUCCESS:
            return { loading: false, success: true };

        case ADD_REVIEW_FAIL:
            return { loading: false, error: action.payload };
            
        default: 
            return state;
    }
}

export function productUpdateReviewReducer(state = {
    product: {
        reviews: []
    }
    }, action) {

    switch (action.type) {
        case UPDATE_REVIEW_REQUEST:
            return { loading: true };

        case UPDATE_REVIEW_SUCCESS:
            return { loading: false, success: true };

        case UPDATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
            
        default: 
            return state;
    }
}

export function productDeleteReviewReducer(state = {
    product: {
        reviews: []
    }
    }, action) {

    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return { loading: true };

        case DELETE_REVIEW_SUCCESS:
            return { loading: false, success: true };

        case DELETE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
            
        default: 
            return state;
    }
}


