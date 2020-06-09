import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CheckoutSteps from '../../components/checkoutSteps/CheckoutSteps';
import { createOrder } from '../../actions/orderActions';
import './PlaceOrderPage.css';


function PlaceOrderPage(props) {

    let history = useHistory();

    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;

    const orderCreate = useSelector(state => state.orderCreate);
    const { success, order } = orderCreate;

    if (!shipping.address) {
        history.push("/shipping");
    } else if (!payment.paymentMethod) {
        history.push("/payment");
    }
    
    const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems, shipping, payment, itemsPrice, shippingPrice,
            taxPrice, totalPrice
          }));
    }
    
    useEffect(() => {
        if (success) {
            history.push("/order/" + order._id);
          }
    }, [success]);

    return (
        <div className="placeOrder-box">
            <CheckoutSteps step1 step2 step3 step4 ></CheckoutSteps>
            <div className="placeorder">
                <div className="placeorder-info">
                    <div>
                        <h5>Shipping</h5>
                        <div>
                            {cart.shipping.address}, {cart.shipping.city},
                            {cart.shipping.postalCode}, {cart.shipping.country},
                        </div>
                    </div>
                    <div>
                        <h5>Payment</h5>
                        <div>
                            Payment Method : {cart.payment.paymentMethod}
                        </div>
                    </div>
                    <div>
                        <ul className="cart-list-container">
                            <li>
                                <h5>Shopping Cart</h5>
                                <div>Price</div>
                            </li>
                            {
                                cartItems.length === 0 ?
                                                        <div>
                                                            Cart is empty
                                                        </div>
                                                        :
                                                        cartItems.map( (item,index) =>
                                                                                <li key={index}>
                                                                                    <div className="cart-image">
                                                                                        <img src={`/productsImages/${item.image}`} alt="product" />
                                                                                    </div>
                                                                                    <div className="cart-name">
                                                                                        <div style={{fontWeight: 'bold'}}>
                                                                                            {item.name}
                                                                                        </div>
                                                                                        <div>
                                                                                        Color : {item.color}
                                                                                        </div>
                                                                                        <div>
                                                                                            Size : {item.size}
                                                                                        </div>
                                                                                        <div>
                                                                                            Amount : {item.qty}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="cart-price">
                                                                                        $ {item.price}
                                                                                    </div>
                                                                                </li>
                                                                        )
                            }
                        </ul>
                    </div>
                </div>
                <div className="placeorder-action">
                    <ul>
                        <li>
                            <button className="button-place" onClick={placeOrderHandler} >Place Order</button>
                        </li>
                        <li>
                            <h5>Order Summary</h5>
                        </li>
                        <li>
                            <div>Items</div>
                            <div>${itemsPrice}</div>
                        </li>
                        <li>
                            <div>Shipping</div>
                            <div>${shippingPrice}</div>
                        </li>
                        <li>
                            <div>Tax</div>
                            <div>${taxPrice.toFixed(2)}</div>
                        </li>
                        <li>
                            <div>Order Total</div>
                            <div>${totalPrice}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderPage; 