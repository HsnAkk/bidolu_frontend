import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { listMyOrders } from '../../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import AlertModal from '../../components/alert/AlertModal'
import './MyOrdersPage.css';


function MyOrdersPage(props) {

    const [ alertShow, setAlertShow ] = useState(true)
    let history = useHistory();
    const dispatch = useDispatch();

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
    
    useEffect(() => {
        dispatch(listMyOrders());
        if (alertShow === false) {
            history.push('/')
        }
    }, [alertShow])

    return (
        <div className="myorders">
            <div className="profile-orders content-margined">
            {
                loadingOrders ? <div>Loading...</div> :
                errorOrders ? 
                <AlertModal show={alertShow} onHide={() => setAlertShow(false)} heading="Warning" text="You should sign in...!" /> 
                : 
                <table className="table">
                    <thead>
                        <tr>
                        <th></th>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map( (order, index) => 
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>{order._id}</td>
                                <td>{order.createdAt}</td>
                                <td>$ {order.totalPrice}</td>
                                <td>{order.isPaid ? 'Yes' : 'No'}</td>
                                <td>
                                    <Link to={"/order/" + order._id}>DETAILS</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            }
            </div>
        </div>
    )
}

export default MyOrdersPage; 