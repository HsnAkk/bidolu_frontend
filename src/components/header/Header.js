import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { listProduct } from '../../actions/productActions';
import Menu from '../signIn&accounts/Menu';
import './header.css';


function Header(props) {

    let history = useHistory();

    const [ category, setCategory ] = useState('')
    const [ searchInput, setSearchInput ] = useState('')

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userGoogleSignin = useSelector(state => state.userGoogleSignin);
    const { userGoogleInfo } = userGoogleSignin;
    
    const userFacebookSignin = useSelector(state => state.userFacebookSignin);
    const { userFacebookInfo } = userFacebookSignin;

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const cart = useSelector( state => state.cart);
    const { cartItems } = cart;

    const wishList = useSelector( state => state.wishList);
    const { wishListItems } = wishList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct());
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        history.push('/')
    }
    
    const options = [...new Set(products.map(item => item.category))]

    const clickHandler = () => {
        setSearchInput('') 
        setCategory('')
    }

    return (
        <div className="navbar-container">
            <div className="row row-top">
                <div className="col-2">
                    <Link to="/" className="brand">
                        <img src="/images/logo.png" className="img-responsive" width="70px" height="40px" alt="brand-logo"/>
                    </Link>
                </div>
                <div className="col-10 col-sm-6 search-container">
                    <div className="search-categories">
                        <select onChange= { e => setCategory(e.target.value)} value={category}>
                            <option>Categories</option>
                            {
                                options.map( (item, index) => <option key={index} >{item}</option>)
                            }
                        </select>
                    </div>
                    <div className="search-input">
                        <input data-purpose="search-input" placeholder="Search for anything" value={searchInput}  onChange={ e => setSearchInput(e.target.value)}/>
                        <Link to={`/search?category=${category}&item=${searchInput}`}>
                            <i className="fa fa-search" aria-hidden="true" onClick={clickHandler}></i>
                        </Link>
                    </div>
                </div>

                <div className="offset-2 col-8 offset-sm-0 col-sm-4 links">
                    <div className="links-signin">
                        <p>Hi, {' '} 
                            {
                                userInfo ? (userInfo.name) : userGoogleInfo ? (userGoogleInfo.name) : userFacebookInfo ? (userFacebookInfo.name) :'Sign in'
                            }
                            
                        </p>
                        <p> Account & Lists 
                            <i className="fa fa-sort-desc" aria-hidden="true"></i>
                        </p>
                        <Menu />
                    </div>
                   

                    <div className="links-cart">
                        <Link to="/cart">
                            <i className="fa fa-cart-arrow-down" aria-hidden="true"></i><span className="badge badge-warning cart">{cartItems.length}</span>
                        </Link>
                    </div>

                    <div className="links-wishlist">
                        <Link to="/wishlist">
                            <i className="fa fa-heart-o" aria-hidden="true"></i><span className="badge badge-warning wish">{wishListItems.length}</span>
                        </Link>
                    </div>
                    <div className="links-signout">
                        {
                            userInfo || userGoogleInfo || userFacebookInfo ? <button onClick={handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i></button> : null
                        }
                    </div>            
                </div>
            </div>
            <div className="row row-bottom">
                <div className="col-0 col-sm-2 delivery">
                    <Link to="/">
                        <i className="fa fa-map-marker" aria-hidden="true"></i><span>Delivery to </span> <b>Germany</b>
                    </Link>
                </div>
                <div className="col-12 col-sm-7 links-bottom">
                    <Link to="/" className="link">HOME</Link>
                    <Link to="/products" className="link">All Products</Link>
                    <Link to="/" className="link">Today's Deals</Link>
                    <Link to="/" className="link">Customer Service</Link>
                    <Link to="/" className="link">Registry</Link>
                    <Link to="/" className="link">Gift Cards</Link>
                    <Link to="/" className="link">Sell</Link>
                </div>
                <div className="col-0 col-sm-3 anounce">
                    <Link to="/">BiDolu Announcements</Link>
                </div>
            </div>
            
            
        </div>
    )
}

export default Header
