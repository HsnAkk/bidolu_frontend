import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './components/header/Header';


import PageSpinner from './components/PageSpinner';
// import { Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const SigninPage  = React.lazy(() => import('./pages/signInPage/SigninPage'));
const SigninGooglePage  = React.lazy(() => import('./pages/signInPage/SigninGooglePage'));
const SigninFacebookPage  = React.lazy(() => import('./pages/signInPage/SigninFacebookPage'));
const RegisterPage  = React.lazy(() => import('./pages/registerPage/RegisterPage'));
const ShopManageAdmin  = React.lazy(() => import('./pages/shopManageAdmin/ShopManageAdmin'));
const ProductManageOwner  = React.lazy(() => import('./pages/productManageOwner/ProductManageOwner'));
const ProductsPage  = React.lazy(() => import('./pages/productsPage/ProductsPage'));
const ProductDetailsPage  = React.lazy(() => import('./pages/productDetailsPage/ProductDetailsPage'));
const ShopProductsPage  = React.lazy(() => import('./pages/shopProductsPage/ShopProductsPage'));
const SearchPage  = React.lazy(() => import('./pages/searchPage/SearchPage'));
const CartPage  = React.lazy(() => import('./pages/cartPage/CartPage'));
const ShippingPage  = React.lazy(() => import('./pages/shippingPage/ShippingPage'));
const PaymentPage  = React.lazy(() => import('./pages/paymentPage/PaymentPage'));
const PlaceOrderPage  = React.lazy(() => import('./pages/placeOrderPage/PlaceOrderPage'));
const OrderPage  = React.lazy(() => import('./pages/orderPage/OrderPage'));
const MyOrdersPage  = React.lazy(() => import('./pages/myOrdersPage/MyOrdersPage'));
const WishListPage  = React.lazy(() => import('./pages/wishListPage/WishListPage'));
const ReviewPage  = React.lazy(() => import('./pages/reviewPage/ReviewPage'));
const AdminPanel  = React.lazy(() => import('./pages/adminPanelPage/AdminPanel'));
const LandingPage  = React.lazy(() => import('./pages/adminPanelPage/pages/landingPage/LandingPage'));
const GakPage  = React.lazy(() => import('./pages/adminPanelPage/pages/gakPage/GakPage'));
const UsersListPage  = React.lazy(() => import('./pages/adminPanelPage/pages/usersPage/UsersListPage'));
const OrdersPage  = React.lazy(() => import('./pages/adminPanelPage/pages/ordersPage/OrdersPage'));
const AdminOrdersPage  = React.lazy(() => import('./pages/adminPanelPage/pages/adminOrdersPage/AdminOrdersPage'));
const ReviewsPage  = React.lazy(() => import('./pages/adminPanelPage/pages/reviewsPage/ReviewsPage'));

function App(props) {
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div>
            <React.Suspense fallback={<PageSpinner />}>
                {   userInfo && (userInfo.role === 'admin' || userInfo.role === 'shopOwner') ? 
                    <div>
                        <AdminPanel />
                        <Switch>
                            <Route exact path="/" component={LandingPage} />
                            <Route exact path="/admin/blank_page" component={GakPage} />
                            <Route exact path="/admin/shops_manage_admin" component={ShopManageAdmin} />
                            <Route exact path="/admin/products_manage_owner" component={ProductManageOwner} />
                            <Route exact path="/admin/userlist" component={UsersListPage} />
                            <Route exact path="/admin/orderlist" component={OrdersPage} />
                            <Route exact path="/admin/order/:id" component={AdminOrdersPage} />
                            <Route exact path="/admin/reviews" component={ReviewsPage} />
                        </Switch>
                    </div>
                    : 
                    <div>
                        <Header /> 
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route exact path="/products" component={ProductsPage} />
                            <Route exact path="/products/:name" component={ProductDetailsPage} />
                            <Route exact path="/shop&products/:name" component={ShopProductsPage} />
                            <Route exact path="/signin" component={SigninPage} />       
                            <Route exact path="/signin/google/:id" component={SigninGooglePage} />       
                            <Route exact path="/signin/facebook/:id" component={SigninFacebookPage} />       
                            <Route exact path="/register" component={RegisterPage} />
                            <Route exact path="/search" component={SearchPage} />
                            <Route exact path="/products/:name/review" component={ReviewPage} />
                            <Route exact path="/cart/:id?" component={CartPage} />  
                            <Route exact path="/wishlist" component={WishListPage} />  
                            <Route exact path="/shipping" component={ShippingPage} />
                            <Route exact path="/payment" component={PaymentPage} />
                            <Route exact path="/placeorder" component={PlaceOrderPage} />
                            <Route exact path="/order/:id" component={OrderPage} />
                            <Route exact path="/myorders" component={MyOrdersPage} />
                        </Switch>
                      
                    </div>
                }
            </React.Suspense>
        </div>
    )
}

export default App

