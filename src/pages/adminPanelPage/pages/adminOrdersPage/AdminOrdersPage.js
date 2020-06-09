import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsOrder } from '../../../../actions/orderActions';
import './AdminOrdersPage.css';


function AdminOrdersPage(props) {

    const dispatch = useDispatch();

    const orderDetails = useSelector(state => state.orderDetails);
    const { order } = orderDetails;

    useEffect(() => {
        dispatch(detailsOrder(props.match.params.id));
    }, [dispatch, props.match.params.id]);

    return (
        <div>
            {
               order &&
               <div className="placeOrder-box">
                    <h4>Order Details</h4>
                    <div className="placeorder">
                        <div className="placeorder-info">
                            <div>
                                <h5>Shipping</h5>
                                <div>
                                    {order.shipping.address}, {order.shipping.city},
                                    {order.shipping.postalCode}, {order.shipping.country},
                                </div>
                                <div>
                                    {order.isDelivered ? "Delivered at " + order.deliveredAt : "Not Delivered."}
                                </div>
                            </div>
                            <div>
                                <h5>Payment</h5>
                                <div>
                                    Payment Method: {order.payment.paymentMethod}
                                </div>
                                <div>
                                    {order.isPaid ? "Paid at " + order.paidAt : "Not Paid."}
                                </div>
                            </div>
                            <div>
                                <ul className="cart-list-container">
                                    <li>
                                        <h5>Shopping Cart</h5>
                                        <div>
                                            Price
                                        </div>
                                    </li>
                                    {
                                        order.orderItems.length === 0 ?
                                        <div>Cart is empty</div>
                                        :
                                        order.orderItems.map(item =>
                                            <li key={item._id}>
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
                                                        Amount: {item.qty}
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
                        <div className="placeorder-action-order">
                            <ul>
                                <li>
                                    <h5>Order Summary</h5>
                                </li>
                                <li>
                                    <div>Items</div>
                                    <div>${order.itemsPrice}</div>
                                </li>
                                <li>
                                    <div>Shipping</div>
                                    <div>$ {order.shippingPrice}</div>
                                </li>
                                <li>
                                    <div>Tax</div>
                                    <div>$ {Number(order.taxPrice).toFixed(2)}</div>
                                </li>
                                <li>
                                    <div>Order Total</div>
                                    <div>$ {order.totalPrice}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
        
            
        
    )
}

export default AdminOrdersPage;