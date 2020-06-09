import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import { listProduct } from '../../actions/productActions';
import { MdDelete } from 'react-icons/md';
import Heading from '../../components/heading/Heading';
import './CartPage.css';


function CartPage (props) {

    let history = useHistory();

    const cart = useSelector( state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userGoogleSignin = useSelector(state => state.userGoogleSignin);
    const { userGoogleInfo} = userGoogleSignin;

    const userFacebookSignin = useSelector(state => state.userFacebookSignin);
    const { userFacebookInfo} = userFacebookSignin;

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split("=")[1].split('?')[0]) : 1 ;
    const color = props.location.search ? props.location.search.split("=")[2].split('?')[0] : ''
    const size = props.location.search ? props.location.search.split("=")[3] : ''
    
    let location = useLocation();
    const dispatch = useDispatch();

    const removeFromCartHandler = productId => dispatch(removeFromCart(productId));
        
    useEffect( () => {
        if (productId) {
            dispatch(addToCart(productId, qty, color, size))
        } 
        dispatch(listProduct());
    }, [])


    const checkoutHandler = () => {
        (userInfo || userGoogleInfo || userFacebookInfo) ? history.push("/shipping") : history.push("/signin");
    }

    const link_var = location.pathname.split('/').length > 2  ? '/'+location.pathname.split('/')[1] : location.pathname
 
    return (
        <div className="cart-content">
            <div className="cart-list">
                <Heading head="Shopping Cart" style={{marginRight: '10px!important'}}/>
                <ul className="cart-list-container">
                    <li>
                        <div>Price</div>
                    </li>
                    {
                        cartItems.length === 0 ? <div>Cart is empty</div> :
                            cartItems.map(item =>
                                                    <li key={item.product}>
                                                        <div className="cart-image">
                                                            <Link to={{
                                                                pathname: `/products/${item.name}`,
                                                                state: {
                                                                    prod: {...products.find(x => x._id === item.product)},
                                                                    url_link: link_var
                                                                }
                                                            }}>
                                                                <img src={`/productsImages/${item.image}`} alt="product" />
                                                            </Link>
                                                        </div>
                                                        <div className="cart-name">
                                                            <div style={{fontWeight : 'bold'}}>
                                                                {item.name}
                                                            </div>
                                                            <div className="cart-qty">
                                                                <span>Color</span>
                                                                <select value={item.color} onChange={ e => dispatch(addToCart(item.product, item.qty, e.target.value, item.size ))}>
                                                                    {item.sca && [...new Set(item.sca.map( item => item.color))].map( (item, index) => 
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                            <div className="cart-qty">
                                                                <span>Size</span>
                                                                <select value={item.size} onChange={ e => dispatch(addToCart(item.product, item.qty, item.color, e.target.value ))}>
                                                                    {item.sca && [...new Set(item.sca.map( item => item.size))].map( (item, index) => 
                                                                        <option key={index} value={item}>{item}</option>
                                                                    )}
                                                                </select>
                                                                    </div>
                                                            <div className="cart-qty">
                                                                <span>Qty</span>
                                                                <select value={item.qty} onChange={ e => dispatch(addToCart(item.product, e.target.value, item.color, item.size ))}>
                                                                    {[...Array(item.countInStock).keys()].map(x =>
                                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                                    )}
                                                                </select>
                                                                <div className="cart-delete" onClick={() => removeFromCartHandler(item.product)}>
                                                                    <MdDelete />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cart-price">${item.price * item.qty}</div>
                                                    </li>
                            )
                      }
                </ul>
            </div>
            <div className="cart-action">
                <h4>
                  Subtotal 
                  <br/><br/>
                  <span>
                    ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    :
                    $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                  </span>
                </h4>
                <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                  Proceed to Checkout
                </button>
            </div>
        </div>
    )
}



export default CartPage
