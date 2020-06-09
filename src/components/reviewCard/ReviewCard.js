import React from 'react';
import './ReviewCard.css';
import StarRatings from 'react-star-ratings';
import { Link,  useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../actions/productActions';


function ReviewCard(props) {

    let location = useLocation();
    const { _id, user, product, rating, title, name, reviewedAt, comment } = props

    console.log(props)
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const userGoogleSignin = useSelector(state => state.userGoogleSignin);
    const { userGoogleInfo } = userGoogleSignin;

    const userFacebookSignin = useSelector(state => state.userFacebookSignin);
    const { userFacebookInfo } = userFacebookSignin;

    const dispatch = useDispatch();

    const deleteReviewHandler = (productId, id) => {
        dispatch(deleteReview(productId, id))
        window.history.back()
    }

    return (
        <div className="reviewContainer">
            <div className="review-box">
                <div>
                    <StarRatings  
                        rating= {rating}
                        starRatedColor= '#f8a502'
                        starEmptyColor= 'lightblue'
                        numberOfStars= {5}
                        starDimension= '18px'
                        starSpacing= 'none'
                    />
                    <span>({rating})</span> 
                </div>
                <div>{title}</div>
                <div><span>{name}</span> on <span>{(new Date(reviewedAt).toLocaleString()).split(',')[0]}</span></div>
                <div>{comment}</div>
            </div>
            {
                (userInfo && user === userInfo._id) || (userGoogleInfo && user === userGoogleInfo._id) || (userFacebookInfo && user === userFacebookInfo._id) ?
                                        <div className="buttons">
                                            <Link to= {{
                                                pathname: `${location.pathname}/review`,
                                                state: {
                                                    productId: product,
                                                    url_link: location.pathname,
                                                    review: {...props}
                                                }
                                            }}
                                            >
                                                <button>Update</button>
                                            </Link>
                                            
                                            <button onClick = {() => deleteReviewHandler(product, _id)} >Delete</button>
                                        </div> 
                                        : null
            }
            
        </div>
    )
}

export default ReviewCard
