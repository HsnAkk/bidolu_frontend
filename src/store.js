import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import Cookie from 'js-cookie';


// to be able to save to cookie
const cartItems = Cookie.getJSON("cartItems") || []
const wishListItems = Cookie.getJSON("wishListItems") || []
const userInfo = Cookie.getJSON("userInfo") || null;
const userGoogleInfo = Cookie.getJSON("userGoogleInfo") || null;
const userFacebookInfo = Cookie.getJSON("userFacebookInfo") || null;


// to be able to run async actions in redux 
const middleware = [thunk];


const initialState = { cart: { cartItems, shipping: {}, payment: {} },
                       wishList: { wishListItems },
                       userSignin: { userInfo }, 
                       userGoogleSignin: { userGoogleInfo }, 
                       userFacebookSignin: { userFacebookInfo }
                    };

const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;