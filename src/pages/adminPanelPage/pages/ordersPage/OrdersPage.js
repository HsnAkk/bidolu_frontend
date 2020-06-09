import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders } from '../../../../actions/orderActions';
import { listProduct } from '../../../../actions/productActions';
import { listShop } from '../../../../actions/shopActions';
import './OrdersPage.css';


function OrdersPage () {

    const [ notDelivered, setNotDelivered ] = useState(false)

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const shopList = useSelector(state => state.shopList);
    const { shops } = shopList;

    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrders());
        dispatch(listProduct());
        dispatch(listShop());
    }, []);

    let tempOrders;
  

    if (userInfo.role === 'admin') {
        tempOrders = orders
    } else {
        let shop = shops.filter(item => item.owner === userInfo._id).map(item => item._id);
        let shopProductsIds = products.filter(item => item.shop === shop[0]).map( item => item._id)
        tempOrders = orders ? orders.filter( item => {
                                                let include;
                                                item.orderItems.map( x => {
                                                    if (shopProductsIds.includes(x.product)) {
                                                        include = true
                                                    }
                                                })
                                                if (include === true ) {
                                                    return true
                                                }
                                            }) : null
    }

    return (
  
        <div className="content-margined">
        {   
            tempOrders && 
                (tempOrders.length > 0 ? 
                <React.Fragment>
                    <div className="shop-header">
                        <h4>Orders List</h4>
                        <ul>
                            <li>
                                <div>
                                    <input type="checkbox" id="notDelivered" onChange={() => setNotDelivered(!notDelivered)} />
                                    <label htmlFor="notDelivered">Not Delivered</label>
                                </div>
                            </li> 
                        </ul>
                    </div>
                    <div className="shop-list">
                        <table className="table table-bordered">
                            <thead className="thead-light" >
                                <tr>
                                    <th>ID</th>
                                    <th>ORDER DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                    notDelivered === false ?
                                        tempOrders.map( order => 
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                                                <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <Link to={"/admin/order/" + order._id}>DETAILS</Link>
                                                </td>
                                            </tr>
                                        )
                                    :
                                        tempOrders.filter( item => item.isDelivered === false).map( order => 
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>{order.createdAt}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                                                <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                                                <td>
                                                    <Link to={"/admin/order/" + order._id}>DETAILS</Link>
                                                </td>
                                            </tr>
                                        )
                                }  
                            </tbody>
                        </table>
                    </div>
                </React.Fragment> 
                :<div>Order not found !!</div> )
        }
        
        </div>
    )
}

export default OrdersPage;