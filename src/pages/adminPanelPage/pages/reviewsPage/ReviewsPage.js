import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listProduct } from '../../../../actions/productActions';
import { listShop } from '../../../../actions/shopActions';
import StarRatings from 'react-star-ratings';
import './ReviewsPage.css';


function ReviewsPage () {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const productList = useSelector(state => state.productList);
    const { products } = productList;

    const shopList = useSelector(state => state.shopList);
    const { shops } = shopList;


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct());
        dispatch(listShop());
    }, []);

    let tempReviews=[]
    let calcRating;

    if (userInfo.role === 'admin') {
        products.map(item => {    
                                if (item.reviews.length > 0) {
                                    item.reviews.forEach( x => tempReviews.push(x))
                                }
                            })
    } else {
        let shop = shops.filter(item => item.owner === userInfo._id).map(item => item._id);
        let shopProducts = products.filter(item => item.shop === shop[0])
        shopProducts.map(item => {    
            if (item.reviews.length > 0) {
                item.reviews.forEach( x => tempReviews.push(x))
            }
        })
        calcRating = (tempReviews.map(item => item.rating).reduce((total, num) => total+ num, 0)) / tempReviews.length 
    }

    return (
  
        <div className="content-margined">
       
        {   
            tempReviews && 
                
                <div>
                    <div className="shop-header">
                        <h5>Reviews List</h5>
                    </div>
                    <table className="table table-bordered">
                        <thead className="thead-light" >
                            <tr>
                                <th></th>
                                <th>PRODUCT</th>
                                <th>USER NAME</th>
                                <th>USER EMAIL</th>
                                <th>RATING</th>
                                <th>TITLE</th>
                                <th>REVIEW</th>
                                <th>REVIEWED AT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {    
                                tempReviews.map( (item, index) => 
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>{products.filter(product => product._id === item.product)[0].name}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <div>
                                                <StarRatings  
                                                    rating= {item.rating}
                                                    starRatedColor= '#f8a502'
                                                    starEmptyColor= 'lightblue'
                                                    numberOfStars= {5}
                                                    starDimension= '18px'
                                                    starSpacing= 'none'
                                                />
                                                <span>({item.rating})</span> 
                                            </div>
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.comment}</td>
                                        <td>{new Date(item.reviewedAt).toLocaleString()}</td>
                                    </tr>
                                )
                            }  
                        </tbody>
                    </table>
                    {
                        userInfo.role === 'shopOwner' & calcRating ? 
                        <div className="shop-rating">
                            <h5>Shop Rating :</h5> 
                            <div className= "star-rating">
                                <StarRatings
                                    rating= {calcRating}
                                    starRatedColor= '#f8a502'
                                    starEmptyColor= 'lightblue'
                                    numberOfStars= {5}
                                    starDimension= '18px'
                                    starSpacing= 'none'
                                />
                            </div>              
                            <span>( {(calcRating).toFixed(2)} )</span> 
                                               
                        </div>
                        : null
                    }
                </div>
                
        }
        
        </div>
    )
}

export default ReviewsPage;