import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import './LandingPage.css';
import AdminCard from '../../components/adminCard/AdminCard';
import { FiUsers } from 'react-icons/fi';
import { AiOutlineShop } from 'react-icons/ai';
import { FaShoppingBag } from 'react-icons/fa';
import { MdAddShoppingCart, MdRateReview,MdAccessTime } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { listUsers } from '../../../../actions/userActions';
import { listShop } from '../../../../actions/shopActions';
import { listProduct } from '../../../../actions/productActions';
import { listOrders } from '../../../../actions/orderActions';


function LandingPage(props) {

    const userList = useSelector(state => state.userList);
    const { users } = userList;

    const shopList = useSelector(state => state.shopList);
    const { shops } = shopList;
    
    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const orderList = useSelector(state => state.orderList);
    const { orders } = orderList;

    const dispatch = useDispatch();

    useEffect(() => {
       
        dispatch(listUsers());
        dispatch(listShop());
        dispatch(listProduct());
        dispatch(listOrders());

        props.history.push("/");
    }, [props.history])

    let tempReviews = []

    products.map(item => {    
                        if (item.reviews.length > 0) {
                            item.reviews.forEach( x => tempReviews.push(x))
                        }
                    })

    const iconComp = (value) => {
        switch (value) {
            case 'user':
                return  <FiUsers />
            case 'shop':
                return  <AiOutlineShop />
            case 'product':
                return  <FaShoppingBag />
            case 'order':
                return  <MdAddShoppingCart />
            case 'review':
                return  <MdRateReview />
            case 'other':
                return  <BsThreeDots />
            default:
                break;
        }
    }

    const footer = () => {
        return (
            <div className="footer">
                <span><MdAccessTime /></span>
                <span>Just Updated</span>  
            </div>
        )
    }

    return (
        <div className="page-content">
            <div>
                <Link to="admin/userlist">
                    <AdminCard  heading= 'Users' title={users ? ('+' + users.length) : null} 
                                color='#FFA501' iconComp={iconComp('user')} 
                                footer={footer()}
                    />
                </Link>
            </div>
            <div>
                <Link to="admin/shops_manage_admin">
                    <AdminCard heading= 'Shops' title={shops ? ('+' + shops.length) : null} color='#5EB461' iconComp={iconComp('shop')} footer={footer()}/>
                </Link>
            </div>
            <div>
                <Link to="admin/products_manage_owner" >
                    <AdminCard heading= 'Products' title={products ? ('+' + products.length) : null} color='#E42465' iconComp={iconComp('product')} footer={footer()}/>
                </Link>
            </div>
            <div>
                <Link to="admin/orderlist" >
                    <AdminCard heading= 'Orders' title={orders ? ('+' + orders.length) : null} color='#3CA5DA' iconComp={iconComp('order')} footer={footer()}/>
                </Link>
            </div>
            <div>
                <Link to="admin/reviews" >
                    <AdminCard heading= 'Reviews' title={tempReviews ? ('+' + tempReviews.length) : null} color='#AA46BB' iconComp={iconComp('review')} footer={footer()}/>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage
