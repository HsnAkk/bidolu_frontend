import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";
import { removeFromWishList } from '../../actions/wishListActions';
import { Link } from 'react-router-dom';
import { listProduct } from '../../actions/productActions';
import Heading from '../../components/heading/Heading';
import { FaCartPlus } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import './WishListPage.css';


function WishListPage (props) {

    const wishList = useSelector( state => state.wishList);
    const { wishListItems } = wishList;

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userGoogleSignin = useSelector(state => state.userGoogleSignin);
    const { userGoogleInfo} = userGoogleSignin;

    const userFacebookSignin = useSelector(state => state.userFacebookSignin);
    const { userFacebookInfo} = userFacebookSignin;

    let location = useLocation();
    let history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct());
    }, []);

    const removeFromWishListHandler = id => dispatch(removeFromWishList(id));

    const handleAddToCart = id => {
        history.push("/cart/" + id + "?qty=1" + "?color=" + '' + "?size=" + '')
    }

    return (
        <div className="wishlist-content">
            <Heading head="WishList Items"/>
    
                {
                    wishListItems.length === 0 ? <div>WishList is empty</div> :
                        wishListItems.map( (item, index) =>
                                                <div key={index} className="wish-items">
                                                    <div className="wish-image">
                                                        <Link to= {{
                                                                    pathname: `/products/${item.name}`,
                                                                    state: {
                                                                        prod: {...products.find(x => x._id === item._id)},
                                                                        url_link: location.pathname
                                                                    }
                                                                }}
                                                        >
                                                            <img src={`/productsImages/${item.image}`} alt="product" width="100px" height="100px"/>
                                                        </Link>
                                                        <div className="wish-product">
                                                            <div>
                                                                {item.brand}
                                                            </div>
                                                            <div>
                                                                {item.name}
                                                            </div>
                                                            <div>
                                                                $ {item.price}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="wish-action">
                                                        <div className="addCart" onClick={() => handleAddToCart(item._id)}>
                                                            <span className="span-cart"><FaCartPlus /></span>Add to Cart
                                                        </div>
                                                        <div className="addCart delete" onClick={() => removeFromWishListHandler(item._id)}>
                                                            <MdDelete />
                                                        </div>
                                                    </div>
                                                </div>
                        )
                }
               
            
           
        </div>
    )
}

export default WishListPage
