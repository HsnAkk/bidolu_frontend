import React, {useEffect} from 'react';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProduct } from '../../actions/productActions';
import './ShopCard.css';



function ShopCard(props) {

    const { _id, name, category, description, image } = props
    
    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct());
    }, []);

    let reviewLength = 0;
    let reviewRating = 0;
    let shopRating = 0;

    products
            .filter( item => item.shop === _id)
            .filter( item => item.reviews.length > 0)
            .forEach( item => {
                for (var i =0; i <item.reviews.length; i++) {
                    reviewLength += 1
                    reviewRating += item.reviews[i].rating
                }
            })
    shopRating = (reviewLength > 0 ? (reviewRating / reviewLength) : 0)

    return (
        <div className="shopcard-detail">
            
                <div className="card-image">
                    <Link to={'/shop&products/' + name}>
                        <img src={"/shopsImages/" + image} alt={name + ' image'} className="img-fluid"/>
                    </Link>
                </div>
                <div className="card-shop-details">
                    <Link to={'/shop&products/' + name}>
                        <h5>{name}</h5>
                    </Link>  
                    <h6>{category}</h6>
                    <p>{description}</p>
                    <div className="card-shop-details-bottom">
                        <div className="starrating">
                            <StarRatings  
                                rating=  {shopRating} 
                                starRatedColor= '#f8a502'
                                starEmptyColor= 'lightblue'
                                numberOfStars= {5}
                                starDimension= '15px'
                                starSpacing= 'none'
                            /> 
                            <span>( {shopRating !== 0 ? shopRating.toFixed(1) : 0} )</span>
                        </div>
                        <div className="shop-buttons">
                            <Link to={'/shop&products/' + name}>
                                <button>Products</button>
                            </Link>  
                            <button>About Shop</button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ShopCard;
