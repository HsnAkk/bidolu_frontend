import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { FaRegEye } from 'react-icons/fa';
import { IoMdHeartEmpty } from 'react-icons/io';
import { Link } from 'react-router-dom';
import QuickViewModal from '../quickViewModal/QuickViewModal';
import { addToWishList } from '../../actions/wishListActions';
import AlertModal from '../alert/AlertModal'
import './ProductCard.css';



function ProductCard(props) {

    const { _id, name, image, price, brand, discount, isnew, reviews} = props
    let location = useLocation();

    const [ modalShow, setModalShow ] = useState(false)
    const [ alertShow, setAlertShow ] = useState(false)
    const [ wish, setWish ] = useState(false)

    const dispatch = useDispatch();
    
    let reviewLength = 0;
    let reviewRating = 0;
    let productRating = 0;

    reviews.forEach( item => {
                
                    reviewLength += 1
                    reviewRating += item.rating
               
            })
    productRating = (reviewLength > 0 ? (reviewRating / reviewLength) : 0)

   

    const wishListHandler = id => {
        if ( wish === false) {
            setWish(true)
            dispatch(addToWishList(id))
        } else {
           setAlertShow(true)
        }
    }

    return (
        <div className="containerOut" style={{ width: props.search ? '25%' : null , marginTop: props.search ? '30px' : null }}>
            {
                isnew && 
                    <div className='new'>
                        <img src="/images/new.png" alt="new product" width='50px' height='20px'/>
                    </div>
            }
            <div className="sideBar">
                <div className ="buttons" onClick={ () => setModalShow(true) }>
                    <FaRegEye />
                </div>
                <div className = { wish ? "buttons bg-black" : "buttons" } onClick={ () => wishListHandler(_id) }>
                    <IoMdHeartEmpty />
                </div>
            </div>
            <div className="containerIn">
                <div className="image">
                    <Link to= {{
                                    pathname: `/products/${name}`,
                                    state: {
                                        prod: {...props},
                                        url_link: location.pathname
                                    }
                                }}
                    >
                        <img src={`/productsImages/${image[0]}`}  alt="productImage"/>
                    </Link>
                </div>
                <div className="brand">
                    {brand}
                </div>
                <div className="name">
                    {name}
                </div>
                <div className="price">
                $ {discount > 0 ? <span><span>{price}</span><span style={{textDecoration: 'line-through', textDecorationColor: '#F60394', fontSize: '15px', color: 'grey', paddingLeft: '10px'}}>{Math.round(price * (100 + discount) / 100)}</span> <span style={{color: 'red', fontSize: '14px'}}>%{discount}</span> </span> : price }
                </div>
                <div className="rating">
                    <StarRatings  
                        rating= {productRating}
                        starRatedColor= '#f8a502'
                        starEmptyColor= 'lightblue'
                        numberOfStars= {5}
                        starDimension= '15px'
                        starSpacing= 'none'
                    /> 
                </div>
            </div>
            <QuickViewModal
                show = {modalShow}
                onHide = {() => setModalShow(false)}
                {...props}
            />
        
            <AlertModal show={alertShow} onHide={() => setAlertShow(false)} heading="Warning" text="Product has already added to wishlist...!" />
        </div>
    )
}

export default ProductCard
