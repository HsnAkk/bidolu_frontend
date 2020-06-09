import { combineReducers } from 'redux';
import { userSigninReducer, userRegisterReducer, userGoogleSigninReducer, userFacebookSigninReducer, userListReducer, userUpdateReducer, userDeleteReducer } from './userReducer';
import { errorReducer } from './errorReducer';
import { shopListReducer, shopDetailsReducer, shopDeleteReducer, shopSaveReducer } from './shopReducer';
import { productListReducer, productDetailsReducer, productDeleteReducer, productSaveReducer, productReviewReducer, productUpdateReviewReducer, productDeleteReviewReducer  } from './productReducer';
import cartReducer from './cartReducer';
import wishListReducer from './wishListReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, myOrderListReducer, orderListReducer, orderDeleteReducer } from './orderReducer';


export default combineReducers({
    userSignin: userSigninReducer,
    userGoogleSignin: userGoogleSigninReducer,
    userFacebookSignin: userFacebookSigninReducer,
    userRegister: userRegisterReducer,
    userList : userListReducer,
    userUpdate: userUpdateReducer,
    userDelete: userDeleteReducer,
    error: errorReducer,
    shopList : shopListReducer,
    shopDetails: shopDetailsReducer,
    shopSave: shopSaveReducer,
    shopDelete: shopDeleteReducer,
    productList : productListReducer,
    productDetails: productDetailsReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    productReview: productReviewReducer,
    productUpdateReview: productUpdateReviewReducer,
    productDeleteReview: productDeleteReviewReducer,
    cart: cartReducer,
    wishList: wishListReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrderList: myOrderListReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer
});